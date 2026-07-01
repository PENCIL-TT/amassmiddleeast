import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Truck, Ship, Globe, Users, Award, TrendingUp } from "lucide-react";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const AboutUs = () => {
  const location = useLocation();

  // Safe fallback (mirrors your first section’s pattern)
  const detected = getCurrentCountryFromPath(location.pathname);
  const currentCountry = detected ?? { code: "SG", name: "Singapore" };

  const [contentData, setContentData] = useState({
    heroTitle: "About Amass",
    heroSubtitle: "Neutral LCL Consolidation Service Provider",
    whoWeAreTitle: "Who We Are",
    whoWeAreP1: "Amass Middle East Shipping Services LLC, a Neutral LCL Consolidation Service Provider to serve the UAE market. Our Office is in Oudh Metha-Dubai and the CFS is in Jebel Ali.",
    whoWeAreP2: "As a part of an expansion of our business all over the world, we have opened our branches in Saudi Arabia with 3 branches in Dammam, Riyadh, and Jeddah; our headquarters is in Dammam, and we have our own bonded warehouse facilities in Jeddah and Dammam.",
    whoWeAreP3: "Our growth has been phenomenal in the last 9 years, and we are now one of the leading consolidators in the region. The strength of any organization is its individuals, and we are no different. We have approximately 40 staff members catering to the business needs of the market.",
    lclServiceDesc: "Amass Freight, Dubai is one of the leading logistics providers in the region providing Less-Than Container load (LCL) for the ultimate convenience of our customers to help in transporting their products to any location required.",
    cfsServiceDesc: "Take full advantage of our state-of-the-art CFS, which is equipped with the latest equipment, technology and staffed by experienced professionals at every level. Our warehouses are designed to handle your cargo efficiently across all regions."
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_about_us");
    if (saved) {
      setContentData(JSON.parse(saved));
    }
  }, []);

  const isSriLanka = currentCountry.code === "LK";

  const getNavLink = (basePath: string) => {
    if (currentCountry.code === "SG") return basePath;
    return `/${currentCountry.name.toLowerCase().replace(/\s+/g, "-")}${basePath}`;
  };

  const stats = [
    { number: "9+", label: "Years of Growth", icon: TrendingUp },
    { number: "40+", label: "Dedicated Staff", icon: Users },
    { number: "100+", label: "Ports Worldwide", icon: Globe },
    { number: "2000+", label: "Destinations", icon: Award },
  ];

  const features = [
    "Global freight forwarding expertise",
    "Reliable network of agents",
    "30+ years industry experience",
    "Dedicated warehouse facilities",
    "Own fleet of trucks",
    "Strategic location advantages",
  ];

  // ======= NEW: image scroller like your first section =======
  // Place these in /public; reuse your earlier images for consistency
  const images = contentData.images || ["/office1.jpg", "/office2.jpg", "/office3.jpg"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, [images.length]);
  // ===========================================================

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                {contentData.heroTitle}
              </h1>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-700">
                {contentData.heroSubtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* Text Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold mb-4 text-kargon-blue">{contentData.whoWeAreTitle}</h2>
                  <p className="text-lg leading-relaxed text-gray-700">
                    {contentData.whoWeAreP1}
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700">
                    {contentData.whoWeAreP2}
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700">
                    {contentData.whoWeAreP3}
                  </p>
                </div>

                <Link to={getNavLink("/contact")} className="inline-block pt-4">
                  <Button className="bg-amass-blue hover:bg-amass-dark-blue text-white">
                    Contact Us
                  </Button>
                </Link>
              </motion.div>

              {/* Image Section: replaced with auto-fading scroller */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl border border-slate-200 bg-slate-100">
                  {images.map((src, i) => (
                    <motion.img
                      key={src}
                      src={src}
                      alt={`about-slide-${i}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: i === index ? 1 : 0 }}
                      transition={{ duration: 0.8 }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ))}
                </div>

                {/* Optional badge (kept from your design) */}
                <div className="absolute -bottom-6 -right-6 p-4 rounded-xl shadow-lg bg-kargon-red">
                  <Ship className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-kargon-blue mb-6">Our Core Services</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* LCL Service */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-2xl p-8 bg-slate-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-kargon-blue rounded-full flex items-center justify-center mr-4">
                    <Ship className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-kargon-blue">LCL Services</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  {contentData.lclServiceDesc}
                </p>
                <Link to={getNavLink("/services/lcl")} className="text-kargon-red font-medium hover:underline">
                  Read more →
                </Link>
              </motion.div>

              {/* CFS Service */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="rounded-2xl p-8 bg-slate-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-kargon-blue rounded-full flex items-center justify-center mr-4">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-kargon-blue">CFS Services</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  {contentData.cfsServiceDesc}
                </p>
                <Link to={getNavLink("/services/cfs")} className="text-kargon-red font-medium hover:underline">
                  Read more →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section (kept placeholder) */}
        <section className="py-20 bg-slate-50">
          {/* Add your stats/tiles here if needed */}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
