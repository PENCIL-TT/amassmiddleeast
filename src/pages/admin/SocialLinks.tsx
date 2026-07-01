import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Facebook, Linkedin, Twitter, Instagram, Globe } from "lucide-react";

interface SocialLinksData {
  linkedin: string;
  facebook: string;
  twitter: string;
  instagram: string;
}

const defaultSocials: SocialLinksData = {
  linkedin: "https://www.linkedin.com/company/amassmiddleeast/",
  facebook: "https://www.facebook.com/Amassmiddleeast?mibextid=ZbWKwL",
  twitter: "",
  instagram: ""
};

const AdminSocialLinks = () => {
  const [socials, setSocials] = useState<SocialLinksData>(defaultSocials);

  useEffect(() => {
    const saved = localStorage.getItem("admin_social_links");
    if (saved) {
      try {
        setSocials({ ...defaultSocials, ...JSON.parse(saved) });
      } catch (e) {
        setSocials(defaultSocials);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("admin_social_links", JSON.stringify(socials));
    toast.success("Social media profiles updated successfully!");
  };

  const handleReset = () => {
    if (confirm("Reset social media links to defaults?")) {
      setSocials(defaultSocials);
      localStorage.setItem("admin_social_links", JSON.stringify(defaultSocials));
      toast.success("Social links reset to default values.");
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Social Media Links</h1>
          <p className="text-slate-500 text-xs mt-1">Configure profile links for various social media networks displayed in the navigation header</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleReset} 
            className="border-slate-250 hover:bg-slate-50 text-xs font-semibold px-4 h-9"
          >
            Reset Defaults
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 h-9 shadow-sm"
          >
            Save Profiles
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-bold tracking-wider text-slate-700 uppercase font-mono">Active Social Channels</CardTitle>
            <CardDescription className="text-slate-500 text-xs">Configure links for profiles rendered on the header navigation bar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Linkedin */}
            <div className="space-y-2">
              <Label htmlFor="linkedin-input" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-red-700" />
                LinkedIn URL
              </Label>
              <Input
                id="linkedin-input"
                value={socials.linkedin}
                onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                placeholder="https://www.linkedin.com/company/..."
                className="bg-slate-50/40 border-slate-200 text-xs h-9"
              />
            </div>

            {/* Facebook */}
            <div className="space-y-2">
              <Label htmlFor="facebook-input" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono flex items-center gap-1.5">
                <Facebook className="w-3.5 h-3.5 text-red-600" />
                Facebook URL
              </Label>
              <Input
                id="facebook-input"
                value={socials.facebook}
                onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
                placeholder="https://www.facebook.com/..."
                className="bg-slate-50/40 border-slate-200 text-xs h-9"
              />
            </div>

            {/* Twitter */}
            <div className="space-y-2">
              <Label htmlFor="twitter-input" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono flex items-center gap-1.5">
                <Twitter className="w-3.5 h-3.5 text-sky-500" />
                Twitter / X URL (Optional)
              </Label>
              <Input
                id="twitter-input"
                value={socials.twitter}
                onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
                placeholder="https://x.com/..."
                className="bg-slate-50/40 border-slate-200 text-xs h-9"
              />
            </div>

            {/* Instagram */}
            <div className="space-y-2">
              <Label htmlFor="instagram-input" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                Instagram URL (Optional)
              </Label>
              <Input
                id="instagram-input"
                value={socials.instagram}
                onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                placeholder="https://www.instagram.com/..."
                className="bg-slate-50/40 border-slate-200 text-xs h-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Live Preview Card */}
        <Card className="bg-slate-50/20 border-slate-200 border-dashed shadow-inner flex flex-col justify-center items-center p-8">
          <div className="text-center space-y-4 max-w-sm">
            <Globe className="w-12 h-12 text-slate-350 mx-auto" />
            <h3 className="text-sm font-semibold text-slate-700">Live Header Preview</h3>
            <p className="text-xs text-slate-550 leading-relaxed font-sans">
              Only active channels with valid URLs will appear in the top-right corner of the public header navigation bar.
            </p>
            <div className="flex items-center justify-center gap-4 pt-2">
              {socials.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-100 border text-slate-650 flex items-center justify-center hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {socials.facebook && (
                <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-100 border text-slate-650 flex items-center justify-center hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {socials.twitter && (
                <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-100 border text-slate-650 flex items-center justify-center hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {socials.instagram && (
                <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-100 border text-slate-650 flex items-center justify-center hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200 transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminSocialLinks;
