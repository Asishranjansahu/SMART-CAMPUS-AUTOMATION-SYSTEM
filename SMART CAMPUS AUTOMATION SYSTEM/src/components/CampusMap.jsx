import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, LayersControl, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation, Map as MapIcon, ExternalLink, Globe, Footprints, Eye, ArrowLeft, RotateCw, Maximize, Minimize, ChevronUp, ChevronDown, Search, MapPin } from "lucide-react";

// Fix for Leaflet default marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Custom Person Icon for walker
const personIconHtml = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-blue-600 drop-shadow-lg">
    <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
  </svg>
`;

const PersonIcon = L.divIcon({
  html: personIconHtml,
  className: "bg-transparent",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LOCATIONS = [
  { id: 1, name: "Main Building", lat: 19.174500, lng: 84.761800, type: "Academic", description: "Administration & Main Classrooms" },
  { id: 2, name: "Electrical Building", lat: 19.174200, lng: 84.762800, type: "Academic", description: "Electrical Dept & Labs" },
  { id: 3, name: "MBA Building", lat: 19.174000, lng: 84.761200, type: "Academic", description: "Management Studies Block" },
  { id: 4, name: "Workshop Building", lat: 19.173500, lng: 84.761200, type: "Facility", description: "Mechanical Workshops" },
  { id: 5, name: "Boys Hostel", lat: 19.173000, lng: 84.761200, type: "Residential", description: "Student Residence (Boys)" },
  { id: 6, name: "Girls Hostel", lat: 19.172700, lng: 84.761200, type: "Residential", description: "Student Residence (Girls)" },
  { id: 7, name: "Canteen / Library", lat: 19.172400, lng: 84.761200, type: "Facility", description: "Food Court & Central Library" },
  { id: 8, name: "Play Ground", lat: 19.173200, lng: 84.762800, type: "Recreation", description: "Sports & Recreation Area" },
  { id: 9, name: "Bus Parking", lat: 19.172500, lng: 84.762800, type: "Transport", description: "Transport Hub" },
  { id: 10, name: "Guest House", lat: 19.174800, lng: 84.761000, type: "Residential", description: "Visitor Accommodation" },
  { id: 11, name: "Generator Room", lat: 19.174800, lng: 84.760800, type: "Facility", description: "Power Supply Unit" },
  { id: 12, name: "Security Room", lat: 19.172050, lng: 84.762000, type: "Security", description: "Security Checkpost" },
  { id: 13, name: "Parking Area", lat: 19.172050, lng: 84.761500, type: "Transport", description: "General Parking" },
  { id: 14, name: "Basket Ball Court", lat: 19.173800, lng: 84.761500, type: "Recreation", description: "Outdoor Sports Courts" },
  { id: 15, name: "Main Gate", lat: 19.172000, lng: 84.761800, type: "Security", description: "Campus Entrance" },
  { id: 16, name: "Lab 302", lat: 19.174600, lng: 84.761900, type: "Academic", description: "Computer Science Lab (3rd Floor)" },
];

// Mock Paths for Navigation
const PATHS = {
  "Lab 302": {
    standard: [
      [19.172000, 84.761800], // Gate
      [19.172500, 84.761800], // Walk straight
      [19.173000, 84.761800],
      [19.174000, 84.761800], // Near Main Building
      [19.174500, 84.761800], // Entrance
      [19.174600, 84.761900]  // Lab 302
    ],
    disabled: [
      [19.172000, 84.761800], // Gate
      [19.172500, 84.761600], // Side path (Ramp)
      [19.173500, 84.761600],
      [19.174500, 84.761600], // Elevator entrance
      [19.174600, 84.761900]  // Lab 302
    ]
  }
};

const CROWD_DATA = [
  { lat: 19.172400, lng: 84.761200, level: "High", count: 120 }, // Canteen
  { lat: 19.174500, lng: 84.761800, level: "Medium", count: 45 }, // Main Building
  { lat: 19.172700, lng: 84.761200, level: "Low", count: 12 },   // Girls Hostel
];

const { BaseLayer } = LayersControl;

// Component to handle map view updates
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Animated Walker Marker Component
const WalkerMarker = ({ path, isNavigating, onArrive }) => {
  const [position, setPosition] = useState(null);
  const requestRef = useRef();
  const startTimeRef = useRef();
  const DURATION = 10000; // Slower walk for better visibility

  useEffect(() => {
    if (!isNavigating || !path || path.length < 2) {
      setPosition(null);
      return;
    }

    // Start position
    const start = path[0];
    const end = path[1];
    
    const animate = (time) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const progress = (time - startTimeRef.current) / DURATION;

      if (progress < 1) {
        // Interpolate position
        const lat = start[0] + (end[0] - start[0]) * progress;
        const lng = start[1] + (end[1] - start[1]) * progress;
        setPosition([lat, lng]);
        requestRef.current = requestAnimationFrame(animate);
      } else {
        // Arrived
        setPosition(end);
        if (onArrive) onArrive();
      }
    };

    startTimeRef.current = null;
    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [isNavigating, path, onArrive]);

  if (!position) return null;

  return (
    <Marker position={position} icon={PersonIcon} zIndexOffset={1000}>
      <Popup>Walking...</Popup>
    </Marker>
  );
};

const CampusMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [startLocation, setStartLocation] = useState(LOCATIONS[14]); // Default start at Main Gate
  const [navigationPath, setNavigationPath] = useState([]);
  const [mapCenter, setMapCenter] = useState([19.173464, 84.761768]);
  const [zoom, setZoom] = useState(18); // Zoomed in closer for better detail
  const [isNavigating, setIsNavigating] = useState(false);
  const [isSplitView, setIsSplitView] = useState(true);
  const [isListExpanded, setIsListExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAccessible, setIsAccessible] = useState(false);
  const [showCrowd, setShowCrowd] = useState(false);

  const handleNavigate = (targetLocation) => {
    setSelectedLocation(targetLocation);
    
    let path = [];
    if (PATHS[targetLocation.name]) {
      path = isAccessible ? PATHS[targetLocation.name].disabled : PATHS[targetLocation.name].standard;
    } else {
      // Fallback straight line
      path = [
        [startLocation.lat, startLocation.lng],
        [targetLocation.lat, targetLocation.lng]
      ];
    }

    setNavigationPath(path);
    
    // Center map to fit the path
    setMapCenter([
      (startLocation.lat + targetLocation.lat) / 2,
      (startLocation.lng + targetLocation.lng) / 2
    ]);
    setZoom(18);
    setIsNavigating(true); // Start walking animation
  };

  // Update path when accessibility mode changes
  useEffect(() => {
    if (selectedLocation) {
      if (PATHS[selectedLocation.name]) {
        setNavigationPath(isAccessible ? PATHS[selectedLocation.name].disabled : PATHS[selectedLocation.name].standard);
      }
    }
  }, [isAccessible, selectedLocation]);

  const handleOpen3D = () => {
    window.open("https://earth.google.com/web/search/Vignan+Institute+of+Technology+and+Management/@19.1734642,84.7617682,49.81569352a,793.03845204d,35y,78.83617003h,60t,0r/data=CpwBGm4SaAolMHgzYTNkNDMzMDA0MDNlNjg1OjB4ZTgxNDZkYWQxMTFlODJkYRmZZ4BmaywzQCEsig3MwDBVQCotVmlnbmFuIEluc3RpdHV0ZSBvZiBUZWNobm9sb2d5IGFuZCBNYW5hZ2VtZW50GAIgASImCiQJxhqZ-JEGN0ARxhqZ-JEGN8AZRjhupEhBSkAhyo-cbJ2KSsBCAggBOgMKATBCAggASg0I____________ARAA", "_blank");
  };

  // Generate Iframe URL for Street View (Legacy attempt)
  const getStreetViewIframeSrc = () => {
    const lat = selectedLocation ? selectedLocation.lat : mapCenter[0];
    const lng = selectedLocation ? selectedLocation.lng : mapCenter[1];
    return `https://maps.google.com/maps?q=&layer=c&cbll=${lat},${lng}&cbp=11,0,0,0,0&output=svembed`;
  };

  const filteredLocations = LOCATIONS.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-slate-50 relative"
    >
      {/* Top Section: Street View */}
      <div className={`relative transition-all duration-500 ease-in-out ${isSplitView ? "h-1/2" : "h-0 overflow-hidden"}`}>
        <div className="absolute inset-0 bg-slate-900 z-0">
          {/* Fallback Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: 'url("/campus-map.jpg")' }}
          />
          
          <iframe 
            src={getStreetViewIframeSrc()}
            className="absolute inset-0 w-full h-full border-0 opacity-80"
            title="Street View"
            allowFullScreen
            loading="lazy"
          />
          
          {/* Controls Overlay */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 bg-gradient-to-b from-black/50 via-transparent to-black/30">
            {/* Top Bar */}
            <div className="flex justify-between items-start pointer-events-auto">
              <div className="bg-slate-900/90 text-white p-4 rounded-xl backdrop-blur-md border border-white/10 shadow-xl max-w-sm">
                 <div className="flex items-center gap-3 mb-2 border-b border-slate-700 pb-2">
                   <ArrowLeft className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white transition-colors" />
                   <div>
                     <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Navigating From</p>
                     <p className="font-bold text-sm truncate text-white">{startLocation.name}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/50">
                     <MapPin className="w-4 h-4 text-white" />
                   </div>
                   <div>
                     <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Destination</p>
                     <p className="font-bold text-white text-sm">{selectedLocation ? selectedLocation.name : "Select a location"}</p>
                   </div>
                 </div>
              </div>
              
              <div className="flex flex-col gap-2 items-end">
                <div className="flex gap-2">
                   <Button 
                     size="sm" 
                     variant={isAccessible ? "default" : "secondary"}
                     className={`backdrop-blur-md border border-white/10 ${isAccessible ? "bg-blue-600 hover:bg-blue-700" : "bg-white/10 hover:bg-white/20 text-white"}`}
                     onClick={() => setIsAccessible(!isAccessible)}
                   >
                     <i className="mr-2 text-lg">♿</i> {isAccessible ? "Accessible Path" : "Standard Path"}
                   </Button>
                   <Button 
                     size="sm" 
                     variant={showCrowd ? "default" : "secondary"}
                     className={`backdrop-blur-md border border-white/10 ${showCrowd ? "bg-orange-600 hover:bg-orange-700" : "bg-white/10 hover:bg-white/20 text-white"}`}
                     onClick={() => setShowCrowd(!showCrowd)}
                   >
                     <Eye className="w-4 h-4 mr-2" /> {showCrowd ? "Hide Crowd" : "Show Crowd"}
                   </Button>
                </div>
                <Button size="sm" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10" onClick={handleOpen3D}>
                   <Globe className="w-4 h-4 mr-2" /> 3D Earth
                </Button>
              </div>
            </div>

            {/* Bottom Controls of Top Panel */}
            <div className="flex justify-between items-end pointer-events-auto">
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10" onClick={() => setSelectedLocation(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10" onClick={() => setNavigationPath([])}>
                   <RotateCw className="w-4 h-4 mr-2" /> Reset Path
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/10"
                onClick={() => setIsSplitView(!isSplitView)}
              >
                 {isSplitView ? "Maximize Map" : "Show Street View"} <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${isSplitView ? "" : "rotate-180"}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Separator */}
      {isSplitView && <div className="h-1 bg-slate-800 cursor-row-resize flex items-center justify-center z-20 shadow-lg"></div>}

      {/* Bottom Section: Map */}
      <div className={`relative w-full ${isSplitView ? "h-1/2" : "h-full"} bg-slate-100`}>
        <MapContainer 
          center={mapCenter} 
          zoom={zoom} 
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <LayersControl position="topright">
            <BaseLayer name="OpenStreetMap">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>
            <BaseLayer name="Google Streets">
              <TileLayer
                attribution="Google Maps"
                url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              />
            </BaseLayer>
            <BaseLayer name="Google Satellite">
              <TileLayer
                attribution="Google Maps"
                url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              />
            </BaseLayer>
            <BaseLayer checked name="Google Hybrid">
              <TileLayer
                attribution="Google Maps"
                url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
              />
            </BaseLayer>
          </LayersControl>
          
          <MapUpdater center={mapCenter} zoom={zoom} />

          {showCrowd && CROWD_DATA.map((crowd, idx) => (
            <CircleMarker 
              key={idx}
              center={[crowd.lat, crowd.lng]}
              radius={20}
              pathOptions={{
                color: crowd.level === "High" ? "#ef4444" : crowd.level === "Medium" ? "#f59e0b" : "#10b981",
                fillColor: crowd.level === "High" ? "#ef4444" : crowd.level === "Medium" ? "#f59e0b" : "#10b981",
                fillOpacity: 0.4
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                <div className="text-center">
                  <span className="font-bold block">{crowd.count} People</span>
                  <span className="text-xs uppercase">{crowd.level} Crowd</span>
                </div>
              </Tooltip>
            </CircleMarker>
          ))}

          {LOCATIONS.map(location => (
            <Marker 
              key={location.id} 
              position={[location.lat, location.lng]}
              eventHandlers={{
                click: () => {
                  handleNavigate(location);
                },
              }}
            >
              <Popup>
                <div className="font-bold text-slate-900">{location.name}</div>
                <div className="text-xs text-slate-500">{location.description}</div>
              </Popup>
            </Marker>
          ))}

          {navigationPath.length > 0 && (
            <>
              <Polyline 
                positions={navigationPath} 
                color="#2563eb" 
                dashArray="10, 10" 
                weight={6}
                opacity={0.8}
              />
              <WalkerMarker 
                path={navigationPath} 
                isNavigating={isNavigating} 
                onArrive={() => setIsNavigating(false)} 
              />
            </>
          )}
        </MapContainer>

        {/* Floating Destinations Panel (Professional Bottom Sheet) */}
        <motion.div 
          className={`absolute bottom-0 left-0 right-0 bg-white shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)] z-[1000] rounded-t-2xl flex flex-col transition-all duration-300 ${isListExpanded ? "h-[60%]" : "h-14"}`}
        >
          {/* Handle */}
          <div 
            className="h-14 flex items-center justify-center cursor-pointer border-b border-slate-100 hover:bg-slate-50 rounded-t-2xl flex-shrink-0"
            onClick={() => setIsListExpanded(!isListExpanded)}
          >
            <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex flex-col p-4">
             <div className="flex items-center gap-3 mb-4">
               <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search campus locations..." 
                   className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                 />
               </div>
               <Badge variant="secondary" className="h-9 px-3 bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer">
                 {filteredLocations.length} Places
               </Badge>
             </div>

             <div className="overflow-y-auto pr-2 custom-scrollbar space-y-2 pb-4">
                {filteredLocations.map(location => (
                  <div 
                    key={location.id}
                    onClick={() => {
                      handleNavigate(location);
                      setIsListExpanded(false);
                    }}
                    className={`p-3 rounded-xl cursor-pointer border transition-all flex justify-between items-center group ${
                      selectedLocation?.id === location.id
                        ? "bg-blue-50 border-blue-200 shadow-sm"
                        : "bg-white border-slate-100 hover:border-blue-200 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 w-8 h-8 rounded-lg flex items-center justify-center ${
                         selectedLocation?.id === location.id ? "bg-blue-100 text-blue-600" : "bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-500"
                      }`}>
                         <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`font-semibold text-sm ${selectedLocation?.id === location.id ? "text-blue-900" : "text-slate-900"}`}>
                           {location.name}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                           <Badge variant="outline" className="text-[10px] h-4 px-1 py-0 border-slate-200 text-slate-500">
                              {location.type}
                           </Badge>
                           <span className="truncate max-w-[150px]">{location.description}</span>
                        </div>
                      </div>
                    </div>
                    {selectedLocation?.id === location.id && (
                       <div className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                          Navigating
                       </div>
                    )}
                  </div>
                ))}
             </div>
          </div>
        </motion.div>

        {/* Navigation Info Overlay */}
        <AnimatePresence>
           {selectedLocation && isSplitView && (
             <motion.div 
               initial={{ y: -20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -20, opacity: 0 }}
               className="absolute top-4 left-4 right-14 z-[999] bg-white/90 backdrop-blur-md shadow-lg rounded-xl p-3 border border-white/20 flex justify-between items-center"
             >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center animate-pulse">
                     <Footprints className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Walking to</p>
                    <p className="font-bold text-slate-900 leading-tight">{selectedLocation.name}</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-sm font-bold text-emerald-600">~8 min</p>
                   <p className="text-xs text-slate-500">450m</p>
                </div>
             </motion.div>
           )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CampusMap;
