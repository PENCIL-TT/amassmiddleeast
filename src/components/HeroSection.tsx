import React from "react";
import { Users, UserCircle, SearchCode, Ship, Globe } from "lucide-react";
const HeroSection: React.FC = () => {
  const portalLinks = [{
    icon: <Users className="w-5 h-5" />,
    title: "Consolmate",
    url: "https://consolmate.com/auth/login/5"
  }, {
    icon: <UserCircle className="w-5 h-5" />,
    title: "Partner Portal",
    url: "https://pp.onlinetracking.co/auth/login/5"
  }, {
    icon: <SearchCode className="w-5 h-5" />,
    title: "Tracking",
    url: "http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:102:::::P0_GROUP_RID:250"
  }, {
    icon: <Ship className="w-5 h-5" />,
    title: "Container Enquiry",
    url: "https://dubaitrade.ae/en/container-enquiry-introduction"
  }];
  return <section className="relative min-h-screen w-full overflow-hidden">
      {/* Full-screen video with NO gradient overlay */}
      <video className="absolute inset-0 w-full h-full object-cover" src="/hero5.mp4" // replace with your video
    autoPlay loop muted playsInline />

      {/* Buttons Bar at the Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10  bg-inherit">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {portalLinks.map((link, i) => <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 py-1 rounded-md bg-[#0b1f4d] text-white hover:bg-[#122a66] transition-transform transform hover:scale-105 shadow-md border border-white/10">
              <div className="p-2 bg-white/20 rounded-full">{link.icon}</div>
              <span className="text-sm font-semibold text-center">{link.title}</span>
            </a>)}
        </div>
      </div>
    </section>;
};
export default HeroSection;
