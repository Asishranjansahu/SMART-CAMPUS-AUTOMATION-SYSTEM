
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Shield, Bell, Camera, AlertTriangle, Lock, Eye, Activity, MapPin, CheckCircle2, History, Radio } from "lucide-react";
import { getAlerts, sendEmergency } from "@/lib/api";

const Security = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [systemStatus, setSystemStatus] = useState("operational");
  const [cameras, setCameras] = useState([
    { id: 1, name: "Main Gate", status: "online", lastActivity: "2 min ago" },
    { id: 2, name: "Admin Block", status: "online", lastActivity: "5 min ago" },
    { id: 3, name: "Library Entrance", status: "online", lastActivity: "12 min ago" },
    { id: 4, name: "Cafeteria", status: "online", lastActivity: "Just now" },
  ]);

  const handleAlert = (type) => {
    toast({
      title: "Action Triggered",
      description: `${type} protocol has been initiated. Security team notified.`,
      className: "bg-slate-900 text-white border-slate-800",
    });
  };

  useEffect(() => {
    // Simulate loading initial data
    const load = async () => {
      // Mock data instead of API call for stability
      const mockAlerts = [
        { id: 1, type: "Unauthorized Access", location: "Server Room", time: "10:23 AM", status: "Resolved", severity: "high" },
        { id: 2, type: "Door Forced Open", location: "Rear Exit", time: "09:15 AM", status: "Active", severity: "medium" },
        { id: 3, type: "Motion Detected", location: "Chemistry Lab", time: "02:45 AM", status: "Investigating", severity: "low" },
      ];
      setAlerts(mockAlerts);
      setActiveCount(mockAlerts.filter(a => a.status === "Active").length);
    };
    load();

    // Simulate real-time updates without socket.io
    const interval = setInterval(() => {
      // Randomly update a camera status or add a log
      if (Math.random() > 0.8) {
         // Maybe flash a camera recording status
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Professional Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Security Command Center</h1>
          <div className="flex items-center gap-2 mt-1">
             <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                System Operational
             </div>
             <span className="text-slate-400 text-sm">•</span>
             <p className="text-slate-500 text-sm">Monitoring 4 Zones</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <Button 
             variant="destructive" 
             className="shadow-sm hover:shadow-md transition-all bg-rose-600 hover:bg-rose-700"
             onClick={async () => {
               // await sendEmergency(); // Mocked for now
               toast({
                 title: "EMERGENCY BROADCAST",
                 description: "Emergency protocols activated across campus.",
                 variant: "destructive",
               });
             }}
           >
             <AlertTriangle className="w-4 h-4 mr-2" />
             Emergency Lockdown
           </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Security Level</p>
              <h3 className="text-xl font-bold text-slate-900">Level 1 (Normal)</h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Alerts</p>
              <h3 className="text-xl font-bold text-slate-900">{activeCount} Pending</h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Uptime</p>
              <h3 className="text-xl font-bold text-slate-900">99.9%</h3>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Camera Grid */}
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2 }}
             className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
          >
             <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <Camera className="w-4 h-4 text-slate-900" />
                   <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Live Surveillance</h2>
                </div>
                <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
                   <Radio className="w-3 h-3 mr-1 text-red-500 animate-pulse" /> Live Feed
                </Badge>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 p-1 bg-slate-100">
                {cameras.map((cam) => (
                   <div key={cam.id} className="relative aspect-video bg-slate-900 group cursor-pointer overflow-hidden">
                      {/* Placeholder for video feed */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-10 transition-opacity">
                         <Camera className="w-12 h-12 text-white" />
                      </div>
                      
                      {/* Overlay Info */}
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                         REC
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                         <div className="flex justify-between items-end">
                            <div>
                               <p className="text-white font-medium text-sm">{cam.name}</p>
                               <p className="text-white/60 text-xs">{cam.lastActivity}</p>
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-0 text-[10px] hover:bg-emerald-500/20">
                               Online
                            </Badge>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </motion.div>

          {/* Recent Logs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-slate-900" />
                  <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Incident Logs</h2>
               </div>
               <Button variant="ghost" size="sm" className="text-xs h-8">View Archive</Button>
            </div>
            
            <div className="divide-y divide-slate-100">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      alert.severity === 'high' ? 'bg-rose-100 text-rose-600' :
                      alert.severity === 'medium' ? 'bg-amber-100 text-amber-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {alert.severity === 'high' ? <AlertTriangle className="w-4 h-4" /> :
                       alert.severity === 'medium' ? <Shield className="w-4 h-4" /> :
                       <Bell className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{alert.type}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {alert.location}</span>
                        <span>•</span>
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${
                    alert.status === "Active" 
                      ? "bg-rose-50 text-rose-700 border-rose-200" 
                      : alert.status === "Investigating"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }`}>
                    {alert.status}
                  </Badge>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
               <Shield className="w-4 h-4 text-slate-900" />
               <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Quick Protocols</h2>
            </div>
            
            <div className="space-y-3">
               <Button variant="outline" className="w-full justify-start text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-200" onClick={() => handleAlert("Gate Lock")}>
                  <Lock className="w-4 h-4 mr-2 text-slate-500" /> Lock Main Gates
               </Button>
               <Button variant="outline" className="w-full justify-start text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-200" onClick={() => handleAlert("Patrol")}>
                  <Eye className="w-4 h-4 mr-2 text-slate-500" /> Dispatch Patrol
               </Button>
               <Button variant="outline" className="w-full justify-start text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-200" onClick={() => handleAlert("System Check")}>
                  <CheckCircle2 className="w-4 h-4 mr-2 text-slate-500" /> System Diagnostics
               </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900 p-5 rounded-xl shadow-lg text-white"
          >
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
               <Shield className="w-5 h-5 text-emerald-400" />
               Guard Schedule
            </h3>
            <div className="space-y-4 mt-4">
              <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                 <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-medium text-white">Morning Shift</span>
                    <span className="text-xs text-emerald-300 bg-emerald-900/30 px-2 py-0.5 rounded">Active</span>
                 </div>
                 <p className="text-xs text-slate-400">06:00 AM - 02:00 PM</p>
                 <div className="flex items-center gap-2 mt-2">
                    <div className="flex -space-x-2">
                       <div className="w-6 h-6 rounded-full bg-slate-700 border border-slate-800"></div>
                       <div className="w-6 h-6 rounded-full bg-slate-600 border border-slate-800"></div>
                       <div className="w-6 h-6 rounded-full bg-slate-500 border border-slate-800"></div>
                    </div>
                    <span className="text-xs text-slate-400">+5 Guards</span>
                 </div>
              </div>
              
              <div className="bg-transparent p-3 rounded-lg border border-white/10 opacity-60">
                 <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-medium text-white">Evening Shift</span>
                    <span className="text-xs text-slate-400">Upcoming</span>
                 </div>
                 <p className="text-xs text-slate-400">02:00 PM - 10:00 PM</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Security;
