import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldAlert, 
  PhoneCall, 
  MessageSquare, 
  UserCheck, 
  FileText, 
  AlertTriangle,
  Lock,
  Send,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const AntiRagging = () => {
  const { toast } = useToast();
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const handleReport = (e) => {
    e.preventDefault();
    toast({
      title: "Report Submitted",
      description: "Your report has been securely submitted to the Anti-Ragging Committee.",
      variant: "destructive",
      className: "bg-red-50 border-red-200 text-red-900",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 space-y-8">
      {/* Hero Warning Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-600 rounded-xl shadow-lg text-white overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <ShieldAlert className="w-10 h-10 text-red-200 animate-pulse" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Zero Tolerance Policy</h1>
            </div>
            <p className="text-red-100 text-lg leading-relaxed">
              Ragging is a criminal offense. Our campus maintains a strict zero-tolerance policy against any form of ragging or harassment. 
              Your safety and dignity are our top priority.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button variant="secondary" className="gap-2 bg-white text-red-700 hover:bg-red-50">
                <PhoneCall className="w-4 h-4" /> Emergency Helpline: 1800-123-4567
              </Button>
              <Button variant="outline" className="gap-2 border-red-400 text-red-100 hover:bg-red-700 hover:text-white">
                <FileText className="w-4 h-4" /> View UGC Regulations
              </Button>
            </div>
          </div>
          
          <div className="bg-red-700/50 p-6 rounded-xl border border-red-500/30 backdrop-blur-sm max-w-sm w-full">
            <h3 className="font-semibold text-red-100 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-300" />
              Immediate Actions
            </h3>
            <ul className="space-y-3 text-sm text-red-50">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-300 mt-2"></span>
                Suspension from attending classes and academic privileges.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-300 mt-2"></span>
                Withholding/withdrawing scholarship/fellowship and other benefits.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-300 mt-2"></span>
                Debarring from appearing in any test/examination.
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reporting Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  File a Complaint
                </h2>
                <p className="text-sm text-slate-500 mt-1">Submit a report securely. We ensure complete confidentiality.</p>
              </div>
              <div className="flex items-center gap-2 bg-slate-200 p-1 rounded-lg">
                <button 
                  onClick={() => setIsAnonymous(false)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${!isAnonymous ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                >
                  Standard
                </button>
                <button 
                  onClick={() => setIsAnonymous(true)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1 ${isAnonymous ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500'}`}
                >
                  <EyeOff className="w-3 h-3" /> Anonymous
                </button>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <form onSubmit={handleReport} className="space-y-6">
                {!isAnonymous && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Full Name</label>
                      <Input placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Roll Number</label>
                      <Input placeholder="Your Roll No." />
                    </div>
                  </div>
                )}
                
                {isAnonymous && (
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3">
                    <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-blue-900">Anonymous Mode Active</h4>
                      <p className="text-xs text-blue-700 mt-1">Your identity will be completely hidden. No personal data will be recorded with this submission.</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Incident Details</label>
                  <Textarea 
                    className="min-h-[150px] resize-none" 
                    placeholder="Please describe the incident in detail, including date, time, and location if possible..." 
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Evidence (Optional)</label>
                  <Input type="file" className="cursor-pointer" />
                  <p className="text-xs text-slate-500">Upload images, audio, or video files if available.</p>
                </div>

                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                    <Send className="w-4 h-4 mr-2" /> Submit Report
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Squad Members */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-600" />
                Anti-Ragging Squad
              </h2>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { name: "Dr. A. K. Sharma", role: "Chairperson", contact: "+91 98765 43210" },
                { name: "Prof. Sarah Johnson", role: "Faculty Member", contact: "+91 98765 43211" },
                { name: "Mr. R. D. Patil", role: "Warden (Boys Hostel)", contact: "+91 98765 43212" },
                { name: "Mrs. L. M. Gupta", role: "Warden (Girls Hostel)", contact: "+91 98765 43213" },
                { name: "Mr. Suresh Kumar", role: "Security Chief", contact: "+91 98765 43214" },
              ].map((member, i) => (
                <div key={i} className="p-4 hover:bg-slate-50 transition-colors">
                  <h3 className="font-semibold text-slate-900">{member.name}</h3>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">{member.role}</p>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    <PhoneCall className="w-3 h-3" /> {member.contact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 rounded-xl shadow-md p-6 text-white">
            <h3 className="font-bold text-lg mb-2">Need Counseling?</h3>
            <p className="text-blue-100 text-sm mb-4">
              If you're feeling distressed or anxious, our student counselors are here to help you 24/7.
            </p>
            <Button variant="secondary" className="w-full bg-white text-blue-700 hover:bg-blue-50">
              Contact Counselor
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AntiRagging;
