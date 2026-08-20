import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  CalendarDays, Plus, Pencil, Trash2, X, Loader2,
  MapPin, Clock, Tag, FileText, Save, ChevronDown
} from "lucide-react";
import { getEvents, createEvent, updateEvent, deleteEvent } from "@/lib/api";

const COLORS = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100", badge: "bg-blue-600" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", badge: "bg-emerald-600" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100", badge: "bg-purple-600" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", badge: "bg-amber-600" },
  red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-100", badge: "bg-red-600" },
};

const AdminEvents = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Technical");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [color, setColor] = useState("blue");

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch {
      // API unavailable
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadEvents(); }, []);

  const resetForm = () => {
    setTitle(""); setDesc(""); setCategory("Technical");
    setLocation(""); setTime(""); setDate(""); setColor("blue");
    setEditingEvent(null);
    setShowForm(false);
  };

  const openEdit = (event) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDesc(event.desc);
    setCategory(event.category);
    setLocation(event.location);
    setTime(event.time);
    setDate(event.date);
    setColor(event.color || "blue");
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date) {
      toast({ variant: "destructive", title: "Error", description: "Title and date are required." });
      return;
    }
    setSaving(true);
    try {
      const payload = { title, desc, category, location, time, date, color };
      if (editingEvent) {
        const { event } = await updateEvent(editingEvent.id, payload);
        setEvents(prev => prev.map(ev => ev.id === editingEvent.id ? event : ev));
        toast({ title: "Event Updated", description: `"${title}" has been updated.` });
      } else {
        const { event } = await createEvent(payload);
        setEvents(prev => [...prev, event]);
        toast({ title: "Event Created", description: `"${title}" has been added.` });
      }
      resetForm();
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (event) => {
    if (!confirm(`Delete "${event.title}"?`)) return;
    try {
      await deleteEvent(event.id);
      setEvents(prev => prev.filter(e => e.id !== event.id));
      toast({ title: "Event Deleted", description: `"${event.title}" has been removed.` });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: err.message });
    }
  };

  const formatDate = (d) => {
    const dt = new Date(d);
    return { day: dt.getDate(), month: dt.toLocaleString("default", { month: "short" }) };
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <CalendarDays className="w-7 h-7 text-blue-600" /> Manage Events
            </h1>
            <p className="text-slate-500 text-sm mt-1">Create, edit, and manage campus events displayed on the Welcome page.</p>
          </div>
          <Button onClick={() => { resetForm(); setShowForm(true); }}
            className="bg-blue-600 hover:bg-blue-700 gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> New Event
          </Button>
        </motion.div>

        {/* Event Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={(e) => { if (e.target === e.currentTarget) resetForm(); }}>
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                {/* Form Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900">
                    {editingEvent ? "Edit Event" : "Create New Event"}
                  </h2>
                  <button onClick={resetForm} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Event Title *</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input value={title} onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. TechFest 2026" className="pl-10" required />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Description</label>
                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)}
                      placeholder="Event details and description..."
                      rows={3}
                      className="w-full px-3 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  </div>

                  {/* Category & Color */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">Category</label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select value={category} onChange={(e) => setCategory(e.target.value)}
                          className="w-full h-10 pl-10 pr-4 rounded-md border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          {["Technical", "Placement", "Workshop", "Sports", "Cultural", "General"].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">Color</label>
                      <div className="flex gap-2 h-10 items-center">
                        {Object.keys(COLORS).map((c) => (
                          <button key={c} type="button" onClick={() => setColor(c)}
                            className={`w-8 h-8 rounded-full transition-all ${COLORS[c].badge} ${color === c ? 'ring-2 ring-offset-2 ring-blue-400 scale-110' : 'opacity-60 hover:opacity-100'}`} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">Date *</label>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                          className="pl-10" required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input type="time" value={time} onChange={(e) => setTime(e.target.value)}
                          className="pl-10" />
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input value={location} onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Main Auditorium" className="pl-10" />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <Button type="button" onClick={resetForm} variant="outline"
                      className="w-1/3 h-11">Cancel</Button>
                    <Button type="submit" className="w-2/3 h-11 bg-blue-600 hover:bg-blue-700" disabled={saving}>
                      {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>
                        : <><Save className="mr-2 h-4 w-4" />{editingEvent ? "Update Event" : "Create Event"}</>}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Events List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No events yet</p>
            <p className="text-sm text-slate-400 mt-1">Click "New Event" to create your first event.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event, i) => {
              const { day, month } = formatDate(event.date);
              const c = COLORS[event.color] || COLORS.blue;
              return (
                <motion.div key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-all group">
                  {/* Date Badge */}
                  <div className={`flex-shrink-0 w-16 h-16 ${c.badge} rounded-xl flex flex-col items-center justify-center text-white shadow-lg`}>
                    <span className="text-2xl font-bold leading-none">{day}</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">{month}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">{event.title}</h3>
                      <span className={`flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${c.bg} ${c.text} ${c.border}`}>
                        {event.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mb-2">{event.desc}</p>
                    <div className="flex items-center gap-4 text-[11px] text-slate-400">
                      {event.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>}
                      {event.time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{event.time}</span>}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(event)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Edit">
                      <Pencil className="w-4 h-4 text-slate-400 hover:text-blue-600" />
                    </button>
                    <button onClick={() => handleDelete(event)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-600" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
