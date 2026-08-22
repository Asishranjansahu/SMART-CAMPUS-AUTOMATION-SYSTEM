import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Sparkles, FileText, Calendar, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Notices = () => {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);

  const notices = [
    {
      id: 1,
      title: "End Semester Examination Schedule Released",
      date: "Today, 10:30 AM",
      category: "Academic",
      content: "The end semester examinations for all B.Tech and M.Tech programs will commence from 15th May 2024. The detailed timetable has been uploaded to the examination portal. Students are requested to check for any clashes and report to the examination cell by 20th April. Hall tickets will be available for download starting 10th May. Strict adherence to the code of conduct is expected.",
      priority: "High"
    },
    {
      id: 2,
      title: "Annual Cultural Fest 'Aura 2024'",
      date: "Yesterday, 4:00 PM",
      category: "Events",
      content: "We are excited to announce Aura 2024, our annual cultural fest, scheduled for 25th-27th April. This year's theme is 'Cyberpunk Odyssey'. Registration for events including Battle of Bands, Dance Off, and Hackathon begins tomorrow. Volunteers are needed for the organizing committee. Interested students can apply via the student council website.",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Library Maintenance Downtime",
      date: "12 Apr, 9:00 AM",
      category: "Facility",
      content: "The digital library services will be unavailable on Sunday, 14th April from 2:00 AM to 6:00 AM for scheduled server maintenance. Physical library access will remain unaffected. We regret the inconvenience caused.",
      priority: "Low"
    }
  ];

  const handleSummarize = (notice) => {
    setIsSummarizing(true);
    setSelectedNotice(notice);
    setSummary("");
    
    // Simulate AI delay
    setTimeout(() => {
      const summaries = {
        1: "• Exams start May 15th, 2024.\n• Check timetable on portal.\n• Report clashes by April 20th.\n• Hall tickets available May 10th.",
        2: "• Aura 2024: April 25th-27th.\n• Theme: Cyberpunk Odyssey.\n• Registrations open tomorrow.\n• Volunteers needed.",
        3: "• Digital Library down: Sunday, April 14th (2 AM - 6 AM).\n• Physical library open."
      };
      setSummary(summaries[notice.id]);
      setIsSummarizing(false);
    }, 1500);
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
            <Bell className="w-6 h-6 text-indigo-600" />
            Digital Notice Board
          </h1>
          <p className="text-slate-500 text-sm mt-1">Stay updated with AI-powered summaries</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {notices.map((notice) => (
            <motion.div
              key={notice.id}
              whileHover={{ scale: 1.01 }}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer group"
              onClick={() => handleSummarize(notice)}
            >
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className={`${
                  notice.priority === 'High' ? 'bg-red-50 text-red-600 border-red-200' :
                  notice.priority === 'Medium' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                  'bg-slate-50 text-slate-600 border-slate-200'
                }`}>
                  {notice.category}
                </Badge>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {notice.date}
                </span>
              </div>
              <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {notice.title}
              </h3>
              <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                {notice.content}
              </p>
              <div className="mt-3 flex items-center text-xs font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-3 h-3 mr-1" /> Click to summarize with AI
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {selectedNotice ? (
              <motion.div
                key={selectedNotice.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 sticky top-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-bold text-indigo-900">{selectedNotice.title}</h2>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedNotice(null)} className="h-8 w-8 p-0">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-indigo-100 mb-4 shadow-sm">
                   <p className="text-sm text-slate-600 leading-relaxed">
                     {selectedNotice.content}
                   </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700">
                    <Sparkles className="w-4 h-4" /> AI Summary
                  </div>
                  {isSummarizing ? (
                    <div className="space-y-2 animate-pulse">
                      <div className="h-4 bg-indigo-200 rounded w-3/4"></div>
                      <div className="h-4 bg-indigo-200 rounded w-1/2"></div>
                      <div className="h-4 bg-indigo-200 rounded w-5/6"></div>
                    </div>
                  ) : (
                    <div className="bg-white/50 p-4 rounded-lg border border-indigo-100 text-sm text-indigo-800 font-medium whitespace-pre-line">
                      {summary}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl p-12">
                <Sparkles className="w-12 h-12 mb-4 text-slate-300" />
                <p>Select a notice to view AI summary</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Simple Clock Icon
const Clock = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default Notices;
