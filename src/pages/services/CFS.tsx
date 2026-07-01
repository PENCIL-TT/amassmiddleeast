import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Warehouse, Package, Settings, Truck } from "lucide-react";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const CFS = () => {
  const location = useLocation();
  const currentCountry = getCurrentCountryFromPath(location.pathname);

  const [data, setData] = useState({
    heroTitle: "CFS Services",
    heroSubtitle: "Container Freight Station with state-of-the-art facilities and technology",
    mainHeading: "Advanced CFS Facilities",
    paragraphs: [
      "Take full advantage of our state-of-the-art CFS, which is equipped with the latest equipment, technology and staffed by experienced professionals at every level. Our warehouses are designed to handle your cargo efficiently across all regions.",
      "Our CFS features a 7000 square meter covered area and a 1000 square meter open yard to assist you with comprehensive logistics solutions."
    ],
    specifications: [
      "7,000 sqm covered warehouse area",
      "1,000 sqm open yard space",
      "Latest handling equipment",
      "Advanced security systems",
      "Climate-controlled storage"
    ],
    image: "/cfl4.jpeg",
    featuresTitle: "Our CFS Services",
    featuresSubtitle: "Comprehensive warehouse and logistics solutions tailored to your needs",
    features: [
      { title: "3PL Storage", description: "Short term and long term storing facility with secure warehouse management." },
      { title: "Value-Added Services", description: "Labelling, Repacking, Palletization and other customization services." },
      { title: "Supply Chain Management", description: "End-to-end logistics solutions and supply chain optimization." }
    ],
    galleryImages: [
      "/cfl1.jpeg",
      "/cfl2.jpeg",
      "/cfl3.jpeg",
      "/cfl4.jpeg",
      "/cfl5.jpeg"
    ],
    ctaTitle: "Need CFS Storage Solutions?",
    ctaSubtitle: "Contact us to learn more about our advanced warehouse facilities and services"
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_service_cfs");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) {
          setData(parsed);
        }
      } catch (e) {
        console.error("Failed to parse CFS dynamic values:", e);
      }
    }
  }, []);

  const featureIcons = [Package, Settings, Truck];

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
                <span className="text-kargon-red">{data.heroTitle.split(" ")[0]}</span> {data.heroTitle.split(" ").slice(1).join(" ")}
              </h1>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-700">
                {data.heroSubtitle}
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
                  <h2 className="text-3xl font-bold mb-4 text-kargon-blue">{data.mainHeading}</h2>
                  {data.paragraphs.map((para, i) => (
                    <p key={i} className="text-lg leading-relaxed text-gray-700">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="bg-kargon-blue/10 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-kargon-blue mb-3">Facility Specifications</h3>
                  <ul className="space-y-2 text-gray-700">
                    {data.specifications.map((spec, i) => (
                      <li key={i}>• {spec}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    alt="CFS Warehouse"
                    loading="lazy"
                    className="w-full h-96 object-cover bg-slate-100"
                    src={data.image}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 p-4 rounded-xl shadow-lg bg-kargon-red">
                  <Warehouse className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-kargon-blue mb-6">{data.featuresTitle}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {data.featuresSubtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.features.map((service, index) => {
                const IconComponent = featureIcons[index] || Package;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-slate-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all"
                  >
                    <div className="w-16 h-16 bg-kargon-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-kargon-blue" />
                    </div>
                    <h3 className="text-xl font-bold text-kargon-blue mb-4">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-kargon-blue mb-12"
            >
              CFS Gallery
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {data.galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl overflow-hidden shadow-lg hover:scale-[1.03] transition-transform duration-300 bg-white"
                >
                  <img
                    src={img}
                    alt={`CFS image ${i + 1}`}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-kargon-blue text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{data.ctaTitle}</h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                {data.ctaSubtitle}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-kargon-blue px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CFS;
