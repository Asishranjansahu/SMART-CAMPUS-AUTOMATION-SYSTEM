import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Zap, Droplets, Users, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            Campus Analytics
          </h1>
          <p className="text-slate-500 text-sm mt-1">Real-time insights on resource usage and activity</p>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Energy Consumption" 
          value="452 kWh" 
          change="+12%" 
          trend="up" 
          icon={Zap} 
          color="amber"
        />
        <KpiCard 
          title="Water Usage" 
          value="1,205 L" 
          change="-5%" 
          trend="down" 
          icon={Droplets} 
          color="blue"
        />
        <KpiCard 
          title="Active Students" 
          value="2,845" 
          change="+8%" 
          trend="up" 
          icon={Users} 
          color="emerald"
        />
        <KpiCard 
          title="Avg. Attendance" 
          value="94%" 
          change="+1.2%" 
          trend="up" 
          icon={TrendingUp} 
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Simple Bar Chart: Weekly Attendance */}
        <ChartCard title="Weekly Attendance Trends">
           <div className="h-64 flex items-end justify-between gap-2 pt-6">
              {[85, 92, 88, 95, 89, 75].map((val, i) => (
                 <div key={i} className="flex flex-col items-center gap-2 w-full group">
                    <div className="relative w-full max-w-[40px] bg-slate-100 rounded-t-lg h-full overflow-hidden">
                       <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${val}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg group-hover:bg-indigo-600 transition-colors"
                       />
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                       {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]}
                    </span>
                 </div>
              ))}
           </div>
        </ChartCard>

        {/* Simple Bar Chart: Resource Usage by Block */}
        <ChartCard title="Resource Usage by Block (Daily)">
           <div className="space-y-4 pt-4">
              {[
                 { label: "Main Block", val: 85, color: "bg-blue-500" },
                 { label: "Labs Complex", val: 92, color: "bg-purple-500" },
                 { label: "Library", val: 45, color: "bg-emerald-500" },
                 { label: "Hostels", val: 78, color: "bg-amber-500" },
              ].map((item, i) => (
                 <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                       <span className="font-medium text-slate-700">{item.label}</span>
                       <span className="text-slate-500">{item.val}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.val}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className={`h-full rounded-full ${item.color}`}
                       />
                    </div>
                 </div>
              ))}
           </div>
        </ChartCard>
      </div>
    </div>
  );
};

const KpiCard = ({ title, value, change, trend, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-600`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
        trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
      }`}>
        {trend === 'up' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
        {change}
      </div>
    </div>
    <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
    <p className="text-sm text-slate-500 mt-1">{title}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    {children}
  </div>
);

export default Analytics;
