import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Globe, Check, AlertCircle, ExternalLink } from "lucide-react";

interface AdminCountry {
  code: string;
  name: string;
  flag: string;
  company: string;
  defaultRoute: string;
}

const defaultAdminCountries: AdminCountry[] = [
  { code: "sg", name: "Singapore", flag: "/sg.svg", company: "GC (Global Consol)", defaultRoute: "/" },
  { code: "lk", name: "Sri Lanka", flag: "/lk.svg", company: "GC (Global Consol)", defaultRoute: "/sri-lanka/home" },
  { code: "mm", name: "Myanmar", flag: "/mm.svg", company: "GC (Global Consol)", defaultRoute: "/myanmar/home" },
  { code: "bd", name: "Bangladesh", flag: "/bd.svg", company: "GC (Global Consol)", defaultRoute: "/bangladesh/home" },
  { code: "pk", name: "Pakistan", flag: "/pk.svg", company: "GC (Global Consol)", defaultRoute: "/pakistan/home" },
  { code: "cn", name: "China", flag: "/cn.svg", company: "Amass", defaultRoute: "https://www.amassfreight.com/" },
  { code: "my", name: "Malaysia", flag: "/my.svg", company: "OECL", defaultRoute: "https://oecl.sg/malaysia" },
  { code: "id", name: "Indonesia", flag: "/id.svg", company: "OECL", defaultRoute: "https://oecl.sg/indonesia" },
  { code: "th", name: "Thailand", flag: "/th.svg", company: "OECL", defaultRoute: "https://oecl.sg/thailand" },
  { code: "in", name: "India", flag: "/in.svg", company: "GGL", defaultRoute: "https://gglindia.com" },
  { code: "au", name: "Australia", flag: "/au.svg", company: "GGL", defaultRoute: "https://www.gglaustralia.com/" },
  { code: "qa", name: "Qatar", flag: "/qa.svg", company: "ONE GLOBAL", defaultRoute: "https://oneglobalqatar.com/" },
  { code: "sa", name: "Saudi Arabia", flag: "/sa.svg", company: "AMASS", defaultRoute: "https://amassmiddleeast.com/" },
  { code: "ae", name: "United Arab Emirates (UAE)", flag: "/ae.svg", company: "AMASS", defaultRoute: "https://amassmiddleeast.com/" },
  { code: "us", name: "United States (USA)", flag: "/us.svg", company: "GGL", defaultRoute: "https://gglusa.us/" },
  { code: "gb", name: "United Kingdom (UK)", flag: "/gb.svg", company: "GGL", defaultRoute: "https://www.ggl.sg/uk" }
];

const SwitchCountry = () => {
  const [countriesList, setCountriesList] = useState<AdminCountry[]>(defaultAdminCountries);
  const [activeCountryCode, setActiveCountryCode] = useState("sg");
  const [defaultFallbackCountry, setDefaultFallbackCountry] = useState("sg");

  // Selection edit state
  const [editingCountry, setEditingCountry] = useState<AdminCountry | null>(null);
  const [editForm, setEditForm] = useState({
    company: "",
    defaultRoute: ""
  });

  useEffect(() => {
    const savedCountries = localStorage.getItem("admin_countries_list");
    if (savedCountries) {
      try {
        setCountriesList(JSON.parse(savedCountries));
      } catch (e) {
        setCountriesList(defaultAdminCountries);
      }
    }

    const savedActive = localStorage.getItem("admin_current_country");
    if (savedActive) {
      setActiveCountryCode(savedActive);
    }
    
    const savedFallback = localStorage.getItem("admin_default_fallback_country");
    if (savedFallback) {
      setDefaultFallbackCountry(savedFallback);
    }
  }, []);

  // Update edit form when active selection switches
  useEffect(() => {
    const active = countriesList.find(c => c.code === activeCountryCode);
    if (active) {
      setEditingCountry(active);
      setEditForm({
        company: active.company,
        defaultRoute: active.defaultRoute
      });
    }
  }, [activeCountryCode, countriesList]);

  const handleSelectCountry = (code: string) => {
    setActiveCountryCode(code);
    localStorage.setItem("admin_current_country", code);
    toast.success(`Active administration context switched to: ${countriesList.find(c => c.code === code)?.name}`);
  };

  const handleSaveRedirectLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCountry) return;

    const updated = countriesList.map(c => 
      c.code === editingCountry.code 
        ? { ...c, company: editForm.company, defaultRoute: editForm.defaultRoute } 
        : c
    );

    setCountriesList(updated);
    localStorage.setItem("admin_countries_list", JSON.stringify(updated));
    toast.success(`Redirection settings for ${editingCountry.name} updated successfully!`);
  };

  const handleSaveRoutingSettings = () => {
    localStorage.setItem("admin_default_fallback_country", defaultFallbackCountry);
    toast.success("Default fallback country settings saved successfully!");
  };

  const handleReset = () => {
    if (confirm("Reset all country website redirection links and fallbacks to defaults?")) {
      setCountriesList(defaultAdminCountries);
      localStorage.setItem("admin_countries_list", JSON.stringify(defaultAdminCountries));
      localStorage.setItem("admin_current_country", "sg");
      localStorage.setItem("admin_default_fallback_country", "sg");
      setActiveCountryCode("sg");
      setDefaultFallbackCountry("sg");
      toast.success("Country redirections reset to default values!");
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Switch Country Context</h1>
          <p className="text-slate-500 text-xs mt-1">Select the country scope to manage corresponding content, routing, and configurations</p>
        </div>
        <div>
          <Button 
            variant="outline" 
            onClick={handleReset} 
            className="border-slate-250 hover:bg-slate-50 text-xs font-semibold px-4 h-9"
          >
            Reset Redirections Defaults
          </Button>
        </div>
      </div>

      {/* Info Warning Banner */}
      <Card className="border-amber-200 bg-amber-50/40">
        <CardContent className="flex items-start gap-3 pt-6">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 font-mono">Region-Scoped Administration</h4>
            <p className="text-xs text-amber-700 leading-relaxed font-sans">
              Switching the active country updates the administration context. Any content edits (About Us, Services, Career Listings, and Media folders) will apply to the selected country's localized website.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Country Selector Grid */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm animate-in fade-in">
            <CardHeader>
              <CardTitle className="text-xs font-bold tracking-wider text-slate-700 uppercase font-mono">Select Administration Country</CardTitle>
              <CardDescription className="text-slate-500 text-xs">Choose which localized site version you want to configure</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {countriesList.map((country) => {
                const isActive = activeCountryCode === country.code;
                return (
                  <button
                    key={country.code}
                    onClick={() => handleSelectCountry(country.code)}
                    className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${isActive ? "border-red-600 bg-red-50/40 text-red-900 shadow-sm animate-in fade-in duration-300" : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={country.flag}
                        alt={`${country.name} flag`}
                        className="w-10 h-7 rounded object-cover shadow-sm border border-slate-200"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                      <div>
                        <h4 className="text-sm font-bold tracking-tight">{country.name}</h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] text-slate-400 font-mono block">{country.company}</span>
                          <span className="text-[10px] text-slate-350">•</span>
                          <a 
                            href={country.defaultRoute} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()} 
                            className="text-[10px] text-red-600 hover:text-red-700 hover:underline flex items-center gap-0.5 font-sans font-semibold"
                          >
                            Visit
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                    {isActive && (
                      <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Fallback & Routing Config + Dynamic Link Editor */}
        <div className="lg:col-span-1 space-y-6">
          {/* Link Editor Card */}
          {editingCountry && (
            <Card className="bg-white border-slate-200 shadow-sm animate-in slide-in-from-right">
              <CardHeader className="border-b pb-3.5">
                <CardTitle className="text-xs font-bold tracking-wider text-slate-700 uppercase font-mono">Edit Country Redirection Link</CardTitle>
                <CardDescription className="text-slate-500 text-xs">Configure where the public Country Selector redirects to for {editingCountry.name}</CardDescription>
              </CardHeader>
              <form onSubmit={handleSaveRedirectLink}>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Agency Partner Company</Label>
                    <Input 
                      value={editForm.company}
                      onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                      placeholder="e.g. AMASS"
                      className="bg-slate-50/40 border-slate-200 text-xs h-9 font-semibold"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Website Redirect URL</Label>
                    <Input 
                      value={editForm.defaultRoute}
                      onChange={(e) => setEditForm({ ...editForm, defaultRoute: e.target.value })}
                      placeholder="e.g. /saudi-arabia/home or https://amassmiddleeast.com/"
                      className="bg-slate-50/40 border-slate-200 text-xs h-9 font-mono"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold h-9 shadow-sm">
                    Save {editingCountry.name} Links
                  </Button>
                </CardContent>
              </form>
            </Card>
          )}

          {/* Global Fallback Card */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-bold tracking-wider text-slate-700 uppercase font-mono">Routing Fallbacks</CardTitle>
              <CardDescription className="text-slate-500 text-xs">Configure fallback routes for unmapped IP locations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Default Fallback Country</Label>
                <select
                  value={defaultFallbackCountry}
                  onChange={(e) => setDefaultFallbackCountry(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/40 p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  {countriesList.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 pt-2 border-t font-sans">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Current Active Context:</span>
                  <span className="font-bold text-red-700 uppercase font-mono">[{activeCountryCode}]</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Target Fallback URL:</span>
                  <span className="font-bold text-slate-700 font-mono">
                    {countriesList.find(c => c.code === defaultFallbackCountry)?.defaultRoute}
                  </span>
                </div>
              </div>

              <Button onClick={handleSaveRoutingSettings} className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold h-9 shadow-sm mt-2">
                Save Routing Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SwitchCountry;
