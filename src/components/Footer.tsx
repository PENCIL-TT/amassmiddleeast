import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

type Office = {
  name: string;
  address: string;
  phone?: string;
  fax?: string;
  email?: string;
  map?: string;
  country?: string;
};

const Footer = () => {
  const location = useLocation();

  const defaultOffices = useMemo(() => [
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
  ], []);

  const [footerData, setFooterData] = useState({
    description: "We were established in the year 2015, as a Neutral LCL Consolidation Service Provider to serve the UAE market.",
    timingsMonThu: "Monday to Thursday: 8.00 AM to 12.30 PM, 2.00 PM to 4.00 PM",
    timingsFri: "Friday: 8.00 AM to 12.00 PM, 2.00 PM to 4.30 PM",
    timingsFriBreak: "(12.00 PM to 2.00 PM – Friday Prayer and Lunch Break)",
    timingsSatSun: "Saturday & Sunday CLOSED",
    copyright: `© ${new Date().getFullYear()} Amass Middle East Shipping Services LLC. All rights reserved.`,
    logoUrl: "/lovable-uploads/a44481e1-bf8c-43ab-b259-b833b252e1ed.png",
    offices: defaultOffices
  });

  useEffect(() => {
    const loadFooterData = () => {
      const saved = localStorage.getItem("admin_homepage_footer");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFooterData({
            description: parsed.description || "We were established in the year 2015, as a Neutral LCL Consolidation Service Provider to serve the UAE market.",
            timingsMonThu: parsed.timingsMonThu || "Monday to Thursday: 8.00 AM to 12.30 PM, 2.00 PM to 4.00 PM",
            timingsFri: parsed.timingsFri || "Friday: 8.00 AM to 12.00 PM, 2.00 PM to 4.30 PM",
            timingsFriBreak: parsed.timingsFriBreak || "(12.00 PM to 2.00 PM – Friday Prayer and Lunch Break)",
            timingsSatSun: parsed.timingsSatSun || "Saturday & Sunday CLOSED",
            copyright: parsed.copyright || `© ${new Date().getFullYear()} Amass Middle East Shipping Services LLC. All rights reserved.`,
            logoUrl: parsed.logoUrl || "/lovable-uploads/a44481e1-bf8c-43ab-b259-b833b252e1ed.png",
            offices: Array.isArray(parsed.offices) ? parsed.offices : defaultOffices
          });
        } catch (e) {
          console.error(e);
        }
      }
    };

    loadFooterData();
    window.addEventListener("admin_homepage_footer_changed", loadFooterData);
    return () => {
      window.removeEventListener("admin_homepage_footer_changed", loadFooterData);
    };
  }, [defaultOffices]);

  const getCurrentCountry = () =>
    location.pathname.toLowerCase().includes("/saudi")
      || location.pathname.toLowerCase().includes("/saudi-arabia")
      ? "Saudi Arabia"
      : "UAE";

  // Build prioritized list (current country first, then the rest)
  const offices = useMemo(() => {
    const all = footerData.offices;
    const current = getCurrentCountry();
    return [...all.filter(o => o.country === current), ...all.filter(o => o.country !== current)];
  }, [location.pathname, footerData.offices]);

  // One-by-one vertical slider
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const dirRef = useRef<1 | -1>(1); // (kept if you later want bi-direction)

  const intervalMs = 4000;
  const slideMs = 450;

  useEffect(() => {
    setIdx(0); // reset on route change
  }, [location.pathname]);

  useEffect(() => {
    if (paused || offices.length <= 1) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % offices.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [paused, offices.length]);

  const current = offices[idx];

  const footerAnim = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <footer className="pt-16 pb-8 text-white bg-blue-950">
      <div className="container mx-auto px-4">
        <div className="h-1 bg-gradient-to-r from-gc-gold via-gc-light-gold to-gc-gold rounded-full mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-4">
          {/* Column 1: Logo & About */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerAnim}
            className="flex flex-col items-start"
          >
            <div className="mb-4 bg-white p-3 rounded-lg">
              <img
                src={footerData.logoUrl}
                alt="Amass Middle East"
                className="h-16 w-auto object-contain"
                loading="lazy"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-50">
              Amass Middle East Shipping Services LLC
            </h3>
            <p className="text-sm md:text-base max-w-xs text-left leading-relaxed mb-4 text-slate-50">
              {footerData.description}
            </p>

            <div className="space-y-2 text-sm text-white/80">
              <h4 className="font-medium text-slate-50">DO Counter & CFS Timings</h4>
              <p className="text-slate-50">{footerData.timingsMonThu}</p>
              <p className="text-slate-50">{footerData.timingsFri}</p>
              <p className="text-xs text-slate-50">{footerData.timingsFriBreak}</p>
              <p className="text-slate-50">{footerData.timingsSatSun}</p>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerAnim}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-start md:items-end lg:items-start lg:pl-10"
          >
            <h3 className="font-bold text-xl text-gc-gold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about-us" },
                { name: "Services", path: "/services" },
                { name: "Global Presence", path: "/global-presence" },
                { name: "Contact Us", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "DMA Charges", path: "/dma-charges" },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-white/90 hover:text-black transition-colors duration-300 flex items-center gap-2"
                >
                  <ArrowRight size={14} className="text-gc-gold" />
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Contact (vertical slider) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerAnim}
            transition={{ delay: 0.4 }}
            className="lg:pl-10"
          >
            <div className="flex items-center justify-between w-full mb-4">
              <h3 className="font-bold text-xl text-gc-gold">Contact Us</h3>
              <button
                onClick={() => setIdx((i) => (i + 1) % offices.length)}
                onMouseDown={() => setPaused(true)}
                onMouseUp={() => setPaused(false)}
                className="bg-gc-gold text-gc-dark-blue p-1.5 rounded-full hover:bg-gc-light-gold transition-colors"
                title="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Viewport */}
            <div
              className="relative h-[168px] overflow-hidden" // ~fits 1 card height; tweak as needed
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              onTouchEnd={() => setPaused(false)}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={idx}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: slideMs / 1000, ease: "easeOut" }}
                  className="space-y-3"
                >
                  <p className="font-semibold text-gc-gold">
                    {current.name} • {current.country}
                  </p>

                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-gc-gold mt-1 flex-shrink-0" />
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-50">
                      {current.address}
                    </p>
                  </div>

                  {current.phone && (
                    <div className="flex items-center gap-2 text-slate-50 text-sm">
                      <Phone size={16} className="text-gc-gold flex-shrink-0" />
                      <span>{current.phone}</span>
                    </div>
                  )}
                  {current.fax && (
                    <div className="flex items-center gap-2 text-slate-50 text-sm">
                      <Phone size={16} className="text-gc-gold flex-shrink-0" />
                      <span>Fax: {current.fax}</span>
                    </div>
                  )}
                  {current.email && (
                    <div className="flex items-center gap-2 text-slate-50 text-sm">
                      <Mail size={16} className="text-gc-gold flex-shrink-0" />
                      <span>{current.email}</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex justify-start mt-4 space-x-2">
              {offices.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === idx ? "bg-gc-gold" : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to office ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="text-center text-white/70 mt-12 pt-8 border-t border-gc-gold/20 text-sm">
          {footerData.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
