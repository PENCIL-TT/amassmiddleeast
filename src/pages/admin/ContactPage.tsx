import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash, Edit2, Globe, MapPin, Phone, ChevronRight } from "lucide-react";

interface LocationDetails {
  map: string;
  address: string;
  phone: string;
}

interface CountryLocations {
  [locationName: string]: LocationDetails;
}

interface LocationsData {
  [countryName: string]: CountryLocations;
}

const defaultStaticLocations: LocationsData = {
  UAE: {
    "Head Office": {
      map: "https://www.google.com/maps/d/embed?mid=1ZxPAULjAWy996Ko2I-INOx4KZVyxwz0&ehbc=2E312F&noprof=1",
      address: "202, Sultan Business Centre\nOud Metha, P.O. Box 33463\nDubai – UAE",
      phone: "+971 4 3575508\nFax: +971 4 2221794\ncontact@dxb.amassfreight.com",
    },
    CFS: {
      map: "https://www.google.com/maps/d/embed?mid=12VFJg6YBwuqjx5QGoyFa4gN4o0N9zv0&ehbc=2E312F&noprof=1",
      address: "Plot No S20312,\nJafza South,\nJebel Ali, Dubai – UAE",
      phone: "+971 4 3400298\n+971 4 3575508\nFax: +971 4 8831004\ncontact@dxb.amassfreight.com",
    },
  },
  "Saudi Arabia": {
    "Dammam – Head Office": {
      map: "https://www.google.com/maps/d/embed?mid=1_S1WHf8uTs8qQrU-2vVxJDGZN1xvqss&ehbc=2E312F&noprof=1",
      address: "Rashidiya Business Center\nBuild No: 7257 Room 308, 3rd Floor – Al Amamrah\nDammam – 32415 – KSA",
      phone: "+966 13 849 8637\ncontact@dxb.amassfreight.com",
    },
    Jeddah: {
      map: "https://www.google.com/maps/d/embed?mid=1vrlsL0ACTChy50rWZCiqqYvfOvIqLdQ&ehbc=2E312F&noprof=1",
      address: "Room No. 408, Saudi Business Centre\n7859 Al Madinah Al Munawarah Road\nAl Sharafeyah, Jeddah 4542-22234",
      phone: "+966 12 578 0874\ncontact@dxb.amassfreight.com",
    },
    Riyadh: {
      map: "https://www.google.com/maps/d/embed?mid=13FJaQb-RxFxmAUPvNdKkH2Hz7VXxFJM&ehbc=2E312F&noprof=1",
      address: "Room No. 20, Al Malaz\nBldg. No. 104, 2nd Floor, Al Qirawani St.\nAl Malaz District, Riyadh 11332, K.S.A",
      phone: "+966 13 849 8630\ncontact@dxb.amassfreight.com",
    },
  },
  China: {
    "Shanghai – Head Office": {
      map: "https://www.google.com/maps/d/embed?mid=153sVA8hp7IyPrA_S6fvRb4xMGe7d85o&ehbc=2E312F&noprof=1",
      address: "21-22F, NO.1089, Dongdaming Road,\nHongkou, Shanghai, P.R.C.",
      phone: "+86 18121430682\nec@amassfreight.com",
    },
  },
};

const AdminContactPage = () => {
  const [locations, setLocations] = useState<LocationsData>({});
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Form states
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [newCountryName, setNewCountryName] = useState("");

  const [showOfficeModal, setShowOfficeModal] = useState(false);
  const [officeForm, setOfficeForm] = useState({
    originalName: "", // blank if adding
    name: "",
    map: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_contact_locations");
    if (saved) {
      try {
        setLocations(JSON.parse(saved));
      } catch (e) {
        setLocations(defaultStaticLocations);
      }
    } else {
      setLocations(defaultStaticLocations);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(locations).length > 0 && !selectedCountry) {
      setSelectedCountry(Object.keys(locations)[0]);
    }
  }, [locations, selectedCountry]);

  const saveToLocalStorage = (updated: LocationsData) => {
    setLocations(updated);
    localStorage.setItem("admin_contact_locations", JSON.stringify(updated));
  };

  const handleReset = () => {
    if (confirm("Reset all contact page locations and map URLs to defaults?")) {
      saveToLocalStorage(defaultStaticLocations);
      setSelectedCountry(Object.keys(defaultStaticLocations)[0]);
      toast.success("Contact locations reset to default settings!");
    }
  };

  // Country operations
  const handleAddCountry = (e: React.FormEvent) => {
    e.preventDefault();
    const cName = newCountryName.trim();
    if (!cName) return;

    if (locations[cName]) {
      toast.error("Country already exists!");
      return;
    }

    const updated = { ...locations, [cName]: {} };
    saveToLocalStorage(updated);
    setSelectedCountry(cName);
    setShowCountryModal(false);
    setNewCountryName("");
    toast.success("Country added successfully!");
  };

  const handleDeleteCountry = (cName: string) => {
    if (!confirm(`Delete ${cName} and all associated office addresses?`)) return;

    const updated = { ...locations };
    delete updated[cName];
    saveToLocalStorage(updated);

    const keys = Object.keys(updated);
    setSelectedCountry(keys.length > 0 ? keys[0] : null);
    toast.success("Country deleted!");
  };

  // Office operations
  const handleOpenAddOffice = () => {
    setOfficeForm({
      originalName: "",
      name: "",
      map: "",
      address: "",
      phone: "",
    });
    setShowOfficeModal(true);
  };

  const handleOpenEditOffice = (name: string, details: LocationDetails) => {
    setOfficeForm({
      originalName: name,
      name,
      map: details.map,
      address: details.address,
      phone: details.phone,
    });
    setShowOfficeModal(true);
  };

  const handleOfficeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCountry) return;

    const name = officeForm.name.trim();
    if (!name) {
      toast.error("Office name is required");
      return;
    }

    const details: LocationDetails = {
      map: officeForm.map.trim(),
      address: officeForm.address,
      phone: officeForm.phone,
    };

    const countryOffices = { ...locations[selectedCountry] };

    // Rename detection
    if (officeForm.originalName && officeForm.originalName !== name) {
      delete countryOffices[officeForm.originalName];
    }

    countryOffices[name] = details;

    const updated = {
      ...locations,
      [selectedCountry]: countryOffices,
    };

    saveToLocalStorage(updated);
    setShowOfficeModal(false);
    toast.success("Office saved successfully!");
  };

  const handleDeleteOffice = (officeName: string) => {
    if (!selectedCountry || !confirm(`Remove office "${officeName}"?`)) return;

    const countryOffices = { ...locations[selectedCountry] };
    delete countryOffices[officeName];

    const updated = {
      ...locations,
      [selectedCountry]: countryOffices,
    };

    saveToLocalStorage(updated);
    toast.success("Office location removed!");
  };

  const countryKeys = Object.keys(locations);

  return (
    <div className="space-y-6 text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Contact Page Locations</h1>
          <p className="text-slate-500 text-xs mt-1">Configure offices, multi-line addresses, and direct Google Map embeds for the Contact Us page</p>
        </div>
        <div>
          <Button 
            variant="outline" 
            onClick={handleReset} 
            className="border-slate-250 hover:bg-slate-50 text-xs font-semibold px-4 h-9"
          >
            Reset Database Defaults
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side Country Manager */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm animate-in fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
              <div>
                <CardTitle className="text-xs font-bold tracking-wider text-slate-700 uppercase font-mono">Countries</CardTitle>
                <CardDescription className="text-slate-500 text-xs">Manage active display regions</CardDescription>
              </div>
              <Button onClick={() => setShowCountryModal(true)} className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold h-8 w-8 p-0 flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4 px-2">
              <div className="space-y-1">
                {countryKeys.map((cName) => (
                  <button
                    key={cName}
                    onClick={() => setSelectedCountry(cName)}
                    className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-colors ${selectedCountry === cName ? "bg-red-50 text-red-700 border border-red-100" : "hover:bg-slate-50 text-slate-700 border border-transparent"}`}
                  >
                    <div className="flex items-center gap-2">
                      <Globe className={`w-4 h-4 ${selectedCountry === cName ? "text-red-600" : "text-slate-400"}`} />
                      <span className="text-sm font-semibold">{cName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-mono font-bold">
                        {Object.keys(locations[cName] || {}).length}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side Office List Details */}
        <div className="lg:col-span-2">
          {selectedCountry ? (
            <Card className="bg-white border-slate-200 shadow-sm animate-in fade-in">
              <CardHeader className="flex flex-row items-center justify-between border-b pb-3.5">
                <div>
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    {selectedCountry} Offices
                  </CardTitle>
                  <CardDescription className="text-slate-500 text-xs">
                    Locations displayed on the dynamic Contact map selector
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleDeleteCountry(selectedCountry)} 
                    variant="outline"
                    className="text-rose-600 hover:text-rose-700 border-rose-200 hover:bg-rose-50 text-xs font-semibold h-8"
                  >
                    Delete Country
                  </Button>
                  <Button 
                    onClick={handleOpenAddOffice} 
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold h-8 flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Branch Office
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(locations[selectedCountry] || {}).map(([officeName, details]) => (
                    <div key={officeName} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between border-b pb-1.5 mb-2">
                          <h4 className="text-sm font-semibold text-slate-800">{officeName}</h4>
                          <MapPin className="w-3.5 h-3.5 text-red-600" />
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Physical Address</span>
                            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-sans">{details.address}</p>
                          </div>
                          <div className="pt-1.5 border-t border-slate-100">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Contacts / Fax / Emails</span>
                            <p className="text-[11px] font-mono text-slate-600 leading-relaxed whitespace-pre-line">{details.phone}</p>
                          </div>
                          {details.map && (
                            <div className="pt-1.5 border-t border-slate-100">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Embed Map URL</span>
                              <p className="text-[10px] font-mono text-red-600 truncate">{details.map}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 border-t pt-2 mt-auto">
                        <Button 
                          variant="outline" 
                          onClick={() => handleOpenEditOffice(officeName, details)}
                          className="text-xs h-7.5 px-3 flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" /> Edit Office
                        </Button>
                        <Button 
                          variant="ghost"
                          onClick={() => handleDeleteOffice(officeName)}
                          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 h-7.5 w-7.5 p-0 flex items-center justify-center"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {Object.keys(locations[selectedCountry] || {}).length === 0 && (
                  <div className="py-12 text-center border border-dashed rounded-xl flex flex-col items-center justify-center text-slate-400">
                    <MapPin className="w-10 h-10 mb-2 text-slate-350" />
                    <span className="text-xs">No offices added for this country yet.</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="h-full border border-dashed rounded-xl flex flex-col items-center justify-center p-12 text-slate-400 bg-slate-50/20">
              <Globe className="w-12 h-12 mb-3 text-slate-300" />
              <p className="text-sm font-semibold">Select a country from the left side panel to manage its office locations</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Country Modal */}
      {showCountryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-4">
          <Card className="w-full max-w-sm bg-white border border-slate-200 shadow-xl">
            <CardHeader className="border-b pb-3.5">
              <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Add Display Country</CardTitle>
            </CardHeader>
            <form onSubmit={handleAddCountry}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Country Name</Label>
                  <Input 
                    value={newCountryName}
                    onChange={(e) => setNewCountryName(e.target.value)}
                    placeholder="e.g. United Kingdom"
                    className="bg-slate-50/40 border-slate-200 text-xs h-9 font-semibold"
                    required
                    autoFocus
                  />
                </div>
              </CardContent>
              <div className="flex justify-end gap-2 p-4 border-t bg-slate-50 rounded-b-lg">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCountryModal(false)}
                  className="text-xs h-8"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold h-8"
                >
                  Add Country
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Add/Edit Office Modal */}
      {showOfficeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white border border-slate-200 shadow-xl">
            <CardHeader className="border-b pb-3.5">
              <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">
                {officeForm.originalName ? "Edit Office Details" : "Add Branch Office"}
              </CardTitle>
            </CardHeader>
            <form onSubmit={handleOfficeSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Office / City Name</Label>
                  <Input 
                    value={officeForm.name}
                    onChange={(e) => setOfficeForm({ ...officeForm, name: e.target.value })}
                    placeholder="e.g. Shanghai – Head Office"
                    className="bg-slate-50/40 border-slate-200 text-xs h-9 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Google Map Embed Link</Label>
                  <Input 
                    value={officeForm.map}
                    onChange={(e) => setOfficeForm({ ...officeForm, map: e.target.value })}
                    placeholder="https://www.google.com/maps/d/embed?..."
                    className="bg-slate-50/40 border-slate-200 text-xs h-9 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Physical Address (supports multiple lines)</Label>
                  <Textarea 
                    rows={3}
                    value={officeForm.address}
                    onChange={(e) => setOfficeForm({ ...officeForm, address: e.target.value })}
                    placeholder="202, Sultan Business Centre..."
                    className="bg-slate-50/40 border-slate-200 text-xs p-2.5"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Contacts / Faxes / Emails (supports multiple lines)</Label>
                  <Textarea 
                    rows={3}
                    value={officeForm.phone}
                    onChange={(e) => setOfficeForm({ ...officeForm, phone: e.target.value })}
                    placeholder="+971 4 3575508&#10;Fax: +971 4 2221794&#10;contact@dxb.amassfreight.com"
                    className="bg-slate-50/40 border-slate-200 text-xs p-2.5 font-mono"
                  />
                </div>
              </CardContent>
              <div className="flex justify-end gap-2 p-4 border-t bg-slate-50 rounded-b-lg">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowOfficeModal(false)}
                  className="text-xs h-8"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold h-8"
                >
                  {officeForm.originalName ? "Save Office" : "Create Office"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminContactPage;
