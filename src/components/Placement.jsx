import React, { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, TrendingUp, AlertCircle, Code, Database, Globe } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const Placement = () => {
  const [placementProb, setPlacementProb] = useState(78);
  const [resumeScore, setResumeScore] = useState(65);

  const skills = [
    { name: "React.js", level: 85, required: 90, gap: "Low" },
    { name: "Node.js", level: 60, required: 80, gap: "Medium" },
    { name: "Data Structures", level: 45, required: 85, gap: "High" },
    { name: "System Design", level: 30, required: 70, gap: "High" },
  ];

  const recommendations = [
    { title: "Advanced React Patterns", platform: "Udemy", impact: "+12%" },
    { title: "System Design Primer", platform: "GitHub", impact: "+15%" },
    { title: "LeetCode Daily Challenge", platform: "LeetCode", impact: "+8%" },
  ];

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-purple-600" />
            Placement Predictor AI
          </h1>
          <p className="text-slate-500 text-sm mt-1">Analyze your career trajectory and skill gaps</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2">
             <TrendingUp className="w-4 h-4" /> View Trends
           </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Probability Score */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-purple-50 opacity-50"></div>
          <h2 className="text-lg font-semibold text-slate-700 mb-6 relative z-10">Placement Probability</h2>
          
          <div className="relative w-48 h-48 flex items-center justify-center z-10">
             <svg className="w-full h-full transform -rotate-90">
               <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
               <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                 strokeDasharray={2 * Math.PI * 88}
                 strokeDashoffset={2 * Math.PI * 88 * (1 - placementProb / 100)}
                 className="text-purple-600 transition-all duration-1000 ease-out"
               />
             </svg>
             <div className="absolute flex flex-col items-center">
               <span className="text-5xl font-bold text-slate-900">{placementProb}%</span>
               <span className="text-xs text-purple-600 mt-1 font-medium">CONFIDENCE</span>
             </div>
          </div>
          
          <div className="mt-8 space-y-2 w-full relative z-10">
            <div className="flex justify-between text-sm text-slate-500 font-medium">
              <span>Resume Score</span>
              <span className={resumeScore > 70 ? "text-green-600" : "text-amber-600"}>{resumeScore}/100</span>
            </div>
            <Progress value={resumeScore} className="h-2 bg-slate-100" indicatorClassName={resumeScore > 70 ? "bg-green-500" : "bg-amber-500"} />
          </div>
        </motion.div>

        {/* Skill Gap Analysis */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm col-span-1 md:col-span-2"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-600" /> Skill Gap Analysis
          </h3>
          
          <div className="space-y-6">
            {skills.map((skill, idx) => (
              <div key={idx} className="relative">
                <div className="flex justify-between mb-2 text-sm font-medium">
                  <span className="text-slate-700">{skill.name}</span>
                  <div className="flex gap-4">
                     <span className="text-slate-400">Target: {skill.required}%</span>
                     <span className={
                       skill.gap === "High" ? "text-red-500" : 
                       skill.gap === "Medium" ? "text-amber-500" : "text-green-600"
                     }>{skill.level}%</span>
                  </div>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex relative">
                   {/* Current Level */}
                   <div 
                     className="bg-blue-600 h-full rounded-l-full z-10 relative" 
                     style={{ width: `${skill.level}%` }}
                   ></div>
                   {/* Gap (Target - Current) */}
                   <div 
                     className="bg-slate-200 h-full absolute top-0 left-0" 
                     style={{ width: `${skill.required}%` }}
                   ></div>
                </div>
                {skill.gap === "High" && (
                  <div className="absolute right-0 -top-1">
                    <AlertCircle className="w-4 h-4 text-red-500 animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm col-span-1 md:col-span-3"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" /> AI Recommended Actions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 hover:border-green-200 hover:bg-green-50/30 p-4 rounded-xl transition-all group cursor-pointer">
                 <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-slate-500 px-2 py-1 bg-white border border-slate-200 rounded">{rec.platform}</span>
                    <span className="text-green-600 font-bold text-sm">{rec.impact}</span>
                 </div>
                 <h4 className="text-base font-bold text-slate-900 group-hover:text-green-700 transition-colors">{rec.title}</h4>
                 <p className="text-sm text-slate-500 mt-2">Recommended to bridge "Data Structures" gap.</p>
                 <Button className="w-full mt-4 bg-white hover:bg-green-600 hover:text-white text-green-600 border border-green-200 shadow-sm transition-all">
                    Start Learning
                 </Button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Placement;
