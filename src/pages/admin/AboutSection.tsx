import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, Image as ImageIcon, FileVideo } from "lucide-react";

const AdminAboutSection = () => {
  const [data, setData] = useState({
    aboutSectionTitle: "Who we are",
    aboutSectionP1: "Amass Middle East Shipping Services LLC, a Neutral LCL Consolidation Service Provider to serve the UAE market. Our office is in Oudh Mehta–Dubai and the CFS is in Jebel Ali.",
    aboutSectionP2: "We have expanded globally with branches in Saudi Arabia (Dammam, Riyadh, Jeddah) and bonded warehouses in Jeddah and Dammam. Our team of 40+ professionals brings decades of logistics expertise.",
    aboutSectionP3: "Amass China founded the CWN network with dedicated members worldwide, enabling our phenomenal growth over the last 9 years to become a leading regional consolidator.",
    aboutSectionVideo: "/hero6.mp4",
    aboutSectionPoster: "/hero6-poster.jpg"
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_about_us");
    if (saved) {
      const parsed = JSON.parse(saved);
      setData(prev => ({
        ...prev,
        aboutSectionTitle: parsed.aboutSectionTitle || prev.aboutSectionTitle,
        aboutSectionP1: parsed.aboutSectionP1 || prev.aboutSectionP1,
        aboutSectionP2: parsed.aboutSectionP2 || prev.aboutSectionP2,
        aboutSectionP3: parsed.aboutSectionP3 || prev.aboutSectionP3,
        aboutSectionVideo: parsed.aboutSectionVideo || prev.aboutSectionVideo,
        aboutSectionPoster: parsed.aboutSectionPoster || prev.aboutSectionPoster,
      }));
    }
  }, []);

  const handleSave = () => {
    const saved = localStorage.getItem("admin_about_us");
    const existing = saved ? JSON.parse(saved) : {};
    
    const updated = {
      ...existing,
      aboutSectionTitle: data.aboutSectionTitle,
      aboutSectionP1: data.aboutSectionP1,
      aboutSectionP2: data.aboutSectionP2,
      aboutSectionP3: data.aboutSectionP3,
      aboutSectionVideo: data.aboutSectionVideo,
      aboutSectionPoster: data.aboutSectionPoster
    };

    localStorage.setItem("admin_about_us", JSON.stringify(updated));
    toast.success("Home Page About section content updated successfully!");
  };

  const handleReset = () => {
    if (confirm("Reset Home Page About section content to defaults?")) {
      const defaults = {
        aboutSectionTitle: "Who we are",
        aboutSectionP1: "Amass Middle East Shipping Services LLC, a Neutral LCL Consolidation Service Provider to serve the UAE market. Our office is in Oudh Mehta–Dubai and the CFS is in Jebel Ali.",
        aboutSectionP2: "We have expanded globally with branches in Saudi Arabia (Dammam, Riyadh, Jeddah) and bonded warehouses in Jeddah and Dammam. Our team of 40+ professionals brings decades of logistics expertise.",
        aboutSectionP3: "Amass China founded the CWN network with dedicated members worldwide, enabling our phenomenal growth over the last 9 years to become a leading regional consolidator.",
        aboutSectionVideo: "/hero6.mp4",
        aboutSectionPoster: "/hero6-poster.jpg"
      };

      setData(prev => ({ ...prev, ...defaults }));

      const saved = localStorage.getItem("admin_about_us");
      const existing = saved ? JSON.parse(saved) : {};
      localStorage.setItem("admin_about_us", JSON.stringify({ ...existing, ...defaults }));
      toast.success("Reset to default configurations.");
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setData(prev => ({
        ...prev,
        aboutSectionVideo: reader.result as string
      }));
      toast.success("Video file loaded into preview. Save changes to update website!");
    };
    reader.onerror = () => toast.error("Failed to read video file.");
    reader.readAsDataURL(file);
  };

  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setData(prev => ({
        ...prev,
        aboutSectionPoster: reader.result as string
      }));
      toast.success("Poster image loaded into preview. Save changes to update website!");
    };
    reader.onerror = () => toast.error("Failed to read poster file.");
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Home About Section</h1>
          <p className="text-slate-500 text-xs mt-1">Configure layout text blocks, showcase videos, and cover posters for the main landing page</p>
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
            Save Section Details
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Who We Are Text Blocks</CardTitle>
            <CardDescription className="text-slate-500 text-xs">Customize title headers and description paragraphs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Section Header Title</Label>
              <Input 
                id="title" 
                value={data.aboutSectionTitle}
                onChange={(e) => setData({ ...data, aboutSectionTitle: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 h-10 px-3 text-sm"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="p1" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Paragraph 1 (Primary Info)</Label>
              <Textarea 
                id="p1" 
                rows={3}
                value={data.aboutSectionP1}
                onChange={(e) => setData({ ...data, aboutSectionP1: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 p-3 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="p2" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Paragraph 2 (Global Expansion)</Label>
              <Textarea 
                id="p2" 
                rows={3}
                value={data.aboutSectionP2}
                onChange={(e) => setData({ ...data, aboutSectionP2: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 p-3 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="p3" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Paragraph 3 (Phenomenal Growth)</Label>
              <Textarea 
                id="p3" 
                rows={3}
                value={data.aboutSectionP3}
                onChange={(e) => setData({ ...data, aboutSectionP3: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 p-3 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Video & Media Showcase Card */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Showcase Video & cover Poster</CardTitle>
            <CardDescription className="text-slate-500 text-xs">Configure the autoplay video asset and its thumbnail placeholder</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Video upload */}
              <div className="space-y-4">
                <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Showcase Video Preview</Label>
                <div className="aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-50 relative group flex items-center justify-center shadow-inner">
                  {data.aboutSectionVideo ? (
                    <video 
                      src={data.aboutSectionVideo} 
                      className="w-full h-full object-cover" 
                      controls 
                      muted
                    />
                  ) : (
                    <div className="text-slate-400 text-center flex flex-col items-center">
                      <FileVideo className="w-10 h-10 mb-2 text-slate-350" />
                      <span className="text-xs">No video uploaded</span>
                    </div>
                  )}
                </div>
                <Label htmlFor="video-picker" className="flex items-center gap-2 cursor-pointer border border-slate-200 hover:bg-slate-50 transition-colors justify-center text-red-600 text-xs font-semibold uppercase tracking-wider py-3 rounded-lg">
                  <Upload className="w-4 h-4 text-red-600" />
                  Upload Video
                  <input 
                    id="video-picker" 
                    type="file" 
                    accept="video/*" 
                    className="hidden" 
                    onChange={handleVideoUpload} 
                  />
                </Label>
              </div>

              {/* Poster Image upload */}
              <div className="space-y-4">
                <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Poster Image Preview</Label>
                <div className="aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-50 relative group flex items-center justify-center shadow-inner">
                  {data.aboutSectionPoster ? (
                    <img 
                      src={data.aboutSectionPoster} 
                      alt="Video Poster"
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  ) : (
                    <div className="text-slate-400 text-center flex flex-col items-center">
                      <ImageIcon className="w-10 h-10 mb-2 text-slate-350" />
                      <span className="text-xs">No poster uploaded</span>
                    </div>
                  )}
                </div>
                <Label htmlFor="poster-picker" className="flex items-center gap-2 cursor-pointer border border-slate-200 hover:bg-slate-50 transition-colors justify-center text-red-600 text-xs font-semibold uppercase tracking-wider py-3 rounded-lg">
                  <Upload className="w-4 h-4 text-red-600" />
                  Upload Poster
                  <input 
                    id="poster-picker" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handlePosterUpload} 
                  />
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAboutSection;
