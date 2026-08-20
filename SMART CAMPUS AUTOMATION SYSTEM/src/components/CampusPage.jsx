import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, BookOpen, ShieldCheck, Coffee, Map,
  GraduationCap, Users, Bus, Building2, Shield,
  Zap, Phone, Mail, MapPin, Clock, Award,
  CalendarDays, Newspaper, Calendar, Download, Eye,
  ChevronRight
} from "lucide-react";
import { getEvents, getNotices } from "@/lib/api";

const CampusPage = () => {
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents).catch(() => {});
    getNotices().then(setNotices).catch(() => {});
  }, []);

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ═══ HERO ═══ */}
      <section className="relative h-[45vh] overflow-hidden bg-slate-900">
        <img src="/vitam-campus.jpg" alt="VITAM Campus" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/70 to-slate-900" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/90 text-white text-xs font-semibold rounded-full mb-4">
                <Award className="w-3.5 h-3.5" /> Established 2006
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
                Vignan Institute of<br />
                <span className="text-blue-400">Technology & Management</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-base text-slate-300 max-w-xl mb-6">
                A premier institution for technical and management education in Berhampur, Odisha.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                {["3000+ Students", "200+ Faculty", "15+ Departments", "95% Placement"].map((s) => (
                  <span key={s} className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full text-xs font-medium text-white">{s}</span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-blue-600 rounded-full" />
              <h2 className="text-xl font-bold text-slate-900">About VITAM</h2>
            </div>
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-3">
                <p className="text-slate-600 leading-relaxed mb-4">
                  VITAM, located in Berhampur, Odisha, is a premier institution committed to delivering excellence in technical and management education. Our campus spreads across 50 acres with modern laboratories, a central library, sports facilities, and a vibrant student community.
                </p>
                <p className="text-slate-600 leading-relaxed mb-5">
                  We offer B.Tech, M.Tech, MBA, and diploma programs across multiple disciplines with a focus on research, innovation, and industry-ready graduates.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["AICTE Approved", "NBA Accredited", "NAAC Graded A"].map((t) => (
                    <span key={t} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">{t}</span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 rounded-xl overflow-hidden shadow-lg">
                <img src="/vitam-campus.jpg" alt="Campus" className="w-full h-52 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DEPARTMENTS ═══ */}
      <section className="py-14 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-blue-600 rounded-full" />
              <h2 className="text-xl font-bold text-slate-900">Departments</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { icon: Zap, title: "CSE", desc: "AI, ML, Data Science", color: "bg-blue-500" },
                { icon: Shield, title: "ECE", desc: "VLSI, IoT, Embedded", color: "bg-indigo-500" },
                { icon: Building2, title: "EEE", desc: "Power, Renewable Energy", color: "bg-amber-500" },
                { icon: GraduationCap, title: "MBA", desc: "Finance, HR, Marketing", color: "bg-emerald-500" },
                { icon: Award, title: "Civil", desc: "Structural, Environmental", color: "bg-orange-500" },
                { icon: BookOpen, title: "Sciences", desc: "Physics, Chemistry, Math", color: "bg-purple-500" },
              ].map((p, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="bg-white p-4 rounded-xl border border-slate-100 hover:shadow-md transition-all flex items-center gap-3">
                  <div className={`w-10 h-10 ${p.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <p.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{p.title}</h3>
                    <p className="text-[11px] text-slate-500">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EVENTS & NOTICES QUICK LINKS ═══ */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Events Card */}
              <Link to="/events" className="group bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg hover:border-blue-200 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <CalendarDays className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Events Board</h3>
                    <p className="text-xs text-slate-500">Workshops, fests, and more</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">Browse all upcoming campus events, technical fests, placement drives, and workshops.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{events.length} events</span>
                  <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    View All <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>

              {/* Notices Card */}
              <Link to="/notices" className="group bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-6 border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center shadow-lg">
                    <Newspaper className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Notice Board</h3>
                    <p className="text-xs text-slate-500">Official circulars & PDFs</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">View official notices, exam schedules, circulars, and downloadable documents.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{notices.length} notices</span>
                  <span className="text-xs font-semibold text-slate-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    View All <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SMART CAMPUS ═══ */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-blue-600 rounded-full" />
              <h2 className="text-xl font-bold text-slate-900">Smart Campus Features</h2>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { icon: Users, label: "Attendance", color: "bg-blue-50 text-blue-600" },
                { icon: BookOpen, label: "Library", color: "bg-emerald-50 text-emerald-600" },
                { icon: ShieldCheck, label: "Security", color: "bg-red-50 text-red-600" },
                { icon: Coffee, label: "Cafeteria", color: "bg-amber-50 text-amber-600" },
                { icon: Bus, label: "Transport", color: "bg-cyan-50 text-cyan-600" },
                { icon: GraduationCap, label: "Placements", color: "bg-purple-50 text-purple-600" },
              ].map((f, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className={`p-4 rounded-xl border ${f.color} border-current/10 text-center hover:shadow-md transition-all`}>
                  <f.icon className="w-7 h-7 mx-auto mb-2" />
                  <h4 className="text-xs font-bold">{f.label}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="py-10 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-1">Vignan Institute of Technology & Management</h3>
              <p className="text-sm text-slate-400">Berhampur, Odisha 761008, India</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91-680-2345678</span>
              <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@vitam.ac.in</span>
            </div>
          </div>
          <div className="max-w-5xl mx-auto mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-600">
            © 2024 Vignan Institute of Technology and Management. All rights reserved.
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampusPage;
