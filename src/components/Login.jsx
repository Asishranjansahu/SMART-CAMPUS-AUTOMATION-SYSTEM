import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { 
  Loader2, 
  Lock, 
  User, 
  ArrowRight, 
  Building2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form States
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    
    // Mock Validation
    if (isLogin) {
      if (rollNo && password) {
        const role = rollNo.toUpperCase().startsWith("FAC") ? "faculty" : "student";
        
        toast({
          title: "Welcome back!",
          description: `Successfully logged in as ${role === 'faculty' ? 'Faculty' : 'Student'}.`,
          className: "bg-emerald-50 border-emerald-200 text-emerald-800",
        });
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", role);
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter valid credentials.",
        });
      }
    } else {
      if (rollNo && password && name) {
        toast({
          title: "Account Created",
          description: "Your account has been created successfully. Please login.",
          className: "bg-blue-50 border-blue-200 text-blue-800",
        });
        setIsLogin(true); // Switch to login
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please fill in all fields.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: "radial-gradient(#64748b 1px, transparent 1px)", 
             backgroundSize: "32px 32px" 
           }}>
      </div>
      <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-0"></div>
             <div className="relative z-10">
               <div className="mx-auto w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm ring-1 ring-white/20">
                 <Building2 className="w-6 h-6 text-white" />
               </div>
               <h2 className="text-2xl font-bold text-white mb-2">
                 {isLogin ? "Welcome Back" : "Create Account"}
               </h2>
               <p className="text-slate-400 text-sm">
                 {isLogin ? "Enter your credentials to access your account" : "Join the Smart Campus ecosystem today"}
               </p>
             </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <Input 
                          id="name"
                          placeholder="John Doe" 
                          className="pl-9"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label htmlFor="rollNo" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Roll Number</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input 
                    id="rollNo"
                    placeholder="211FA04001" 
                    className="pl-9 font-mono uppercase"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                  {isLogin && (
                    <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-9"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-base mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Sign Up"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </p>
            </div>
          </div>
          
          {/* Footer of Card */}
          <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
             <p className="text-xs text-slate-400">
               Protected by Smart Campus Security System
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
