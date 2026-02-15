
import React, { useEffect } from "react";
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
import Welcome from "@/components/Welcome";
import Login from "@/components/Login";
import ProtectedRoute from "@/components/ProtectedRoute";

function AppContent() {
  const location = useLocation();
  const isWelcome = location.pathname === "/";
  const isLogin = location.pathname === "/login";

  useEffect(() => {
    // Clear authentication on initial load (refresh)
    const handleRefresh = () => {
      // Check if this is a refresh by checking performance navigation type
      if (performance.getEntriesByType("navigation")[0].type === "reload") {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userRole");
      }
    };
    
    // Also clear on mount to be safe, but we want to allow navigation within the app
    // The issue is: AppContent mounts once on load. If we navigate, it doesn't remount.
    // If we refresh, it remounts.
    // So simply clearing here works for the "refresh" case.
    
    // However, if we want to PERSIST the session during normal use but CLEAR it on refresh...
    // The browser doesn't distinguish easily between "new tab" and "refresh" for localStorage persistence.
    // But sessionStorage IS cleared on tab close, but NOT on refresh.
    // localStorage persists across everything.
    
    // If the user specifically said "refresh the page is redirect to the welcome page",
    // it implies they want the session to be ephemeral.
    
    // Let's use a simpler approach: sessionStorage.
    // If we switch to sessionStorage, a refresh usually KEEPS the session.
    // The user WANTS to lose it on refresh.
    
    // So, we should clear localStorage on mount.
    // But wait, if I navigate from Login to Dashboard, AppContent does NOT remount?
    // Yes, it does NOT remount because it's inside Router.
    // BUT App component (wrapping Router) also mounts once.
    
    // So:
    // 1. User opens App (mounts) -> Clear Auth -> User is logged out. Correct.
    // 2. User logs in -> Auth set in localStorage.
    // 3. User navigates to Dashboard -> App does NOT remount -> Auth persists. Correct.
    // 4. User refreshes page -> App remounts -> Clear Auth -> User logged out. Correct.
    
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
  }, []);

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
