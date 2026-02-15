import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  Coffee, 
  Bell, 
  Shield, 
  Clock, 
  MapPin, 
  Bus,
  ArrowUpRight,
  Calendar,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getAttendanceStats, getBooks, getOrders, getAlerts } from "@/lib/api";

const Dashboard = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState({
    present: 0,
    borrowed: 0,
    orders: 0,
    alerts: 0
  });

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const loadStats = async () => {
      // Mock data loading
      setStats({
        present: 85, // %
        borrowed: 12,
        orders: 5,
        alerts: 2
      });
    };
    loadStats();
  }, []);

  const quickLinks = [
    { title: "Library", icon: BookOpen, href: "/library", color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Attendance", icon: Users, href: "/attendance", color: "text-green-600", bg: "bg-green-100" },
    { title: "Cafeteria", icon: Coffee, href: "/cafeteria", color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Notices", icon: Bell, href: "/notices", color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Security", icon: Shield, href: "/security", color: "text-red-600", bg: "bg-red-100" },
    { title: "Transport", icon: Bus, href: "/transport", color: "text-cyan-600", bg: "bg-cyan-100" },
    { title: "Map", icon: MapPin, href: "/map", color: "text-indigo-600", bg: "bg-indigo-100" },
    { title: "Schedule", icon: Calendar, href: "/schedule", color: "text-pink-600", bg: "bg-pink-100" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{greeting}, Student</h1>
            <p className="text-slate-500 mt-1">Welcome back to your smart campus dashboard.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Clock className="w-4 h-4" />
              {new Date().toLocaleDateString()}
            </Button>
            <Button className="bg-slate-900 text-white hover:bg-slate-800">
              View Reports
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Attendance</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{stats.present}%</h3>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-600">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              <span>+2% from last week</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Books Due</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{stats.borrowed}</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-slate-500">
              <span>Return by Friday</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Active Orders</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{stats.orders}</h3>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg">
                <Coffee className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-orange-600">
              <span>Ready for pickup in 10m</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Campus Alerts</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{stats.alerts}</h3>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-red-600">
              <span>Action required</span>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <Link 
                key={link.title} 
                to={link.href}
                className="group bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${link.bg} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <link.icon className={`w-6 h-6 ${link.color}`} />
                </div>
                <h3 className="font-semibold text-slate-900">{link.title}</h3>
                <p className="text-sm text-slate-500 mt-1">Access {link.title}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">Library Book Returned</h4>
                    <p className="text-sm text-slate-500">Introduction to Algorithms</p>
                  </div>
                  <span className="text-sm text-slate-400">2h ago</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-xl shadow-lg text-white">
            <h2 className="text-lg font-bold mb-2">Student ID Card</h2>
            <div className="aspect-[1.58/1] bg-white/10 rounded-lg border border-white/20 p-4 backdrop-blur-sm mt-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                <div className="text-right">
                  <p className="text-xs opacity-70">ID Number</p>
                  <p className="font-mono font-bold">2023-CS-042</p>
                </div>
              </div>
              <div className="mt-8">
                <p className="font-bold text-lg">Asish Ranjan Sahu</p>
                <p className="text-sm opacity-80">Computer Science</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
