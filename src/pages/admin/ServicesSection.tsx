import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, Image as ImageIcon } from "lucide-react";

const AdminServicesSection = () => {
  const [data, setData] = useState({
    titleText: "Our Services",
    subtitleText: "Comprehensive logistics solutions to move your world efficiently and safely.",
    services: [
      {
        id: 1,
        title: "LCL",
        slug: "lcl",
        description: "Amass Freight, Dubai is one of the leading logistics providers in the region providing Less-Than Container load (LCL) for the ultimate convenience of our customers to help in transporting their products to any location required.",
        image: "/lcl1.JPG"
      },
      {
        id: 2,
        title: "CFS",
        slug: "cfs",
        description: "Take full advantage of our state-of-the-art CFS, which is equipped with the latest equipment, technology and staffed by experienced professionals at every level. Our warehouses are designed to handle your cargo efficiently across all regions.",
        image: "/cfl4.jpeg"
      }
    ]
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_services_section");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("admin_services_section", JSON.stringify(data));
    toast.success("Home Page Services section content saved successfully!");
  };

  const handleReset = () => {
    if (confirm("Reset Services section to defaults?")) {
      const defaults = {
        titleText: "Our Services",
        subtitleText: "Comprehensive logistics solutions to move your world efficiently and safely.",
        services: [
          {
            id: 1,
            title: "LCL",
            slug: "lcl",
            description: "Amass Freight, Dubai is one of the leading logistics providers in the region providing Less-Than Container load (LCL) for the ultimate convenience of our customers to help in transporting their products to any location required.",
            image: "/lcl1.JPG"
          },
          {
            id: 2,
            title: "CFS",
            slug: "cfs",
            description: "Take full advantage of our state-of-the-art CFS, which is equipped with the latest equipment, technology and staffed by experienced professionals at every level. Our warehouses are designed to handle your cargo efficiently across all regions.",
            image: "/cfl4.jpeg"
          }
        ]
      };
      setData(defaults);
      localStorage.setItem("admin_services_section", JSON.stringify(defaults));
      toast.success("Reset to default services.");
    }
  };

  const handleServiceChange = (index: number, field: "title" | "description", val: string) => {
    setData(prev => {
      const updated = [...prev.services];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, services: updated };
    });
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setData(prev => {
        const updated = [...prev.services];
        updated[index] = { ...updated[index], image: reader.result as string };
        return { ...prev, services: updated };
      });
      toast.success("Service card image uploaded. Remember to save changes!");
    };
    reader.onerror = () => toast.error("Failed to read image file.");
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Home Services Section</h1>
          <p className="text-slate-500 text-xs mt-1">Configure layout heading, descriptive subtitles, and individual card details for the services overview</p>
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
            Save Services Details
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Header Configuration */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Section Header</CardTitle>
            <CardDescription className="text-slate-500 text-xs">Configure the title text and secondary explanation line</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[10px] font-bold tracking-widest text-slate-505 uppercase font-mono">Section Title</Label>
              <Input 
                id="title" 
                value={data.titleText}
                onChange={(e) => setData({ ...data, titleText: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 h-10 px-3 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle" className="text-[10px] font-bold tracking-widest text-slate-505 uppercase font-mono">Section Subtitle</Label>
              <Input 
                id="subtitle" 
                value={data.subtitleText}
                onChange={(e) => setData({ ...data, subtitleText: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 h-10 px-3 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.services.map((service, i) => (
            <Card key={service.id} className="bg-white border-slate-200 shadow-sm flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Service Card {i + 1} ({service.title})</CardTitle>
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full font-mono border border-red-100">
                    ID: {service.slug?.toUpperCase() || ""}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-505 uppercase font-mono">Title</Label>
                    <Input 
                      value={service.title}
                      onChange={(e) => handleServiceChange(i, "title", e.target.value)}
                      className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 h-10 px-3 text-sm font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-505 uppercase font-mono">Description</Label>
                    <Textarea 
                      rows={4}
                      value={service.description}
                      onChange={(e) => handleServiceChange(i, "description", e.target.value)}
                      className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 p-3 text-sm leading-relaxed"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t mt-4">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-505 uppercase font-mono">Showcase Image</Label>
                  <div className="aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-50 relative group flex items-center justify-center shadow-inner">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <Label htmlFor={`image-picker-${service.id}`} className="flex items-center gap-2 cursor-pointer border border-slate-200 hover:bg-slate-50 transition-colors justify-center text-red-600 text-xs font-semibold uppercase tracking-wider py-3 rounded-lg">
                    <Upload className="w-4 h-4 text-red-600" />
                    Change Image
                    <input 
                      id={`image-picker-${service.id}`} 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageUpload(i, e)} 
                    />
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminServicesSection;
