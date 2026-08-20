import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white font-sans">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 pointer-events-none z-0" />

      {/* Top Bar */}
      <div className="relative z-10 border-b border-white/5">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91-680-2345678</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> info@vitam.ac.in</span>
          </div>
          <span className="hidden md:flex items-center gap-1"><MapPin className="w-3 h-3" /> Berhampur, Odisha</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl w-full text-center"
        >
          {/* College Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-10 mx-auto max-w-3xl"
          >
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
              <img
                src="/vitam-campus.jpg"
                alt="VITAM Campus"
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>
            {/* Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 rounded-3xl blur-2xl -z-10" />
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center p-2 ring-1 ring-white/10">
              <img src="/RENUKA SWAIN.png" alt="VITAM Logo" className="w-full h-full object-contain" />
            </div>
          </motion.div>

          {/* College Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-3">
              Vignan Institute of<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Technology & Management
              </span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto mb-2">
              Established 2006 · Berhampur, Odisha
            </p>
            <p className="text-slate-500 text-sm max-w-lg mx-auto mb-10">
              A premier institution for technical and management education, empowering students with world-class facilities and a vibrant campus life.
            </p>
          </motion.div>

          {/* Login Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-12 h-14 text-lg font-semibold shadow-lg shadow-blue-600/25 group transition-all">
                <Building2 className="mr-3 w-5 h-5" />
                Enter Campus Portal
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Accreditations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {["AICTE Approved", "NBA Accredited", "NAAC Graded A", "Autonomous"].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-slate-400 text-xs font-medium rounded-full">
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/5 py-4">
        <div className="container mx-auto px-4 text-center text-xs text-slate-600">
          © 2024 Vignan Institute of Technology and Management. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Welcome;
