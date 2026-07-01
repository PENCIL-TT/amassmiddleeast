import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const AdminStatsSection = () => {
  const [data, setData] = useState({
    titlePrefix: "NO.1",
    titleText: "Domestic LCL Market Undisputed Leader",
    backgroundImage: "/lovable-uploads/6fa84550-fe8c-4549-a9c9-c0f071c2cd75.png",
    stats: [
      { label: "Countries & Regions", value: 200 },
      { label: "Weekly Direct Service", value: 1000 },
      { label: "Cubic Meters Export", value: 3000000 },
      { label: "Branches & Offices", value: 84 },
      { label: "Destinations", value: 20000 },
      { label: "Shipments / Year", value: 555000 }
    ]
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_stats_section");
    if (saved) {
      const parsed = JSON.parse(saved);
      setData(prev => ({
        ...prev,
        ...parsed,
        backgroundImage: parsed.backgroundImage || "/lovable-uploads/6fa84550-fe8c-4549-a9c9-c0f071c2cd75.png"
      }));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("admin_stats_section", JSON.stringify(data));
    toast.success("Home Page Stats section content saved successfully!");
  };

  const handleReset = () => {
    if (confirm("Reset Stats section to defaults?")) {
      const defaults = {
        titlePrefix: "NO.1",
        titleText: "Domestic LCL Market Undisputed Leader",
        backgroundImage: "/lovable-uploads/6fa84550-fe8c-4549-a9c9-c0f071c2cd75.png",
        stats: [
          { label: "Countries & Regions", value: 200 },
          { label: "Weekly Direct Service", value: 1000 },
          { label: "Cubic Meters Export", value: 3000000 },
          { label: "Branches & Offices", value: 84 },
          { label: "Destinations", value: 20000 },
          { label: "Shipments / Year", value: 555000 }
        ]
      };
      setData(defaults);
      localStorage.setItem("admin_stats_section", JSON.stringify(defaults));
      toast.success("Reset to default statistics.");
    }
  };

  const handleStatChange = (index: number, field: "label" | "value", val: string) => {
    setData(prev => {
      const updatedStats = [...prev.stats];
      if (field === "value") {
        updatedStats[index] = { ...updatedStats[index], value: parseInt(val) || 0 };
      } else {
        updatedStats[index] = { ...updatedStats[index], label: val };
      }
      return { ...prev, stats: updatedStats };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setData(prev => ({
        ...prev,
        backgroundImage: reader.result as string
      }));
      toast.success("New background image loaded. Remember to save changes!");
    };
    reader.onerror = () => {
      toast.error("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Home Stats Section</h1>
          <p className="text-slate-500 text-xs mt-1">Configure counters, metrics, and header labels for the landing page count-up statistics</p>
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
            Save Stats Details
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Background Image Configuration */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Background Image</CardTitle>
            <CardDescription className="text-slate-500 text-xs">Configure the background image for the homepage Stats Section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {data.backgroundImage && (
                <div className="relative aspect-video max-w-sm rounded-lg overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
                  <img
                    src={data.backgroundImage}
                    alt="Background Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="bg-image-picker" className="flex flex-col items-center gap-2 cursor-pointer border border-dashed border-slate-200 rounded-xl p-6 hover:bg-slate-50/50 transition-all duration-200 justify-center text-red-600 font-medium hover:border-red-500/40">
                  <Upload className="w-6 h-6 mb-1 text-red-600" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Upload Background Image</span>
                  <span className="text-[11px] text-slate-500 font-normal">Supports PNG, JPG. Saved locally as Base64.</span>
                  <input
                    id="bg-image-picker"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Heading Configuration */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Heading Banner</CardTitle>
            <CardDescription className="text-slate-500 text-xs">Configure subtitle prefix (e.g. NO.1) and red text values</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prefix" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Prefix Text</Label>
                <Input 
                  id="prefix" 
                  value={data.titlePrefix}
                  onChange={(e) => setData({ ...data, titlePrefix: e.target.value })}
                  className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 h-10 px-3 text-sm"
                />
              </div>
              <div className="space-y-2 md:col-span-3">
                <Label htmlFor="mainText" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Main Red Text</Label>
                <Input 
                  id="mainText" 
                  value={data.titleText}
                  onChange={(e) => setData({ ...data, titleText: e.target.value })}
                  className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 h-10 px-3 text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Individual Statistics Counters */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Statistics Metrics</CardTitle>
            <CardDescription className="text-slate-500 text-xs">Manage values and labels for the count-up boxes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.stats.map((stat, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full font-mono border border-red-100">
                    Stat Metric {i + 1}
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2 space-y-1.5">
                      <Label className="text-[9px] font-bold tracking-wider text-slate-500 uppercase font-mono">Label</Label>
                      <Input 
                        value={stat.label}
                        onChange={(e) => handleStatChange(i, "label", e.target.value)}
                        className="bg-white border-slate-200 text-slate-800 h-9 px-2.5 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-bold tracking-wider text-slate-500 uppercase font-mono">Value (Number)</Label>
                      <Input 
                        type="number"
                        value={stat.value}
                        onChange={(e) => handleStatChange(i, "value", e.target.value)}
                        className="bg-white border-slate-200 text-slate-800 h-9 px-2.5 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStatsSection;
