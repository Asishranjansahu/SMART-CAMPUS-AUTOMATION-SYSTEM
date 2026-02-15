import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Hammer, 
  Wrench, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Plus,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const Premises = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("ongoing"); // ongoing, completed, report
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Data for Works
  const [works, setWorks] = useState([
    {
      id: "M-2024-001",
      title: "Library AC Maintenance",
      location: "Central Library, 2nd Floor",
      type: "Electrical",
      status: "In Progress",
      priority: "High",
      date: "2024-03-10",
      description: "Scheduled maintenance of central air conditioning units."
    },
    {
      id: "M-2024-002",
      title: "Cafeteria Plumbing Repair",
      location: "Main Cafeteria",
      type: "Plumbing",
      status: "Pending",
      priority: "Medium",
      date: "2024-03-12",
      description: "Fixing leakage in the wash basin area."
    },
    {
      id: "M-2024-003",
      title: "Lab 3 Projector Fix",
      location: "Computer Science Block, Lab 3",
      type: "IT Infrastructure",
      status: "Completed",
      priority: "Low",
      date: "2024-03-08",
      description: "Replaced faulty HDMI cable and recalibrated projector."
    },
    {
      id: "M-2024-004",
      title: "Garden Landscaping",
      location: "Main Entrance",
      type: "Grounds",
      status: "In Progress",
      priority: "Low",
      date: "2024-03-14",
      description: "Seasonal planting and trimming of hedges."
    }
  ]);

  const handleReportSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Request Submitted",
      description: "Your maintenance request has been logged successfully.",
      className: "bg-green-50 border-green-200 text-green-800",
    });
    setActiveTab("ongoing");
  };

  const filteredWorks = works.filter(work => 
    (activeTab === "ongoing" ? (work.status === "In Progress" || work.status === "Pending") : work.status === "Completed") &&
    (work.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     work.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Hammer className="w-6 h-6 text-blue-600" />
            Premises & Maintenance
          </h1>
          <p className="text-slate-500 text-sm mt-1">Track ongoing works and report facility issues</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={activeTab === "ongoing" ? "default" : "outline"}
            onClick={() => setActiveTab("ongoing")}
            className="gap-2"
          >
            <Clock className="w-4 h-4" /> Ongoing Works
          </Button>
          <Button 
            variant={activeTab === "completed" ? "default" : "outline"}
            onClick={() => setActiveTab("completed")}
            className="gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> History
          </Button>
          <Button 
            variant={activeTab === "report" ? "destructive" : "outline"} // Using destructive for report to highlight it or just primary
            className={activeTab === "report" ? "bg-orange-600 hover:bg-orange-700" : "border-orange-200 text-orange-700 hover:bg-orange-50"}
            onClick={() => setActiveTab("report")}
          >
            <Plus className="w-4 h-4 mr-2" /> Report Issue
          </Button>
        </div>
      </motion.div>

      {activeTab === "report" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-white p-8 rounded-xl border border-slate-200 shadow-lg"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-orange-600" />
            New Maintenance Request
          </h2>
          <form onSubmit={handleReportSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Issue Type</label>
                <select className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>Carpenter</option>
                  <option>IT Infrastructure</option>
                  <option>Cleaning / Housekeeping</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Priority</label>
                <select className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Location</label>
              <Input placeholder="e.g. Main Building, Room 304" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Description</label>
              <textarea 
                className="w-full min-h-[100px] p-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the issue in detail..."
                required
              ></textarea>
            </div>

            <div className="pt-4 flex gap-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab("ongoing")} className="w-full">Cancel</Button>
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">Submit Request</Button>
            </div>
          </form>
        </motion.div>
      ) : (
        <>
          {/* Search Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  className="pl-9 bg-slate-50 border-slate-200" 
                  placeholder="Search works by title or location..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" /> Filter
             </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className={`
                      ${work.priority === 'High' ? 'bg-red-50 text-red-700 border-red-200' : 
                        work.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                        'bg-blue-50 text-blue-700 border-blue-200'}
                    `}>
                      {work.priority} Priority
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono">{work.id}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{work.title}</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4 mt-0.5 text-slate-400" />
                      <span>{work.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Wrench className="w-4 h-4 text-slate-400" />
                      <span>{work.type}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                    {work.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       {work.status === "Completed" ? (
                         <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                       ) : work.status === "In Progress" ? (
                         <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                       ) : (
                         <AlertTriangle className="w-4 h-4 text-amber-500" />
                       )}
                       <span className="text-sm font-medium text-slate-700">{work.status}</span>
                    </div>
                    <span className="text-xs text-slate-400">{work.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Premises;
