
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";
import Attendance from "@/components/Attendance";
import Library from "@/components/Library";
import Cafeteria from "@/components/Cafeteria";
import Security from "@/components/Security";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/library" element={<Library />} />
            <Route path="/cafeteria" element={<Cafeteria />} />
            <Route path="/security" element={<Security />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
