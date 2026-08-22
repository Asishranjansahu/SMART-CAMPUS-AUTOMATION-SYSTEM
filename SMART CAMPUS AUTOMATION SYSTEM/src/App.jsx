import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import PageTransition from "@/components/PageTransition";

// ─── Lazy-loaded with preload support ───
function lazyPreload(factory) {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
}

const Welcome = lazyPreload(() => import("@/components/Welcome"));
const Login = lazyPreload(() => import("@/components/Login"));
const Dashboard = lazyPreload(() => import("@/components/Dashboard"));
const Attendance = lazyPreload(() => import("@/components/Attendance"));
const Library = lazyPreload(() => import("@/components/Library"));
const Cafeteria = lazyPreload(() => import("@/components/Cafeteria"));
const Security = lazyPreload(() => import("@/components/Security"));
const RoomBooking = lazyPreload(() => import("@/components/RoomBooking"));
const CampusMap = lazyPreload(() => import("@/components/CampusMap"));
const Premises = lazyPreload(() => import("@/components/Premises"));
const AntiRagging = lazyPreload(() => import("@/components/AntiRagging"));
const LostAndFound = lazyPreload(() => import("@/components/LostAndFound"));
const SmartDustbin = lazyPreload(() => import("@/components/SmartDustbin"));
const Transport = lazyPreload(() => import("@/components/Transport"));
const Placement = lazyPreload(() => import("@/components/Placement"));
const AdminEvents = lazyPreload(() => import("@/components/AdminEvents"));
const AdminNotices = lazyPreload(() => import("@/components/AdminNotices"));
const CampusPage = lazyPreload(() => import("@/components/CampusPage"));
const EventsBoard = lazyPreload(() => import("@/components/EventsBoard"));
const NoticeBoard = lazyPreload(() => import("@/components/NoticeBoard"));

const routeImporters = {
  "/dashboard": Dashboard, "/attendance": Attendance, "/library": Library,
  "/cafeteria": Cafeteria, "/security": Security, "/rooms": RoomBooking,
  "/map": CampusMap, "/premises": Premises, "/anti-ragging": AntiRagging,
  "/lost-and-found": LostAndFound, "/smart-dustbin": SmartDustbin,
  "/transport": Transport, "/placement": Placement, "/admin/events": AdminEvents,
  "/admin/notices": AdminNotices, "/campus": CampusPage, "/events": EventsBoard,
  "/notices": NoticeBoard,
};

const preloaded = new Set();
export function preloadRoute(path) {
  if (preloaded.has(path)) return;
  const importer = routeImporters[path];
  if (importer) { preloaded.add(path); importer.preload?.(); }
}

let prefetching = false;
function prefetchAll() {
  if (prefetching) return;
  prefetching = true;
  Object.values(routeImporters).forEach(c => c.preload?.());
}

function AnimatedRoutes() {
  const location = useLocation();
  const isWelcome = location.pathname === "/";
  const isLogin = location.pathname === "/login";
  const isProtected = !isWelcome && !isLogin;

  if (isProtected) prefetchAll();

  return (
    <div className={isProtected ? "min-h-screen bg-slate-50 dark:bg-slate-950 relative font-sans antialiased" : ""}>
      {isProtected && (
        <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-slate-900 rounded-full blur-[120px] opacity-[0.02]" />
        </div>
      )}
      <div className="relative z-10">
        {isProtected && <Navbar />}
        <main className={isProtected ? "container mx-auto px-4 py-8" : ""}>
          <Suspense fallback={null}>
            <Routes location={location}>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
              <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
              <Route path="/cafeteria" element={<ProtectedRoute><Cafeteria /></ProtectedRoute>} />
              <Route path="/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
              <Route path="/rooms" element={<ProtectedRoute><RoomBooking /></ProtectedRoute>} />
              <Route path="/map" element={<ProtectedRoute><CampusMap /></ProtectedRoute>} />
              <Route path="/premises" element={<ProtectedRoute><Premises /></ProtectedRoute>} />
              <Route path="/anti-ragging" element={<ProtectedRoute><AntiRagging /></ProtectedRoute>} />
              <Route path="/lost-and-found" element={<ProtectedRoute><LostAndFound /></ProtectedRoute>} />
              <Route path="/smart-dustbin" element={<ProtectedRoute><SmartDustbin /></ProtectedRoute>} />
              <Route path="/transport" element={<ProtectedRoute><Transport /></ProtectedRoute>} />
              <Route path="/placement" element={<ProtectedRoute><Placement /></ProtectedRoute>} />
              <Route path="/admin/events" element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
              <Route path="/admin/notices" element={<ProtectedRoute><AdminNotices /></ProtectedRoute>} />
              <Route path="/campus" element={<ProtectedRoute><CampusPage /></ProtectedRoute>} />
              <Route path="/events" element={<ProtectedRoute><EventsBoard /></ProtectedRoute>} />
              <Route path="/notices" element={<ProtectedRoute><NoticeBoard /></ProtectedRoute>} />
            </Routes>
          </Suspense>
        </main>
        {isProtected && <Footer />}
      </div>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
