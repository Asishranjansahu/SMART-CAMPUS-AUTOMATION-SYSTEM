
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard";
import Attendance from "@/components/Attendance";
import Library from "@/components/Library";
import Cafeteria from "@/components/Cafeteria";
import Security from "@/components/Security";
import RoomBooking from "@/components/RoomBooking";
import CampusMap from "@/components/CampusMap";
import Premises from "@/components/Premises";
import AntiRagging from "@/components/AntiRagging";
import LostAndFound from "@/components/LostAndFound";
import SmartDustbin from "@/components/SmartDustbin";
import Transport from "@/components/Transport";
import Placement from "@/components/Placement";
import AdminEvents from "@/components/AdminEvents";
import AdminNotices from "@/components/AdminNotices";
import CampusPage from "@/components/CampusPage";
import EventsBoard from "@/components/EventsBoard";
import NoticeBoard from "@/components/NoticeBoard";
import Welcome from "@/components/Welcome";
import Login from "@/components/Login";
import ProtectedRoute from "@/components/ProtectedRoute";

function AppContent() {
  const location = useLocation();
  const isWelcome = location.pathname === "/";
  const isLogin = location.pathname === "/login";



  return (
    <div className={(isWelcome || isLogin) ? "" : "min-h-screen bg-slate-50 dark:bg-slate-950 relative font-sans antialiased"}>
      {/* Global Background Watermark */}
      {(!isWelcome && !isLogin) && (
        <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-slate-900 rounded-full blur-[120px] opacity-[0.02]"></div>
        </div>
      )}

      <div className="relative z-10">
        {(!isWelcome && !isLogin) && <Navbar />}
        <main className={(isWelcome || isLogin) ? "" : "container mx-auto px-4 py-8"}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/attendance" element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            } />
            <Route path="/library" element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            } />
            <Route path="/cafeteria" element={
              <ProtectedRoute>
                <Cafeteria />
              </ProtectedRoute>
            } />
            <Route path="/security" element={
              <ProtectedRoute>
                <Security />
              </ProtectedRoute>
            } />
            <Route path="/rooms" element={
              <ProtectedRoute>
                <RoomBooking />
              </ProtectedRoute>
            } />
            <Route path="/map" element={
              <ProtectedRoute>
                <CampusMap />
              </ProtectedRoute>
            } />
            <Route path="/premises" element={
              <ProtectedRoute>
                <Premises />
              </ProtectedRoute>
            } />
            <Route path="/anti-ragging" element={
              <ProtectedRoute>
                <AntiRagging />
              </ProtectedRoute>
            } />
            <Route path="/lost-and-found" element={
              <ProtectedRoute>
                <LostAndFound />
              </ProtectedRoute>
            } />
            <Route path="/smart-dustbin" element={
              <ProtectedRoute>
                <SmartDustbin />
              </ProtectedRoute>
            } />
            <Route path="/transport" element={
              <ProtectedRoute>
                <Transport />
              </ProtectedRoute>
            } />
            <Route path="/placement" element={
              <ProtectedRoute>
                <Placement />
              </ProtectedRoute>
            } />
            <Route path="/admin/events" element={
              <ProtectedRoute>
                <AdminEvents />
              </ProtectedRoute>
            } />
            <Route path="/admin/notices" element={
              <ProtectedRoute>
                <AdminNotices />
              </ProtectedRoute>
            } />
            <Route path="/campus" element={
              <ProtectedRoute>
                <CampusPage />
              </ProtectedRoute>
            } />
            <Route path="/events" element={
              <ProtectedRoute>
                <EventsBoard />
              </ProtectedRoute>
            } />
            <Route path="/notices" element={
              <ProtectedRoute>
                <NoticeBoard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        {!isWelcome && !isLogin && <Footer />}
      </div>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
