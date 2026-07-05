import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Check for admin credentials to redirect to admin panel
    const isAmassEmail = cleanEmail === 'admin@amassmiddleeast.com' || cleanEmail === 'admin@amassmiddleeast';
    const isAmassPassword = cleanPassword === '@massmiddleeast' || 
                            cleanPassword === '@amassmiddleeast' || 
                            cleanPassword === 'amassmiddleeast' || 
                            cleanPassword === 'massmiddleeast';
    const isAmassAdmin = isAmassEmail && isAmassPassword;

    const isOeclEmail = cleanEmail === 'admin@oecl.sg' || cleanEmail === 'admin@oecl';
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
      setIsLoading(false);
      return;
    }
    
    try {
      await signIn(email, password);
    } catch (error: unknown) {
      const err = error as Error;
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-grow flex items-center justify-center py-20">
        <div className="relative bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-200">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
            <div className="h-10 w-10 bg-kargon-red rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">K</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-6 mt-4 text-kargon-dark">Login to Your Account</h2>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-kargon-red hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-kargon-red hover:bg-kargon-red/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? "LOGGING IN..." : "LOGIN"}
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-kargon-red hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
