import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock, Loader2, Tag, Search, X } from "lucide-react";
import { getEvents } from "@/lib/api";

const COLORS = {
  blue: { bg: "bg-blue-600", tag: "bg-blue-50 text-blue-600" },
  emerald: { bg: "bg-emerald-600", tag: "bg-emerald-50 text-emerald-600" },
  purple: { bg: "bg-purple-600", tag: "bg-purple-50 text-purple-600" },
  amber: { bg: "bg-amber-600", tag: "bg-amber-50 text-amber-600" },
  red: { bg: "bg-red-600", tag: "bg-red-50 text-red-600" },
};

const EventsBoard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getEvents().then(setEvents).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(events.map(e => e.category))];
  const filtered = events
    .filter(e => filter === "All" || e.category === filter)
    .filter(e => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        (e.title && e.title.toLowerCase().includes(q)) ||
        (e.desc && e.desc.toLowerCase().includes(q)) ||
        (e.location && e.location.toLowerCase().includes(q)) ||
        (e.category && e.category.toLowerCase().includes(q)) ||
        (e.date && e.date.toLowerCase().includes(q))
      );
    });

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-7 bg-blue-600 rounded-full" />
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <CalendarDays className="w-7 h-7 text-blue-600" /> Events Board
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-3">All upcoming campus events, workshops, and activities.</p>
        </motion.div>

        {/* Search Bar */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search events by title, description, location, or date..."
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

        {/* Events */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-blue-600" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No events found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((event, i) => {
              const dt = new Date(event.date);
              const day = dt.getDate();
              const month = dt.toLocaleString("default", { month: "short" });
              const c = COLORS[event.color] || COLORS.blue;
              return (
                <motion.div key={event.id || i}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all">
                  <div className="flex gap-4">
                    {/* Date Badge */}
                    <div className={`w-16 h-16 ${c.bg} rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                      <span className="text-2xl font-bold leading-none">{day}</span>
                      <span className="text-[9px] font-medium uppercase tracking-wider opacity-80">{month}</span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h3 className="text-base font-bold text-slate-900 leading-snug">{event.title}</h3>
                        <span className={`flex-shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full ${c.tag}`}>{event.category}</span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed mb-3">{event.desc}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        {event.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{event.location}</span>}
                        {event.time && <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{event.time}</span>}
                        <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" />{event.date}</span>
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
          <span>Showing {filtered.length} of {events.length} events{search && ` matching "${search}"`}{filter !== "All" && ` in ${filter}`}</span>
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

export default EventsBoard;
