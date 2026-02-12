
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  UserCheck, 
  UserX, 
  Users, 
  Search, 
  Filter,
  Download,
  Calendar,
  ChevronDown,
  GraduationCap,
  BookOpen,
  Briefcase,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { getStudents, getAttendanceStats, markAttendance } from "@/lib/api";
import { io } from "socket.io-client";

// Static data definitions
const COURSES = ["B.Tech", "M.Tech", "MBA"];
const BRANCHES = {
  "B.Tech": ["CSE", "ETC", "EEE", "CIVIL", "MECH"],
  "M.Tech": ["CSE", "VLSI", "Power Systems"],
  "MBA": ["Finance", "HR", "Marketing"]
};
const SECTIONS = ["A", "B", "C"];

// Mock data generator for demonstration if API data is missing detailed fields
const enhanceStudentData = (students) => {
  return students.map(s => {
    // Deterministic enhancement based on ID or random if needed
    const course = COURSES[Math.floor(Math.random() * COURSES.length)];
    const branchList = BRANCHES[course];
    const branch = branchList[Math.floor(Math.random() * branchList.length)];
    const year = Math.floor(Math.random() * 4) + 1;
    const section = SECTIONS[Math.floor(Math.random() * SECTIONS.length)];
    
    return {
      ...s,
      course: s.course || course,
      branch: s.branch || branch,
      year: s.year || year,
      section: s.section || section
    };
  });
};

const Attendance = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ present: 0, absent: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, present, absent
  
  // Hierarchical Filters
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedSection, setSelectedSection] = useState("All");
  
  // View Mode: 'students' or 'faculty'
  const [viewMode, setViewMode] = useState(localStorage.getItem("userRole") === "faculty" ? "faculty" : "students");
  const [faculty, setFaculty] = useState([]);
  const [facultyStats, setFacultyStats] = useState({ 
    total: 0, 
    present: 0, 
    absent: 0, 
    inClass: 0 
  });

  useEffect(() => {
    const load = async () => {
      // Simulate large dataset of 2000 students
      const mockStudents = Array.from({ length: 2000 }).map((_, i) => {
        const id = `211FA0${4000 + i}`; // Generate Roll Nos
        return {
          id: id,
          status: Math.random() > 0.15 ? "present" : "absent", // ~85% attendance
          course: COURSES[Math.floor(Math.random() * COURSES.length)],
          // Branch will be assigned in enhanceStudentData if not present
        };
      });

      const enhanced = enhanceStudentData(mockStudents);
      setStudents(enhanced);

      // Calculate initial stats for students
      const presentCount = enhanced.filter(s => s.status === 'present').length;
      const absentCount = enhanced.length - presentCount;
      setStats({ present: presentCount, absent: absentCount });

      // Generate Mock Faculty Data
      const departments = ["CSE", "ETC", "EEE", "CIVIL", "MECH", "MBA", "Basic Sciences"];
      const mockFaculty = Array.from({ length: 50 }).map((_, i) => {
        const isPresent = Math.random() > 0.1; // 90% attendance
        const isInClass = isPresent && Math.random() > 0.6; // 40% of present faculty in class
        const dept = departments[Math.floor(Math.random() * departments.length)];
        
        return {
          id: `FAC${100 + i}`,
          name: `Dr. Faculty ${i + 1}`,
          department: dept,
          status: isPresent ? "Present" : "Absent",
          currentStatus: !isPresent ? "Absent" : isInClass ? "In Class" : "Free",
          nextClass: isPresent 
            ? `${BRANCHES["B.Tech"][Math.floor(Math.random() * 5)]} - Year ${Math.floor(Math.random() * 4) + 1}` 
            : "N/A",
          nextClassTime: isPresent ? ["10:00 AM", "11:00 AM", "02:00 PM"][Math.floor(Math.random() * 3)] : "N/A"
        };
      });
      
      setFaculty(mockFaculty);
      setFacultyStats({
        total: mockFaculty.length,
        present: mockFaculty.filter(f => f.status === "Present").length,
        absent: mockFaculty.filter(f => f.status === "Absent").length,
        inClass: mockFaculty.filter(f => f.currentStatus === "In Class").length
      });
    };
    load();
    
    // Real-time simulation (since backend might not be running)
    const interval = setInterval(() => {
      // Update Students
      setStudents(prev => {
        const countToUpdate = Math.floor(Math.random() * 3) + 1;
        let newStudents = [...prev];
        let statsChanged = false;
        
        for(let i=0; i<countToUpdate; i++) {
            const idx = Math.floor(Math.random() * newStudents.length);
            if (!newStudents[idx]) continue;
            const student = newStudents[idx];
            // Flip status occasionally
            if (Math.random() > 0.7) {
                const newStatus = student.status === 'present' ? 'absent' : 'present';
                newStudents[idx] = { ...student, status: newStatus };
                statsChanged = true;
            }
        }
        
        if (statsChanged) {
             const p = newStudents.filter(s => s.status === 'present').length;
             const a = newStudents.length - p;
             setStats({ present: p, absent: a });
        }
        return newStudents;
      });

      // Update Faculty
      setFaculty(prev => {
        // Less frequent updates for faculty
        if (Math.random() > 0.3) return prev;

        const idx = Math.floor(Math.random() * prev.length);
        if (!prev[idx]) return prev;
        
        let newFaculty = [...prev];
        const member = newFaculty[idx];
        
        // Toggle In Class / Free status if Present
        if (member.status === "Present") {
            const newStatus = member.currentStatus === "In Class" ? "Free" : "In Class";
            newFaculty[idx] = { ...member, currentStatus: newStatus };
            
            // Recalculate stats
            const total = newFaculty.length;
            const present = newFaculty.filter(f => f.status === "Present").length;
            const absent = newFaculty.filter(f => f.status === "Absent").length;
            const inClass = newFaculty.filter(f => f.currentStatus === "In Class").length;
            
            setFacultyStats({ total, present, absent, inClass });
            return newFaculty;
        }
        
        return prev;
      });
    }, 2000); // Update every 2 seconds

    // Socket connection (optional/demo)
    try {
      const socket = io("http://localhost:4000");
      socket.on("attendance_updated", ({ id, status }) => {
        setStudents(prev => {
            const newStudents = prev.map(p => p.id === id ? { ...p, status } : p);
            const p = newStudents.filter(s => s.status === 'present').length;
            const a = newStudents.length - p;
            setStats({ present: p, absent: a });
            return newStudents;
        });
      });
      return () => {
          socket.close();
          clearInterval(interval);
      };
    } catch (e) {
      console.log("Socket not available");
      return () => clearInterval(interval);
    }
  }, []);

  const handleMarkAttendance = (id, status) => {
    markAttendance(id, status).catch(() => {}).finally(() => {
       // Optimistic update
       setStudents(prev => prev.map(p => p.id === id ? { ...p, status } : p));
       
       // Recalculate stats locally for immediate feedback
       setStats(prev => {
          const student = students.find(s => s.id === id);
          const oldStatus = student.status;
          if (oldStatus === status) return prev;
          
          let newPresent = prev.present;
          let newAbsent = prev.absent;
          
          if (status === 'present') newPresent++;
          if (status === 'absent') newAbsent++;
          if (oldStatus === 'present') newPresent--;
          if (oldStatus === 'absent') newAbsent--;
          
          return { present: newPresent, absent: newAbsent };
       });
    });

    toast({
      title: "Attendance Updated",
      description: `Student attendance marked as ${status}`,
    });
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || student.status === filter;
    
    const matchesCourse = selectedCourse === "All" || student.course === selectedCourse;
    const matchesYear = selectedYear === "All" || student.year.toString() === selectedYear;
    const matchesBranch = selectedBranch === "All" || student.branch === selectedBranch;
    const matchesSection = selectedSection === "All" || student.section === selectedSection;

    return matchesSearch && matchesFilter && matchesCourse && matchesYear && matchesBranch && matchesSection;
  });

  const filteredFaculty = faculty.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || f.status.toLowerCase() === filter;
    
    return matchesSearch && matchesFilter;
  });

  const totalStudents = students.length;
  const attendanceRate = totalStudents > 0 ? Math.round((stats.present / totalStudents) * 100) : 0;

  // Derived options for dropdowns
  const availableBranches = selectedCourse === "All" 
    ? [...new Set(Object.values(BRANCHES).flat())]
    : BRANCHES[selectedCourse] || [];

  const availableYears = selectedCourse === "All" || selectedCourse === "B.Tech"
    ? [1, 2, 3, 4]
    : [1, 2]; // M.Tech and MBA usually have 2 years

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 space-y-6">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Attendance Management</h1>
          <p className="text-slate-500 text-sm mt-1">Track and manage daily attendance</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${viewMode === "students" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
            onClick={() => setViewMode("students")}
          >
            Students
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${viewMode === "faculty" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
            onClick={() => setViewMode("faculty")}
          >
            Faculty
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Report</span>
          </Button>
        </div>
      </motion.div>

      {/* Advanced Filters Bar - Only for Students */}
      {viewMode === "students" && (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
         {/* Course Filter */}
         <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 ml-1">Course</label>
            <div className="relative">
               <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <select 
                  className="w-full h-10 pl-9 pr-4 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  value={selectedCourse}
                  onChange={(e) => {
                     setSelectedCourse(e.target.value);
                     setSelectedBranch("All"); // Reset branch when course changes
                  }}
               >
                  <option value="All">All Courses</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="MBA">MBA</option>
               </select>
               <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
         </div>

         {/* Year Filter */}
         <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 ml-1">Year</label>
            <div className="relative">
               <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <select 
                  className="w-full h-10 pl-9 pr-4 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
               >
                  <option value="All">All Years</option>
                  {availableYears.map(year => (
                     <option key={year} value={year}>{year === 1 ? '1st' : year === 2 ? '2nd' : year === 3 ? '3rd' : '4th'} Year</option>
                  ))}
               </select>
               <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
         </div>

         {/* Branch Filter */}
         <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 ml-1">Branch</label>
            <div className="relative">
               <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <select 
                  className="w-full h-10 pl-9 pr-4 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
               >
                  <option value="All">All Branches</option>
                  {availableBranches.map(b => (
                     <option key={b} value={b}>{b}</option>
                  ))}
               </select>
               <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
         </div>

         {/* Section Filter */}
         <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 ml-1">Section</label>
            <div className="relative">
               <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <select 
                  className="w-full h-10 pl-9 pr-4 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
               >
                  <option value="All">All Sections</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
               </select>
               <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
         </div>
      </motion.div>
      )}

      {/* Stats Cards */}
      {viewMode === "students" ? (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
             <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Students</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">{totalStudents}</h3>
             </div>
             <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Users className="w-5 h-5" />
             </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
             <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
             <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Present</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">{stats.present}</h3>
             </div>
             <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <UserCheck className="w-5 h-5" />
             </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
             <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(stats.present / totalStudents) * 100}%` }}></div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
             <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Absent</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">{stats.absent}</h3>
             </div>
             <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <UserX className="w-5 h-5" />
             </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
             <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: `${(stats.absent / totalStudents) * 100}%` }}></div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
             <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance Rate</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">{attendanceRate}%</h3>
             </div>
             <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <div className="w-5 h-5 font-bold text-sm flex items-center justify-center">%</div>
             </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
             <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${attendanceRate}%` }}></div>
          </div>
        </motion.div>
      </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
             <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Faculty</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">{facultyStats.total}</h3>
             </div>
             <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Briefcase className="w-5 h-5" />
             </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
             <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
             <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Present Today</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">{facultyStats.present}</h3>
             </div>
             <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <UserCheck className="w-5 h-5" />
             </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
             <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(facultyStats.present / facultyStats.total) * 100}%` }}></div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
             <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Absent Today</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">{facultyStats.absent}</h3>
             </div>
             <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <UserX className="w-5 h-5" />
             </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
             <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: `${(facultyStats.absent / facultyStats.total) * 100}%` }}></div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
             <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Taking Class</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">{facultyStats.inClass}</h3>
             </div>
             <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Clock className="w-5 h-5" />
             </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
             <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(facultyStats.inClass / facultyStats.present) * 100}%` }}></div>
          </div>
        </motion.div>
      </div>
      )}

      {/* Main Content Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      >
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search by name or ID..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
             <Button 
                variant={filter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("all")}
                className="flex-1 sm:flex-none"
             >
                All
             </Button>
             <Button 
                variant={filter === "present" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("present")}
                className={`flex-1 sm:flex-none ${filter === "present" ? "bg-green-600 hover:bg-green-700" : ""}`}
             >
                Present
             </Button>
             <Button 
                variant={filter === "absent" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("absent")}
                className={`flex-1 sm:flex-none ${filter === "absent" ? "bg-red-600 hover:bg-red-700" : ""}`}
             >
                Absent
             </Button>
          </div>
        </div>

        {/* List Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                {viewMode === "students" ? (
                  <>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">College Roll No</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Course Info</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </>
                ) : (
                  <>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Faculty Info</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Status</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Next Class</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Attendance</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {viewMode === "students" ? (
                filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 group-hover:bg-white group-hover:border-blue-200 group-hover:text-blue-600 transition-colors">
                            <Users className="w-4 h-4" />
                          </div>
                          <span className="font-mono text-sm font-semibold text-slate-900">{student.id}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-700">{student.course} - {student.branch}</span>
                          <span className="text-xs text-slate-500">Year {student.year} • Sec {student.section}</span>
                        </div>
                      </td>
                      <td className="p-4">
                         <Badge variant="outline" className={`${
                           student.status === "present" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : 
                           student.status === "absent" ? "bg-rose-50 text-rose-700 border-rose-200" : 
                           "bg-slate-50 text-slate-600 border-slate-200"
                         }`}>
                            {student.status === "present" ? "Present" : student.status === "absent" ? "Absent" : "Not Marked"}
                         </Badge>
                      </td>
                      <td className="p-4 text-right">
                         <div className="flex gap-2 justify-end">
                          <button
                            className={`p-1.5 rounded-md transition-all ${
                              student.status === "present" 
                                ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500 ring-offset-1" 
                                : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                            }`}
                            onClick={() => handleMarkAttendance(student.id, "present")}
                            title="Mark Present"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                          <button
                            className={`p-1.5 rounded-md transition-all ${
                              student.status === "absent" 
                                ? "bg-rose-100 text-rose-700 ring-2 ring-rose-500 ring-offset-1" 
                                : "text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            }`}
                            onClick={() => handleMarkAttendance(student.id, "absent")}
                            title="Mark Absent"
                          >
                            <UserX className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-12 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-500">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                          <Search className="w-6 h-6 text-slate-300" />
                        </div>
                        <p className="font-medium">No students found</p>
                        <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )
              ) : (
                filteredFaculty.length > 0 ? (
                  filteredFaculty.map((f) => (
                    <motion.tr
                      key={f.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 group-hover:bg-white group-hover:border-blue-200 group-hover:text-blue-600 transition-colors">
                            <Briefcase className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-900">{f.name}</span>
                            <span className="text-xs text-slate-500">{f.id} • {f.department}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                         <Badge variant="outline" className={`${
                           f.currentStatus === "In Class" ? "bg-amber-50 text-amber-700 border-amber-200" : 
                           f.currentStatus === "Free" ? "bg-blue-50 text-blue-700 border-blue-200" : 
                           "bg-slate-50 text-slate-600 border-slate-200"
                         }`}>
                            {f.currentStatus}
                         </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-700">{f.nextClass}</span>
                          <span className="text-xs text-slate-500">{f.nextClassTime}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                         <Badge variant="outline" className={`${
                           f.status === "Present" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : 
                           "bg-rose-50 text-rose-700 border-rose-200"
                         }`}>
                            {f.status}
                         </Badge>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-12 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-500">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                          <Search className="w-6 h-6 text-slate-300" />
                        </div>
                        <p className="font-medium">No faculty found</p>
                        <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Attendance;
