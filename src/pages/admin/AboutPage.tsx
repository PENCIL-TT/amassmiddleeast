import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, Trash, Image as ImageIcon } from "lucide-react";

const AdminAboutPage = () => {
  const [data, setData] = useState({
    heroTitle: "About Amass",
    heroSubtitle: "Neutral LCL Consolidation Service Provider",
    whoWeAreTitle: "Who We Are",
    whoWeAreP1: "Amass Middle East Shipping Services LLC, a Neutral LCL Consolidation Service Provider to serve the UAE market. Our Office is in Oudh Metha-Dubai and the CFS is in Jebel Ali.",
    whoWeAreP2: "As a part of an expansion of our business all over the world, we have opened our branches in Saudi Arabia with 3 branches in Dammam, Riyadh, and Jeddah; our headquarters is in Dammam, and we have our own bonded warehouse facilities in Jeddah and Dammam.",
    whoWeAreP3: "Our growth has been phenomenal in the last 9 years, and we are now one of the leading consolidators in the region. The strength of any organization is its individuals, and we are no different. We have approximately 40 staff members catering to the business needs of the market.",
    lclServiceDesc: "Amass Freight, Dubai is one of the leading logistics providers in the region providing Less-Than Container load (LCL) for the ultimate convenience of our customers to help in transporting their products to any location required.",
    cfsServiceDesc: "Take full advantage of our state-of-the-art CFS, which is equipped with the latest equipment, technology and staffed by experienced professionals at every level. Our warehouses are designed to handle your cargo efficiently across all regions.",
    images: ["/office1.jpg", "/office2.jpg", "/office3.jpg"] as string[]
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_about_us");
    if (saved) {
      const parsed = JSON.parse(saved);
      setData(prev => ({
        ...prev,
        heroTitle: parsed.heroTitle || prev.heroTitle,
        heroSubtitle: parsed.heroSubtitle || prev.heroSubtitle,
        whoWeAreTitle: parsed.whoWeAreTitle || prev.whoWeAreTitle,
        whoWeAreP1: parsed.whoWeAreP1 || prev.whoWeAreP1,
        whoWeAreP2: parsed.whoWeAreP2 || prev.whoWeAreP2,
        whoWeAreP3: parsed.whoWeAreP3 || prev.whoWeAreP3,
        lclServiceDesc: parsed.lclServiceDesc || prev.lclServiceDesc,
        cfsServiceDesc: parsed.cfsServiceDesc || prev.cfsServiceDesc,
        images: parsed.images || prev.images
      }));
    }
  }, []);

  const handleSave = () => {
    const saved = localStorage.getItem("admin_about_us");
    const existing = saved ? JSON.parse(saved) : {};
    
    const updated = {
      ...existing,
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      whoWeAreTitle: data.whoWeAreTitle,
      whoWeAreP1: data.whoWeAreP1,
      whoWeAreP2: data.whoWeAreP2,
      whoWeAreP3: data.whoWeAreP3,
      lclServiceDesc: data.lclServiceDesc,
      cfsServiceDesc: data.cfsServiceDesc,
      images: data.images
    };

    localStorage.setItem("admin_about_us", JSON.stringify(updated));
    toast.success("About Us page content updated successfully!");
  };

  const handleReset = () => {
    if (confirm("Reset to default about page content?")) {
      const defaults = {
        heroTitle: "About Amass",
        heroSubtitle: "Neutral LCL Consolidation Service Provider",
        whoWeAreTitle: "Who We Are",
        whoWeAreP1: "Amass Middle East Shipping Services LLC, a Neutral LCL Consolidation Service Provider to serve the UAE market. Our Office is in Oudh Metha-Dubai and the CFS is in Jebel Ali.",
        whoWeAreP2: "As a part of an expansion of our business all over the world, we have opened our branches in Saudi Arabia with 3 branches in Dammam, Riyadh, and Jeddah; our headquarters is in Dammam, and we have our own bonded warehouse facilities in Jeddah and Dammam.",
        whoWeAreP3: "Our growth has been phenomenal in the last 9 years, and we are now one of the leading consolidators in the region. The strength of any organization is its individuals, and we are no different. We have approximately 40 staff members catering to the business needs of the market.",
        lclServiceDesc: "Amass Freight, Dubai is one of the leading logistics providers in the region providing Less-Than Container load (LCL) for the ultimate convenience of our customers to help in transporting their products to any location required.",
        cfsServiceDesc: "Take full advantage of our state-of-the-art CFS, which is equipped with the latest equipment, technology and staffed by experienced professionals at every level. Our warehouses are designed to handle your cargo efficiently across all regions.",
        images: ["/office1.jpg", "/office2.jpg", "/office3.jpg"]
      };

      setData(prev => ({ ...prev, ...defaults }));
      
      const saved = localStorage.getItem("admin_about_us");
      const existing = saved ? JSON.parse(saved) : {};
      localStorage.setItem("admin_about_us", JSON.stringify({ ...existing, ...defaults }));
      toast.success("Reset to default configurations.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    const promises = fileList.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = err => reject(err);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(base64Images => {
      setData(prev => ({
        ...prev,
        images: [...prev.images, ...base64Images]
      }));
      toast.success(`${base64Images.length} image(s) loaded into slideshow queue. Remember to save changes!`);
    }).catch(err => {
      toast.error("Failed to read image files.");
      console.error(err);
    });
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
    toast.success("Image removed from slides queue.");
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">About Us Page</h1>
          <p className="text-slate-500 text-xs mt-1">Configure layout text blocks, descriptions, and sliders for the main /about-us view</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleReset} 
            className="border-slate-250 hover:bg-slate-50 hover:text-slate-900 text-slate-700 text-xs font-semibold px-4 h-9"
          >
            Reset Defaults
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 h-9 shadow-sm"
          >
            Save Page Details
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Slideshow Showcase Images Card */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Slideshow Gallery Showcase</CardTitle>
            <CardDescription className="text-slate-500 text-xs">Configure the fading images slider rendered on the About Page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {data.images.map((src, i) => (
                <div key={i} className="relative group aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-inner">
                  <img 
                    src={src} 
                    alt={`Slideshow ${i + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center backdrop-blur-[2px]">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveImage(i)}
                      className="flex items-center gap-1.5 text-xs font-medium px-3 h-8 shadow-md"
                    >
                      <Trash className="w-3.5 h-3.5" />
                      Delete
                    </Button>
                  </div>
                  <span className="absolute bottom-2 left-2 bg-slate-900/90 text-white text-[10px] px-2 py-0.5 rounded-full font-mono border border-slate-800/80">
                    Slide {i + 1}
                  </span>
                </div>
              ))}
              
              {data.images.length === 0 && (
                <div className="col-span-full border-2 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center text-slate-400">
                  <ImageIcon className="w-10 h-10 mb-3 text-slate-350" />
                  <span className="text-xs">No slideshow images. Upload some files below!</span>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div className="space-y-2">
              <Label htmlFor="image-picker" className="flex flex-col items-center gap-2 cursor-pointer border border-dashed border-slate-200 rounded-xl p-6 hover:bg-slate-50/50 transition-all duration-200 justify-center text-red-600 font-medium hover:border-red-500/40">
                <Upload className="w-6 h-6 mb-1 text-red-600" />
                <span className="text-xs font-semibold uppercase tracking-wider">Upload Slide Images</span>
                <span className="text-[11px] text-slate-500 font-normal">Supports multiple images selection. Saved locally as Base64.</span>
                <input 
                  id="image-picker" 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  className="hidden" 
                  onChange={handleImageUpload} 
                />
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Hero Section Card */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Hero Header</CardTitle>
            <CardDescription className="text-slate-500 text-xs">Customize the banner titles at the top of the page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heroTitle" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Hero Title</Label>
              <Input 
                id="heroTitle" 
                value={data.heroTitle}
                onChange={(e) => setData({ ...data, heroTitle: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 h-10 px-3 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroSubtitle" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Hero Subtitle</Label>
              <Input 
                id="heroSubtitle" 
                value={data.heroSubtitle}
                onChange={(e) => setData({ ...data, heroSubtitle: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 h-10 px-3 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Who We Are Card */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Who We Are Section</CardTitle>
            <CardDescription className="text-slate-500 text-xs">Configure the description paragraphs on the page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whoWeAreTitle" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Section Header Title</Label>
              <Input 
                id="whoWeAreTitle" 
                value={data.whoWeAreTitle}
                onChange={(e) => setData({ ...data, whoWeAreTitle: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 h-10 px-3 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whoWeAreP1" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Paragraph 1 (UAE Market Intro)</Label>
              <Textarea 
                id="whoWeAreP1" 
                rows={3}
                value={data.whoWeAreP1}
                onChange={(e) => setData({ ...data, whoWeAreP1: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 p-3 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whoWeAreP2" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Paragraph 2 (Global Expansion)</Label>
              <Textarea 
                id="whoWeAreP2" 
                rows={3}
                value={data.whoWeAreP2}
                onChange={(e) => setData({ ...data, whoWeAreP2: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 p-3 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whoWeAreP3" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Paragraph 3 (Scale & Staff)</Label>
              <Textarea 
                id="whoWeAreP3" 
                rows={3}
                value={data.whoWeAreP3}
                onChange={(e) => setData({ ...data, whoWeAreP3: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 p-3 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Services Detail Card */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Services Summaries</CardTitle>
            <CardDescription className="text-slate-500 text-xs">Modify descriptions for LCL and CFS core cargo operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lclDesc" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">LCL Service Description</Label>
              <Textarea 
                id="lclDesc" 
                rows={3}
                value={data.lclServiceDesc}
                onChange={(e) => setData({ ...data, lclServiceDesc: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 p-3 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cfsDesc" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">CFS Service Description</Label>
              <Textarea 
                id="cfsDesc" 
                rows={3}
                value={data.cfsServiceDesc}
                onChange={(e) => setData({ ...data, cfsServiceDesc: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 p-3 text-sm"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAboutPage;
