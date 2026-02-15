import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, School, BookOpen, ShieldCheck, Coffee, Map, Calendar, Library, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Welcome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 relative overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", 
             backgroundSize: "32px 32px" 
           }}>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 pointer-events-none z-0"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 z-10 flex-grow flex flex-col justify-center py-12 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          {/* Institution Branding */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-12">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-2xl flex items-center justify-center p-2 mb-6 mx-auto ring-1 ring-white/10">
              <img 
                src="/RENUKA SWAIN.png" 
                alt="Vignan Institute Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-200 text-xs md:text-sm font-medium tracking-wide uppercase mb-4">
              <School className="w-3 h-3 md:w-4 md:h-4" />
              <span>Vignan Institute of Technology and Management</span>
            </div>
          </motion.div>

          {/* Hero Text */}
          <motion.div variants={itemVariants} className="space-y-6 mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              The Next Generation <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Smart Campus
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A unified digital ecosystem designed to streamline academic operations, enhance security, and improve student experience.
            </p>
          </motion.div>

          {/* Primary Actions */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-16 md:mb-24 w-full sm:w-auto">
            <Link to="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 rounded-lg transition-all">
                Access Dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/map" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-all">
                <Map className="mr-2 w-4 h-4" /> View Campus Map
              </Button>
            </Link>
          </motion.div>

          {/* Feature Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-6xl px-4"
          >
            {[
              { icon: Users, label: "Attendance", desc: "Automated Tracking" },
              { icon: Library, label: "Digital Library", desc: "Resource Management" },
              { icon: ShieldCheck, label: "Campus Security", desc: "Surveillance & Logs" },
              { icon: Coffee, label: "Smart Cafeteria", desc: "Order & Payments" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group p-6 bg-slate-900/50 border border-slate-800/50 hover:border-blue-500/30 rounded-xl transition-all cursor-default text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <h3 className="text-base font-semibold text-slate-200 mb-1">{feature.label}</h3>
                <p className="text-xs text-slate-500">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Access Resources */}
          <motion.div 
            variants={itemVariants} 
            className="w-full max-w-4xl mx-auto mt-16 pt-16 border-t border-slate-900/50"
          >
             <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-6">Quick Access Resources</h3>
             <div className="flex flex-wrap justify-center gap-3">
               {[
                 { label: "Student Portal", action: () => navigate("/dashboard") },
                 { label: "Faculty Login", action: () => navigate("/login") },
                 { label: "Academic Calendar", action: () => toast({ title: "Coming Soon", description: "Academic Calendar is under development." }) },
                 { label: "Exam Results", action: () => toast({ title: "Coming Soon", description: "Exam Results are under development." }) },
                 { label: "Support Center", action: () => toast({ title: "Coming Soon", description: "Support Center is under development." }) }
               ].map((resource, i) => (
                 <Button 
                   key={i} 
                   variant="outline" 
                   onClick={resource.action}
                   className="border-slate-800 bg-slate-950/30 text-slate-400 hover:text-blue-300 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all rounded-full px-6 text-sm"
                 >
                   {resource.label}
                 </Button>
               ))}
             </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-slate-900 bg-slate-950 py-6 z-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>© 2024 Vignan Institute of Technology and Management. All rights reserved.</p>
          <div className="flex gap-6 mt-2 md:mt-0">
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Contact Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
