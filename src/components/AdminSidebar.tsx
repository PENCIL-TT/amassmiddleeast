import React from "react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LogOut, 
  Shield,
  FileText,
  Info,
  TrendingUp,
  Briefcase,
  Mail,
  Image as ImageIcon,
  Award,
  Layers,
  Settings,
  Globe,
  MapPin,
  RefreshCw,
  Share2,
  Search,
  LayoutDashboard,
  PanelBottom
} from "lucide-react";

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const menuItems = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard, path: "/admin/overview" },
    { id: "about-page", label: "About Us Page", icon: Info, path: "/admin/about-page" },
    { id: "about-section", label: "Home About", icon: FileText, path: "/admin/about-section" },
    { id: "stats-section", label: "Home Stats Section", icon: TrendingUp, path: "/admin/stats-section" },
    { id: "services-section", label: "Home Services Section", icon: Briefcase, path: "/admin/services-section" },
    { id: "services-page", label: "Services Page", icon: Layers, path: "/admin/services-page" },
    { id: "services-details", label: "Service Details", icon: Settings, path: "/admin/services-details" },
    { id: "contact-form", label: "Contact Section", icon: Mail, path: "/admin/contact-form" },
    { id: "contact-page", label: "Contact Page", icon: MapPin, path: "/admin/contact-page" },
    { id: "gallery", label: "Gallery", icon: ImageIcon, path: "/admin/gallery" },
    { id: "career", label: "Careers", icon: Award, path: "/admin/career" },
    { id: "global-presence", label: "Global Presence", icon: Globe, path: "/admin/global-presence" },
    { id: "switch-country", label: "Switch Country", icon: RefreshCw, path: "/admin/switch-country" },
    { id: "social-links", label: "Social Links", icon: Share2, path: "/admin/social-links" },
    { id: "seo-meta", label: "SEO Meta Tags", icon: Search, path: "/admin/seo-meta" },
    { id: "footer", label: "Footer", icon: PanelBottom, path: "/admin/footer" },
  ];

  // Determine active item based on current route
  const currentPath = location.pathname;
  const activeTab = menuItems.find(item => currentPath.startsWith(item.path))?.id || "overview";

  const handleSignOut = async () => {
    localStorage.removeItem("isAdminLoggedIn");
    try {
      await signOut();
    } catch (e) {
      console.error(e);
    }
    navigate("/admin-login");
  };

  return (
    <div className="w-full bg-[#eef2f7] shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] rounded-2xl p-4 h-fit border-none animate-in fade-in">
      <div className="flex flex-col items-center mb-6 pt-2 pb-1">
        <div className="h-16 w-16 rounded-full bg-[#eef2f7] shadow-[3px_3px_6px_#cbd5e1,_-3px_-3px_6px_#ffffff] flex items-center justify-center mb-3">
          <Shield className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="font-semibold text-slate-800 tracking-wide text-sm uppercase font-mono">Admin Portal</h3>
        <p className="text-xs text-slate-500 mt-0.5">System Administrator</p>
      </div>
      
      <div className="space-y-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start transition-all duration-250 text-xs font-semibold tracking-wide h-10 px-4 rounded-xl border-none ${
                isActive 
                  ? "bg-[#eef2f7] shadow-[inset_3px_3px_6px_#cbd5e1,_inset_-3px_-3px_6px_#ffffff] text-blue-600 font-bold" 
                  : "text-slate-650 hover:bg-[#eef2f7] hover:shadow-[3px_3px_6px_#cbd5e1,_-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff]"
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className={`mr-2.5 h-4 w-4 ${isActive ? "text-red-600" : "text-slate-500"}`} />
              {item.label}
            </Button>
          );
        })}
      </div>
      
      <div className="pt-6 mt-6 border-t border-slate-300/40">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-xs font-semibold tracking-wide text-rose-600 hover:bg-[#eef2f7] hover:shadow-[3px_3px_6px_#cbd5e1,_-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] rounded-xl border-none transition-all duration-200"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2.5 h-4 w-4 text-rose-500" />
          Sign Out
        </Button>
      </div>

      {/* Sidebar Footer */}
      <div className="mt-6 pt-4 border-t border-slate-300/40 flex flex-col items-center justify-center gap-1 px-1 text-center text-[10px] text-slate-400 font-mono">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-500">System Online</span>
        </div>
        <div className="text-[9px] text-slate-400/80 mt-0.5">Amass CMS Portal v2.4.0</div>
        <div className="text-[9px] text-slate-400/60">© {new Date().getFullYear()} Amass Middle East</div>
      </div>
    </div>
  );
};

export default AdminSidebar;
