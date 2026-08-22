import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";
import { Bus, MapPin, Clock, Locate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ─── Route Definition (Vignan College → Berhampur via NH-59) ───
const ROUTE_COORDS = [
  [19.173464, 84.761768], // Vignan College (start)
  [19.176000, 84.763000],
  [19.180000, 84.765000],
  [19.185000, 84.768000],
  [19.190000, 84.770000],
  [19.195000, 84.772000],
  [19.200000, 84.774000],
  [19.205000, 84.775500],
  [19.210000, 84.777000],
  [19.215000, 84.778000],
  [19.220000, 84.779000],
  [19.225000, 84.780000],
  [19.230000, 84.781000],
  [19.235000, 84.782000],
  [19.240000, 84.783000],
  [19.245000, 84.784000],
  [19.250000, 84.785000],
  [19.255000, 84.786000],
  [19.260000, 84.787000],
  [19.265000, 84.788000],
  [19.270000, 84.789000],
  [19.275000, 84.789500],
  [19.280000, 84.790000],
  [19.285000, 84.790500],
  [19.290000, 84.791000],
  [19.295000, 84.791500],
  [19.300000, 84.792000],
  [19.305000, 84.792500],
  [19.310000, 84.793000],
  [19.315000, 84.793500],
  [19.318000, 84.794000], // Berhampur (end)
];

// ─── Interpolation helper ───
function interpolateRoute(coords, progress) {
  // progress: 0..1
  const totalSegments = coords.length - 1;
  const segIndex = Math.min(Math.floor(progress * totalSegments), totalSegments - 1);
  const segProgress = (progress * totalSegments) - segIndex;
  const c1 = coords[segIndex];
  const c2 = coords[Math.min(segIndex + 1, totalSegments)];
  return [
    c1[0] + (c2[0] - c1[0]) * segProgress,
    c1[1] + (c2[1] - c1[1]) * segProgress,
  ];
}

// ─── Bus Icon Factory ───
function createBusIcon(color) {
  return L.divIcon({
    html: `<div style="
      width: 32px; height: 32px; border-radius: 50%;
      background: ${color}; border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex; align-items: center; justify-content: center;
      font-size: 10px; font-weight: bold; color: white;
      position: relative;
    ">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
        <path d="M16 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h12v12zm-6-1h2v-2h-2v2zm0-4h2v-2h-2v2zm-2 4h2v-2H8v2zm0-4h2v-2H8v2zm-2 4h2v-2H6v2zm0-4h2v-2H6v2zm4-4h4V4h-4v2z"/>
      </svg>
      <div style="
        position: absolute; bottom: -2px; right: -2px;
        width: 10px; height: 10px; border-radius: 50%;
        background: white; border: 2px solid ${color};
      "></div>
    </div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

// ─── Live Bus Marker ───
function BusMarker({ bus, onHover }) {
  const [position, setPosition] = useState(() => interpolateRoute(ROUTE_COORDS, bus.progress));

  useEffect(() => {
    setPosition(interpolateRoute(ROUTE_COORDS, bus.progress));
  }, [bus.progress]);

  const icon = createBusIcon(bus.color);

  return (
    <Marker position={position} icon={icon} zIndexOffset={1000}>
      <Popup>
        <div style={{ minWidth: 160, fontFamily: "Inter, sans-serif" }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{bus.id}</div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>{bus.route}</div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
            <span style={{ color: "#64748b" }}>Status</span>
            <span style={{
              fontWeight: 600,
              color: bus.status === "Delayed" ? "#ef4444" : bus.status === "Arriving" ? "#3b82f6" : "#16a34a"
            }}>{bus.status}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
            <span style={{ color: "#64748b" }}>ETA</span>
            <span style={{ fontWeight: 600 }}>{bus.eta}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
            <span style={{ color: "#64748b" }}>Speed</span>
            <span style={{ fontWeight: 600 }}>{bus.speed} km/h</span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

// ─── Map Fly-To Controller ───
function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, map.getZoom(), { duration: 1 });
  }, [center, map]);
  return null;
}

// ─── Bus Stop Markers ───
const BUS_STOPS = [
  { name: "Vignan College", lat: 19.173464, lng: 84.761768, type: "origin" },
  { name: "Highway Junction", lat: 19.205000, lng: 84.775500, type: "stop" },
  { name: "Medical College", lat: 19.255000, lng: 84.786000, type: "stop" },
  { name: "Berhampur City", lat: 19.318000, lng: 84.794000, type: "destination" },
];

function StopMarkerIcon(type) {
  const color = type === "origin" ? "#3b82f6" : type === "destination" ? "#ef4444" : "#64748b";
  return L.divIcon({
    html: `<div style="
      width: ${type === "origin" || type === "destination" ? 18 : 12}px;
      height: ${type === "origin" || type === "destination" ? 18 : 12}px;
      border-radius: 50%; background: ${color};
      border: 3px solid white; box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    "></div>`,
    className: "",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

// ─── Main Component ───
const Transport = () => {
  const [buses, setBuses] = useState([
    { id: "Bus-01", route: "Vignan → Berhampur", status: "Moving", eta: "45 min", type: "AC", color: "#3b82f6", speed: 38, progress: 0.08, direction: 1 },
    { id: "Bus-02", route: "Vignan → Berhampur", status: "Moving", eta: "32 min", type: "Non-AC", color: "#16a34a", speed: 42, progress: 0.35, direction: 1 },
    { id: "Bus-03", route: "Berhampur → Vignan", status: "Delayed", eta: "55 min", type: "AC", color: "#f59e0b", speed: 15, progress: 0.55, direction: -1 },
    { id: "Bus-04", route: "Vignan → Berhampur", status: "On Time", eta: "18 min", type: "Non-AC", color: "#8b5cf6", speed: 45, progress: 0.72, direction: 1 },
    { id: "Bus-05", route: "Vignan → Berhampur", status: "Scheduled", eta: "1h 10min", type: "AC", color: "#6366f1", speed: 0, progress: 0.0, direction: 1 },
  ]);

  const [selectedBus, setSelectedBus] = useState(null);
  const [mapCenter, setMapCenter] = useState([19.245, 84.778]);
  const [followBus, setFollowBus] = useState(null);

  // Simulate GPS movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prev) =>
        prev.map((bus) => {
          if (bus.speed === 0) return bus; // Scheduled buses don't move
          const speedFactor = bus.speed / 40; // Normalize around 40 km/h
          let newProgress = bus.progress + (0.002 * speedFactor * bus.direction);
          let newDirection = bus.direction;
          // Bounce at ends
          if (newProgress >= 1) { newProgress = 1; newDirection = -1; }
          if (newProgress <= 0) { newProgress = 0; newDirection = 1; }
          // Random speed changes
          let newSpeed = bus.speed + (Math.random() > 0.8 ? (Math.random() - 0.5) * 10 : 0);
          newSpeed = Math.max(10, Math.min(50, newSpeed));
          if (bus.status === "Delayed") newSpeed = Math.max(8, Math.min(20, newSpeed));
          // ETA
          const distRemaining = Math.abs(1 - newProgress);
          const etaMin = Math.round((distRemaining * 80) / (newSpeed / 30));
          // Status
          let newStatus = bus.status;
          if (newSpeed < 15 && bus.status !== "Delayed") newStatus = "Delayed";
          else if (newSpeed >= 15 && bus.status === "Delayed") newStatus = "Moving";
          return { ...bus, progress: newProgress, direction: newDirection, speed: Math.round(newSpeed), eta: etaMin > 60 ? `${Math.floor(etaMin/60)}h ${etaMin%60}min` : `${etaMin} min` };
        })
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Follow a bus
  useEffect(() => {
    if (followBus) {
      const bus = buses.find((b) => b.id === followBus);
      if (bus) {
        const pos = interpolateRoute(ROUTE_COORDS, bus.progress);
        setMapCenter(pos);
      }
    }
  }, [followBus]);

  const selectedBusData = buses.find((b) => b.id === selectedBus);

  return (
    <div className="space-y-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-none border-b border-slate-200 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Bus className="w-6 h-6 text-blue-600" />
            Vignan Smart Transport
          </h1>
          <p className="text-slate-500 text-sm mt-1">Live GPS tracking: Vignan College ↔ Berhampur</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            GPS Active
          </div>
          <div className="text-xs text-slate-400">{buses.length} buses tracked</div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row" style={{ height: "calc(100vh - 180px)" }}>
        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-white border-r border-slate-200 overflow-y-auto flex-shrink-0">
          <div className="p-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900 text-sm">Active Fleet</h2>
          </div>
          <div className="p-3 space-y-2">
            {buses.map((bus) => (
              <motion.div
                key={bus.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => { setSelectedBus(bus.id === selectedBus ? null : bus.id); setFollowBus(bus.id); }}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedBus === bus.id
                    ? "border-blue-300 bg-blue-50 shadow-sm"
                    : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: bus.color }}
                    ></div>
                    <span className="font-bold text-sm text-slate-900">{bus.id}</span>
                    <Badge variant="outline" className="text-[10px] h-4 px-1">
                      {bus.type}
                    </Badge>
                  </div>
                  <span
                    className="text-xs font-semibold"
                    style={{
                      color: bus.status === "Delayed" ? "#ef4444" : bus.status === "Arriving" ? "#3b82f6" : bus.status === "Scheduled" ? "#94a3b8" : "#16a34a",
                    }}
                  >
                    {bus.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mb-2">{bus.route}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> ETA: {bus.eta}
                    </span>
                    <span>{bus.speed} km/h</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-[10px] px-2"
                    onClick={(e) => { e.stopPropagation(); setFollowBus(bus.id); }}
                  >
                    <Locate className="w-3 h-3 mr-1" /> Track
                  </Button>
                </div>
                {/* Progress bar */}
                <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: bus.color, width: `${bus.progress * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selected bus detail */}
          {selectedBusData && (
            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <h3 className="font-bold text-sm text-slate-900 mb-3">
                {selectedBusData.id} Details
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Route</span>
                  <span className="font-medium">{selectedBusData.route}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-medium">{Math.round(selectedBusData.progress * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Speed</span>
                  <span className="font-medium">{selectedBusData.speed} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ETA</span>
                  <span className="font-medium">{selectedBusData.eta}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer
            center={mapCenter}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapController center={mapCenter} />

            {/* Route polyline */}
            <Polyline
              positions={ROUTE_COORDS}
              pathOptions={{
                color: "#3b82f6",
                weight: 5,
                opacity: 0.6,
                dashArray: "10, 8",
              }}
            />

            {/* Bus stop markers */}
            {BUS_STOPS.map((stop, i) => (
              <Marker
                key={i}
                position={[stop.lat, stop.lng]}
                icon={StopMarkerIcon(stop.type)}
              >
                <Popup>
                  <div style={{ fontFamily: "Inter, sans-serif" }}>
                    <div style={{ fontWeight: 700 }}>{stop.name}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>
                      {stop.type === "origin" ? "Route Start" : stop.type === "destination" ? "Route End" : "Bus Stop"}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Animated bus markers */}
            {buses.map((bus) => (
              <BusMarker key={bus.id} bus={bus} />
            ))}
          </MapContainer>

          {/* Map overlay - bus quick select */}
          <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur rounded-xl shadow-lg border border-slate-200 p-3 max-w-xs">
            <div className="flex items-center gap-2 mb-2">
              <Bus className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-900">Live Tracking</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {buses.map((bus) => (
                <button
                  key={bus.id}
                  onClick={() => { setFollowBus(bus.id); setSelectedBus(bus.id); }}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all border ${
                    followBus === bus.id
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: bus.color }}></span>
                  {bus.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transport;
