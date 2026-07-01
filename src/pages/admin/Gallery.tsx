import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, Trash, Eye, EyeOff, FolderOpen, Image as ImageIcon, Plus } from "lucide-react";

interface GalleryImage {
  id: string;
  country: string;
  title: string;
  description: string | null;
  label: string | null; // e.g. 'private' or null
  image_url: string;
  image_path: string;
  created_at: string;
  updated_at: string;
}

const AdminGallery = () => {
  const [selectedCountry, setSelectedCountry] = useState("singapore");
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  // Upload Form
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    country: "singapore",
    label: "public", // Use 'public' instead of empty string for Radix select safety
    folder: "",
    files: [] as File[],
  });

  // Edit Modal State
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    label: "",
  });

  useEffect(() => {
    fetchGalleryImages();
  }, [selectedCountry]);

  const fetchGalleryImages = () => {
    setLoadingGallery(true);
    try {
      const saved = localStorage.getItem("admin_gallery_images");
      let allImages: GalleryImage[] = [];
      
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            allImages = parsed;
          }
        } catch (e) {
          console.error("JSON parsing error for gallery images:", e);
        }
      }

      if (allImages && allImages.length > 0) {
        setGalleryImages(allImages.filter(img => img && img.country === selectedCountry));
      } else {
        const defaultImages: GalleryImage[] = [
          {
            id: "1",
            country: "singapore",
            title: "Singapore Port Operations",
            description: "Visual overview of Singapore container terminal logistics.",
            label: null,
            image_url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=600",
            image_path: "port/singapore-port.jpg",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ];
        localStorage.setItem("admin_gallery_images", JSON.stringify(defaultImages));
        setGalleryImages(defaultImages.filter(img => img && img.country === selectedCountry));
      }
    } catch (error: any) {
      toast.error("Error fetching images: " + error.message);
    } finally {
      setLoadingGallery(false);
    }
  };

  const slugifyFolder = (val: string) => {
    return val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleImageConversion = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const files = uploadForm.files;
    const hasMultiple = files.length > 1;

    if (files.length === 0 || !uploadForm.title) {
      toast.error("Please provide a title and select at least one image file");
      return;
    }

    const folderSafe = uploadForm.folder ? slugifyFolder(uploadForm.folder) : "";
    if (hasMultiple && !folderSafe) {
      toast.error("A folder name is required when uploading multiple images");
      return;
    }

    setUploadLoading(true);
    try {
      const allSaved = localStorage.getItem("admin_gallery_images");
      let currentList: GalleryImage[] = [];
      if (allSaved) {
        try {
          const parsed = JSON.parse(allSaved);
          if (Array.isArray(parsed)) {
            currentList = parsed;
          }
        } catch (err) {
          console.error(err);
        }
      }
      
      const newList = [...currentList];

      for (const file of files) {
        const dataUrl = await handleImageConversion(file);
        const ext = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const filePath = folderSafe ? `${folderSafe}/${fileName}` : fileName;

        const newImg: GalleryImage = {
          id: String(Date.now() + Math.random()),
          country: uploadForm.country,
          title: uploadForm.title,
          description: uploadForm.description || null,
          label: uploadForm.label === 'private' ? 'private' : null,
          image_url: dataUrl,
          image_path: filePath,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        newList.unshift(newImg);
        await new Promise(r => setTimeout(r, 10));
      }

      localStorage.setItem("admin_gallery_images", JSON.stringify(newList));
      toast.success(hasMultiple ? `${files.length} images uploaded successfully!` : "Image uploaded successfully!");

      setUploadForm({
        title: "",
        description: "",
        country: uploadForm.country,
        label: "public",
        folder: "",
        files: [],
      });

      if (uploadForm.country === selectedCountry) {
        setGalleryImages(newList.filter(img => img && img.country === selectedCountry));
      }
    } catch (error: any) {
      toast.error("Upload failed: " + error.message);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleEditInit = (image: GalleryImage) => {
    setEditingImage(image);
    setEditForm({
      title: image.title,
      description: image.description || "",
      label: image.label || "public",
    });
  };

  const handleUpdateImageDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    try {
      const allSaved = localStorage.getItem("admin_gallery_images");
      let currentList: GalleryImage[] = [];
      if (allSaved) {
        try {
          const parsed = JSON.parse(allSaved);
          if (Array.isArray(parsed)) {
            currentList = parsed;
          }
        } catch (err) {
          console.error(err);
        }
      }

      const updated = currentList.map(img => 
        img.id === editingImage.id 
          ? { 
              ...img, 
              title: editForm.title, 
              description: editForm.description || null, 
              label: editForm.label === 'private' ? 'private' : null, 
              updated_at: new Date().toISOString() 
            } 
          : img
      );

      localStorage.setItem("admin_gallery_images", JSON.stringify(updated));
      toast.success("Image details updated successfully!");
      setEditingImage(null);
      setGalleryImages(updated.filter(img => img && img.country === selectedCountry));
    } catch (error: any) {
      toast.error("Update failed: " + error.message);
    }
  };

  const handleDeleteImage = (image: GalleryImage) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const allSaved = localStorage.getItem("admin_gallery_images");
      let currentList: GalleryImage[] = [];
      if (allSaved) {
        try {
          const parsed = JSON.parse(allSaved);
          if (Array.isArray(parsed)) {
            currentList = parsed;
          }
        } catch (err) {
          console.error(err);
        }
      }

      const updated = currentList.filter(img => img.id !== image.id);
      localStorage.setItem("admin_gallery_images", JSON.stringify(updated));

      toast.success("Image removed from gallery!");
      setGalleryImages(updated.filter(img => img && img.country === selectedCountry));
    } catch (error: any) {
      toast.error("Delete failed: " + error.message);
    }
  };

  const toggleVisibility = (image: GalleryImage) => {
    try {
      const newLabel = image.label === 'private' ? null : 'private';
      const allSaved = localStorage.getItem("admin_gallery_images");
      let currentList: GalleryImage[] = [];
      if (allSaved) {
        try {
          const parsed = JSON.parse(allSaved);
          if (Array.isArray(parsed)) {
            currentList = parsed;
          }
        } catch (err) {
          console.error(err);
        }
      }

      const updated = currentList.map(img => 
        img.id === image.id ? { ...img, label: newLabel, updated_at: new Date().toISOString() } : img
      );

      localStorage.setItem("admin_gallery_images", JSON.stringify(updated));
      toast.success(`Image is now ${newLabel === 'private' ? 'private' : 'public'}`);
      setGalleryImages(updated.filter(img => img && img.country === selectedCountry));
    } catch (error: any) {
      toast.error("Failed to toggle visibility: " + error.message);
    }
  };

  const groupedByFolder = useMemo(() => {
    const groups: Record<string, GalleryImage[]> = {};
    if (!Array.isArray(galleryImages)) return groups;
    
    for (const img of galleryImages) {
      if (!img) continue;
      const folder = img.image_path?.includes("/") ? img.image_path.split("/")[0] : "Uncategorized";
      if (!groups[folder]) groups[folder] = [];
      groups[folder].push(img);
    }
    return groups;
  }, [galleryImages]);

  return (
    <div className="space-y-6 text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Media Gallery</h1>
          <p className="text-slate-500 text-xs mt-1">Manage public image collections, upload categories, and private visibilities</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form Card */}
        <div className="lg:col-span-1">
          <Card className="bg-white border-slate-200 shadow-sm sticky top-24">
            <CardHeader>
              <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Upload to Gallery</CardTitle>
              <CardDescription className="text-slate-500 text-xs">Add new images or folders to the database</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFileUpload} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Destination Country</Label>
                  <Select 
                    value={uploadForm.country} 
                    onValueChange={(val) => setUploadForm({ ...uploadForm, country: val })}
                  >
                    <SelectTrigger className="bg-slate-50/40 border-slate-200 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="singapore">Singapore</SelectItem>
                      <SelectItem value="myanmar">Myanmar</SelectItem>
                      <SelectItem value="bangladesh">Bangladesh</SelectItem>
                      <SelectItem value="pakistan">Pakistan</SelectItem>
                      <SelectItem value="srilanka">Sri Lanka</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Folder Name (Optional)</Label>
                  <Input 
                    value={uploadForm.folder}
                    onChange={(e) => setUploadForm({ ...uploadForm, folder: e.target.value })}
                    placeholder="e.g. CFS Warehouse"
                    className="bg-slate-50/40 border-slate-200 text-xs h-9"
                  />
                  <p className="text-[10px] text-slate-400">Required if picking multiple files</p>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Title</Label>
                  <Input 
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                    placeholder="Image Title"
                    className="bg-slate-50/40 border-slate-200 text-xs h-9 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Description</Label>
                  <Textarea 
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    placeholder="Image description text..."
                    rows={3}
                    className="bg-slate-50/40 border-slate-200 text-xs p-2.5"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Visibility Mode</Label>
                  <Select 
                    value={uploadForm.label} 
                    onValueChange={(val) => setUploadForm({ ...uploadForm, label: val })}
                  >
                    <SelectTrigger className="bg-slate-50/40 border-slate-200 text-xs">
                      <SelectValue placeholder="Public (Visible)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public (Visible)</SelectItem>
                      <SelectItem value="private">Private (Hidden)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Select Files</Label>
                  <Input 
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setUploadForm({ ...uploadForm, files: Array.from(e.target.files || []) })}
                    className="bg-slate-50/40 border-slate-200 text-xs"
                    required
                  />
                  {uploadForm.files.length > 0 && (
                    <p className="text-[10px] text-red-600 font-semibold">{uploadForm.files.length} file(s) selected</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  disabled={uploadLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2.5 shadow-sm"
                >
                  {uploadLoading ? "Uploading..." : "Upload Media"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Browser Grid */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
              <div>
                <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Media Browser</CardTitle>
                <CardDescription className="text-slate-500 text-xs">Filter by country and preview assets</CardDescription>
              </div>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="bg-slate-50 border-slate-200 text-xs w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="singapore">🇸🇬 Singapore</SelectItem>
                  <SelectItem value="myanmar">🇲🇲 Myanmar</SelectItem>
                  <SelectItem value="bangladesh">🇧🇩 Bangladesh</SelectItem>
                  <SelectItem value="pakistan">🇵🇰 Pakistan</SelectItem>
                  <SelectItem value="srilanka">🇱🇰 Sri Lanka</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="pt-6">
              {loadingGallery ? (
                <div className="py-12 text-center text-slate-400 text-xs">Loading media assets...</div>
              ) : Object.keys(groupedByFolder).length === 0 ? (
                <div className="py-12 text-center border border-dashed rounded-xl flex flex-col items-center justify-center text-slate-400">
                  <ImageIcon className="w-10 h-10 mb-2 text-slate-350" />
                  <span className="text-xs">No media assets found for this country</span>
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.entries(groupedByFolder).map(([folderName, imgs]) => (
                    <div key={folderName} className="space-y-3">
                      <div className="flex items-center gap-2 border-b pb-1.5 border-slate-100">
                        <FolderOpen className="w-4 h-4 text-red-600" />
                        <h4 className="text-xs font-semibold tracking-wide uppercase text-slate-700 font-mono">{folderName}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">({imgs.length} items)</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {imgs.map((img) => (
                          <div key={img.id} className="group relative rounded-xl border bg-slate-50/50 overflow-hidden shadow-sm flex flex-col">
                            <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                              <img 
                                src={img.image_url} 
                                alt={img.title} 
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                                }}
                              />
                              {img.label === 'private' && (
                                <div className="absolute top-2 left-2 bg-rose-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-rose-500">
                                  <EyeOff className="w-3 h-3" /> Private
                                </div>
                              )}
                            </div>

                            <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                              <div>
                                <h5 className="text-xs font-semibold text-slate-800 truncate">{img.title}</h5>
                                {img.description && <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">{img.description}</p>}
                              </div>

                              <div className="flex justify-end gap-1.5 pt-2 border-t mt-auto">
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  onClick={() => toggleVisibility(img)}
                                  className={`h-7 w-7 rounded-lg ${img.label === 'private' ? 'text-emerald-600 hover:bg-emerald-50' : 'text-slate-500 hover:bg-slate-50'}`}
                                  title={img.label === 'private' ? "Make Public" : "Make Private"}
                                >
                                  {img.label === 'private' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                                </Button>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  onClick={() => handleEditInit(img)}
                                  className="h-7 w-7 rounded-lg text-red-600 hover:bg-red-50"
                                  title="Edit details"
                                >
                                  <Plus className="w-3.5 h-3.5 rotate-45" />
                                </Button>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  onClick={() => handleDeleteImage(img)}
                                  className="h-7 w-7 rounded-lg text-rose-600 hover:bg-rose-50"
                                  title="Delete image"
                                >
                                  <Trash className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Details Dialog Overlay */}
      {editingImage && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white border border-slate-200 shadow-xl">
            <CardHeader className="border-b pb-3.5">
              <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Edit Image Details</CardTitle>
            </CardHeader>
            <form onSubmit={handleUpdateImageDetails}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Image Title</Label>
                  <Input 
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="bg-slate-50/40 border-slate-200 text-xs h-9 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Description</Label>
                  <Textarea 
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="bg-slate-50/40 border-slate-200 text-xs p-2.5"
                    rows={4}
                  />
                </div>
              </CardContent>
              <div className="flex justify-end gap-2 p-4 border-t bg-slate-50 rounded-b-lg">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditingImage(null)}
                  className="text-xs h-8"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold h-8"
                >
                  Update Details
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
