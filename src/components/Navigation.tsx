import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import CountrySelector from "@/components/CountrySelector";
import { getCurrentCountryFromPath, detectCountryByIP } from "@/services/countryDetection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

/** Small flag component that never shows raw text like '/lk.svg' */
function FlagIcon({
  code,
  className = "h-5 w-7 object-contain rounded-[2px]",
}: {
  code: string;
  className?: string;
}) {
  const iso = (code || "").toLowerCase();
  const src = `/${iso}.svg`;
  return (
    <img
      src={src}
      alt=""                /* alt intentionally empty so no text shows */
      aria-hidden="true"    /* decorative */
      className={className}
      draggable={false}
      onError={(e) => {
        // If missing, hide image (no text fallback ever rendered)
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [ipCountry, setIpCountry] = useState<{ code: string; name: string } | null>(null);
  const location = useLocation();
  const { user } = useAuth();

  // We use the URL to decide the current country flag
  const currentCountry = getCurrentCountryFromPath(location.pathname);

  // Detect country by IP for flag display
  useEffect(() => {
    const detect = async () => {
      try {
        const saved = localStorage.getItem("preferredCountry");
        if (saved) {
          setIpCountry(JSON.parse(saved));
          return;
        }
        const country = await detectCountryByIP();
        setIpCountry({ code: country.code, name: country.name });
      } catch {
        setIpCountry(null);
      }
    };
    detect();
  }, []);
  const isActive = (path: string) => location.pathname === path;

  const getNavLink = (basePath: string) => {
    if (currentCountry.code === "SG") return basePath;
    return `/${currentCountry.name.toLowerCase().replace(" ", "-")}${basePath}`;
  };

  const isCompanyLinkActive = () =>
    isActive(getNavLink("/about-us")) ||
    isActive(getNavLink("/gallery")) ||
    isActive(getNavLink("/career"));

  const [socialLinks, setSocialLinks] = useState({
    linkedin: "https://www.linkedin.com/company/amassmiddleeast/",
    facebook: "https://www.facebook.com/Amassmiddleeast?mibextid=ZbWKwL",
    twitter: "",
    instagram: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_social_links");
    if (saved) {
      try {
        setSocialLinks(prev => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) {
        console.error("Failed to parse social links:", e);
      }
    }
  }, []);

  const SOCIALS = useMemo(() => {
    const rows = [];
    if (socialLinks.linkedin) {
      rows.push({ name: "LinkedIn", href: socialLinks.linkedin, Icon: FaLinkedinIn });
    }
    if (socialLinks.facebook) {
      rows.push({ name: "Facebook", href: socialLinks.facebook, Icon: FaFacebookF });
    }
    if (socialLinks.twitter) {
      rows.push({ name: "Twitter", href: socialLinks.twitter, Icon: FaTwitter });
    }
    if (socialLinks.instagram) {
      rows.push({ name: "Instagram", href: socialLinks.instagram, Icon: FaInstagram });
    }
    return rows;
  }, [socialLinks]);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 shadow-md backdrop-blur supports-[backdrop-filter]:backdrop-blur transition-all duration-300 bg-slate-50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-4 lg:py-[18px]">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/lovable-uploads/a44481e1-bf8c-43ab-b259-b833b252e1ed.png"
              alt="Amass Middle East Shipping Services LLC"
              className="h-6 sm:h-10 lg:h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to={getNavLink("/home")}
              className={`nav-link font-medium text-base xl:text-lg hover:text-amass-blue transition-colors ${
                isActive(getNavLink("/home")) ||
                (currentCountry.code === "SG" && isActive("/"))
                  ? "text-amass-blue"
                  : "text-black"
              }`}
            >
              Home
            </Link>

            <DropdownMenu open={isCompanyDropdownOpen} onOpenChange={setIsCompanyDropdownOpen}>
              <DropdownMenuTrigger
                className={`nav-link font-medium text-base xl:text-lg flex items-center gap-1 hover:text-amass-blue transition-colors ${
                  isCompanyLinkActive() ? "text-amass-blue" : "text-black"
                }`}
              >
                Info <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-lg border rounded-md p-2 z-50">
                <DropdownMenuItem asChild>
                  <Link to={getNavLink("/about-us")} className="w-full px-3 py-2 text-base hover:bg-gray-100 rounded-md block">
                    About Us
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={getNavLink("/gallery")} className="w-full px-3 py-2 text-base hover:bg-gray-100 rounded-md block">
                    Gallery
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={getNavLink("/career")} className="w-full px-3 py-2 text-base hover:bg-gray-100 rounded-md block">
                    Career
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to={getNavLink("/services")}
              className={`nav-link font-medium text-base xl:text-lg hover:text-amass-blue transition-colors ${
                isActive(getNavLink("/services")) ? "text-amass-blue" : "text-black"
              }`}
            >
              Services
            </Link>

            <Link
              to={getNavLink("/blog")}
              className={`nav-link font-medium text-base xl:text-lg hover:text-amass-blue transition-colors ${
                isActive(getNavLink("/blog")) || isActive(getNavLink("/blogs"))
                  ? "text-amass-blue"
                  : "text-black"
              }`}
            >
              Blogs
            </Link>

            <Link
              to={getNavLink("/global-presence")}
              className={`nav-link font-medium text-base xl:text-lg transition-colors ${
                isActive(getNavLink("/global-presence")) ? "text-amass-blue" : "text-black"
              }`}
            >
              Global Presence
            </Link>

            <Link
              to={getNavLink("/contact")}
              className={`nav-link font-medium text-base xl:text-lg transition-colors ${
                isActive(getNavLink("/contact")) ? "text-amass-blue" : "text-black"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right side: CountrySelector + Socials */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <CountrySelector />

            <div className="ml-1 flex items-center gap-2">
              {SOCIALS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 hover:border-amass-blue hover:text-amass-blue text-gray-700 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="text-black" size={20} /> : <Menu className="text-black" size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white py-4 shadow-md animate-fade-in border-t max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              {[
                { label: "HOME", path: "/home" },
                { label: "ABOUT US", path: "/about-us" },
                { label: "GALLERY", path: "/gallery" },
                { label: "CAREER", path: "/career" },
                { label: "SERVICES", path: "/services" },
                { label: "BLOGS", path: "/blog" },
                { label: "CONTACT", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path === "/gallery" ? "/gallery" : getNavLink(item.path)}
                  className={`font-medium py-2 text-lg hover:text-amass-blue transition-colors ${
                    isActive(item.path === "/gallery" ? "/gallery" : getNavLink(item.path)) ||
                    (item.path === "/home" && currentCountry.code === "SG" && isActive("/"))
                      ? "text-amass-blue"
                      : "text-black"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile: country selector */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <CountrySelector />
                </div>
              </div>

              <Link
                to={`${getNavLink("/contact")}#contact-form`}
                onClick={() => setIsMenuOpen(false)}
                className="pt-2"
              >
                <Button className="bg-amass-blue hover:bg-amass-dark-blue text-white w-full rounded-md">
                  GET QUOTE
                </Button>
              </Link>

              <div className="pt-3 flex items-center gap-3">
                {SOCIALS.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:border-amass-blue hover:text-amass-blue text-gray-700 transition-all"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
