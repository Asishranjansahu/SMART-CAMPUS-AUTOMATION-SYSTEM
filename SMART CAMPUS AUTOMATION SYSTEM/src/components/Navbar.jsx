import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { preloadRoute } from "@/App";
import {
  Home, UserCheck, Book, Coffee, Shield, Calendar,
  Map as MapIcon, Building2, Bell, Search, User,
  Settings, LogOut, Menu, X, Check, Info,
  AlertTriangle, ChevronDown, Hammer, ShieldAlert,
  Trash2, GraduationCap, Bus, CalendarDays, Zap
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const userName = localStorage.getItem("userName") || "User";
  const userRole = localStorage.getItem("userRole") || "student";
  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const isAdmin = userRole === "admin" || userRole === "faculty";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    ["isAuthenticated","userRole","userName","userRollNo","userEmail","userPhone","jwt_token"]
      .forEach(k => localStorage.removeItem(k));
    navigate("/");
  };

  const [notifications, setNotifications] = useState([
    { id: 1, title: "Library Book Due", message: "'Data Structures' is due tomorrow", time: "2h ago", type: "warning", read: false },
    { id: 2, title: "Attendance Update", message: "Java Class marked present", time: "5h ago", type: "success", read: false },
    { id: 3, title: "Cafeteria Offer", message: "20% off on coffee today!", time: "1d ago", type: "info", read: true },
  ]);
  const unreadCount = notifications.filter(n => !n.read).length;
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  // All nav items in ONE line — no dropdowns
  const allNavItems = [
    { path: "/campus", icon: Building2, label: "Campus" },
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/attendance", icon: UserCheck, label: "Attendance" },
    { path: "/library", icon: Book, label: "Library" },
    { path: "/cafeteria", icon: Coffee, label: "Cafeteria" },
    { path: "/security", icon: Shield, label: "Security" },
    { path: "/rooms", icon: Calendar, label: "Rooms" },
    { path: "/map", icon: MapIcon, label: "Map" },
    { path: "/events", icon: CalendarDays, label: "Events" },
    { path: "/notices", icon: Bell, label: "Notices" },
    { path: "/transport", icon: Bus, label: "Transport" },
    { path: "/placement", icon: GraduationCap, label: "Placements" },
  ];

  // Extra items only in "More" dropdown
  const moreItems = [
    { path: "/premises", icon: Hammer, label: "Premises" },
    { path: "/anti-ragging", icon: ShieldAlert, label: "Anti-Ragging" },
    { path: "/lost-and-found", icon: () => <span className="text-sm">🔍</span>, label: "Lost & Found" },
    { path: "/smart-dustbin", icon: Trash2, label: "Smart Dustbin" },
  ];

  const adminItems = [
    { path: "/admin/events", icon: CalendarDays, label: "Manage Events" },
    { path: "/admin/notices", icon: Bell, label: "Manage Notices" },
  ];

  if (location.pathname === "/") return null;

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-900/5 border-b border-slate-200/50"
          : "bg-white border-b border-slate-100"
      }`}>
        <div className="container mx-auto px-3">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2 group flex-shrink-0 mr-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-600/20">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-slate-900 hidden sm:block">VIGNAN</span>
            </Link>

            {/* ─── All Nav Items in ONE LINE ─── */}
            <div className="hidden xl:flex items-center gap-0.5 flex-1 justify-center overflow-x-auto">
              {allNavItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}
                    onMouseEnter={() => preloadRoute(item.path)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg whitespace-nowrap transition-all ${
                      active
                        ? "text-blue-600 bg-blue-50 shadow-sm"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }`}>
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </Link>
                );
              })}

              {/* More Dropdown (overflow items) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg whitespace-nowrap transition-all">
                    More <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 p-1.5 rounded-xl shadow-xl border-slate-200/80" align="center">
                  {moreItems.map((item) => (
                    <DropdownMenuItem key={item.label}
                      className="rounded-lg cursor-pointer py-2 text-sm text-slate-600 focus:bg-slate-50"
                      onClick={() => navigate(item.path)}>
                      <item.icon className="mr-2.5 h-4 w-4 text-slate-400" />
                      <span className="font-medium">{item.label}</span>
                    </DropdownMenuItem>
                  ))}
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator className="my-1.5" />
                      <div className="px-2.5 py-1 text-[10px] font-bold text-blue-500 uppercase tracking-wider">Admin</div>
                      {adminItems.map((item) => (
                        <DropdownMenuItem key={item.label}
                          className="rounded-lg cursor-pointer py-2 text-sm text-blue-600 focus:bg-blue-50"
                          onClick={() => navigate(item.path)}>
                          <item.icon className="mr-2.5 h-4 w-4 text-blue-500" />
                          <span className="font-medium">{item.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Medium screens: show fewer items */}
            <div className="hidden lg:flex xl:hidden items-center gap-0.5 flex-1 justify-center overflow-x-auto">
              {allNavItems.slice(0, 6).map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}
                    className={`flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg whitespace-nowrap transition-all ${
                      active ? "text-blue-600 bg-blue-50 shadow-sm" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }`}>
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </Link>
                );
              })}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg whitespace-nowrap">
                    More <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 p-1.5 rounded-xl shadow-xl border-slate-200/80" align="center">
                  {[...allNavItems.slice(6), ...moreItems].map((item) => (
                    <DropdownMenuItem key={item.label}
                      className="rounded-lg cursor-pointer py-2 text-sm text-slate-600 focus:bg-slate-50"
                      onClick={() => navigate(item.path)}>
                      <item.icon className="mr-2.5 h-4 w-4 text-slate-400" />
                      <span className="font-medium">{item.label}</span>
                    </DropdownMenuItem>
                  ))}
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator className="my-1.5" />
                      <div className="px-2.5 py-1 text-[10px] font-bold text-blue-500 uppercase tracking-wider">Admin</div>
                      {adminItems.map((item) => (
                        <DropdownMenuItem key={item.label}
                          className="rounded-lg cursor-pointer py-2 text-sm text-blue-600 focus:bg-blue-50"
                          onClick={() => navigate(item.path)}>
                          <item.icon className="mr-2.5 h-4 w-4 text-blue-500" />
                          <span className="font-medium">{item.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* ─── Right Section ─── */}
            <div className="flex items-center gap-1 ml-3">
              {/* Search */}
              <div className="hidden sm:flex items-center">
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 180, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                      className="overflow-hidden mr-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <Input placeholder="Search..." className="h-8 pl-7 text-xs bg-slate-50 border-slate-200"
                          autoFocus onBlur={() => setSearchOpen(false)} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <button onClick={() => setSearchOpen(!searchOpen)}
                  className={`p-1.5 rounded-lg transition-colors ${searchOpen ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}>
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 p-0 rounded-xl shadow-xl border-slate-200/80" align="end">
                  <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-100">
                    <h3 className="font-semibold text-xs">Notifications</h3>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-[10px] font-medium text-blue-600 hover:underline">Mark all read</button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} onClick={() => markRead(n.id)}
                        className={`px-3 py-2.5 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0 ${!n.read ? "bg-blue-50/30" : ""}`}>
                        <div className="flex gap-2.5">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                            n.type === "warning" ? "bg-amber-100 text-amber-600" :
                            n.type === "success" ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"
                          }`}>
                            {n.type === "warning" ? <AlertTriangle className="w-3 h-3" /> :
                             n.type === "success" ? <Check className="w-3 h-3" /> : <Info className="w-3 h-3" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <p className={`text-xs truncate pr-2 ${!n.read ? "font-bold text-slate-900" : "font-medium text-slate-600"}`}>{n.title}</p>
                              <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5">{n.message}</p>
                          </div>
                          {!n.read && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="w-px h-5 bg-slate-200" />

              {/* User */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-1 pr-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                      {initials}
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-[11px] font-semibold text-slate-900 leading-none">{userName}</p>
                      <p className="text-[9px] text-slate-400 capitalize">{userRole}</p>
                    </div>
                    <ChevronDown className="w-3 h-3 text-slate-400 hidden lg:block" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 p-1.5 rounded-xl shadow-xl border-slate-200/80" align="end">
                  <div className="px-2.5 py-2 mb-1">
                    <p className="text-xs font-semibold text-slate-900">{userName}</p>
                    <p className="text-[10px] text-slate-500 capitalize">{userRole} Account</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-lg cursor-pointer py-1.5 text-xs text-slate-600 focus:bg-slate-50"
                    onClick={() => navigate("/dashboard")}>
                    <User className="mr-2 h-3.5 w-3.5 text-slate-400" />
                    <span className="font-medium">Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg cursor-pointer py-1.5 text-xs text-slate-600 focus:bg-slate-50"
                    onClick={() => toast({ title: "Coming Soon" })}>
                    <Settings className="mr-2 h-3.5 w-3.5 text-slate-400" />
                    <span className="font-medium">Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-lg cursor-pointer py-1.5 text-xs text-red-600 focus:bg-red-50"
                    onClick={handleLogout}>
                    <LogOut className="mr-2 h-3.5 w-3.5" />
                    <span className="font-medium">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile */}
              <button onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors ml-0.5">
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-14 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-xl overflow-hidden">
            <div className="p-3 space-y-3 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-1.5">
                {allNavItems.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-1.5 p-2 rounded-lg text-[11px] font-semibold transition-all ${
                      location.pathname === item.path
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}>
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </Link>
                ))}
              </div>
              {moreItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-100 text-xs font-medium text-slate-600 hover:bg-slate-50">
                  <item.icon className="w-3.5 h-3.5 text-slate-400" />
                  {item.label}
                </Link>
              ))}
              {isAdmin && (
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-2 px-1">Admin</p>
                  <div className="grid grid-cols-2 gap-2">
                    {adminItems.map((item) => (
                      <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 p-2.5 rounded-lg border border-blue-100 bg-blue-50/50 text-xs font-medium text-blue-600 hover:bg-blue-50">
                        <item.icon className="w-3.5 h-3.5" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
