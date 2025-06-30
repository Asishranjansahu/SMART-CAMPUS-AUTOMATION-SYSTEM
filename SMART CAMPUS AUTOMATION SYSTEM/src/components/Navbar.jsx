
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, Coffee, Home, Shield, UserCheck } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/attendance", icon: UserCheck, label: "Attendance" },
    { path: "/library", icon: Book, label: "Library" },
    { path: "/cafeteria", icon: Coffee, label: "Cafeteria" },
    { path: "/security", icon: Shield, label: "Security" },
  ];

  return (
    <nav className="glass-card sticky top-0 z-50 px-4 py-3 mb-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold gradient-text"
            >
              Vignan Institute Of Technology And Management
            </motion.div>
          </Link>
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-white"
                    : "hover:bg-primary/10"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
