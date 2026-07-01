import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/AdminSidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useAuth();

  useEffect(() => {
    // Check if admin is logged in (either via custom admin session or Supabase)
    const adminStatus = localStorage.getItem("isAdminLoggedIn");
    if (adminStatus !== "true" && !isAdmin) {
      navigate('/admin-login', { replace: true });
    }
  }, [navigate, isAdmin]);

  // If at exactly "/admin", "/admin/", or "/admin-dashboard", redirect to "/admin/overview"
  useEffect(() => {
    if (location.pathname === '/admin' || location.pathname === '/admin/' || location.pathname === '/admin-dashboard') {
      navigate('/admin/overview', { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-[#eef2f7] text-slate-800 flex flex-col font-sans admin-portal">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 w-full bg-[#eef2f7] shadow-[0_4px_10px_-1px_rgba(209,217,230,0.4),_0_-4px_10px_-1px_rgba(255,255,255,0.7)]">
        <div className="flex h-16 items-center justify-between px-6 w-full">
          <div className="flex items-center gap-4">
            <img
              src="/lovable-uploads/a44481e1-bf8c-43ab-b259-b833b252e1ed.png"
              alt="Amass Middle East"
              className="h-9 w-auto object-contain"
            />
            <span className="hidden sm:inline-block text-xs font-semibold tracking-widest text-slate-550 border-l border-slate-200/60 pl-4 uppercase font-mono">
              Admin Control Center
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
            <span className="text-[11px] font-semibold font-mono tracking-wider text-slate-650 bg-[#eef2f7] shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] px-3.5 py-1.5 rounded-full">
              admin@amassmiddleeast.com
            </span>
          </div>
        </div>
      </header>

      {/* Admin Content Area */}
      <div className="flex-1 flex flex-col md:flex-row p-6 gap-6 w-full relative z-10">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <AdminSidebar />
        </aside>

        {/* Dynamic Nested View */}
        <main className="flex-1 bg-[#eef2f7] shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] rounded-2xl p-6 overflow-hidden">
          <Outlet />
        </main>
      </div>

      {/* Separated Admin Footer */}
      <footer className="w-full bg-[#eef2f7] border-t border-slate-300/40 py-4.5 px-6 mt-auto shadow-[0_-4px_10px_-1px_rgba(209,217,230,0.2),_0_4px_10px_-1px_rgba(255,255,255,0.5)] z-20">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
            <span className="font-mono text-[10px] tracking-wider text-slate-600 uppercase">Secure Portal Connection Active</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] font-mono text-slate-450">
            <span>CMS Version: v2.4.0</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span>Encryption: AES-256 SSL</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span>© {new Date().getFullYear()} Amass Middle East Shipping Services LLC</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
