
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Shield, Bell, Camera, AlertTriangle, Lock, Eye, Activity, MapPin, CheckCircle2, History, Radio, Scan } from "lucide-react";
import { getAlerts, sendEmergency } from "@/lib/api";

const Security = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [systemStatus, setSystemStatus] = useState("operational");
  const [cameras, setCameras] = useState([
    { id: 1, name: "Main Gate", status: "online", lastActivity: "2 min ago", threat: 0 },
    { id: 2, name: "Admin Block", status: "online", lastActivity: "5 min ago", threat: 0 },
    { id: 3, name: "Library Entrance", status: "online", lastActivity: "12 min ago", threat: 0 },
    { id: 4, name: "Cafeteria", status: "online", lastActivity: "Just now", threat: 0 },
  ]);

  const handleAlert = (type) => {
    toast({
      title: "PROTOCOL INITIATED",
      description: `${type} sequence activated. Security teams deployed.`,
      className: "bg-red-950 text-red-400 border-red-900",
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
      setCameras(prev => prev.map(cam => {
        // Randomly detect threat
        const isThreat = Math.random() > 0.9;
        return {
            ...cam,
            threat: isThreat ? Math.floor(Math.random() * 40) + 60 : 0
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 min-h-screen bg-slate-950 p-6 text-cyan-400 font-sans">
      {/* Cyberpunk Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/50 p-6 rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)] backdrop-blur-sm"
      >
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-wider">
            AI SURVEILLANCE GRID
          </h1>
          <div className="flex items-center gap-2 mt-2">
             <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                SYSTEM ONLINE
             </div>
             <span className="text-slate-600 text-sm">•</span>
             <p className="text-slate-400 text-xs font-mono">ENCRYPTED CONNECTION ESTABLISHED</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <Button 
             variant="destructive" 
             className="shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.7)] transition-all bg-red-600/90 hover:bg-red-600 border border-red-500"
             onClick={async () => {
               toast({
                 title: "EMERGENCY BROADCAST",
                 description: "LOCKDOWN PROTOCOLS ACTIVATED ACROSS SECTOR.",
                 variant: "destructive",
               });
             }}
           >
             <AlertTriangle className="w-4 h-4 mr-2 animate-pulse" />
             INITIATE LOCKDOWN
           </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/80 p-6 rounded-xl border border-cyan-500/20 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-mono text-cyan-500/70 uppercase tracking-wider">Defcon Level</p>
              <h3 className="text-2xl font-bold text-white font-orbitron">LEVEL 1</h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/80 p-6 rounded-xl border border-purple-500/20 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-mono text-purple-500/70 uppercase tracking-wider">Active Threats</p>
              <h3 className="text-2xl font-bold text-white font-orbitron">{activeCount} DETECTED</h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/80 p-6 rounded-xl border border-emerald-500/20 shadow-sm relative overflow-hidden group"
        >
           <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-mono text-emerald-500/70 uppercase tracking-wider">Grid Uptime</p>
              <h3 className="text-2xl font-bold text-white font-orbitron">99.99%</h3>
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
             className="bg-black rounded-xl border border-slate-800 shadow-2xl overflow-hidden relative"
          >
             {/* Decorative Scan Lines */}
             <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-20 opacity-20"></div>

             <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/80">
                <div className="flex items-center gap-2">
                   <Camera className="w-4 h-4 text-cyan-400" />
                   <h2 className="font-bold text-cyan-400 text-sm uppercase tracking-wide font-mono">Live Visual Feed</h2>
                </div>
                <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30 animate-pulse">
                   <Radio className="w-3 h-3 mr-1" /> LIVE
                </Badge>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 bg-slate-800">
                {cameras.map((cam) => (
                   <div key={cam.id} className="relative aspect-video bg-black group cursor-pointer overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-colors">
                      {/* Placeholder for video feed - using dark gradient to simulate night vision/tech feed */}
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black">
                         {/* Animated Grid on top */}
                         <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                      </div>

                      {/* Camera Icon Center */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                         <Camera className="w-16 h-16 text-cyan-400" />
                      </div>

                      {/* Bounding Box Animation (Simulated AI) */}
                      {cam.threat > 0 ? (
                         <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 border-2 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse">
                            <div className="absolute -top-6 left-0 bg-red-500 text-black text-[10px] font-bold px-1">
                               THREAT DETECTED: {cam.threat}%
                            </div>
                         </div>
                      ) : (
                         <div className="absolute top-1/3 left-1/3 w-24 h-24 border border-cyan-500/30 border-dashed rounded-lg animate-[spin_10s_linear_infinite]"></div>
                      )}
                      
                      {/* Overlay Info */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                         <div className="bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded border border-white/10 flex items-center gap-2 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                            REC • 1080p
                         </div>
                      </div>
                      
                      {/* Bottom Info Bar */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3">
                         <div className="flex justify-between items-end">
                            <div>
                               <p className="text-cyan-400 font-bold text-sm font-orbitron tracking-wide">{cam.name}</p>
                               <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                                  <span>FPS: 60</span>
                                  <span>•</span>
                                  <span>ISO: 800</span>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="text-[10px] text-slate-500 font-mono">AI ANALYSIS</p>
                               <p className={`text-xs font-bold font-mono ${cam.threat > 0 ? 'text-red-500 animate-pulse' : 'text-emerald-400'}`}>
                                  {cam.threat > 0 ? 'ANOMALY DETECTED' : 'CLEAR'}
                               </p>
                            </div>
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
            className="bg-slate-900/80 rounded-xl border border-slate-800 shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-cyan-400" />
                  <h2 className="font-bold text-cyan-400 text-sm uppercase tracking-wide font-mono">Incident Logs</h2>
               </div>
               <Button variant="ghost" size="sm" className="text-xs h-8 text-slate-400 hover:text-white hover:bg-white/5">View Archive</Button>
            </div>
            
            <div className="divide-y divide-slate-800">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 hover:bg-slate-800/50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      alert.severity === 'high' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                      alert.severity === 'medium' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                      'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20'
                    }`}>
                      {alert.severity === 'high' ? <AlertTriangle className="w-4 h-4" /> :
                       alert.severity === 'medium' ? <Shield className="w-4 h-4" /> :
                       <Bell className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{alert.type}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 font-mono">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {alert.location}</span>
                        <span>•</span>
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${
                    alert.status === "Active" 
                      ? "bg-red-500/10 text-red-400 border-red-500/30" 
                      : alert.status === "Investigating"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
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
            className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
               <Shield className="w-4 h-4 text-cyan-400" />
               <h2 className="font-bold text-cyan-400 text-sm uppercase tracking-wide font-mono">Quick Protocols</h2>
            </div>
            
            <div className="space-y-3">
               <Button variant="outline" className="w-full justify-start text-slate-300 hover:text-white hover:bg-cyan-500/10 border-slate-700 hover:border-cyan-500/50 transition-all group" onClick={() => handleAlert("Gate Lock")}>
                  <Lock className="w-4 h-4 mr-2 text-slate-500 group-hover:text-cyan-400" /> Lock Main Gates
               </Button>
               <Button variant="outline" className="w-full justify-start text-slate-300 hover:text-white hover:bg-cyan-500/10 border-slate-700 hover:border-cyan-500/50 transition-all group" onClick={() => handleAlert("Patrol")}>
                  <Eye className="w-4 h-4 mr-2 text-slate-500 group-hover:text-cyan-400" /> Dispatch Patrol
               </Button>
               <Button variant="outline" className="w-full justify-start text-slate-300 hover:text-white hover:bg-cyan-500/10 border-slate-700 hover:border-cyan-500/50 transition-all group" onClick={() => handleAlert("System Check")}>
                  <CheckCircle2 className="w-4 h-4 mr-2 text-slate-500 group-hover:text-cyan-400" /> System Diagnostics
               </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-slate-900 to-black p-5 rounded-xl shadow-lg border border-cyan-500/20"
          >
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-white font-orbitron">
               <Shield className="w-5 h-5 text-emerald-400" />
               Guard Roster
            </h3>
            <div className="space-y-4 mt-4">
              <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                 <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-medium text-cyan-300">Alpha Squad</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded border border-emerald-500/30">ACTIVE</span>
                 </div>
                 <p className="text-xs text-slate-400 font-mono">0600 - 1400 HRS</p>
                 <div className="flex items-center gap-2 mt-2">
                    <div className="flex -space-x-2">
                       <div className="w-6 h-6 rounded-full bg-slate-700 border border-slate-800 flex items-center justify-center text-[8px] text-white">A1</div>
                       <div className="w-6 h-6 rounded-full bg-slate-600 border border-slate-800 flex items-center justify-center text-[8px] text-white">A2</div>
                       <div className="w-6 h-6 rounded-full bg-slate-500 border border-slate-800 flex items-center justify-center text-[8px] text-white">A3</div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">+5 UNITS</span>
                 </div>
              </div>
              
              <div className="bg-transparent p-3 rounded-lg border border-white/5 opacity-60 hover:opacity-100 transition-opacity">
                 <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-medium text-slate-300">Beta Squad</span>
                    <span className="text-[10px] text-slate-500">STANDBY</span>
                 </div>
                 <p className="text-xs text-slate-500 font-mono">1400 - 2200 HRS</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Security;
