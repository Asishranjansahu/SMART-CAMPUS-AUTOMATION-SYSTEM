import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, RefreshCw, AlertTriangle, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const SmartDustbin = () => {
  const { toast } = useToast();
  const [bins, setBins] = useState([
    { id: 1, location: "Main Building Entrance", level: 45, status: "Normal", lastCleared: "2 hours ago", battery: 85 },
    { id: 2, location: "Library", level: 85, status: "Critical", lastCleared: "5 hours ago", battery: 42 },
    { id: 3, location: "Cafeteria", level: 92, status: "Critical", lastCleared: "1 hour ago", battery: 15 },
    { id: 4, location: "Boys Hostel", level: 30, status: "Normal", lastCleared: "3 hours ago", battery: 90 },
    { id: 5, location: "Girls Hostel", level: 60, status: "Warning", lastCleared: "4 hours ago", battery: 78 },
    { id: 6, location: "Sports Complex", level: 15, status: "Normal", lastCleared: "1 day ago", battery: 60 },
  ]);

  // Simulate live data
  useEffect(() => {
    const interval = setInterval(() => {
      setBins(prev => prev.map(bin => {
        // Randomly increase fill level
        const change = Math.floor(Math.random() * 5);
        let newLevel = Math.min(100, bin.level + change);
        
        // If it was just cleared (mock logic), it might be low
        if (Math.random() > 0.98) newLevel = 0;

        let status = "Normal";
        if (newLevel > 80) status = "Critical";
        else if (newLevel > 50) status = "Warning";

        // Random battery drain
        let newBattery = bin.battery;
        if (Math.random() > 0.9) newBattery = Math.max(0, bin.battery - 1);

        return { ...bin, level: newLevel, status, battery: newBattery };
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleReport = (id) => {
    setBins(prev => prev.map(bin => bin.id === id ? { ...bin, level: 0, status: "Normal", lastCleared: "Just now" } : bin));
    toast({
      title: "Pickup Requested",
      description: "Cleaning staff has been notified for Bin #" + id,
      className: "bg-blue-50 border-blue-200 text-blue-800",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Trash2 className="w-6 h-6 text-emerald-600" />
            Smart Dustbins
          </h1>
          <p className="text-slate-500 text-sm mt-1">Real-time fill level monitoring & automated pickup requests</p>
        </div>
        <div className="flex gap-4 items-center">
           <div className="flex items-center gap-2 text-sm text-slate-500">
             <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Normal
             <span className="w-3 h-3 rounded-full bg-amber-500"></span> Warning
             <span className="w-3 h-3 rounded-full bg-red-500"></span> Critical
           </div>
           <div className="h-8 w-px bg-slate-200"></div>
           <div className="text-xs text-slate-400">
             Updated: Live
           </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bins.map((bin) => (
          <motion.div
            key={bin.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
          >
            {/* Battery Indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-1">
              <div className={`w-6 h-3 border rounded-sm flex items-center px-0.5 ${bin.battery < 20 ? 'border-red-400' : 'border-slate-300'}`}>
                <div 
                  className={`h-1.5 rounded-sm ${bin.battery < 20 ? 'bg-red-500' : 'bg-slate-400'}`} 
                  style={{ width: `${bin.battery}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-slate-400">{bin.battery}%</span>
            </div>

            <div className="flex justify-between items-start mb-4 mt-2">
              <div>
                <h3 className="font-semibold text-slate-900">{bin.location}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" /> Bin ID: #{bin.id}
                </p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1
                ${bin.status === 'Critical' ? 'bg-red-100 text-red-700' : 
                  bin.status === 'Warning' ? 'bg-amber-100 text-amber-700' : 
                  'bg-emerald-100 text-emerald-700'}`}>
                {bin.status === 'Critical' && <AlertTriangle className="w-3 h-3" />}
                {bin.status}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Fill Level</span>
                <span className="font-medium">{bin.level}%</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${bin.level}%` }}
                  transition={{ duration: 1 }}
                  className={`h-full rounded-full transition-colors duration-500
                    ${bin.status === 'Critical' ? 'bg-red-500' : 
                      bin.status === 'Warning' ? 'bg-amber-500' : 
                      'bg-emerald-500'}`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-400">Last cleared: {bin.lastCleared}</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleReport(bin.id)}
                className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
              >
                <RefreshCw className="w-3 h-3 mr-2" />
                Request Pickup
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SmartDustbin;
