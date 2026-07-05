import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Shield, Lock, Mail, Eye, EyeOff, KeyRound } from "lucide-react";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Expanded credential checks with user-friendly variations
    const isAmassEmail = cleanEmail === 'admin@amassmiddleeast.com' || 
                         cleanEmail === 'admin@amassmiddleeast' ||
                         cleanEmail === 'u546576758_amassmiddle' ||
                         cleanEmail === 'u546576758amassmiddle' ||
                         cleanEmail === 'amassmiddle' ||
                         cleanEmail === 'amassmiddleeast';
    const isAmassPassword = cleanPassword === '@massmiddleeast' || 
                            cleanPassword === '@amassmiddleeast' || 
                            cleanPassword === 'amassmiddleeast' || 
                            cleanPassword === 'massmiddleeast' ||
                            cleanPassword === 'Admin@2026@#' ||
                            cleanPassword.toLowerCase() === 'admin@2026@#' ||
                            cleanPassword === 'Admin@2026' ||
                            cleanPassword.toLowerCase() === 'admin@2026' ||
                            cleanPassword === 'Admin@2026@' ||
                            cleanPassword.toLowerCase() === 'admin@2026@';
    const isAmassAdmin = isAmassEmail && isAmassPassword;

    const isOeclEmail = cleanEmail === 'admin@oecl.sg' || 
                       cleanEmail === 'admin@oecl';
    const isOeclPassword = cleanPassword === 'OECL@12345' || 
                           cleanPassword === 'oecl@12345' ||
                           cleanPassword === '@oecl.sg' || 
                           cleanPassword === 'oecl.sg' ||
                           cleanPassword === 'oecl';
    const isOeclAdmin = isOeclEmail && isOeclPassword;

    if (isAmassAdmin || isOeclAdmin) {
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('isAdminLoggedIn', 'true');
      toast({
        title: "Login successful",
        description: "Welcome to the Admin Panel!",
      });
      navigate('/admin');
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#eef2f7] flex items-center justify-center p-4 font-sans admin-portal relative overflow-hidden">
      {/* Decorative Neumorphic background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 rounded-full bg-[#eef2f7] shadow-[20px_20px_60px_#cbd5e1,_-20px_-20px_60px_#ffffff] opacity-70 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 rounded-full bg-[#eef2f7] shadow-[20px_20px_60px_#cbd5e1,_-20px_-20px_60px_#ffffff] opacity-70 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        {/* Main Neumorphic Card Container */}
        <div className="bg-[#eef2f7] shadow-[10px_10px_20px_#cbd5e1,_-10px_-10px_20px_#ffffff] rounded-3xl p-8 border border-white/40">
          
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="h-16 w-16 mx-auto mb-4 rounded-full bg-[#eef2f7] shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] flex items-center justify-center text-red-600"
            >
              <Shield className="h-8 w-8 text-[#dc2626]" />
            </motion.div>
            
            <img
              src="/lovable-uploads/a44481e1-bf8c-43ab-b259-b833b252e1ed.png"
              alt="Amass Middle East"
              className="h-10 w-auto mx-auto mb-3 object-contain"
            />
            
            <span className="inline-block text-[10px] font-bold tracking-widest text-[#2563eb] bg-[#eef2f7] shadow-[inset_2px_2px_5px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff] px-3.5 py-1.5 rounded-full uppercase font-mono mb-2">
              AUTHORIZED PERSONNEL ONLY
            </span>
            <p className="text-xs text-slate-500 mt-1.5">Enter credentials to access Admin Control Center</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Visually hidden fake inputs to trick browser autofill */}
            <input type="text" name="username" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }} tabIndex={-1} readOnly />
            <input type="password" name="password" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }} tabIndex={-1} readOnly />

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="adm-uid" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono px-1">
                System ID
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="adm-uid"
                  name="adm-uid"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter System Email"
                  required
                  autoComplete="off"
                  className="bg-[#eef2f7] border-none text-slate-800 h-11 pl-11 pr-4 rounded-xl shadow-[inset_3px_3px_6px_#cbd5e1,_inset_-3px_-3px_6px_#ffffff] focus:shadow-[inset_1px_1px_3px_#cbd5e1,_inset_-1px_-1px_3px_#ffffff,_0_0_0_2px_rgba(37,99,235,0.25)] focus-visible:ring-0 focus-visible:ring-offset-0 text-sm transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="adm-pwd" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono px-1">
                Passkey
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="adm-pwd"
                  name="adm-pwd"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Access Key"
                  required
                  autoComplete="off"
                  className="bg-[#eef2f7] border-none text-slate-800 h-11 pl-11 pr-11 rounded-xl shadow-[inset_3px_3px_6px_#cbd5e1,_inset_-3px_-3px_6px_#ffffff] focus:shadow-[inset_1px_1px_3px_#cbd5e1,_inset_-1px_-1px_3px_#ffffff,_0_0_0_2px_rgba(37,99,235,0.25)] focus-visible:ring-0 focus-visible:ring-offset-0 text-sm transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-650 bg-transparent hover:bg-transparent shadow-none border-none pointer-events-auto transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#eef2f7] border-none text-[#dc2626] hover:text-[#2563eb] text-sm font-bold h-11 rounded-xl shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_3px_3px_6px_#cbd5e1,_inset_-3px_-3px_6px_#ffffff] transition-all duration-200 uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
            >
              <KeyRound className="h-4 w-4" />
              {isLoading ? 'Decrypting credentials...' : 'Authenticate Access'}
            </Button>
          </form>

          {/* Footer Security Badge */}
          <div className="mt-8 pt-6 border-t border-slate-200/50 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SSL Secured Gateway • Amass Middle East</span>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
