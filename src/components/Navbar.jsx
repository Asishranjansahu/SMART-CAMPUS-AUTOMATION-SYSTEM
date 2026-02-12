import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Book, 
  Coffee, 
  Home, 
  Shield, 
  UserCheck, 
  Calendar, 
  Map as MapIcon, 
  Building2,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Check,
  Info,
  AlertTriangle,
  Clock,
  ChevronDown,
  ExternalLink,
  Hammer,
  ShieldAlert,
  Trash2,
  GraduationCap,
  Bus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Library Book Due",
      message: "'Data Structures' is due tomorrow",
      time: "2 hours ago",
      type: "warning",
      read: false
    },
    {
      id: 2,
      title: "Attendance Update",
      message: "Your attendance for Java Class is marked",
      time: "5 hours ago",
      type: "success",
      read: false
    },
    {
      id: 3,
      title: "Cafeteria Offer",
      message: "20% off on all coffee drinks today!",
      time: "1 day ago",
      type: "info",
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/attendance", icon: UserCheck, label: "Attendance" },
    { path: "/library", icon: Book, label: "Library" },
    { path: "/cafeteria", icon: Coffee, label: "Cafeteria" },
    { path: "/security", icon: Shield, label: "Security" },
    { path: "/rooms", icon: Calendar, label: "Rooms" },
    { path: "/map", icon: MapIcon, label: "Map" },
  ];

  const campusItems = [
    { path: "/premises", icon: Hammer, label: "Premises Work" },
    { path: "/anti-ragging", icon: ShieldAlert, label: "Anti-Ragging Squad" },
    { path: "/lost-and-found", icon: Search, label: "Lost & Found AI" },
    { path: "/smart-dustbin", icon: Trash2, label: "Smart Dustbins" },
    { path: "/transport", icon: Bus, label: "Smart Transport" },
    { path: "/placement", icon: GraduationCap, label: "Placement Predictor" },
  ];

  if (location.pathname === "/") return null;

  return (
    <>
    <nav className="bg-white sticky top-0 z-50 border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="p-1.5 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900 leading-none tracking-tight">VIGNAN</span>
              <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest">Institute</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
               const isActive = location.pathname === item.path;
               return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2 rounded-md
                    ${isActive 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                    }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-blue-600"}`} />
                  {item.label}
                </Link>
               );
            })}

            {/* Campus Dropdown */}
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-50 focus:outline-none">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    Campus
                    <ChevronDown className="w-3 h-3 ml-0.5 opacity-50" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 p-1 rounded-xl shadow-xl border-slate-200 bg-white" align="start">
                  {campusItems.map((item) => (
                    <DropdownMenuItem 
                      key={item.label} 
                      className="rounded-lg focus:bg-slate-50 cursor-pointer py-2 text-slate-700"
                      onClick={() => navigate(item.path)}
                    >
                      <item.icon className="mr-2 h-3.5 w-3.5 text-slate-500" />
                      <span className="font-medium">{item.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
             </DropdownMenu>

            {/* Resources Dropdown */}
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-50 focus:outline-none">
                    <Book className="w-4 h-4 text-slate-400" />
                    Resources
                    <ChevronDown className="w-3 h-3 ml-0.5 opacity-50" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 p-1 rounded-xl shadow-xl border-slate-200 bg-white" align="start">
                  {[
                    { label: "Student Portal", path: "/dashboard" },
                    { label: "Faculty Login", path: "/login" },
                    { label: "Academic Calendar", action: () => toast({ title: "Coming Soon", description: "Academic Calendar feature is under development." }) },
                    { label: "Exam Results", action: () => toast({ title: "Coming Soon", description: "Exam Results feature is under development." }) },
                    { label: "Support Center", action: () => toast({ title: "Coming Soon", description: "Support Center feature is under development." }) }
                  ].map((item) => (
                    <DropdownMenuItem 
                      key={item.label} 
                      className="rounded-lg focus:bg-slate-50 cursor-pointer py-2 text-slate-700"
                      onClick={() => item.path ? navigate(item.path) : item.action()}
                    >
                      <ExternalLink className="mr-2 h-3.5 w-3.5 text-slate-500" />
                      <span className="font-medium">{item.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
             </DropdownMenu>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
             {/* Expandable Search */}
             <div className="hidden sm:flex items-center">
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 240, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="overflow-hidden mr-2"
                    >
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input 
                          placeholder="Search..." 
                          className="h-9 pl-9 bg-slate-50 border-slate-200 focus-visible:ring-1 focus-visible:ring-slate-400"
                          autoFocus
                          onBlur={() => setIsSearchOpen(false)}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`text-slate-500 hover:text-slate-900 hover:bg-slate-100 ${isSearchOpen ? 'bg-slate-100' : ''}`}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                   <Search className="w-5 h-5" />
                </Button>
             </div>
             
             <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
             
             {/* Notifications Dropdown */}
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 relative">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-0 rounded-xl shadow-xl border-slate-200" align="end" forceMount>
                   <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
                      <h3 className="font-semibold text-sm text-slate-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <button 
                          className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                          onClick={markAllAsRead}
                        >
                          Mark all as read
                        </button>
                      )}
                   </div>
                   <div className="max-h-[320px] overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Bell className="w-6 h-6 text-slate-300" />
                          </div>
                          <p className="text-sm text-slate-500">No new notifications</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-slate-50">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            onClick={() => markAsRead(notification.id)}
                            className={`px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                              notification.read ? 'opacity-75' : 'bg-blue-50/30'
                            }`}
                          >
                             <div className="flex gap-3">
                                <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${
                                  notification.type === 'warning' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                                  notification.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                                  'bg-blue-50 border-blue-100 text-blue-600'
                                }`}>
                                   {notification.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                                    notification.type === 'success' ? <Check className="w-4 h-4" /> :
                                    <Info className="w-4 h-4" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                   <div className="flex justify-between items-start mb-0.5">
                                     <p className={`text-sm truncate pr-2 ${notification.read ? 'font-medium text-slate-700' : 'font-semibold text-slate-900'}`}>
                                       {notification.title}
                                     </p>
                                     <span className="text-[10px] text-slate-400 whitespace-nowrap flex-shrink-0">{notification.time}</span>
                                   </div>
                                   <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                     {notification.message}
                                   </p>
                                </div>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                )}
                             </div>
                          </div>
                        ))}
                        </div>
                      )}
                   </div>
                   <div className="p-2 border-t border-slate-100 bg-slate-50/50 rounded-b-xl">
                      <Button variant="ghost" size="sm" className="w-full text-xs h-8 font-medium text-slate-600 hover:text-slate-900">
                         View All Notifications
                      </Button>
                   </div>
                </DropdownMenuContent>
             </DropdownMenu>

             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-slate-100 hover:ring-slate-200 transition-all ml-1">
                      <Avatar className="h-9 w-9">
                         <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                         <AvatarFallback className="bg-slate-100 text-slate-600 font-medium">AD</AvatarFallback>
                      </Avatar>
                   </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-xl shadow-xl border-slate-200" align="end" forceMount>
                   <DropdownMenuLabel className="font-normal p-3 bg-slate-50/50 border-b border-slate-100">
                      <div className="flex flex-col space-y-1">
                         <p className="text-sm font-semibold text-slate-900">Admin User</p>
                         <p className="text-xs text-slate-500 font-medium">admin@vignan.edu.in</p>
                      </div>
                   </DropdownMenuLabel>
                   <div className="p-1">
                     <DropdownMenuItem className="rounded-lg focus:bg-slate-50 cursor-pointer">
                        <User className="mr-2 h-4 w-4 text-slate-500" />
                        <span className="font-medium text-slate-700">Profile</span>
                     </DropdownMenuItem>
                     <DropdownMenuItem className="rounded-lg focus:bg-slate-50 cursor-pointer">
                        <Settings className="mr-2 h-4 w-4 text-slate-500" />
                        <span className="font-medium text-slate-700">Settings</span>
                     </DropdownMenuItem>
                   </div>
                   <DropdownMenuSeparator className="bg-slate-100" />
                   <div className="p-1">
                     <DropdownMenuItem 
                        className="rounded-lg focus:bg-red-50 text-red-600 focus:text-red-700 cursor-pointer"
                        onClick={handleLogout}
                     >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span className="font-medium">Log out</span>
                     </DropdownMenuItem>
                   </div>
                </DropdownMenuContent>
             </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <div className="lg:hidden ml-2">
                 <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-500 hover:text-slate-900">
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                 </Button>
              </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-slate-100 bg-white shadow-xl"
          >
             <div className="p-4 grid grid-cols-2 gap-3">
                {[...navItems, ...campusItems].map((item) => (
                   <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors border
                         ${location.pathname === item.path
                            ? "bg-slate-900 text-white border-slate-900 shadow-md"
                            : "bg-white text-slate-600 border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                         }`}
                   >
                      <item.icon className={`w-5 h-5 ${location.pathname === item.path ? "text-blue-400" : "text-slate-400"}`} />
                      <span className="font-medium text-sm">{item.label}</span>
                   </Link>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
};

export default Navbar;
