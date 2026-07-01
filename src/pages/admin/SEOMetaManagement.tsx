import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import defaultMeta from "@/data/meta";

interface MetaInfo {
  title: string;
  description: string;
  keywords: string;
}

const SEOMetaManagement = () => {
  const [routes, setRoutes] = useState<string[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string>("/");
  const [seoData, setSeoData] = useState<Record<string, MetaInfo>>({});
  const [currentMeta, setCurrentMeta] = useState<MetaInfo>({
    title: "",
    description: "",
    keywords: ""
  });

  // Load SEO data from localStorage or default metadata
  useEffect(() => {
    const savedMeta = localStorage.getItem("admin_seo_meta");
    let initialMeta: Record<string, MetaInfo> = {};

    if (savedMeta) {
      initialMeta = JSON.parse(savedMeta);
    }

    // Merge defaults with saved values to ensure all routes exist
    const mergedMeta = { ...defaultMeta };
    Object.keys(initialMeta).forEach((key) => {
      mergedMeta[key] = initialMeta[key];
    });

    setSeoData(mergedMeta);
    
    // Extract list of public routes (filtering out admin/internal paths)
    const publicRoutes = Object.keys(mergedMeta).filter(
      (route) => 
        !route.startsWith("/admin") && 
        route !== "/blog-editor" && 
        route !== "/blog-admin" && 
        route !== "/not-found"
    );
    
    setRoutes(publicRoutes);
  }, []);

  // Update form inputs when selected route changes
  useEffect(() => {
    if (seoData[selectedRoute]) {
      setCurrentMeta(seoData[selectedRoute]);
    } else {
      setCurrentMeta({
        title: "",
        description: "",
        keywords: ""
      });
    }
  }, [selectedRoute, seoData]);

  const handleSave = () => {
    const updatedSeoData = {
      ...seoData,
      [selectedRoute]: currentMeta
    };
    
    setSeoData(updatedSeoData);
    localStorage.setItem("admin_seo_meta", JSON.stringify(updatedSeoData));
    toast.success(`SEO Meta tags for "${selectedRoute}" updated successfully!`);
  };

  const handleResetToDefault = () => {
    if (defaultMeta[selectedRoute]) {
      setCurrentMeta(defaultMeta[selectedRoute]);
      toast.info("Reset to page defaults. Don't forget to save changes.");
    }
  };

  const getRouteLabel = (route: string) => {
    if (route === "/") return "Home Page (/)";
    return route
      .split("/")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" > ");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">SEO Metadata Management</h1>
        <p className="text-muted-foreground">Configure search engine titles, descriptions, and keywords for each page</p>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Select Page to Manage</CardTitle>
          <CardDescription>Choose a page route to view and configure its SEO tags</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="route-selector">Select Page Route</Label>
            <Select value={selectedRoute} onValueChange={setSelectedRoute}>
              <SelectTrigger id="route-selector" className="h-10 bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30">
                <SelectValue placeholder="Select route" />
              </SelectTrigger>
              <SelectContent>
                {routes.map((route) => (
                  <SelectItem key={route} value={route}>
                    {getRouteLabel(route)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>SEO Tags for {selectedRoute}</CardTitle>
          <CardDescription>Update page metadata tags to optimize search engine ranking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="seo-title" className="flex justify-between">
              <span>Page Title</span>
              <span className={`text-xs font-mono ${currentMeta.title.length > 60 ? "text-amber-600" : "text-slate-400"}`}>
                {currentMeta.title.length} / 60 chars (recommended max)
              </span>
            </Label>
            <Input
              id="seo-title"
              value={currentMeta.title}
              onChange={(e) => setCurrentMeta({ ...currentMeta, title: e.target.value })}
              placeholder="e.g. Services – Amass Middle East"
              className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 h-10 px-3 text-sm font-semibold"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo-description" className="flex justify-between">
              <span>Meta Description</span>
              <span className={`text-xs font-mono ${currentMeta.description.length > 160 ? "text-amber-600" : "text-slate-400"}`}>
                {currentMeta.description.length} / 160 chars (recommended max)
              </span>
            </Label>
            <Textarea
              id="seo-description"
              value={currentMeta.description}
              onChange={(e) => setCurrentMeta({ ...currentMeta, description: e.target.value })}
              placeholder="A short summary of the page content that appears in search results."
              rows={4}
              className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 p-3 text-sm leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo-keywords">Meta Keywords (Comma Separated)</Label>
            <Textarea
              id="seo-keywords"
              value={currentMeta.keywords}
              onChange={(e) => setCurrentMeta({ ...currentMeta, keywords: e.target.value })}
              placeholder="e.g. amass services, consolidation, shipping, logistics"
              rows={3}
              className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 p-3 text-sm"
            />
          </div>

          <div className="flex justify-between pt-2 border-t border-slate-200/40">
            <Button 
              variant="outline" 
              onClick={handleResetToDefault}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Reset to Defaults
            </Button>
            <Button 
              onClick={handleSave} 
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 h-9 shadow-sm"
            >
              Save SEO Tags
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOMetaManagement;
