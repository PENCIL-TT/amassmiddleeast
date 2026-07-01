import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const AdminContactForm = () => {
  const [data, setData] = useState({
    titleText: "Get In Touch",
    subtitleText: "Have questions? We would love to hear from you. Send us a message or find our offices below.",
    recipientEmail: "contact@dxb.amassfreight.com",
    offices: {
      UAE: [
        {
          name: "Head Office",
          address: "202, Sultan Business Centre\nOud Metha, P.O. Box 33463\nDubai – UAE",
          phone: "+971 4 3575508",
          fax: "+971 4 2221794",
          email: "contact@dxb.amassfreight.com",
        },
        {
          name: "CFS",
          address: "Plot No S20312,\nJafza South,\nJebel Ali, Dubai – UAE",
          phone: "+971 4 3400298",
          fax: "+971 4 8831004",
          email: "contact@dxb.amassfreight.com",
        },
      ],
      China: [
        {
          name: "Shanghai – Head Office",
          address: "21-22F, NO.1089, Dongdaming Road,\nHongkou, Shanghai, P.R.C.",
          phone: "+86 18121430682",
          fax: "",
          email: "ec@amassfreight.com",
        },
      ],
      "Saudi Arabia": [
        {
          name: "Dammam – Head Office",
          address: "Rashidiya Business Center\nBuild No: 7257 Room 308, 3rd Floor – Al Amamrah\nDammam – 32415 – KSA",
          phone: "+966 13 849 8637",
          fax: "",
          email: "contact@dxb.amassfreight.com",
        },
        {
          name: "Jeddah",
          address: "Room No. 408, Saudi Business Centre\n7859 Al Madinah Al Munawarah Road\nAl Sharafeyah, Jeddah 4542-22234",
          phone: "+966 12 578 0874",
          fax: "",
          email: "contact@dxb.amassfreight.com",
        },
        {
          name: "Riyadh",
          address: "Room No. 20, Al Malaz\nBldg. No. 104, 2nd Floor, Al Qirawani St.\nAl Malaz District, Riyadh 11332, K.S.A",
          phone: "+966 13 849 8630",
          fax: "",
          email: "contact@dxb.amassfreight.com",
        },
      ],
    }
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_contact_form");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("admin_contact_form", JSON.stringify(data));
    toast.success("Contact section data saved successfully!");
  };

  const handleReset = () => {
    if (confirm("Reset Contact section to defaults?")) {
      const defaults = {
        titleText: "Get In Touch",
        subtitleText: "Have questions? We would love to hear from you. Send us a message or find our offices below.",
        recipientEmail: "contact@dxb.amassfreight.com",
        offices: {
          UAE: [
            {
              name: "Head Office",
              address: "202, Sultan Business Centre\nOud Metha, P.O. Box 33463\nDubai – UAE",
              phone: "+971 4 3575508",
              fax: "+971 4 2221794",
              email: "contact@dxb.amassfreight.com",
            },
            {
              name: "CFS",
              address: "Plot No S20312,\nJafza South,\nJebel Ali, Dubai – UAE",
              phone: "+971 4 3400298",
              fax: "+971 4 8831004",
              email: "contact@dxb.amassfreight.com",
            },
          ],
          China: [
            {
              name: "Shanghai – Head Office",
              address: "21-22F, NO.1089, Dongdaming Road,\nHongkou, Shanghai, P.R.C.",
              phone: "+86 18121430682",
              fax: "",
              email: "ec@amassfreight.com",
            },
          ],
          "Saudi Arabia": [
            {
              name: "Dammam – Head Office",
              address: "Rashidiya Business Center\nBuild No: 7257 Room 308, 3rd Floor – Al Amamrah\nDammam – 32415 – KSA",
              phone: "+966 13 849 8637",
              fax: "",
              email: "contact@dxb.amassfreight.com",
            },
            {
              name: "Jeddah",
              address: "Room No. 408, Saudi Business Centre\n7859 Al Madinah Al Munawarah Road\nAl Sharafeyah, Jeddah 4542-22234",
              phone: "+966 12 578 0874",
              fax: "",
              email: "contact@dxb.amassfreight.com",
            },
            {
              name: "Riyadh",
              address: "Room No. 20, Al Malaz\nBldg. No. 104, 2nd Floor, Al Qirawani St.\nAl Malaz District, Riyadh 11332, K.S.A",
              phone: "+966 13 849 8630",
              fax: "",
              email: "contact@dxb.amassfreight.com",
            },
          ],
        }
      };
      setData(defaults);
      localStorage.setItem("admin_contact_form", JSON.stringify(defaults));
      toast.success("Reset to default contact parameters.");
    }
  };

  const handleOfficeFieldChange = (
    country: "UAE" | "China" | "Saudi Arabia",
    index: number,
    field: "name" | "address" | "phone" | "fax" | "email",
    val: string
  ) => {
    setData(prev => {
      const updatedCountryOffices = [...prev.offices[country]];
      updatedCountryOffices[index] = {
        ...updatedCountryOffices[index],
        [field]: val
      };
      return {
        ...prev,
        offices: {
          ...prev.offices,
          [country]: updatedCountryOffices
        }
      };
    });
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Home Contact Section</h1>
          <p className="text-slate-500 text-xs mt-1">Configure layout heading, submission target email, and detailed office contact information</p>
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
            Save Contact Details
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* General Settings */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">General Settings</CardTitle>
            <CardDescription className="text-slate-500 text-xs">Configure the headers and the submission target email</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[10px] font-bold tracking-widest text-slate-505 uppercase font-mono">Section Title</Label>
              <Input 
                id="title" 
                value={data.titleText}
                onChange={(e) => setData({ ...data, titleText: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 h-10 px-3 text-sm font-semibold"
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
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-bold tracking-widest text-slate-505 uppercase font-mono">Submissions Email Recipient</Label>
              <Input 
                id="email" 
                value={data.recipientEmail}
                onChange={(e) => setData({ ...data, recipientEmail: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 h-10 px-3 text-sm font-mono"
              />
            </div>
          </CardContent>
        </Card>

        {/* Office Details */}
        {(Object.keys(data.offices) as Array<"UAE" | "China" | "Saudi Arabia">).map((country) => (
          <Card key={country} className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">{country} Offices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {data.offices[country].map((office, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full font-mono border border-red-100">
                      {office.name || `Office ${idx + 1}`}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-[9px] font-bold tracking-wider text-slate-500 uppercase font-mono">Office Display Name</Label>
                      <Input 
                        value={office.name}
                        onChange={(e) => handleOfficeFieldChange(country, idx, "name", e.target.value)}
                        className="bg-white border-slate-200 text-slate-800 h-9 px-3 text-xs font-semibold"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-[9px] font-bold tracking-wider text-slate-500 uppercase font-mono">Address (use \n or linebreaks)</Label>
                      <Textarea 
                        rows={3}
                        value={office.address}
                        onChange={(e) => handleOfficeFieldChange(country, idx, "address", e.target.value)}
                        className="bg-white border-slate-200 text-slate-800 p-2 text-xs leading-relaxed"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[9px] font-bold tracking-wider text-slate-500 uppercase font-mono">Phone</Label>
                      <Input 
                        value={office.phone}
                        onChange={(e) => handleOfficeFieldChange(country, idx, "phone", e.target.value)}
                        className="bg-white border-slate-200 text-slate-850 h-9 px-3 text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[9px] font-bold tracking-wider text-slate-500 uppercase font-mono">Fax (Optional)</Label>
                      <Input 
                        value={office.fax}
                        onChange={(e) => handleOfficeFieldChange(country, idx, "fax", e.target.value)}
                        className="bg-white border-slate-200 text-slate-850 h-9 px-3 text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-[9px] font-bold tracking-wider text-slate-500 uppercase font-mono">Email Address</Label>
                      <Input 
                        value={office.email}
                        onChange={(e) => handleOfficeFieldChange(country, idx, "email", e.target.value)}
                        className="bg-white border-slate-200 text-slate-850 h-9 px-3 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminContactForm;
