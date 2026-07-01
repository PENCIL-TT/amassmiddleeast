import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, Trash } from "lucide-react";

interface Feature {
  title: string;
  description: string;
}

const AdminServicesDetails = () => {
  const [activeTab, setActiveTab] = useState<"lcl" | "cfs">("lcl");

  // LCL state
  const [lclData, setLclData] = useState({
    heroTitle: "LCL Services",
    heroSubtitle: "Less Container Load shipping solutions for optimal convenience and cost efficiency",
    mainHeading: "Efficient LCL Solutions",
    paragraphs: [
      "Amass Freight, Dubai is one of the leading logistics providers in the region providing Less-Than Container load (LCL) for the ultimate convenience of our customers to help in transporting their products to any location required.",
      "LCL is an ocean freight transportation service that is often preferred by businesses that don't have enough cargo to fill an entire shipping container. LCL is the best service that can be available in such scenario instead of paying for an entire container with much of the unused space, shippers can now consolidate goods with other consignees to fully utilize the available space and thereby reduce the overall costs.",
      "It is our assurance to our customers that there is no need to worry about deadlines when using our ocean freight services, as we are committed to getting your cargo to its desired destination on time safely."
    ],
    image: "/lcl1.JPG",
    featuresTitle: "Why Choose Our LCL Services",
    featuresSubtitle: "Our LCL network offers unmatched connectivity and cadence across major shipping routes",
    features: [
      { title: "Extremely Reliable & Prompt", description: "All your LCL cargo is reliably transported through our seamlessly connected network across the globe, and you are assured that your cargo will arrive on time." },
      { title: "Flexible and Economical", description: "LCL services enable customers to ship small orders at a lower cost and in lower volumes compared to air freight." },
      { title: "Global Network", description: "Our LCL network offers unmatched connectivity and cadence across major shipping routes." }
    ] as Feature[],
    ctaTitle: "Ready to Ship with LCL?",
    ctaSubtitle: "Contact us today for competitive rates and reliable LCL shipping solutions"
  });

  // CFS state
  const [cfsData, setCfsData] = useState({
    heroTitle: "CFS Services",
    heroSubtitle: "Container Freight Station with state-of-the-art facilities and technology",
    mainHeading: "Advanced CFS Facilities",
    paragraphs: [
      "Take full advantage of our state-of-the-art CFS, which is equipped with the latest equipment, technology and staffed by experienced professionals at every level. Our warehouses are designed to handle your cargo efficiently across all regions.",
      "Our CFS features a 7000 square meter covered area and a 1000 square meter open yard to assist you with comprehensive logistics solutions."
    ],
    specifications: [
      "7,000 sqm covered warehouse area",
      "1,000 sqm open yard space",
      "Latest handling equipment",
      "Advanced security systems",
      "Climate-controlled storage"
    ],
    image: "/cfl4.jpeg",
    featuresTitle: "Our CFS Services",
    featuresSubtitle: "Comprehensive warehouse and logistics solutions tailored to your needs",
    features: [
      { title: "3PL Storage", description: "Short term and long term storing facility with secure warehouse management." },
      { title: "Value-Added Services", description: "Labelling, Repacking, Palletization and other customization services." },
      { title: "Supply Chain Management", description: "End-to-end logistics solutions and supply chain optimization." }
    ] as Feature[],
    galleryImages: [
      "/cfl1.jpeg",
      "/cfl2.jpeg",
      "/cfl3.jpeg",
      "/cfl4.jpeg",
      "/cfl5.jpeg"
    ] as string[],
    ctaTitle: "Need CFS Storage Solutions?",
    ctaSubtitle: "Contact us to learn more about our advanced warehouse facilities and services"
  });

  useEffect(() => {
    const savedLcl = localStorage.getItem("admin_service_lcl");
    if (savedLcl) {
      setLclData(JSON.parse(savedLcl));
    }
    const savedCfs = localStorage.getItem("admin_service_cfs");
    if (savedCfs) {
      setCfsData(JSON.parse(savedCfs));
    }
  }, []);

  const handleSaveLcl = () => {
    localStorage.setItem("admin_service_lcl", JSON.stringify(lclData));
    toast.success("LCL detailed service page configurations saved!");
  };

  const handleSaveCfs = () => {
    localStorage.setItem("admin_service_cfs", JSON.stringify(cfsData));
    toast.success("CFS detailed service page configurations saved!");
  };

  const handleResetLcl = () => {
    if (confirm("Reset LCL Details page to defaults?")) {
      const defaults = {
        heroTitle: "LCL Services",
        heroSubtitle: "Less Container Load shipping solutions for optimal convenience and cost efficiency",
        mainHeading: "Efficient LCL Solutions",
        paragraphs: [
          "Amass Freight, Dubai is one of the leading logistics providers in the region providing Less-Than Container load (LCL) for the ultimate convenience of our customers to help in transporting their products to any location required.",
          "LCL is an ocean freight transportation service that is often preferred by businesses that don't have enough cargo to fill an entire shipping container. LCL is the best service that can be available in such scenario instead of paying for an entire container with much of the unused space, shippers can now consolidate goods with other consignees to fully utilize the available space and thereby reduce the overall costs.",
          "It is our assurance to our customers that there is no need to worry about deadlines when using our ocean freight services, as we are committed to getting your cargo to its desired destination on time safely."
        ],
        image: "/lcl1.JPG",
        featuresTitle: "Why Choose Our LCL Services",
        featuresSubtitle: "Our LCL network offers unmatched connectivity and cadence across major shipping routes",
        features: [
          { title: "Extremely Reliable & Prompt", description: "All your LCL cargo is reliably transported through our seamlessly connected network across the globe, and you are assured that your cargo will arrive on time." },
          { title: "Flexible and Economical", description: "LCL services enable customers to ship small orders at a lower cost and in lower volumes compared to air freight." },
          { title: "Global Network", description: "Our LCL network offers unmatched connectivity and cadence across major shipping routes." }
        ],
        ctaTitle: "Ready to Ship with LCL?",
        ctaSubtitle: "Contact us today for competitive rates and reliable LCL shipping solutions"
      };
      setLclData(defaults);
      localStorage.setItem("admin_service_lcl", JSON.stringify(defaults));
      toast.success("Reset LCL parameters.");
    }
  };

  const handleResetCfs = () => {
    if (confirm("Reset CFS Details page to defaults?")) {
      const defaults = {
        heroTitle: "CFS Services",
        heroSubtitle: "Container Freight Station with state-of-the-art facilities and technology",
        mainHeading: "Advanced CFS Facilities",
        paragraphs: [
          "Take full advantage of our state-of-the-art CFS, which is equipped with the latest equipment, technology and staffed by experienced professionals at every level. Our warehouses are designed to handle your cargo efficiently across all regions.",
          "Our CFS features a 7000 square meter covered area and a 1000 square meter open yard to assist you with comprehensive logistics solutions."
        ],
        specifications: [
          "7,000 sqm covered warehouse area",
          "1,000 sqm open yard space",
          "Latest handling equipment",
          "Advanced security systems",
          "Climate-controlled storage"
        ],
        image: "/cfl4.jpeg",
        featuresTitle: "Our CFS Services",
        featuresSubtitle: "Comprehensive warehouse and logistics solutions tailored to your needs",
        features: [
          { title: "3PL Storage", description: "Short term and long term storing facility with secure warehouse management." },
          { title: "Value-Added Services", description: "Labelling, Repacking, Palletization and other customization services." },
          { title: "Supply Chain Management", description: "End-to-end logistics solutions and supply chain optimization." }
        ],
        galleryImages: [
          "/cfl1.jpeg",
          "/cfl2.jpeg",
          "/cfl3.jpeg",
          "/cfl4.jpeg",
          "/cfl5.jpeg"
        ],
        ctaTitle: "Need CFS Storage Solutions?",
        ctaSubtitle: "Contact us to learn more about our advanced warehouse facilities and services"
      };
      setCfsData(defaults);
      localStorage.setItem("admin_service_cfs", JSON.stringify(defaults));
      toast.success("Reset CFS parameters.");
    }
  };

  const handleImageUpload = (type: "lcl" | "cfs", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (type === "lcl") {
        setLclData(prev => ({ ...prev, image: reader.result as string }));
      } else {
        setCfsData(prev => ({ ...prev, image: reader.result as string }));
      }
      toast.success("Image uploaded. Save changes to persist!");
    };
    reader.onerror = () => toast.error("Failed to read image file.");
    reader.readAsDataURL(file);
  };

  const handleGalleryUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCfsData(prev => {
        const updated = [...prev.galleryImages];
        updated[index] = reader.result as string;
        return { ...prev, galleryImages: updated };
      });
      toast.success("Gallery slot updated. Remember to save changes!");
    };
    reader.onerror = () => toast.error("Failed to read image file.");
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Service Detailed Pages</h1>
          <p className="text-slate-500 text-xs mt-1">Configure layout copy, benefits grids, and specifications for specific service detailed pages</p>
        </div>
        <div className="flex gap-2">
          {activeTab === "lcl" ? (
            <>
              <Button variant="outline" onClick={handleResetLcl} className="border-slate-250 hover:bg-slate-50 text-xs font-semibold px-4 h-9">
                Reset LCL
              </Button>
              <Button onClick={handleSaveLcl} className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 h-9 shadow-sm">
                Save LCL Data
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleResetCfs} className="border-slate-250 hover:bg-slate-50 text-xs font-semibold px-4 h-9">
                Reset CFS
              </Button>
              <Button onClick={handleSaveCfs} className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 h-9 shadow-sm">
                Save CFS Data
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-slate-200 gap-1">
        <button
          onClick={() => setActiveTab("lcl")}
          className={`py-2.5 px-5 text-sm font-semibold border-b-2 transition-all ${activeTab === "lcl" ? "border-red-600 text-red-600" : "border-transparent text-slate-500 hover:text-slate-900"}`}
        >
          LCL Services Page
        </button>
        <button
          onClick={() => setActiveTab("cfs")}
          className={`py-2.5 px-5 text-sm font-semibold border-b-2 transition-all ${activeTab === "cfs" ? "border-red-600 text-red-600" : "border-transparent text-slate-500 hover:text-slate-900"}`}
        >
          CFS Services Page
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* LCL VIEW */}
        {activeTab === "lcl" && (
          <div className="space-y-6">
            {/* Hero & Intro */}
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xs font-bold tracking-wider text-slate-500 uppercase font-mono">Hero Content & Layout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Hero Main Title</Label>
                  <Input 
                    value={lclData.heroTitle}
                    onChange={(e) => setLclData({ ...lclData, heroTitle: e.target.value })}
                    className="bg-slate-50/40 border-slate-200 text-sm font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Hero Subtitle</Label>
                  <Textarea 
                    rows={2}
                    value={lclData.heroSubtitle}
                    onChange={(e) => setLclData({ ...lclData, heroSubtitle: e.target.value })}
                    className="bg-slate-50/40 border-slate-200 text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Main content grid */}
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xs font-bold tracking-wider text-slate-500 uppercase font-mono">Detailed Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Main Heading</Label>
                  <Input 
                    value={lclData.mainHeading}
                    onChange={(e) => setLclData({ ...lclData, mainHeading: e.target.value })}
                    className="bg-slate-50/40 border-slate-200 text-sm font-semibold"
                  />
                </div>
                
                {lclData.paragraphs.map((para, pIdx) => (
                  <div key={pIdx} className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Paragraph {pIdx + 1}</Label>
                    <Textarea 
                      rows={3}
                      value={para}
                      onChange={(e) => {
                        const updated = [...lclData.paragraphs];
                        updated[pIdx] = e.target.value;
                        setLclData({ ...lclData, paragraphs: updated });
                      }}
                      className="bg-slate-50/40 border-slate-200 text-sm leading-relaxed"
                    />
                  </div>
                ))}

                <div className="space-y-4 pt-4 border-t">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Showcase Image</Label>
                  <div className="aspect-[16/9] w-full max-w-md overflow-hidden rounded-xl border border-slate-200 bg-slate-50 relative flex items-center justify-center shadow-inner">
                    <img src={lclData.image} className="w-full h-full object-cover" />
                  </div>
                  <Label htmlFor="lcl-image-picker" className="flex w-fit items-center gap-2 cursor-pointer border border-slate-200 hover:bg-slate-50 transition-colors justify-center text-red-600 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-lg">
                    <Upload className="w-4 h-4 text-red-600" />
                    Change Image
                    <input 
                      id="lcl-image-picker" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageUpload("lcl", e)} 
                    />
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose features grid */}
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xs font-bold tracking-wider text-slate-500 uppercase font-mono">Why Choose Grid Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 border-b pb-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Features Section Title</Label>
                    <Input 
                      value={lclData.featuresTitle}
                      onChange={(e) => setLclData({ ...lclData, featuresTitle: e.target.value })}
                      className="bg-slate-50/40 border-slate-200 text-sm font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Features Section Subtitle</Label>
                    <Input 
                      value={lclData.featuresSubtitle}
                      onChange={(e) => setLclData({ ...lclData, featuresSubtitle: e.target.value })}
                      className="bg-slate-50/40 border-slate-200 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {lclData.features.map((feat, fIdx) => (
                    <div key={fIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
                      <Label className="text-[10px] font-bold tracking-widest text-red-600 uppercase font-mono">Feature {fIdx + 1}</Label>
                      <div className="space-y-2">
                        <Input 
                          value={feat.title}
                          onChange={(e) => {
                            const updated = [...lclData.features];
                            updated[fIdx] = { ...updated[fIdx], title: e.target.value };
                            setLclData({ ...lclData, features: updated });
                          }}
                          className="bg-white border-slate-200 text-xs font-semibold"
                          placeholder="Feature Title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Textarea 
                          rows={3}
                          value={feat.description}
                          onChange={(e) => {
                            const updated = [...lclData.features];
                            updated[fIdx] = { ...updated[fIdx], description: e.target.value };
                            setLclData({ ...lclData, features: updated });
                          }}
                          className="bg-white border-slate-200 text-xs leading-relaxed"
                          placeholder="Feature description text..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xs font-bold tracking-wider text-slate-500 uppercase font-mono">Call To Action (CTA)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">CTA Title</Label>
                  <Input 
                    value={lclData.ctaTitle}
                    onChange={(e) => setLclData({ ...lclData, ctaTitle: e.target.value })}
                    className="bg-slate-50/40 border-slate-200 text-sm font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">CTA Subtitle</Label>
                  <Input 
                    value={lclData.ctaSubtitle}
                    onChange={(e) => setLclData({ ...lclData, ctaSubtitle: e.target.value })}
                    className="bg-slate-50/40 border-slate-200 text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* CFS VIEW */}
        {activeTab === "cfs" && (
          <div className="space-y-6">
            {/* Hero & Intro */}
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xs font-bold tracking-wider text-slate-500 uppercase font-mono">Hero Content & Layout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Hero Main Title</Label>
                  <Input 
                    value={cfsData.heroTitle}
                    onChange={(e) => setCfsData({ ...cfsData, heroTitle: e.target.value })}
                    className="bg-slate-50/40 border-slate-200 text-sm font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Hero Subtitle</Label>
                  <Textarea 
                    rows={2}
                    value={cfsData.heroSubtitle}
                    onChange={(e) => setCfsData({ ...cfsData, heroSubtitle: e.target.value })}
                    className="bg-slate-50/40 border-slate-200 text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Main content grid */}
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xs font-bold tracking-wider text-slate-500 uppercase font-mono">Detailed Information & Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Main Heading</Label>
                  <Input 
                    value={cfsData.mainHeading}
                    onChange={(e) => setCfsData({ ...cfsData, mainHeading: e.target.value })}
                    className="bg-slate-50/40 border-slate-200 text-sm font-semibold"
                  />
                </div>
                
                {cfsData.paragraphs.map((para, pIdx) => (
                  <div key={pIdx} className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Paragraph {pIdx + 1}</Label>
                    <Textarea 
                      rows={3}
                      value={para}
                      onChange={(e) => {
                        const updated = [...cfsData.paragraphs];
                        updated[pIdx] = e.target.value;
                        setCfsData({ ...cfsData, paragraphs: updated });
                      }}
                      className="bg-slate-50/40 border-slate-200 text-sm leading-relaxed"
                    />
                  </div>
                ))}

                <div className="space-y-2 pt-2">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Facility Specs (one specification per line)</Label>
                  <Textarea 
                    rows={5}
                    value={cfsData.specifications.join("\n")}
                    onChange={(e) => setCfsData({ ...cfsData, specifications: e.target.value.split("\n").filter(Boolean) })}
                    className="bg-slate-50/40 border-slate-200 text-xs font-mono leading-relaxed"
                  />
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Showcase Image</Label>
                  <div className="aspect-[16/9] w-full max-w-md overflow-hidden rounded-xl border border-slate-200 bg-slate-50 relative flex items-center justify-center shadow-inner">
                    <img src={cfsData.image} className="w-full h-full object-cover" />
                  </div>
                  <Label htmlFor="cfs-image-picker" className="flex w-fit items-center gap-2 cursor-pointer border border-slate-200 hover:bg-slate-50 transition-colors justify-center text-red-600 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-lg">
                    <Upload className="w-4 h-4 text-red-600" />
                    Change Image
                    <input 
                      id="cfs-image-picker" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageUpload("cfs", e)} 
                    />
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose features grid */}
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xs font-bold tracking-wider text-slate-500 uppercase font-mono">Why Choose Grid Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 border-b pb-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Features Section Title</Label>
                    <Input 
                      value={cfsData.featuresTitle}
                      onChange={(e) => setCfsData({ ...cfsData, featuresTitle: e.target.value })}
                      className="bg-slate-50/40 border-slate-200 text-sm font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Features Section Subtitle</Label>
                    <Input 
                      value={cfsData.featuresSubtitle}
                      onChange={(e) => setCfsData({ ...cfsData, featuresSubtitle: e.target.value })}
                      className="bg-slate-50/40 border-slate-200 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {cfsData.features.map((feat, fIdx) => (
                    <div key={fIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
                      <Label className="text-[10px] font-bold tracking-widest text-red-600 uppercase font-mono">Feature {fIdx + 1}</Label>
                      <div className="space-y-2">
                        <Input 
                          value={feat.title}
                          onChange={(e) => {
                            const updated = [...cfsData.features];
                            updated[fIdx] = { ...updated[fIdx], title: e.target.value };
                            setCfsData({ ...cfsData, features: updated });
                          }}
                          className="bg-white border-slate-200 text-xs font-semibold"
                          placeholder="Feature Title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Textarea 
                          rows={3}
                          value={feat.description}
                          onChange={(e) => {
                            const updated = [...cfsData.features];
                            updated[fIdx] = { ...updated[fIdx], description: e.target.value };
                            setCfsData({ ...cfsData, features: updated });
                          }}
                          className="bg-white border-slate-200 text-xs leading-relaxed"
                          placeholder="Feature description text..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CFS Photo Gallery */}
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xs font-bold tracking-wider text-slate-700 uppercase font-mono">CFS Layout Photo Gallery</CardTitle>
                <CardDescription className="text-slate-500 text-xs">Configure the 5 preview images rendered at the bottom of the CFS page</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {cfsData.galleryImages.map((imgUrl, gIdx) => (
                  <div key={gIdx} className="space-y-3">
                    <div className="aspect-square overflow-hidden rounded-lg border bg-slate-50 relative group flex items-center justify-center shadow-inner">
                      <img src={imgUrl} className="w-full h-full object-cover" />
                    </div>
                    <Label htmlFor={`gallery-picker-${gIdx}`} className="flex items-center gap-1.5 cursor-pointer border border-slate-200 hover:bg-slate-50 transition-colors justify-center text-red-600 text-[10px] font-semibold uppercase tracking-wider py-1.5 rounded-lg">
                      <Upload className="w-3.5 h-3.5" />
                      Update
                      <input 
                        id={`gallery-picker-${gIdx}`} 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleGalleryUpload(gIdx, e)} 
                      />
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xs font-bold tracking-wider text-slate-500 uppercase font-mono">Call To Action (CTA)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">CTA Title</Label>
                  <Input 
                    value={cfsData.ctaTitle}
                    onChange={(e) => setCfsData({ ...cfsData, ctaTitle: e.target.value })}
                    className="bg-slate-50/40 border-slate-200 text-sm font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">CTA Subtitle</Label>
                  <Input 
                    value={cfsData.ctaSubtitle}
                    onChange={(e) => setCfsData({ ...cfsData, ctaSubtitle: e.target.value })}
                    className="bg-slate-50/40 border-slate-200 text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminServicesDetails;
