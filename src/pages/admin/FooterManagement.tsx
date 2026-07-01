import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, RefreshCw, LayoutTemplate, MapPin, Plus, Trash2, Globe, Mail, Phone, Info, Image as ImageIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Office {
  name: string;
  address: string;
  phone?: string;
  fax?: string;
  email?: string;
  map?: string;
  country: string; // "UAE" or "Saudi Arabia"
}

interface FooterData {
  description: string;
  timingsMonThu: string;
  timingsFri: string;
  timingsFriBreak: string;
  timingsSatSun: string;
  copyright: string;
  logoUrl: string;
  offices: Office[];
}

const defaultOffices: Office[] = [
  {
    name: "Head Office",
    address: "202, Sultan Business Centre\nOud Metha, P.O.Box 33463\nDubai – UAE",
    phone: "+971 4 3575508",
    fax: "+971 4 2221794",
    email: "contact@dxb.amassfreight.com",
    map: "",
    country: "UAE"
  },
  {
    name: "CFS",
    address: "Plot No S20312,\nJafza South,\nJebel Ali, Dubai – UAE",
    phone: "+971 4 3400298",
    fax: "+971 4 8831004",
    email: "contact@dxb.amassfreight.com",
    map: "",
    country: "UAE"
  },
  {
    name: "Dammam – Head Office",
    address: "RASHIDIYA BUSINESS CENTER\nBUILD NO:7257 ROOM 308, 3RD FLOOR – AL AMAMRAH\nDAMMAM – 32415 – KSA",
    phone: "+966 13 849 8637",
    email: "contact@dxb.amassfreight.com",
    map: "",
    country: "Saudi Arabia"
  },
  {
    name: "Jeddah",
    address: "Room No. 408, Saudi Business Centre\n7859 Al Madinah Al Munawarah Road\nAl Sharafeyah, Jeddah 4542-22234",
    phone: "+966 12 578 0874",
    email: "contact@dxb.amassfreight.com",
    map: "",
    country: "Saudi Arabia"
  },
  {
    name: "Riyadh",
    address: "ROOM NO. 20, AL MALAZ\nBLDG. NO. 104, 2 FLOOR AL QIRAWANI ST.\nAL MALAZ DISTRICT RIYADH 11332, K.S.A",
    phone: "+966 13 849 8630",
    email: "contact@dxb.amassfreight.com",
    map: "",
    country: "Saudi Arabia"
  }
];

const defaultFooter: FooterData = {
  description: "We were established in the year 2015, as a Neutral LCL Consolidation Service Provider to serve the UAE market.",
  timingsMonThu: "Monday to Thursday: 8.00 AM to 12.30 PM, 2.00 PM to 4.00 PM",
  timingsFri: "Friday: 8.00 AM to 12.00 PM, 2.00 PM to 4.30 PM",
  timingsFriBreak: "(12.00 PM to 2.00 PM – Friday Prayer and Lunch Break)",
  timingsSatSun: "Saturday & Sunday CLOSED",
  copyright: "© 2026 Amass Middle East Shipping Services LLC. All rights reserved.",
  logoUrl: "/lovable-uploads/a44481e1-bf8c-43ab-b259-b833b252e1ed.png",
  offices: defaultOffices
};

const FooterManagement = () => {
  const [data, setData] = useState<FooterData>(defaultFooter);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("admin_homepage_footer");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData({
          ...defaultFooter,
          ...parsed,
          logoUrl: parsed.logoUrl || defaultFooter.logoUrl,
          offices: Array.isArray(parsed.offices) ? parsed.offices : defaultOffices
        });
      } catch (e) {
        console.error("Error parsing footer config:", e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("admin_homepage_footer", JSON.stringify(data));
    
    // Dispatch a custom event to notify Footer component of changes
    window.dispatchEvent(new Event("admin_homepage_footer_changed"));
    
    toast({
      title: "Settings Saved",
      description: "Homepage footer details have been updated successfully.",
    });
  };

  const handleReset = () => {
    if (confirm("Reset footer content to defaults?")) {
      setData(defaultFooter);
      localStorage.setItem("admin_homepage_footer", JSON.stringify(defaultFooter));
      window.dispatchEvent(new Event("admin_homepage_footer_changed"));
      toast({
        title: "Settings Reset",
        description: "Footer details have been reverted to system defaults.",
      });
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({
          ...prev,
          logoUrl: reader.result as string
        }));
        toast({
          title: "Logo uploaded",
          description: "Press 'Save content' to persist your changes.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateOffice = (index: number, updatedFields: Partial<Office>) => {
    const newOffices = [...data.offices];
    newOffices[index] = { ...newOffices[index], ...updatedFields };
    setData({ ...data, offices: newOffices });
  };

  const deleteOffice = (index: number) => {
    if (confirm("Are you sure you want to remove this office location?")) {
      const newOffices = data.offices.filter((_, idx) => idx !== index);
      setData({ ...data, offices: newOffices });
    }
  };

  const addOffice = () => {
    const newOffice: Office = {
      name: "New Office Branch",
      address: "",
      phone: "",
      fax: "",
      email: "",
      map: "",
      country: "UAE"
    };
    setData({ ...data, offices: [...data.offices, newOffice] });
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Home Page Footer Management</h1>
          <p className="text-slate-500 text-xs mt-1">Configure company logo, brief description, office operating times, contacts, and copyright content on the homepage footer</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full max-w-4xl">
        <TabsList className="bg-[#eef2f7] p-1.5 rounded-xl shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] gap-2 border-none h-fit">
          <TabsTrigger value="general" className="rounded-lg text-xs font-semibold py-2 px-4 data-[state=active]:bg-[#eef2f7] data-[state=active]:shadow-[3px_3px_6px_#cbd5e1,_-3px_-3px_6px_#ffffff] text-slate-655 data-[state=active]:text-blue-600 transition-all border-none">
            General Details
          </TabsTrigger>
          <TabsTrigger value="offices" className="rounded-lg text-xs font-semibold py-2 px-4 data-[state=active]:bg-[#eef2f7] data-[state=active]:shadow-[3px_3px_6px_#cbd5e1,_-3px_-3px_6px_#ffffff] text-slate-655 data-[state=active]:text-blue-600 transition-all border-none">
            Office Locations ({data.offices.length})
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: General Details */}
        <TabsContent value="general" className="mt-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100/50">
              <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-[#dc2626]" />
                Footer Text Contents
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">Edit general company logo, description and DO timings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              
              {/* Logo Upload Section */}
              <div className="space-y-3 pb-6 border-b border-slate-100/50">
                <Label className="text-xs font-bold text-slate-650 uppercase tracking-wide">Footer Brand Logo</Label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="h-20 w-36 bg-[#1e293b] border border-slate-200 rounded-xl p-3 flex items-center justify-center shadow-sm">
                    <img
                      src={data.logoUrl}
                      alt="Footer Logo Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="space-y-1.5 flex-1 w-full">
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                      className="bg-[#eef2f7] border-none text-[#dc2626] hover:text-[#2563eb] shadow-[3px_3px_6px_#cbd5e1,_-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] h-9 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 w-full sm:w-auto"
                    >
                      Upload Logo
                    </Button>
                    <p className="text-[10px] text-slate-450 mt-1">Recommended size: Transparent PNG, max height 60px</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-bold text-slate-600 uppercase tracking-wide">Company Brief Profile</Label>
                <Textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  rows={3}
                  placeholder="Enter general company description..."
                  className="bg-[#eef2f7] border-none text-slate-800 text-sm p-3.5 rounded-xl shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] focus:shadow-[inset_1px_1px_3px_#cbd5e1,_inset_-1px_-1px_3px_#ffffff,_0_0_0_2px_rgba(37,99,235,0.25)] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 resize-y"
                />
              </div>

              {/* Timings */}
              <div className="space-y-4 pt-4 border-t border-slate-200/50">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#2563eb]" /> Operating & CFS Timings
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timingsMonThu" className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Mon to Thu Hours</Label>
                    <Input
                      id="timingsMonThu"
                      type="text"
                      value={data.timingsMonThu}
                      onChange={(e) => setData({ ...data, timingsMonThu: e.target.value })}
                      className="bg-[#eef2f7] border-none text-slate-800 text-sm h-10 px-3.5 rounded-xl shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] focus:shadow-[inset_1px_1px_3px_#cbd5e1,_inset_-1px_-1px_3px_#ffffff,_0_0_0_2px_rgba(37,99,235,0.25)] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timingsFri" className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Friday Hours</Label>
                    <Input
                      id="timingsFri"
                      type="text"
                      value={data.timingsFri}
                      onChange={(e) => setData({ ...data, timingsFri: e.target.value })}
                      className="bg-[#eef2f7] border-none text-slate-800 text-sm h-10 px-3.5 rounded-xl shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] focus:shadow-[inset_1px_1px_3px_#cbd5e1,_inset_-1px_-1px_3px_#ffffff,_0_0_0_2px_rgba(37,99,235,0.25)] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timingsFriBreak" className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Friday Break Note</Label>
                    <Input
                      id="timingsFriBreak"
                      type="text"
                      value={data.timingsFriBreak}
                      onChange={(e) => setData({ ...data, timingsFriBreak: e.target.value })}
                      className="bg-[#eef2f7] border-none text-slate-800 text-sm h-10 px-3.5 rounded-xl shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] focus:shadow-[inset_1px_1px_3px_#cbd5e1,_inset_-1px_-1px_3px_#ffffff,_0_0_0_2px_rgba(37,99,235,0.25)] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timingsSatSun" className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Weekend Closed Note</Label>
                    <Input
                      id="timingsSatSun"
                      type="text"
                      value={data.timingsSatSun}
                      onChange={(e) => setData({ ...data, timingsSatSun: e.target.value })}
                      className="bg-[#eef2f7] border-none text-slate-800 text-sm h-10 px-3.5 rounded-xl shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] focus:shadow-[inset_1px_1px_3px_#cbd5e1,_inset_-1px_-1px_3px_#ffffff,_0_0_0_2px_rgba(37,99,235,0.25)] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="space-y-2 pt-4 border-t border-slate-200/50">
                <Label htmlFor="copyright" className="text-xs font-bold text-slate-600 uppercase tracking-wide">Copyright Statement</Label>
                <Input
                  id="copyright"
                  type="text"
                  value={data.copyright}
                  onChange={(e) => setData({ ...data, copyright: e.target.value })}
                  className="bg-[#eef2f7] border-none text-slate-800 text-sm h-10 px-3.5 rounded-xl shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] focus:shadow-[inset_1px_1px_3px_#cbd5e1,_inset_-1px_-1px_3px_#ffffff,_0_0_0_2px_rgba(37,99,235,0.25)] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-slate-200/50 justify-end">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="bg-[#eef2f7] border-none text-slate-655 hover:text-slate-900 shadow-[3px_3px_6px_#cbd5e1,_-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] h-10 px-5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200"
                >
                  <RefreshCw className="w-4 h-4" /> Reset defaults
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-[#eef2f7] border-none text-emerald-600 hover:text-emerald-700 shadow-[3px_3px_6px_#cbd5e1,_-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] h-10 px-5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200"
                >
                  <Save className="w-4 h-4" /> Save content
                </Button>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Office Locations */}
        <TabsContent value="offices" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Footer Branch Contacts</h2>
              <Button
                onClick={addOffice}
                className="bg-[#eef2f7] border-none text-blue-600 hover:text-blue-700 shadow-[3px_3px_6px_#cbd5e1,_-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] h-9 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" /> Add New Branch
              </Button>
            </div>

            <div className="space-y-6">
              {data.offices.map((office, idx) => (
                <Card key={idx} className="bg-white border-slate-200 shadow-sm relative group overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#dc2626]" />
                  <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-600" />
                        {office.name || "Unnamed Branch"}
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-400 font-mono">Index Position: {idx + 1} | Country: {office.country}</CardDescription>
                    </div>
                    <Button
                      onClick={() => deleteOffice(idx)}
                      variant="ghost"
                      className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl h-8 w-8 p-0 border-none transition-colors"
                      title="Delete Branch"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name & Country */}
                      <div className="space-y-2">
                        <Label htmlFor={`office-name-${idx}`} className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Office Name / Label</Label>
                        <Input
                          id={`office-name-${idx}`}
                          type="text"
                          value={office.name}
                          onChange={(e) => updateOffice(idx, { name: e.target.value })}
                          className="bg-[#eef2f7] border-none text-slate-800 text-sm h-10 px-3.5 rounded-xl shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] focus:shadow-[inset_1px_1px_3px_#cbd5e1,_inset_-1px_-1px_3px_#ffffff,_0_0_0_2px_rgba(37,99,235,0.25)] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`office-country-${idx}`} className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Country Filter</Label>
                        <select
                          id={`office-country-${idx}`}
                          value={office.country}
                          onChange={(e) => updateOffice(idx, { country: e.target.value })}
                          className="w-full bg-[#eef2f7] border-none text-slate-800 text-sm h-10 px-3.5 rounded-xl shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] focus:shadow-[inset_1px_1px_3px_#cbd5e1,_inset_-1px_-1px_3px_#ffffff,_0_0_0_2px_rgba(37,99,235,0.25)] focus:outline-none transition-all duration-300"
                        >
                          <option value="UAE">UAE</option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                        </select>
                      </div>

                      {/* Phone & Fax */}
                      <div className="space-y-2">
                        <Label htmlFor={`office-phone-${idx}`} className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Telephone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            id={`office-phone-${idx}`}
                            type="text"
                            value={office.phone || ""}
                            onChange={(e) => updateOffice(idx, { phone: e.target.value })}
                            className="bg-[#eef2f7] border-none text-slate-800 text-sm h-10 pl-10 pr-3.5 rounded-xl shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] focus:shadow-[inset_1px_1px_3px_#cbd5e1,_inset_-1px_-1px_3px_#ffffff,_0_0_0_2px_rgba(37,99,235,0.25)] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`office-fax-${idx}`} className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Fax Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            id={`office-fax-${idx}`}
                            type="text"
                            value={office.fax || ""}
                            onChange={(e) => updateOffice(idx, { fax: e.target.value })}
                            className="bg-[#eef2f7] border-none text-slate-800 text-sm h-10 pl-10 pr-3.5 rounded-xl shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] focus:shadow-[inset_1px_1px_3px_#cbd5e1,_inset_-1px_-1px_3px_#ffffff,_0_0_0_2px_rgba(37,99,235,0.25)] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor={`office-email-${idx}`} className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Contact Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            id={`office-email-${idx}`}
                            type="email"
                            value={office.email || ""}
                            onChange={(e) => updateOffice(idx, { email: e.target.value })}
                            className="bg-[#eef2f7] border-none text-slate-800 text-sm h-10 pl-10 pr-3.5 rounded-xl shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] focus:shadow-[inset_1px_1px_3px_#cbd5e1,_inset_-1px_-1px_3px_#ffffff,_0_0_0_2px_rgba(37,99,235,0.25)] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor={`office-address-${idx}`} className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Physical Address</Label>
                        <Textarea
                          id={`office-address-${idx}`}
                          value={office.address}
                          onChange={(e) => updateOffice(idx, { address: e.target.value })}
                          rows={3}
                          className="bg-[#eef2f7] border-none text-slate-800 text-sm p-3.5 rounded-xl shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] focus:shadow-[inset_1px_1px_3px_#cbd5e1,_inset_-1px_-1px_3px_#ffffff,_0_0_0_2px_rgba(37,99,235,0.25)] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 resize-y"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {data.offices.length === 0 && (
                <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl text-slate-500 font-mono text-xs shadow-sm">
                  No office locations registered. Click "Add New Branch" above to add one.
                </div>
              )}
            </div>

            {/* Actions Panel */}
            <div className="flex gap-4 pt-6 border-t border-slate-200/50 justify-end max-w-4xl">
              <Button
                onClick={handleReset}
                variant="outline"
                className="bg-[#eef2f7] border-none text-slate-655 hover:text-slate-900 shadow-[3px_3px_6px_#cbd5e1,_-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] h-10 px-5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200"
              >
                <RefreshCw className="w-4 h-4" /> Reset defaults
              </Button>
              <Button
                onClick={handleSave}
                className="bg-[#eef2f7] border-none text-emerald-600 hover:text-emerald-700 shadow-[3px_3px_6px_#cbd5e1,_-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] h-10 px-5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200"
              >
                <Save className="w-4 h-4" /> Save content
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FooterManagement;
