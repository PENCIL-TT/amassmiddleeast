import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { getCurrentCountryFromPath, detectCountryByIP } from '@/services/countryDetection';

interface CountryData {
  country: string;
  company: string;
  website: string;
  priority: number;
  flag?: string;
  route?: string;
  visibilityByCountry?: Record<string, boolean>;
}

const countries: CountryData[] = [
  // --- Singapore (two options) ---
  { country: "SINGAPORE", company: "GC",   website: "https://www.globalconsol.com", priority: 1,   flag: "/sg.svg", route: "/" },

  { country: "SRI LANKA", company: "GC", website: "https://www.globalconsol.com/sri-lanka/home", priority: 2, flag: "/lk.svg", route: "/sri-lanka/home" },
  { country: "MYANMAR", company: "GC", website: "https://www.globalconsol.com/myanmar/home", priority: 3, flag: "/mm.svg", route: "/myanmar/home" },
  { country: "BANGLADESH", company: "GC", website: "https://www.globalconsol.com/bangladesh/home", priority: 4, flag: "/bd.svg", route: "/bangladesh/home" },
  { country: "PAKISTAN", company: "GC", website: "https://www.globalconsol.com/pakistan/home", priority: 5, flag: "/pk.svg", route: "/pakistan/home" },
  { country: "CHINA", company: "Amass", website: "https://www.amassfreight.com/", priority: 6, flag: "/cn.svg", route: "/china/home" },

  // Hidden only in Bangladesh
  { country: "MALAYSIA", company: "OECL", website: "https://oecl.sg/malaysia", priority: 6, flag: "/my.svg", route: "/malaysia/home",
    visibilityByCountry: { BANGLADESH: false } },
  { country: "INDONESIA", company: "OECL", website: "https://oecl.sg/indonesia", priority: 7, flag: "/id.svg", route: "/indonesia/home",
    visibilityByCountry: { BANGLADESH: false } },
  { country: "THAILAND", company: "OECL", website: "https://oecl.sg/thailand", priority: 8, flag: "/th.svg", route: "/thailand/home",
    visibilityByCountry: { BANGLADESH: false } },

  { country: "INDIA", company: "GGL", website: "https://gglindia.com", priority: 8, flag: "/in.svg", route: "/india/home" },
  { country: "AUSTRALIA", company: "GGL", website: "https://www.gglaustralia.com/", priority: 10, flag: "/au.svg", route: "/australia/home" },
  { country: "QATAR", company: "ONE GLOBAL", website: "https://oneglobalqatar.com/", priority: 11, flag: "/qa.svg", route: "/qatar/home" },
  { country: "SAUDI ARABIA", company: "AMASS", website: "https://amassmiddleeast.com/", priority: 12, flag: "/saudi-arabia/home" },
  { country: "UAE", company: "AMASS", website: "https://amassmiddleeast.com/", priority: 13, flag: "/uae/home" },
  { country: "USA", company: "GGL", website: "https://gglusa.us/", priority: 14, flag: "/usa/home",
    visibilityByCountry: { MYANMAR: false } },
  { country: "UK", company: "GGL", website: "https://www.ggl.sg/uk", priority: 15, flag: "/uk/home" }
];

const CountrySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ipCountry, setIpCountry] = useState<{ code: string; name: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const [countriesList, setCountriesList] = useState<CountryData[]>(countries);

  // Safe fallback if detection fails
  const detected = getCurrentCountryFromPath(location.pathname) ?? { code: "SG", name: "Singapore" };
  const currentCountryName = detected.name?.toUpperCase() || "SINGAPORE";

  // Load custom admin country configurations and detect IP
  useEffect(() => {
    const detect = async () => {
      try {
        const saved = localStorage.getItem("preferredCountry");
        if (saved) {
          setIpCountry(JSON.parse(saved));
        } else {
          const c = await detectCountryByIP();
          setIpCountry(c);
        }
      } catch {
        setIpCountry(null);
      }
    };
    detect();

    const savedList = localStorage.getItem("admin_countries_list");
    if (savedList) {
      try {
        const parsed = JSON.parse(savedList);
        if (Array.isArray(parsed)) {
          const mapped = parsed.map(c => {
            const original = countries.find(o => o.country.toLowerCase() === c.name.toLowerCase());
            return {
              country: c.name.toUpperCase(),
              company: c.company,
              website: c.defaultRoute.startsWith('http') ? c.defaultRoute : `https://amassmiddleeast.com${c.defaultRoute}`,
              priority: original?.priority || 15,
              flag: c.flag,
              route: c.defaultRoute,
              visibilityByCountry: original?.visibilityByCountry
            };
          });
          setCountriesList(mapped);
        }
      } catch (e) {
        console.error("Failed to parse custom country list:", e);
      }
    }
  }, []);

  // Show ALL countries (including current) but still respect visibility rules
  const visibleCountries = countriesList.filter(c =>
    !c.visibilityByCountry || c.visibilityByCountry[currentCountryName] !== false
  );

  // Stable sort: priority first, then company as tie-breaker
  const sortedCountries = [...visibleCountries].sort((a, b) => {
    if (a.priority === b.priority) {
      return (a.company || "").localeCompare(b.company || "");
    }
    return a.priority - b.priority;
  });

  const handleCountrySelect = (country: CountryData) => {
    localStorage.setItem("preferredCountry", JSON.stringify({
      name: country.country,
      code: country.flag?.split('/')[1]?.split('.')[0] || ''
    }));

    const currentPath = location.pathname;
    const slug = country.country.toLowerCase().replace(/\s+/g, '-');
    
    // Find if the current route matches any inner sub-page route
    const subPages = ['/about-us', '/contact', '/gallery', '/career', '/services', '/blog', '/blogs', '/projects'];
    const matchedSubPage = subPages.find(sp => currentPath.includes(sp));
    
    let targetRoute = country.route;

    if (matchedSubPage) {
      const prefix = country.country === 'SINGAPORE' ? '' : `/${slug}`;
      targetRoute = `${prefix}${matchedSubPage}`;
    }

    if (targetRoute) {
      window.location.href = targetRoute;
    } else {
      window.open(country.website, '_blank', 'noopener,noreferrer');
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-50 flex items-center gap-2">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-black text-white border-black hover:bg-black/90 px-4 py-2 rounded-full flex items-center gap-2"
          >
            <Globe className="w-6 h-6 text-white" />
            <span className="flex items-center gap-1">
              Switch Country <ChevronDown className="h-3 w-3 ml-1 text-white" />
            </span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          className="w-[280px] max-h-screen h-[90vh] border border-amber-100 bg-white p-2 rounded-lg shadow-lg overflow-y-auto"
        >
          <ScrollArea className="h-full w-full pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 gap-1 p-1">
              {sortedCountries.map(country => (
                <DropdownMenuItem
                  key={`${country.country}-${country.company}`}
                  onSelect={(e) => {
                    e.preventDefault();
                    handleCountrySelect(country);
                  }}
                  className="cursor-pointer hover:bg-amber-50 py-4 px-3 min-h-[60px] rounded-md flex items-center gap-3 transition-all"
                >
                  <motion.div whileHover={{ scale: 1.05 }} className="flex items-center w-full">
                    <div className="flex-shrink-0">
                      {country.flag ? (
                        <img
                          src={country.flag}
                          alt={`${country.country} flag`}
                          className="w-6 h-6 rounded-sm shadow-sm object-cover"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-gray-200 rounded-sm flex items-center justify-center">
                          <Globe className="w-6 h-6 text-[#F6B100]" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      {/* Country on top, company below (previous style) */}
                      <div className="font-medium text-sm">{country.country}</div>
                      <div className="text-xs text-gray-500">{country.company}</div>
                    </div>
                  </motion.div>
                </DropdownMenuItem>
              ))}
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CountrySelector;
