import React, { useState, useEffect } from "react";
import { Users, UserCircle, SearchCode, Ship, Calendar, ArrowRight, Play, Zap } from "lucide-react";
import { useLocation } from "react-router-dom";
interface HeroSectionProps {
  country?: 'sri-lanka' | 'myanmar' | 'bangladesh' | 'pakistan';
}
const HeroSection = ({
  country
}: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCustomerPortalOpen, setIsCustomerPortalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const location = useLocation();

  // Country-specific content
  const countryContent = {
    'sri-lanka': {
      images: [{
        url: "/14.png",
        title: "GLOBAL CONSOL",
        description: "Your Trusted Logistics Partner in Sri Lanka",
        gradient: ""
      }, {
        url: "/air1.png",
        title: "AIR FREIGHT",
        description: "We deliver flexible, global airfreight solutions",
        gradient: ""
      }, {
        url: "/whouse1.png",
        title: "WAREHOUSE MANAGEMENT",
        description: "A cutting edge solutions with advanced WMS",
        gradient: ""
      }, {
        url: "/15.png",
        title: "LIQUID CARGO TRANSPORTATION",
        description: "Cost effective and safe transportation of liquid cargo",
        gradient: ""
      }]
    },
    myanmar: {
      images: [{
        url: "/12.png",
        title: "GLOBAL CONSOL",
        description: "Your Trusted Logistics Partner in Myanmar",
        gradient: ""
      }, {
        url: "/4.png",
        title: "LOGISTICS SERVICES",
        description: "Supported through own offices and network of key partners around the world.",
        gradient: ""
      }, {
        url: "/warehousing1.png",
        title: "WAREHOUSE MANAGEMENT",
        description: "A cutting edge solutions with advanced WMS.",
        gradient: ""
      }, {
        url: "/16.png",
        title: "LIQUID CARGO TRANSPORTATION",
        description: "Cost effective and safe transportation of liquid cargo",
        gradient: ""
      }]
    },
    bangladesh: {
      images: [{
        url: "/15.png",
        title: "GLOBAL CONSOL",
        description: "Your Trusted Logistics Partner in Bangladesh",
        gradient: ""
      }, {
        url: "/20.png",
        title: "AIR FREIGHT",
        description: "We deliver flexible, global airfreight solutions",
        gradient: ""
      }, {
        url: "/whouse3.png",
        title: "WAREHOUSE MANAGEMENT",
        description: "A cutting edge solutions with advanced WMS.",
        gradient: ""
      }, {
        url: "/17.png",
        title: "LIQUID CARGO TRANSPORTATION",
        description: "Cost effective and safe transportation of liquid cargo",
        gradient: ""
      }]
    },
    pakistan: {
      images: [{
        url: "/13.png",
        title: "GLOBAL CONSOL",
        description: "Your Trusted Logistics Partner in Pakistan",
        gradient: ""
      }, {
        url: "/air1.png",
        title: "AIR FREIGHT",
        description: "We deliver flexible, global airfreight solutions",
        gradient: ""
      }, {
        url: "/whouse2.png",
        title: "WAREHOUSE MANAGEMENT",
        description: "A cutting edge solutions with advanced WMS .",
        gradient: ""
      }, {
        url: "/18.png",
        title: "LIQUID CARGO TRANSPORTATION",
        description: "Cost effective and safe transportation of liquid cargo",
        gradient: ""
      }]
    }
  };
  const defaultImages = [{
    url: "/h1.png",
    title: "OECL",
    description: "Vital Link to Enhance Your Supply Chain.",
    gradient: ""
  }, {
    url: "/h2.png",
    title: "LOGISTICS SERVICES",
    description: "Supported through own offices and network of key partners around the world.",
    gradient: ""
  }, {
    url: "/h3.png",
    title: "WAREHOUSE MANAGEMENT",
    description: "A cutting edge solutions with advanced WMS .",
    gradient: ""
  }, {
    url: "/h4.png",
    title: "MULTIPLE CARRIER OPTION",
    description: "Assublue space with contracted rates to major trade routes .",
    gradient: ""
  }];
  const sliderImages = country ? countryContent[country].images : defaultImages;
  const portalLinks = [{
    icon: <Users className="w-4 h-4" />,
    title: "Customer Portal",
    onClick: () => setIsCustomerPortalOpen(true),
    color: "from-blue-500 to-blue-700",
    hoverColor: "from-blue-600 to-blue-800"
  }, {
    icon: <UserCircle className="w-4 h-4" />,
    title: "Partner Portal",
    url: "https://pp.onlinetracking.co/auth/login/1",
    external: true,
    color: "from-blue-500 to-blue-700",
    hoverColor: "from-blue-600 to-blue-800"
  }, {
    icon: <SearchCode className="w-4 h-4" />,
    title: "Tracking",
    url: "http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:102:::::P0_GROUP_RID:54",
    external: true,
    color: "from-blue-500 to-blue-700",
    hoverColor: "from-blue-600 to-blue-800"
  }, {
    icon: <Ship className="w-4 h-4" />,
    title: "Sailing Schedule",
    url: "http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:104:::::P0_GROUP_RID:54",
    external: true,
    color: "from-blue-500 to-blue-700",
    hoverColor: "from-blue-600 to-blue-800"
  }];
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % sliderImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const currentSlide = sliderImages[activeSlide];

  // Get the contact URL based on country
  const getContactUrl = () => {
    if (country) {
      return `/${country}/contact`;
    }
    return "/contact";
  };
  return <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => <div key={i} className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 3}s`
      }} />)}
      </div>

      {/* Background Slider */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {sliderImages.map((slide, i) => <div key={i} className={`absolute inset-0 transition-all duration-2000 ease-in-out ${activeSlide === i ? "opacity-100 scale-100" : "opacity-0 scale-105"}`} style={{
        zIndex: activeSlide === i ? 1 : 0
      }}>
            <img src={slide.url} alt={`Slide ${i}`} className="w-full h-full object-cover transition-transform duration-2000" loading={i === 0 ? "eager" : "lazy"} />
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} z-[1]`} />
          </div>)}
        <div className="absolute inset-0 bg-black/40 z-[2]" />
      </div>

      {/* Main Content - Improved mobile responsiveness */}
      <div className="relative z-20 flex items-center min-h-screen px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl space-y-6 sm:space-y-8 px-0 py-0 mx-auto lg:mx-0 lg:ml-20 lg:text-left text-center w-full">
          {/* Title - Responsive text sizing */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
            {currentSlide.title.split(" ").map((word, i) => <span key={i} style={{
            animationDelay: `${i * 0.1}s`
          }} className="text-slate-50 font-bold block sm:inline text-3xl">
                {word}{" "}
              </span>)}
          </h1>

          {/* Description - Responsive text sizing */}
          <p className={`text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed transform transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            {currentSlide.description}
          </p>

          {/* CTA Button - Responsive sizing */}
          <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <a href={getContactUrl()} className="group">
              <button className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold flex items-center justify-center gap-3 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30 border border-blue-500/30 bg-kargon-blue w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>GET STARTED</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </a>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center lg:justify-start space-x-2 pt-4">
            {sliderImages.map((_, i) => <button key={i} onClick={() => setActiveSlide(i)} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${activeSlide === i ? "bg-blue-500 scale-125 shadow-lg shadow-blue-500/50" : "bg-white/30 hover:bg-white/50"}`} />)}
          </div>
        </div>
      </div>

      {/* Enhanced Portal Buttons - Improved mobile responsiveness */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30 px-2 sm:px-4">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
            {portalLinks.map((link, index) => {
            const ButtonContent = <div className="group relative overflow-hidden w-full h-12 sm:h-14 md:h-16 lg:h-18 flex flex-col gap-1 items-center justify-center text-xs transition-all duration-300 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 hover:-translate-y-1">
                  <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${link.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <div className="p-1 bg-white/20 rounded group-hover:bg-white/30 transition-colors">
                      {React.cloneElement(link.icon, {
                    className: "w-3 h-3 sm:w-4 sm:h-4"
                  })}
                    </div>
                    <div className="text-center px-1">
                      <div className="font-medium text-white leading-tight text-xs sm:text-xs lg:text-sm">{link.title}</div>
                    </div>
                  </div>
                </div>;
            if (link.external) {
              return <a href={link.url} key={index} target="_blank" rel="noopener noreferrer" className="w-full">
                    {ButtonContent}
                  </a>;
            } else if (link.onClick) {
              return <button key={index} onClick={link.onClick} className="w-full">
                    {ButtonContent}
                  </button>;
            } else {
              return <a href={link.url} key={index} className="w-full">
                    {ButtonContent}
                  </a>;
            }
          })}
          </div>
        </div>
      </div>

      {/* Enhanced Modal - Improved mobile responsiveness */}
       {isCustomerPortalOpen && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 animate-in slide-in-from-bottom duration-500">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Customer Portal</h2>
                </div>
                <button onClick={() => setIsCustomerPortalOpen(false)} className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200">
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Play className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Tutorial Videos</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[{
                src: "/GC_demo_1.mp4",
                label: "Getting Started",
                duration: "5:32"
              }, {
                src: "/GC_promo_2.mp4",
                label: "Advanced Features",
                duration: "7:45"
              }].map((video, i) => <div key={i} className="group border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                      <div className="aspect-video relative">
                        <video controls className="w-full h-full object-cover" poster={`/video-thumbnail-${i + 1}.jpg`}>
                          <source src={video.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {video.label}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Learn how to use the portal effectively
                        </p>
                      </div>
                    </div>)}
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6 border-t">
                <button onClick={() => setIsCustomerPortalOpen(false)} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium order-2 sm:order-1">
                  Close
                </button>
                <a href="https://cp.onlinetracking.co/#/login/1" target="_blank" rel="noopener noreferrer" className="order-1 sm:order-2">
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium flex items-center gap-2 justify-center transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span>Login to Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>}
    </section>;
};
export default HeroSection;
