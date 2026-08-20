import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Bell, Plus, Pencil, Trash2, X, Loader2,
  Calendar, FileText, Save, Link2, Tag
} from "lucide-react";
import { getNotices, createNotice, updateNotice, deleteNotice } from "@/lib/api";

const CATEGORIES = ["Academic", "Examination", "Placement", "Events", "General"];

const AdminNotices = () => {
  const { toast } = useToast();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("General");
  const [date, setDate] = useState("");
  const [file, setFile] = useState("");
  const [isNew, setIsNew] = useState(false);

  const loadNotices = async () => {
    try { setNotices(await getNotices()); } catch {} finally { setLoading(false); }
  };
  useEffect(() => { loadNotices(); }, []);

  const resetForm = () => {
    setTitle(""); setDesc(""); setCategory("General"); setDate(""); setFile(""); setIsNew(false);
    setEditing(null); setShowForm(false);
  };

  const openEdit = (n) => {
    setEditing(n); setTitle(n.title); setDesc(n.desc); setCategory(n.category);
    setDate(n.date); setFile(n.file || ""); setIsNew(n.isNew || false); setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date) { toast({ variant: "destructive", title: "Error", description: "Title and date required." }); return; }
    setSaving(true);
    try {
      const payload = { title, desc, category, date, file, isNew };
      if (editing) {
        const { notice } = await updateNotice(editing.id, payload);
        setNotices(prev => prev.map(n => n.id === editing.id ? notice : n));
        toast({ title: "Notice Updated", description: `"${title}" updated.` });
      } else {
        const { notice } = await createNotice(payload);
        setNotices(prev => [notice, ...prev]);
        toast({ title: "Notice Created", description: `"${title}" added.` });
      }
      resetForm();
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: err.message });
    } finally { setSaving(false); }
  };

  const handleDelete = async (n) => {
    if (!confirm(`Delete "${n.title}"?`)) return;
    try {
      await deleteNotice(n.id);
      setNotices(prev => prev.filter(x => x.id !== n.id));
      toast({ title: "Notice Deleted" });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-7 h-7 text-blue-600" /> Manage Notices
            </h1>
            <p className="text-slate-500 text-sm mt-1">Create, edit, and manage official notices and circulars.</p>
          </div>
          <Button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 hover:bg-blue-700 gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> New Notice
          </Button>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={(e) => { if (e.target === e.currentTarget) resetForm(); }}>
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-5 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900">{editing ? "Edit Notice" : "Create New Notice"}</h2>
                  <button onClick={resetForm} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5 text-slate-400" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Title *</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Notice title" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Description</label>
                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Notice details..."
                      rows={3} className="w-full px-3 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">Category</label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select value={category} onChange={(e) => setCategory(e.target.value)}
                          className="w-full h-10 pl-10 pr-4 rounded-md border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="pl-10" required />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">PDF File Path</label>
                    <div className="relative">
                      <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input value={file} onChange={(e) => setFile(e.target.value)} placeholder="e.g. /Notice Details.pdf" className="pl-10" />
                    </div>
                    <p className="text-[11px] text-slate-400">Place PDF files in the <code>public/</code> folder</p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm font-medium text-slate-700">Mark as New</span>
                  </label>
                  <div className="flex gap-3 pt-2">
                    <Button type="button" onClick={resetForm} variant="outline" className="w-1/3 h-11">Cancel</Button>
                    <Button type="submit" className="w-2/3 h-11 bg-blue-600 hover:bg-blue-700" disabled={saving}>
                      {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>
                        : <><Save className="mr-2 h-4 w-4" />{editing ? "Update" : "Create"} Notice</>}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notices List */}
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-blue-600" /></div>
        ) : notices.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No notices yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_100px_100px_80px_120px] gap-3 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Notice</span><span>Category</span><span>Date</span><span>Status</span><span className="text-right">Actions</span>
            </div>
            {notices.map((n, i) => (
              <motion.div key={n.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className={`grid grid-cols-1 md:grid-cols-[1fr_100px_100px_80px_120px] gap-2 md:gap-3 px-6 py-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors items-center`}>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    {n.isNew && <span className="px-1.5 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded uppercase">New</span>}
                    <h4 className="text-sm font-bold text-slate-900 truncate">{n.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{n.desc}</p>
                </div>
                <span className="text-[10px] font-semibold px-2 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-600 w-fit">{n.category}</span>
                <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{n.date}</span>
                <span className="text-[10px] font-semibold">{n.file ? <span className="text-emerald-600">📎 PDF</span> : <span className="text-slate-400">—</span>}</span>
                <div className="flex items-center justify-end gap-1">
                  <button onClick={() => openEdit(n)} className="p-2 hover:bg-slate-100 rounded-lg"><Pencil className="w-4 h-4 text-slate-400 hover:text-blue-600" /></button>
                  <button onClick={() => handleDelete(n)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-slate-400 hover:text-red-600" /></button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotices;
