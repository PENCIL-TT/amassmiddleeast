import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
}

const AdminServicesPage = () => {
  const [data, setData] = useState({
    heroTitle: "Our Logistics Services",
    heroSubtitle: "Comprehensive end-to-end global logistics solutions tailored to your business needs",
    heroBgImage: "/lovable-uploads/gp.jpg",
    services: [
      {
        id: 1,
        title: "LCL",
        description: "Amass Freight, Dubai is one of the leading logistics providers in the region providing Less-Than Container load (LCL) for the ultimate convenience of our customers to help in transporting their products to any location required.",
        image: "/lcl1.JPG",
        slug: "lcl"
      },
      {
        id: 2,
        title: "CFS",
        description: "Take full advantage of our state-of-the-art CFS, which is equipped with the latest equipment, technology and staffed by experienced professionals at every level. Our warehouses are designed to handle your cargo efficiently across all regions.",
        image: "/cfl4.jpeg",
        slug: "cfs"
      }
    ] as ServiceCard[]
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_services_page");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("admin_services_page", JSON.stringify(data));
    toast.success("Services page details saved successfully!");
  };

  const handleReset = () => {
    if (confirm("Reset Services Page content to defaults?")) {
      const defaults = {
        heroTitle: "Our Logistics Services",
        heroSubtitle: "Comprehensive end-to-end global logistics solutions tailored to your business needs",
        heroBgImage: "/lovable-uploads/gp.jpg",
        services: [
          {
            id: 1,
            title: "LCL",
            description: "Amass Freight, Dubai is one of the leading logistics providers in the region providing Less-Than Container load (LCL) for the ultimate convenience of our customers to help in transporting their products to any location required.",
            image: "/lcl1.JPG",
            slug: "lcl"
          },
          {
            id: 2,
            title: "CFS",
            description: "Take full advantage of our state-of-the-art CFS, which is equipped with the latest equipment, technology and staffed by experienced professionals at every level. Our warehouses are designed to handle your cargo efficiently across all regions.",
            image: "/cfl4.jpeg",
            slug: "cfs"
          }
        ]
      };
      setData(defaults);
      localStorage.setItem("admin_services_page", JSON.stringify(defaults));
      toast.success("Reset to default services page values.");
    }
  };

  const handleServiceChange = (index: number, field: "title" | "description", val: string) => {
    setData(prev => {
      const updated = [...prev.services];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, services: updated };
    });
  };

  const handleHeroBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setData(prev => ({ ...prev, heroBgImage: reader.result as string }));
      toast.success("Hero background image uploaded. Remember to save changes!");
    };
    reader.onerror = () => toast.error("Failed to read image file.");
    reader.readAsDataURL(file);
  };

  const handleServiceImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
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
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Services Page</h1>
          <p className="text-slate-500 text-xs mt-1">Configure layout heading, background cover, and individual card details for the main services list page</p>
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
            <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Hero Configuration</CardTitle>
            <CardDescription className="text-slate-500 text-xs">Configure the title text and background image of the page hero banner</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Hero Title</Label>
              <Input 
                id="title" 
                value={data.heroTitle}
                onChange={(e) => setData({ ...data, heroTitle: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 h-10 px-3 text-sm font-semibold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Hero Subtitle</Label>
              <Textarea 
                id="subtitle" 
                rows={2}
                value={data.heroSubtitle}
                onChange={(e) => setData({ ...data, heroSubtitle: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 p-3 text-sm"
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Hero Background Cover Image</Label>
              <div className="aspect-[21/9] w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-slate-55 relative group flex items-center justify-center shadow-inner">
                <img 
                  src={data.heroBgImage} 
                  alt="Hero Background"
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
              <Label htmlFor="hero-bg-picker" className="flex w-fit items-center gap-2 cursor-pointer border border-slate-200 hover:bg-slate-50 transition-colors justify-center text-red-600 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-lg">
                <Upload className="w-4 h-4 text-red-600" />
                Upload Hero Cover
                <input 
                  id="hero-bg-picker" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleHeroBgUpload} 
                />
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.services.map((service, i) => (
            <Card key={service.id} className="bg-white border-slate-200 shadow-sm flex flex-col justify-between">
              <CardHeader className="border-b pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Service Card {i + 1} ({service.title})</CardTitle>
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full font-mono border border-red-100 uppercase">
                    ID: {service.slug}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col justify-between pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Title</Label>
                    <Input 
                      value={service.title}
                      onChange={(e) => handleServiceChange(i, "title", e.target.value)}
                      className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 h-10 px-3 text-sm font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Description</Label>
                    <Textarea 
                      rows={4}
                      value={service.description}
                      onChange={(e) => handleServiceChange(i, "description", e.target.value)}
                      className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 p-3 text-sm leading-relaxed"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t mt-4">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Showcase Image</Label>
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
                  <Label htmlFor={`service-image-picker-${service.id}`} className="flex items-center gap-2 cursor-pointer border border-slate-200 hover:bg-slate-50 transition-colors justify-center text-red-600 text-xs font-semibold uppercase tracking-wider py-3 rounded-lg">
                    <Upload className="w-4 h-4 text-red-600" />
                    Change Image
                    <input 
                      id={`service-image-picker-${service.id}`} 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleServiceImageUpload(i, e)} 
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

export default AdminServicesPage;
