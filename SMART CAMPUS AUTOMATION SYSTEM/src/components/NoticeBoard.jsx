import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Newspaper, Calendar, Download, Eye, Loader2, FileText, Search, X } from "lucide-react";
import { getNotices } from "@/lib/api";

const CAT_COLORS = {
  Examination: { bg: "bg-red-50 text-red-600 border-red-100", dot: "bg-red-500" },
  Academic: { bg: "bg-blue-50 text-blue-600 border-blue-100", dot: "bg-blue-500" },
  Placement: { bg: "bg-emerald-50 text-emerald-600 border-emerald-100", dot: "bg-emerald-500" },
  General: { bg: "bg-amber-50 text-amber-600 border-amber-100", dot: "bg-amber-500" },
  Events: { bg: "bg-purple-50 text-purple-600 border-purple-100", dot: "bg-purple-500" },
};

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getNotices().then(setNotices).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(notices.map(n => n.category))];
  const filtered = notices
    .filter(n => filter === "All" || n.category === filter)
    .filter(n => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        (n.title && n.title.toLowerCase().includes(q)) ||
        (n.desc && n.desc.toLowerCase().includes(q)) ||
        (n.category && n.category.toLowerCase().includes(q)) ||
        (n.date && n.date.toLowerCase().includes(q))
      );
    });

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-7 bg-blue-600 rounded-full" />
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Newspaper className="w-7 h-7 text-blue-600" /> Notice Board
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-3">Official notices, circulars, and announcements from the administration.</p>
        </motion.div>

        {/* Search Bar */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search notices by title, description, category, or date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 transition-colors">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
              }`}>{cat}</button>
          ))}
        </div>

        {/* Notices */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-blue-600" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No notices found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((notice, i) => {
              const c = CAT_COLORS[notice.category] || { bg: "bg-slate-50 text-slate-600 border-slate-200", dot: "bg-slate-400" };
              return (
                <motion.div key={notice.id || i}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    {/* Category Dot */}
                    <div className="mt-1.5 flex-shrink-0">
                      <div className={`w-2.5 h-2.5 rounded-full ${c.dot}`}></div>
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <div className="flex items-center gap-2">
                          {notice.isNew && (
                            <span className="px-2 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded uppercase tracking-wider">New</span>
                          )}
                          <h3 className="text-base font-bold text-slate-900 leading-snug">{notice.title}</h3>
                        </div>
                        <span className={`flex-shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${c.bg}`}>{notice.category}</span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed mb-3">{notice.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" /> {notice.date}
                        </span>
                        {notice.file && (
                          <div className="flex items-center gap-2">
                            <a href={notice.file} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-lg transition-colors">
                              <Eye className="w-3.5 h-3.5" /> View PDF
                            </a>
                            <a href={notice.file} download
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors">
                              <Download className="w-3.5 h-3.5" /> Download
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filtered.length} of {notices.length} notices{search && ` matching "${search}"`}{filter !== "All" && ` in ${filter}`}</span>
          {(search || filter !== "All") && (
            <button onClick={() => { setSearch(""); setFilter("All"); }} className="text-blue-600 hover:text-blue-700 font-medium">
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
