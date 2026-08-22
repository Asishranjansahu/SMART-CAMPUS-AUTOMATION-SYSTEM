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
  Mail,
  Phone,
  ArrowRight,
  Building2,
  ArrowLeft,
  Eye,
  EyeOff,
  BookOpen,
  Calendar,
  GraduationCap,
} from "lucide-react";
import { loginUser, registerUser } from "@/lib/api";

const STEPS = { LOGIN: "login", SIGNUP_1: "signup_1", SIGNUP_2: "signup_2" };

// InputField defined OUTSIDE Login to prevent re-mount on each keystroke
const InputField = ({ id, label, icon: Icon, type = "text", value, onChange, placeholder, error, maxLength }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="text-sm font-medium text-slate-700">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`pl-10 ${error ? "border-red-400 focus-visible:ring-red-400" : ""}`}
      />
    </div>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(STEPS.LOGIN);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Login fields
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // Signup fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [batch, setBatch] = useState("");
  const [year, setYear] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // No auto-redirect on Login page — user always sees the form.
  // ProtectedRoute on other pages handles auth checks.

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePhone = (p) => /^[6-9]\d{9}$/.test(p);
  const validatePassword = (p) => p.length >= 6;

  const validateSignup1 = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Full name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!validateEmail(email)) errs.email = "Enter a valid email";
    if (!phone.trim()) errs.phone = "Phone number is required";
    else if (!validatePhone(phone)) errs.phone = "Enter a valid 10-digit phone number";
    if (!rollNo.trim()) errs.rollNo = "Roll number is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateSignup2 = () => {
    const errs = {};
    if (!signUpPassword) errs.signUpPassword = "Password is required";
    else if (!validatePassword(signUpPassword)) errs.signUpPassword = "Password must be at least 6 characters";
    if (signUpPassword !== confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (!batch) errs.batch = "Please select your batch";
    if (!year) errs.year = "Please select your year";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      toast({ variant: "destructive", title: "Error", description: "Please enter your credentials." });
      return;
    }
    setIsLoading(true);
    try {
      const { user, token } = await loginUser(identifier, password);
      toast({
        title: "Welcome back!",
        description: `Logged in as ${user.name} (${user.role}).`,
        className: "bg-emerald-50 border-emerald-200 text-emerald-800",
      });
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userRollNo", user.rollNo);
      localStorage.setItem("userEmail", user.email || "");
      localStorage.setItem("userPhone", user.phone || "");
      localStorage.setItem("jwt_token", token);
      navigate("/dashboard");
    } catch (err) {
      toast({ variant: "destructive", title: "Login Failed", description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupStep1 = (e) => {
    e.preventDefault();
    if (validateSignup1()) {
      setStep(STEPS.SIGNUP_2);
      setErrors({});
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateSignup2()) return;
    setIsLoading(true);
    try {
      const { user: newUser, token } = await registerUser({ name, email, phone, rollNo, password: signUpPassword, batch, year });
      // Auto-login after registration
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", newUser.role);
      localStorage.setItem("userName", newUser.name);
      localStorage.setItem("userRollNo", newUser.rollNo);
      localStorage.setItem("userEmail", newUser.email || "");
      localStorage.setItem("userPhone", newUser.phone || "");
      localStorage.setItem("jwt_token", token);
      toast({
        title: "Account Created!",
        description: "Your account has been created. Please log in.",
        className: "bg-emerald-50 border-emerald-200 text-emerald-800",
      });
      navigate("/dashboard");
      return;
    } catch (err) {
      toast({ variant: "destructive", title: "Registration Failed", description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  // InputField moved outside the component (see top of file)

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden p-4">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(#64748b 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-0" />
            <div className="relative z-10">
              <div className="mx-auto w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm ring-1 ring-white/20">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {step === STEPS.LOGIN ? "Welcome Back" : step === STEPS.SIGNUP_1 ? "Create Account" : "Almost Done"}
              </h2>
              <p className="text-slate-400 text-sm">
                {step === STEPS.LOGIN
                  ? "Sign in to access your campus dashboard"
                  : step === STEPS.SIGNUP_1
                    ? "Step 1 of 2 — Personal Information"
                    : "Step 2 of 2 — Credentials & Batch"}
              </p>
              {/* Progress bar for signup */}
              {step !== STEPS.LOGIN && (
                <div className="mt-4 w-48 mx-auto bg-white/10 rounded-full h-1.5">
                  <motion.div
                    className="bg-blue-500 h-1.5 rounded-full"
                    initial={{ width: "50%" }}
                    animate={{ width: step === STEPS.SIGNUP_2 ? "100%" : "50%" }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* ═══ LOGIN ═══ */}
              {step === STEPS.LOGIN && (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <InputField
                    id="identifier" label="Email / Phone / Roll No"
                    icon={User} value={identifier} onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. admin@vignan.edu.in"
                  />
                  <div className="space-y-1.5">
                    <label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="password" type={showPassword ? "text" : "password"}
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••" className="pl-10 pr-10"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-base" disabled={isLoading}>
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in...</> : <><span>Sign In</span><ArrowRight className="ml-2 h-4 w-4" /></>}
                  </Button>
                  <p className="text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                    <button type="button" onClick={() => { setStep(STEPS.SIGNUP_1); setErrors({}); }}
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                      Sign up
                    </button>
                  </p>
                </motion.form>
              )}

              {/* ═══ SIGNUP STEP 1 ═══ */}
              {step === STEPS.SIGNUP_1 && (
                <motion.form
                  key="signup1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleSignupStep1}
                  className="space-y-3.5"
                >
                  <InputField id="name" label="Full Name" icon={User} value={name}
                    onChange={(e) => setName(e.target.value)} placeholder="e.g. Asish Ranjan Sahu" error={errors.name} />
                  <InputField id="email" label="Email Address" icon={Mail} type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} placeholder="e.g. asish@vignan.edu.in" error={errors.email} />
                  <InputField id="phone" label="Phone Number" icon={Phone} type="tel" value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="e.g. 9876543210" error={errors.phone} maxLength={10} />
                  <InputField id="rollNo" label="Roll Number" icon={GraduationCap} value={rollNo}
                    onChange={(e) => setRollNo(e.target.value.toUpperCase())} placeholder="e.g. 21CS001" error={errors.rollNo} />
                  <div className="flex gap-3 pt-1">
                    <Button type="button" onClick={() => { setStep(STEPS.LOGIN); setErrors({}); }}
                      variant="outline" className="w-1/3 h-11"><ArrowLeft className="mr-1 h-4 w-4" /> Back</Button>
                    <Button type="submit" className="w-2/3 h-11 bg-blue-600 hover:bg-blue-700">
                      <span>Continue</span><ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.form>
              )}

              {/* ═══ SIGNUP STEP 2 ═══ */}
              {step === STEPS.SIGNUP_2 && (
                <motion.form
                  key="signup2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleSignup}
                  className="space-y-3.5"
                >
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input type={showPassword ? "text" : "password"} value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        placeholder="Min 6 characters" className={`pl-10 pr-10 ${errors.signUpPassword ? "border-red-400" : ""}`} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.signUpPassword && <p className="text-xs text-red-500">{errors.signUpPassword}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input type="password" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password" className={`pl-10 ${errors.confirmPassword ? "border-red-400" : ""}`} />
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">Batch</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select value={batch} onChange={(e) => setBatch(e.target.value)}
                          className={`w-full h-10 pl-10 pr-4 rounded-md border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.batch ? "border-red-400" : "border-slate-200"}`}>
                          <option value="">Select</option>
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                        </select>
                      </div>
                      {errors.batch && <p className="text-xs text-red-500">{errors.batch}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">Year</label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select value={year} onChange={(e) => setYear(e.target.value)}
                          className={`w-full h-10 pl-10 pr-4 rounded-md border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.year ? "border-red-400" : "border-slate-200"}`}>
                          <option value="">Select</option>
                          <option value="1st">1st Year</option>
                          <option value="2nd">2nd Year</option>
                          <option value="3rd">3rd Year</option>
                          <option value="4th">4th Year</option>
                        </select>
                      </div>
                      {errors.year && <p className="text-xs text-red-500">{errors.year}</p>}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <Button type="button" onClick={() => { setStep(STEPS.SIGNUP_1); setErrors({}); }}
                      variant="outline" className="w-1/3 h-11"><ArrowLeft className="mr-1 h-4 w-4" /> Back</Button>
                    <Button type="submit" className="w-2/3 h-11 bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                      {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating...</> : <><span>Create Account</span><ArrowRight className="ml-2 h-4 w-4" /></>}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Toggle (login only) */}
            {step === STEPS.LOGIN && (
              <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100 text-center">
                <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mb-1">Demo Accounts</p>
                <p className="text-xs text-slate-500">admin / admin (Admin)&nbsp;&nbsp;·&nbsp;&nbsp;21CS001 / student (Student)</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
            <p className="text-xs text-slate-400">Protected by Smart Campus Security System</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
