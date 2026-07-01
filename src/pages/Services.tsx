import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Boxes, Building2 } from "lucide-react";

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  image: string;
  slug: string;
}
interface ServiceCardProps extends Service {
  baseUrl: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  image,
  slug,
  baseUrl
}) => {
  const url = slug === 'services' ? baseUrl : `${baseUrl}/${slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group md:flex md:items-stretch"
    >
      {/* Image side */}
      <div className="relative w-full md:w-1/2 min-h-[12rem] md:min-h-[16rem]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 block w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>

      {/* Content side */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center bg-gradient-to-br from-gc-light-gold/10 to-gc-gold/5 bg-stone-200">
        <div className="bg-blue-200 text-gc-dark-blue p-2 rounded-full inline-block mb-2 w-fit">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-semibold text-gc-dark-blue mb-3">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>
        <Link
          to={url}
          className="text-gc-blue font-medium hover:text-gc-dark-blue inline-flex items-center text-sm transition-colors duration-300"
        >
          Learn More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Determine baseUrl for links
  const firstSegment = pathSegments[0] || "";
  const secondSegment = pathSegments[1] || "";
  let baseUrl = "/services";
  if (firstSegment && firstSegment !== "services") {
    baseUrl = `/${firstSegment}/services`;
    if (secondSegment === "services") baseUrl = `/${firstSegment}/services`;
  } else if (firstSegment === "services") {
    baseUrl = "/services";
  }

  const [pageData, setPageData] = useState({
    heroTitle: "Our Logistics Services",
    heroSubtitle: "Comprehensive end-to-end global logistics solutions tailored to your business needs",
    heroBgImage: "/lovable-uploads/gp.jpg",
    services: [
      {
        id: 1,
        title: "LCL",
        description: "Amass Freight, Dubai is one of the leading logistics providers in the region providing Less-Than Container load (LCL) for the ultimate convenience of our customers to help in transporting their products to any location required.",
        icon: Boxes,
        image: "/lcl1.JPG",
        slug: "lcl"
      },
      {
        id: 2,
        title: "CFS",
        description: "Take full advantage of our state-of-the-art CFS, which is equipped with the latest equipment, technology and staffed by experienced professionals at every level. Our warehouses are designed to handle your cargo efficiently across all regions.",
        icon: Building2,
        image: "/cfl4.jpeg",
        slug: "cfs"
      }
    ]
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_services_page");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) {
          setPageData(prev => ({
            ...prev,
            heroTitle: parsed.heroTitle || prev.heroTitle,
            heroSubtitle: parsed.heroSubtitle || prev.heroSubtitle,
            heroBgImage: parsed.heroBgImage || prev.heroBgImage,
            services: prev.services.map((srv, idx) => {
              const match = parsed.services?.[idx];
              if (match) {
                return {
                  ...srv,
                  title: match.title || srv.title,
                  description: match.description || srv.description,
                  image: match.image || srv.image
                };
              }
              return srv;
            })
          }));
        }
      } catch (e) {
        console.error("Failed to parse services page data:", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Navigation />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gc-dark-blue via-gc-blue to-gc-dark-blue text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-gc-dark-blue/95 to-gc-blue/95" />
          <div className="container mx-auto px-4 py-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-black mt-7">
                {pageData.heroTitle}
              </h1>
              <div className="w-20 h-1 bg-gc-gold mx-auto mb-6"></div>
              <p className="text-xl text-black leading-relaxed">
                {pageData.heroSubtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-gradient-to-b from-white to-gc-light-gold/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pageData.services.map(service => (
                <ServiceCard key={service.id} {...service} baseUrl={baseUrl} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
