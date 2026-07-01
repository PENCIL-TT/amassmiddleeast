import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash, MapPin, Globe, Mail, Phone, ChevronRight, Edit2 } from "lucide-react";

interface City {
  name: string;
  lat: number;
  lng: number;
  address: string;
  contacts: string[];
  email?: string;
}

interface Country {
  code: string;
  name: string;
  lat: number;
  lng: number;
  cities: City[];
}

const defaultStaticCountries: Country[] = [
  {
    code: "in",
    name: "India",
    lat: 9.9323,
    lng: 76.2996,
    cities: [
      {
        name: "Kerala",
        lat: 9.9323,
        lng: 76.2996,
        address: "CC 59/801A Elizabeth Memorial Building, Thevara Ferry Jn, Cochin 682013 , Kerala.",
        contacts: ["+91 484 4019192 / 93"]
      },
      {
        name: "Mumbai",
        lat: 19.01123,
        lng: 73.03715,
        address: "803 / 804, Shelton Cubix, Plot No. 87, Sector-15,CBD Belapur, Navi Mumbai, Maharastra - 400614.",
        contacts: ["022-35131688 / 35113475 / 35082586"]
      },
      {
        name: "Mumbai-Andheri",
        lat: 19.11303,
        lng: 72.86848,
        address: "503, Midas, Sahar Plaza Complex,Sir M.V Road,Andheri East, Mumbai 400059",
        contacts: ["+91 8879756838"]
      },
      {
        name: "Delhi",
        lat: 28.62748,
        lng: 77.2221,
        address: "903, Surya Kiran Building K.G Marg,Connaught Place New Delhi - 110001",
        contacts: ["+91 11 493224477 / 48 /49"]
      },
      {
        name: "Bangalore",
        lat: 13.01855,
        lng: 77.64191,
        address: "3C-964 IIIrd Cross Street,HRBR LAYOUT 1st Block,Kalayan Nagar Bannaswadi,Bengaluru - 560043.",
        contacts: ["+91 9841676259"]
      },
      {
        name: "Kolkata",
        lat: 22.5769,
        lng: 88.4341,
        address: "Merlin Matrix, 3rd floor, Room No. 303 10,D. N. BLOCK, SECTOR - V SALT LAKE CITY, Kolkata – 700091",
        contacts: ["+91 33 46025458 / 59 / 60/ 61"]
      }
    ]
  },
  {
    code: "my",
    name: "Malaysia",
    lat: 1.4842,
    lng: 103.7629,
    cities: [
      {
        name: "PASIRGUDANG",
        lat: 1.4842,
        lng: 103.7629,
        address: "Unit 20-03A, Level 20 Menara Zurich, 15 Jalan Dato Abdullah Tahir, 80300 Johor Bahru",
        contacts: ["+603-3319 2778 / 74 / 75, 79"]
      },
      {
        name: "PORTKLANG",
        lat: 2.9982,
        lng: 101.3831,
        address: "MTBBT 2, 3A-5, Jalan Batu Nilam 16, The Landmark (Behind AEON Mall), Bandar Bukit Tinggi 2, 41200, Klang, Selangor D.E",
        contacts: ["+603 - 3319 2778 / 74 / 75"]
      }
    ]
  },
  {
    code: "ae",
    name: "United Arab Emirates (UAE)",
    lat: 25.2048,
    lng: 55.2708,
    cities: [
      {
        name: "Dubai",
        lat: 25.2048,
        lng: 55.2708,
        address: "Office # 509, Al Nazar Plaza, Oud Metha, Dubai, U.A.E",
        contacts: ["+971 4 3433388"]
      },
      {
        name: "JEBEL ALI",
        lat: 24.9857,
        lng: 55.1436,
        address: "Warehouse# Zg06, Near Roundabout 13, North Zone, p. B No: 30821, jebel Ali, Dubai, U.A.E",
        contacts: ["+971 4 8819787"]
      },
      {
        name: "ABU DHABI",
        lat: 24.4539,
        lng: 54.3773,
        address: "PB No: 30500, Office 3-1, Unit 101, 1st Floor, Al Jaber Jewellery Building, Al Khalidiya, Abu Dhabi, U.A.E",
        contacts: ["+971 50 4337214"]
      }
    ]
  },
  {
    code: "qa",
    name: "Qatar",
    lat: 25.276987,
    lng: 51.520008,
    cities: [
      {
        name: "Doha",
        lat: 25.276987,
        lng: 51.520008,
        address: "Office no: 48, 2nd Floor, Al matar Centre, Old Airport Road Doha",
        contacts: ["0974 33622555"]
      }
    ]
  },
  {
    code: "sa",
    name: "Saudi Arabia",
    lat: 26.4207,
    lng: 50.0888,
    cities: [
      {
        name: "Dammam",
        lat: 26.4207,
        lng: 50.0888,
        address: "Building No.2817, Secondary No9403, King Faisal Road, Al Tubebayshi Dist, Dammam, KSA 32233",
        contacts: ["+966 13 343 0003"]
      },
      {
        name: "Riyadh",
        lat: 24.7136,
        lng: 46.6753,
        address: "Room No. T18, Rail Business Centre, Bldg No. 3823, Omar Aimukhtar St, Thulaim, Riyadh 11332",
        contacts: ["+966 11295 0020"]
      },
      {
        name: "Jeddah",
        lat: 21.4858,
        lng: 39.1925,
        address: "Al-Madinah Al-Munawarah Road, Al Sharafeyah, Jeddah 4542 -22234, Kingdom of Saudi Arabia",
        contacts: ["+966 12 578 0874"]
      }
    ]
  },
  {
    code: "sg",
    name: "Singapore",
    lat: 1.3521,
    lng: 103.8198,
    cities: [
      {
        name: "Singapore",
        lat: 1.3521,
        lng: 103.8198,
        address: "Blk 511 Kampong Bahru Road, #03-01 Keppel Distripark, Singapore - 099447",
        contacts: ["+ 65 69080838"],
        email: "info.sg@globalconsol.com"
      }
    ]
  },
  {
    code: "id",
    name: "Indonesia",
    lat: -6.2088,
    lng: 106.8456,
    cities: [
      {
        name: "Jakarta",
        lat: -6.2088,
        lng: 106.8456,
        address: "408, Lina Building, JL.HR Rasuna Said kav B7, Jakarta",
        contacts: ["+62 21 529 20292, 522 4887"]
      },
      {
        name: "Surabaya",
        lat: -7.2575,
        lng: 112.7521,
        address: "Japfa Indoland Center, Japfa Tower 1, Lantai 4/401-A JL Jend, Basuki Rahmat 129-137, Surabaya 60271",
        contacts: ["+62 21 529 20292, 522 4887"]
      }
    ]
  },
  {
    code: "lk",
    name: "Sri Lanka",
    lat: 6.9271,
    lng: 79.8612,
    cities: [
      {
        name: "Colombo",
        lat: 6.9271,
        lng: 79.8612,
        address: "Ceylinco House, 9th Floor, No. 69, Janadhipathi Mawatha, Colombo 01, Sri Lanka",
        contacts: ["+94 114477499", "+94 114477494 / 98"],
        email: "thilanka.cmb@globalconsol.com"
      }
    ]
  },
  {
    code: "th",
    name: "Thailand",
    lat: 13.72957,
    lng: 100.53095,
    cities: [
      {
        name: "Bangkok",
        lat: 13.72957,
        lng: 100.53095,
        address: "109 CCT Building, 3rd Floor, Rm.3, Surawong Road, Suriyawongse, Bangrak, Bangkok 10500 109",
        contacts: ["+662-634-3240", "+662-634-3942"]
      }
    ]
  },
  {
    code: "mm",
    name: "Myanmar",
    lat: 16.8409,
    lng: 96.1735,
    cities: [
      {
        name: "Yangon",
        lat: 16.8409,
        lng: 96.1735,
        address: "No.608, Room 8B, Bo Soon Pat Tower, Merchant Street, Pabedan Township, Yangon, Myanmar",
        contacts: ["+951 243158", "+951 377985, 243101"],
        email: "info@globalconsol.com"
      }
    ]
  },
  {
    code: "bd",
    name: "Bangladesh",
    lat: 23.8103,
    lng: 90.4125,
    cities: [
      {
        name: "Dhaka",
        lat: 23.8103,
        lng: 90.4125,
        address: "ID #9-N (New), 9-M(Old-N), 9th floor, Tower 1, Police Plaza Concord No.2, Road # 144, Gulshan Model Town, Dhaka 1215, Bangladesh",
        contacts: ["+880 1716 620989"],
        email: "info@globalconsol.com"
      }
    ]
  },
  {
    code: "pk",
    name: "Pakistan",
    lat: 24.8608,
    lng: 67.0097,
    cities: [
      {
        name: "Karachi",
        lat: 24.8608,
        lng: 67.0097,
        address: "Suite\u202FNo. 507\u202F&\u202F508, 5th Floor Fortune Center, Block-6, P.E.C.H.S, Shahrah-e-Faisal, Karachi, Pakistan",
        contacts: ["+92\u202F21\u202F34542881/ +92\u202F21\u202F34542882/ +92\u202F21\u202F34542883/ +92\u202F21\u202F34542884"],
        email: "info.pk@ggl.sg"
      },
      {
        name: "Lahore",
        lat: 31.5204,
        lng: 74.3487,
        address: "Office # 301, 3rd Floor, Gulberg Arcade Main Market, Gulberg 2, Lahore, Pakistan",
        contacts: ["+92 42-35782306/07/08"],
        email: "info.pk@globalconsol.com"
      }
    ]
  },
  {
    code: "us",
    name: "United States (USA)",
    lat: 41.8622,
    lng: -87.7209,
    cities: [
      {
        name: "Chicago",
        lat: 41.8622,
        lng: -87.7209,
        address: "939 W. North Avenue, Suite 750, Chicago, IL 60642",
        contacts: ["+1 847 254 7320"],
        email: "info@gglusa.us"
      },
      {
        name: "New York",
        lat: 40.7128,
        lng: -74.0060,
        address: "New Jersey Branch, 33 Wood Avenue South Suite 600, Iselin, NJ 08830",
        contacts: ["+1 732 456 6780"],
        email: "info@gglusa.us"
      },
      {
        name: "Los Angeles",
        lat: 34.0522,
        lng: -118.2437,
        address: "2250 South Central Avenue Compton, CA 90220",
        contacts: ["+1 310 928 3903"],
        email: "info@gglusa.us"
      }
    ]
  },
  {
    code: "gb",
    name: "United Kingdom (UK)",
    lat: 51.5074,
    lng: -0.1278,
    cities: [
      {
        name: "London",
        lat: 51.5074,
        lng: -0.1278,
        address: "167-169 Great Portland Street 5th Floor, London W1W 5PF, United Kingdom",
        contacts: ["+44 (0) 203 393 9508"]
      }
    ]
  },
  {
    code: "au",
    name: "Australia",
    lat: -37.7064,
    lng: 144.8503,
    cities: [
      {
        name: "Melbourne",
        lat: -37.7064,
        lng: 144.8503,
        address: "Suite 5, 7-9 Mallet Road, Tullamarine, Victoria, 3043",
        contacts: ["Mob: +61 432254969", "Tel: +61 388205157"],
        email: "info@gglaustralia.com"
      }
    ]
  },
  {
    code: "ar",
    name: "Argentina",
    lat: -34.5999,
    lng: -58.3810,
    cities: [
      {
        name: "Buenos Aires",
        lat: -34.5999,
        lng: -58.3810,
        address: "Carlos Pellegrini 719, 3A 1009 CABA, Buenos Aires, Argentina",
        contacts: [
          "+54 11 4547 7864",
          "Sales: comercial@agn-argentina.com",
          "Operations: operaciones@agn-argentina.com"
        ]
      }
    ]
  },
  {
    code: "br",
    name: "Brazil",
    lat: -23.6031,
    lng: -46.6741,
    cities: [
      {
        name: "São Paulo \u2013 Moema",
        lat: -23.6031,
        lng: -46.6741,
        address: "Rua Araguari, 835 \u2013 Room 72, Moema, São Paulo, Brazil",
        contacts: [
          "+55 (11) 99411 3006",
          "Sales: sales@agn-brasil.com",
          "Operations: operational@agn-brasil.com",
          "Finance: financeiro@agn-brasil.com"
        ]
      }
    ]
  },
  {
    code: "co",
    name: "Colombia",
    lat: 4.6930,
    lng: -74.0339,
    cities: [
      {
        name: "Bogot\u00e1",
        lat: 4.6930,
        lng: -74.0339,
        address: "Carrera 7 #114\u201333, Oficina 802, Edificio Scotia Bank, Bogot\u00e1, Colombia",
        contacts: [
          "+57 3142188434",
          "ocarreno@agn-colombia.com",
          "www.amassgroup.com"
        ]
      }
    ]
  },
  {
    code: "mx",
    name: "Mexico",
    lat: 19.3879,
    lng: -99.1746,
    cities: [
      {
        name: "Mexico City",
        lat: 19.3879,
        lng: -99.1746,
        address: "Insurgentes Sur 863, Piso 6, Colonia N\u00e1poles, CP 03810, Ciudad de M\u00e9xico, Mexico",
        contacts: [
          "Mobile: +52 5568930543",
          "Office: +52 5556828362 Ext 1002 / +52 5596294019 Ext 1002",
          "yfigueroa@agn-mexico.com.mx"
        ]
      }
    ]
  },
  {
    code: "vn",
    name: "Vietnam",
    lat: 10.803,
    lng: 106.6656,
    cities: [
      {
        name: "Ho Chi Minh City",
        lat: 10.803,
        lng: 106.6656,
        address: "Ground Floor, Sovilaco Building, 01 Pho Quang Street, Tan Son Hoa Ward, Ho Chi Minh City, Vietnam",
        contacts: [
          "+84 28 36366686",
          "Tax ID: 0109670595-001",
          "jennie@mgl.vn",
          "http://mgl.vn"
        ]
      }
    ]
  },
  {
    code: "cl",
    name: "Chile",
    lat: -33.4042,
    lng: -70.5957,
    cities: [
      {
        name: "Santiago (Vitacura)",
        lat: -33.4042,
        lng: -70.5957,
        address: "Av. Vitacura 3535, Oficina 1603, Edificio At\u00e9mpora, Vitacura, Santiago de Chile, Chile",
        contacts: [
          "+56 2 338 88478",
          "+56 9 9837 1770",
          "aritter@agn-chile.com",
          "www.amassfreight.com"
        ]
      }
    ]
  }
];

const AdminGlobalPresence = () => {
  const [mapUrl, setMapUrl] = useState("https://www.google.com/maps/d/embed?mid=16_2W0JMhfZhP2Dl8_HEfPCvoPt5eC-Y&ehbc=2E312F");
  const [countries, setCountries] = useState<Country[]>([]);
  
  // Active editors
  const [selectedCountryIdx, setSelectedCountryIdx] = useState<number | null>(null);
  const [editingCityIdx, setEditingCityIdx] = useState<number | null>(null);
  
  // Form models
  const [countryForm, setCountryForm] = useState({
    code: "",
    name: "",
    lat: 0,
    lng: 0
  });

  const [cityForm, setCityForm] = useState({
    name: "",
    lat: 0,
    lng: 0,
    address: "",
    contacts: "",
    email: ""
  });

  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);

  useEffect(() => {
    const savedMap = localStorage.getItem("admin_global_presence_map_url");
    if (savedMap) setMapUrl(savedMap);

    const savedCountries = localStorage.getItem("admin_global_presence_countries");
    if (savedCountries) {
      try {
        setCountries(JSON.parse(savedCountries));
      } catch (e) {
        setCountries(defaultStaticCountries);
      }
    } else {
      setCountries(defaultStaticCountries);
      localStorage.setItem("admin_global_presence_countries", JSON.stringify(defaultStaticCountries));
    }
  }, []);

  const handleSaveMap = () => {
    localStorage.setItem("admin_global_presence_map_url", mapUrl);
    toast.success("Interactive Map URL saved successfully!");
  };

  const handleSaveCountries = (updatedList: Country[]) => {
    setCountries(updatedList);
    localStorage.setItem("admin_global_presence_countries", JSON.stringify(updatedList));
  };

  const handleReset = () => {
    if (confirm("Reset Global Presence countries and map to default values?")) {
      setMapUrl("https://www.google.com/maps/d/embed?mid=16_2W0JMhfZhP2Dl8_HEfPCvoPt5eC-Y&ehbc=2E312F");
      setCountries(defaultStaticCountries);
      localStorage.setItem("admin_global_presence_map_url", "https://www.google.com/maps/d/embed?mid=16_2W0JMhfZhP2Dl8_HEfPCvoPt5eC-Y&ehbc=2E312F");
      localStorage.setItem("admin_global_presence_countries", JSON.stringify(defaultStaticCountries));
      setSelectedCountryIdx(null);
      setEditingCityIdx(null);
      toast.success("Global presence database reset to defaults.");
    }
  };

  // Add / Edit Country
  const handleOpenAddCountry = () => {
    setCountryForm({ code: "", name: "", lat: 0, lng: 0 });
    setShowCountryModal(true);
  };

  const handleCountrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!countryForm.name || !countryForm.code) {
      toast.error("Please fill in country name and ISO code");
      return;
    }

    const newCountry: Country = {
      code: countryForm.code.toLowerCase().trim(),
      name: countryForm.name,
      lat: Number(countryForm.lat),
      lng: Number(countryForm.lng),
      cities: []
    };

    const updated = [...countries, newCountry];
    handleSaveCountries(updated);
    toast.success("New country added to global presence database!");
    setShowCountryModal(false);
  };

  const handleDeleteCountry = (index: number) => {
    if (!confirm("Delete this country and all of its office locations?")) return;
    const updated = countries.filter((_, idx) => idx !== index);
    handleSaveCountries(updated);
    setSelectedCountryIdx(null);
    toast.success("Country deleted!");
  };

  // Add / Edit City/Office
  const handleOpenAddCity = () => {
    setEditingCityIdx(null);
    setCityForm({
      name: "",
      lat: 0,
      lng: 0,
      address: "",
      contacts: "",
      email: ""
    });
    setShowCityModal(true);
  };

  const handleOpenEditCity = (cityIdx: number, city: City) => {
    setEditingCityIdx(cityIdx);
    setCityForm({
      name: city.name,
      lat: city.lat,
      lng: city.lng,
      address: city.address,
      contacts: city.contacts.join(", "),
      email: city.email || ""
    });
    setShowCityModal(true);
  };

  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCountryIdx === null) return;

    if (!cityForm.name || !cityForm.address) {
      toast.error("Office name and street address are required");
      return;
    }

    const cityPayload: City = {
      name: cityForm.name,
      lat: Number(cityForm.lat),
      lng: Number(cityForm.lng),
      address: cityForm.address,
      contacts: cityForm.contacts.split(",").map(c => c.trim()).filter(Boolean),
      email: cityForm.email || undefined
    };

    const targetCountry = countries[selectedCountryIdx];
    let updatedCities = [...targetCountry.cities];

    if (editingCityIdx !== null) {
      updatedCities[editingCityIdx] = cityPayload;
      toast.success("Office coordinates and addresses updated!");
    } else {
      updatedCities.push(cityPayload);
      toast.success("New office location added!");
    }

    const updatedCountries = countries.map((c, idx) => 
      idx === selectedCountryIdx ? { ...c, cities: updatedCities } : c
    );

    handleSaveCountries(updatedCountries);
    setShowCityModal(false);
  };

  const handleDeleteCity = (cityIdx: number) => {
    if (selectedCountryIdx === null || !confirm("Remove this office location?")) return;

    const targetCountry = countries[selectedCountryIdx];
    const updatedCities = targetCountry.cities.filter((_, idx) => idx !== cityIdx);
    
    const updatedCountries = countries.map((c, idx) => 
      idx === selectedCountryIdx ? { ...c, cities: updatedCities } : c
    );

    handleSaveCountries(updatedCountries);
    toast.success("Office location removed!");
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Global Presence</h1>
          <p className="text-slate-500 text-xs mt-1">Configure map coordinate URL systems and office contact points</p>
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
        {/* Left Side: Map URL & Country List */}
        <div className="lg:col-span-1 space-y-6">
          {/* Map URL Card */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-bold tracking-wider text-slate-700 uppercase font-mono">Map Configuration</CardTitle>
              <CardDescription className="text-slate-500 text-xs font-sans">Paste Google My Maps embed link here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Google Embed Link</Label>
                <Input 
                  value={mapUrl}
                  onChange={(e) => setMapUrl(e.target.value)}
                  className="bg-slate-50/40 border-slate-200 text-xs font-mono"
                  placeholder="https://www.google.com/maps/d/embed?..."
                />
              </div>
              <Button onClick={handleSaveMap} className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold h-8.5">
                Save Map URL
              </Button>
            </CardContent>
          </Card>

          {/* Countries Card */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
              <div>
                <CardTitle className="text-xs font-bold tracking-wider text-slate-700 uppercase font-mono">Countries</CardTitle>
                <CardDescription className="text-slate-500 text-xs">Manage active regions</CardDescription>
              </div>
              <Button onClick={handleOpenAddCountry} className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold h-8 w-8 p-0 flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4 px-2">
              <div className="space-y-1">
                {countries.map((c, i) => (
                  <button
                    key={c.code + i}
                    onClick={() => setSelectedCountryIdx(i)}
                    className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-colors ${selectedCountryIdx === i ? "bg-red-50 text-red-700 border border-red-100" : "hover:bg-slate-50 text-slate-700 border border-transparent"}`}
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={`/${c.code.toLowerCase()}.svg`} 
                        alt={`${c.name} flag`} 
                        className="w-7 h-5 rounded-sm object-cover shadow-sm border border-slate-100 flex-shrink-0"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                      <span className="text-sm font-semibold">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-mono font-bold">
                        {c.cities?.length || 0}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Offices inside selected country */}
        <div className="lg:col-span-2">
          {selectedCountryIdx !== null ? (
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between border-b pb-3.5">
                <div>
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    {countries[selectedCountryIdx].name} Offices
                  </CardTitle>
                  <CardDescription className="text-slate-500 text-xs">
                    Focus center: Lat {countries[selectedCountryIdx].lat}, Lng {countries[selectedCountryIdx].lng}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleDeleteCountry(selectedCountryIdx)} 
                    variant="outline"
                    className="text-rose-600 hover:text-rose-700 border-rose-200 hover:bg-rose-50 text-xs font-semibold h-8"
                  >
                    Delete Country
                  </Button>
                  <Button 
                    onClick={handleOpenAddCity} 
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold h-8 flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Office Location
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {countries[selectedCountryIdx].cities.map((city, cityIdx) => (
                    <div key={cityIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between border-b pb-1.5 mb-2">
                          <h4 className="text-sm font-semibold text-slate-800">{city.name}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {city.lat}, {city.lng}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 min-h-[40px] leading-relaxed whitespace-pre-line">{city.address}</p>
                        
                        <div className="space-y-1.5 pt-2">
                          {city.contacts.map((phone, pIdx) => (
                            <div key={pIdx} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              <span className="font-mono">{phone}</span>
                            </div>
                          ))}
                          {city.email && (
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              <span className="font-mono">{city.email}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 border-t pt-2 mt-auto">
                        <Button 
                          variant="outline" 
                          onClick={() => handleOpenEditCity(cityIdx, city)}
                          className="text-xs h-7.5 px-3 flex items-center gap-1"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </Button>
                        <Button 
                          variant="ghost"
                          onClick={() => handleDeleteCity(cityIdx)}
                          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 h-7.5 w-7.5 p-0 flex items-center justify-center"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {countries[selectedCountryIdx].cities.length === 0 && (
                  <div className="py-12 text-center border border-dashed rounded-xl flex flex-col items-center justify-center text-slate-400">
                    <MapPin className="w-10 h-10 mb-2 text-slate-350" />
                    <span className="text-xs">No office locations added for this country yet.</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="h-full border border-dashed rounded-xl flex flex-col items-center justify-center p-12 text-slate-400 bg-slate-50/20">
              <Globe className="w-12 h-12 mb-3 text-slate-300" />
              <p className="text-sm font-semibold">Select a country from the left side panel to manage its office list</p>
            </div>
          )}
        </div>
      </div>

      {/* Country Modal Dialog */}
      {showCountryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-4">
          <Card className="w-full max-w-sm bg-white border border-slate-200 shadow-xl">
            <CardHeader className="border-b pb-3.5">
              <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Add New Country</CardTitle>
            </CardHeader>
            <form onSubmit={handleCountrySubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Country Name</Label>
                  <Input 
                    value={countryForm.name}
                    onChange={(e) => setCountryForm({ ...countryForm, name: e.target.value })}
                    placeholder="e.g. India"
                    className="bg-slate-50/40 border-slate-200 text-xs h-9 font-semibold"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">ISO Code (lowercase)</Label>
                  <Input 
                    value={countryForm.code}
                    onChange={(e) => setCountryForm({ ...countryForm, code: e.target.value })}
                    placeholder="e.g. in, my, sg"
                    className="bg-slate-50/40 border-slate-200 text-xs h-9 font-mono"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Focus Lat</Label>
                    <Input 
                      type="number"
                      step="any"
                      value={countryForm.lat}
                      onChange={(e) => setCountryForm({ ...countryForm, lat: Number(e.target.value) })}
                      className="bg-slate-50/40 border-slate-200 text-xs h-9 font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Focus Lng</Label>
                    <Input 
                      type="number"
                      step="any"
                      value={countryForm.lng}
                      onChange={(e) => setCountryForm({ ...countryForm, lng: Number(e.target.value) })}
                      className="bg-slate-50/40 border-slate-200 text-xs h-9 font-mono"
                      required
                    />
                  </div>
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

      {/* Office Modal Dialog */}
      {showCityModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white border border-slate-200 shadow-xl">
            <CardHeader className="border-b pb-3.5">
              <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">
                {editingCityIdx !== null ? "Edit Office Location" : "Add Office Location"}
              </CardTitle>
            </CardHeader>
            <form onSubmit={handleCitySubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Office / City Name</Label>
                  <Input 
                    value={cityForm.name}
                    onChange={(e) => setCityForm({ ...cityForm, name: e.target.value })}
                    placeholder="e.g. Mumbai"
                    className="bg-slate-50/40 border-slate-200 text-xs h-9 font-semibold"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Latitude</Label>
                    <Input 
                      type="number"
                      step="any"
                      value={cityForm.lat}
                      onChange={(e) => setCityForm({ ...cityForm, lat: Number(e.target.value) })}
                      className="bg-slate-50/40 border-slate-200 text-xs h-9 font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Longitude</Label>
                    <Input 
                      type="number"
                      step="any"
                      value={cityForm.lng}
                      onChange={(e) => setCityForm({ ...cityForm, lng: Number(e.target.value) })}
                      className="bg-slate-50/40 border-slate-200 text-xs h-9 font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Street Address</Label>
                  <Textarea 
                    rows={3}
                    value={cityForm.address}
                    onChange={(e) => setCityForm({ ...cityForm, address: e.target.value })}
                    placeholder="Street Address..."
                    className="bg-slate-50/40 border-slate-200 text-xs p-2.5"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Contact Numbers (comma-separated)</Label>
                  <Input 
                    value={cityForm.contacts}
                    onChange={(e) => setCityForm({ ...cityForm, contacts: e.target.value })}
                    placeholder="e.g. +91 484 4019192, 022-35131688"
                    className="bg-slate-50/40 border-slate-200 text-xs h-9"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Email Address (Optional)</Label>
                  <Input 
                    type="email"
                    value={cityForm.email}
                    onChange={(e) => setCityForm({ ...cityForm, email: e.target.value })}
                    placeholder="e.g. info@globalconsol.com"
                    className="bg-slate-50/40 border-slate-200 text-xs h-9"
                  />
                </div>
              </CardContent>
              <div className="flex justify-end gap-2 p-4 border-t bg-slate-50 rounded-b-lg">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCityModal(false)}
                  className="text-xs h-8"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold h-8"
                >
                  {editingCityIdx !== null ? "Update Office" : "Add Office"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminGlobalPresence;
