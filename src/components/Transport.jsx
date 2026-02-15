import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bus, MapPin, Navigation, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Transport = () => {
  const [buses, setBuses] = useState([
    { id: "Bus-01", route: "Vignan - Berhampur", status: "Arriving", eta: "2 min", location: "Main Gate", type: "AC", color: "bg-blue-500" },
    { id: "Bus-02", route: "Vignan - Berhampur", status: "Moving", eta: "12 min", location: "Highway Junction", type: "Non-AC", color: "bg-green-500" },
    { id: "Bus-03", route: "Vignan - Berhampur", status: "Delayed", eta: "25 min", location: "City Outskirts", type: "AC", color: "bg-amber-500" },
    { id: "Bus-04", route: "Vignan - Berhampur", status: "On Time", eta: "35 min", location: "Medical College", type: "Non-AC", color: "bg-purple-500" },
    { id: "Bus-05", route: "Vignan - Berhampur", status: "Scheduled", eta: "50 min", location: "Bus Depot", type: "AC", color: "bg-indigo-500" },
  ]);

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Bus className="w-6 h-6 text-blue-600" />
            Vignan Transport
          </h1>
          <p className="text-slate-500 text-sm mt-1">Live Tracking: Vignan College ↔ Berhampur</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2">
             <MapPin className="w-4 h-4" /> Full Route Map
           </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Bus List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Active Fleet (5)</h2>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Live Updates
            </span>
          </div>
          
          <div className="space-y-3">
            {buses.map((bus) => (
              <motion.div
                key={bus.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded text-white ${bus.color}`}>{bus.id}</span>
                    <span className="text-xs text-slate-500 border border-slate-100 px-1.5 rounded">{bus.type}</span>
                  </div>
                  <span className={`text-xs font-medium ${
                    bus.status === 'Delayed' ? 'text-red-500' : 
                    bus.status === 'Arriving' ? 'text-blue-500' : 'text-green-600'
                  }`}>
                    {bus.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <Bus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 text-sm">{bus.route}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {bus.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-50 pt-2 mt-2">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> ETA: {bus.eta}</span>
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 hover:bg-slate-100">Track</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Map Visualization */}
        <div className="lg:col-span-2 bg-slate-50 rounded-xl overflow-hidden relative min-h-[500px] border border-slate-200 shadow-inner">
            <div className="absolute inset-0 p-8">
              {/* Route Path SVG */}
              <svg className="w-full h-full" viewBox="0 0 600 400">
                {/* Defs for gradients/markers */}
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                  </linearGradient>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#cbd5e1" />
                  </marker>
                </defs>

                {/* Road Path */}
                <path 
                  d="M 50 50 Q 200 50 250 150 T 450 250 T 550 350" 
                  fill="none" 
                  stroke="#e2e8f0" 
                  strokeWidth="40" 
                  strokeLinecap="round"
                />
                <path 
                  d="M 50 50 Q 200 50 250 150 T 450 250 T 550 350" 
                  fill="none" 
                  stroke="#94a3b8" 
                  strokeWidth="2" 
                  strokeDasharray="10,10"
                />

                {/* Stops */}
                {/* Vignan College */}
                <g transform="translate(50, 50)">
                  <circle r="15" fill="#3b82f6" fillOpacity="0.2" />
                  <circle r="8" fill="#3b82f6" />
                  <text x="0" y="-25" textAnchor="middle" className="text-xs font-bold fill-slate-700">Vignan College</text>
                </g>

                {/* Highway Stop */}
                <g transform="translate(250, 150)">
                  <circle r="6" fill="#64748b" />
                  <text x="20" y="5" className="text-[10px] fill-slate-500">Highway Jn</text>
                </g>

                {/* Medical College Stop */}
                <g transform="translate(450, 250)">
                  <circle r="6" fill="#64748b" />
                  <text x="20" y="5" className="text-[10px] fill-slate-500">Medical College</text>
                </g>

                {/* Berhampur */}
                <g transform="translate(550, 350)">
                  <circle r="15" fill="#ef4444" fillOpacity="0.2" />
                  <circle r="8" fill="#ef4444" />
                  <text x="0" y="25" textAnchor="middle" className="text-xs font-bold fill-slate-700">Berhampur</text>
                </g>

              </svg>

              {/* Moving Buses */}
              {/* Bus 1 */}
              <motion.div 
                className="absolute"
                style={{ top: 40, left: 40 }}
                animate={{ offsetDistance: "100%" }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear",
                }}
              >
                 {/* Note: In real CSS motion-path is needed, for simple React/Framer we use coordinates. 
                     Simulating path movement with keyframes for simplicity since SVG motion path support varies */}
              </motion.div>
              
              {/* Using absolute positioning with % based on the path approximation for visual simplicity */}
              
              {/* Bus 1 - Near College */}
              <motion.div 
                className="absolute z-10"
                animate={{ left: ["8%", "12%"], top: ["12%", "14%"] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              >
                 <div className="relative group">
                    <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] font-bold z-20 relative">
                       B1
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black/20 blur-[2px] rounded-full"></div>
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none">
                       <p className="text-xs font-bold text-slate-800">Bus-01</p>
                       <p className="text-[10px] text-slate-500">Speed: 45 km/h</p>
                       <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                    </div>
                 </div>
              </motion.div>

              {/* Bus 2 - Highway */}
              <motion.div 
                className="absolute z-10"
                animate={{ left: ["40%", "45%"], top: ["35%", "40%"] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              >
                 <div className="relative group">
                    <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] font-bold z-20 relative">
                       B2
                    </div>
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none">
                       <p className="text-xs font-bold text-slate-800">Bus-02</p>
                       <p className="text-[10px] text-slate-500">Speed: 52 km/h</p>
                       <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                    </div>
                 </div>
              </motion.div>

              {/* Bus 3 - Delayed */}
              <motion.div 
                className="absolute z-10"
                initial={{ left: "60%", top: "50%" }}
              >
                 <div className="relative group">
                    <div className="w-8 h-8 bg-amber-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] font-bold z-20 relative animate-bounce">
                       B3
                    </div>
                    <div className="absolute -top-8 -right-20 bg-red-100 text-red-600 px-2 py-0.5 rounded text-[10px] font-bold border border-red-200">
                       Traffic Delay
                    </div>
                 </div>
              </motion.div>

              {/* Bus 4 - Near Berhampur */}
              <motion.div 
                className="absolute z-10"
                animate={{ left: ["75%", "78%"], top: ["65%", "68%"] }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
              >
                 <div className="relative group">
                    <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] font-bold z-20 relative">
                       B4
                    </div>
                 </div>
              </motion.div>

               {/* Bus 5 - Arriving Berhampur */}
               <motion.div 
                className="absolute z-10"
                animate={{ left: ["88%", "90%"], top: ["85%", "88%"] }}
                transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
              >
                 <div className="relative group">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] font-bold z-20 relative">
                       B5
                    </div>
                 </div>
              </motion.div>

            </div>
            
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-lg border border-slate-200 shadow-lg text-xs">
               <h4 className="font-bold mb-2">Map Legend</h4>
               <div className="space-y-1">
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-blue-500"></div> <span>Bus 1 (AC)</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-green-500"></div> <span>Bus 2 (Non-AC)</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-amber-500"></div> <span>Bus 3 (Delayed)</span>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Transport;
