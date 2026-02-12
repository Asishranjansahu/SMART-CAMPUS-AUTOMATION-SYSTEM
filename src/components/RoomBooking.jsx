import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Clock, MapPin, Users, Monitor, Wifi, CheckCircle2, Search, ArrowRight, LayoutGrid, List as ListIcon } from "lucide-react";
import { getRooms, getBookings, createBooking } from "@/lib/api";

const RoomBooking = () => {
  const { toast } = useToast();
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("10:00");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  useEffect(() => {
    const load = async () => {
      // Simulate loading
      setTimeout(async () => {
        const fetchedRooms = await getRooms().catch(() => []);
        const fetchedBookings = await getBookings().catch(() => []);
        
        if (fetchedRooms && fetchedRooms.length > 0) {
           setRooms(fetchedRooms);
        } else {
           // Mock data
           setRooms([
              { id: 1, name: "Conference Hall A", capacity: 50, features: ["Projector", "Video Conf", "AC"], type: "Conference", status: "available" },
              { id: 2, name: "Meeting Room 101", capacity: 8, features: ["Whiteboard", "TV"], type: "Meeting", status: "available" },
              { id: 3, name: "Seminar Hall", capacity: 120, features: ["Sound System", "Stage", "Projector"], type: "Hall", status: "busy" },
              { id: 4, name: "Lab 3 (Computer)", capacity: 30, features: ["Computers", "Internet", "AC"], type: "Lab", status: "available" },
              { id: 5, name: "Discussion Room B", capacity: 6, features: ["Round Table", "Whiteboard"], type: "Discussion", status: "maintenance" },
           ]);
        }
        
        if (fetchedBookings && fetchedBookings.length > 0) {
           setBookings(fetchedBookings);
        } else {
           setBookings([
              { id: 1, roomId: 1, user: "Dr. Smith", date: "2024-03-20", time: "10:00", purpose: "Faculty Meeting" },
              { id: 2, roomId: 4, user: "Prof. Johnson", date: "2024-03-21", time: "14:00", purpose: "Lab Session" },
           ]);
        }
        setLoading(false);
      }, 800);
    };
    load();
  }, []);

  const handleBook = async () => {
    if (!selectedRoom) return;
    
    // Check availability
    const isTaken = bookings.some(b => 
      b.roomId === selectedRoom.id && b.date === date && b.time === time
    );

    if (isTaken) {
      toast({
        title: "Slot Unavailable",
        description: "This room is already booked for the selected time.",
        variant: "destructive"
      });
      return;
    }

    // Mock booking creation
    const newBooking = { 
       id: Date.now(), 
       roomId: selectedRoom.id, 
       user: "Current User", 
       date, 
       time,
       purpose: "Meeting" 
    };
    
    setBookings(prev => [...prev, newBooking]);
    toast({
      title: "Booking Confirmed",
      description: `Successfully booked ${selectedRoom.name} for ${date} at ${time}`,
    });
    setSelectedRoom(null);
  };

  const timeSlots = [
     "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  return (
    <div className="space-y-6">
      {/* Professional Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Space Management</h1>
          <p className="text-slate-500 text-sm mt-1">Book rooms, labs, and conference halls</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                 onClick={() => setViewMode("grid")}
                 className={`p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-white shadow text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
              >
                 <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                 onClick={() => setViewMode("list")}
                 className={`p-2 rounded-md transition-all ${viewMode === "list" ? "bg-white shadow text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
              >
                 <ListIcon className="w-4 h-4" />
              </button>
           </div>
           <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm">
              <Calendar className="w-4 h-4 mr-2" /> My Bookings
           </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Room List */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Available Spaces</h2>
              <div className="relative w-64">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                    type="text" 
                    placeholder="Search rooms..." 
                    className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                 />
              </div>
           </div>

           <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
            {loading ? (
               [1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm h-40 animate-pulse"></div>
               ))
            ) : (
              rooms.map((room) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSelectedRoom(room)}
                  className={`bg-white p-5 rounded-xl border transition-all cursor-pointer group ${
                     selectedRoom?.id === room.id 
                        ? "border-blue-500 ring-1 ring-blue-500 shadow-md" 
                        : "border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md"
                  } ${viewMode === "list" ? "flex items-center justify-between gap-4" : ""}`}
                >
                  <div className={viewMode === "list" ? "flex items-center gap-4 flex-1" : ""}>
                     <div className={`flex items-center justify-center rounded-lg bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors ${viewMode === "list" ? "w-12 h-12" : "w-12 h-12 mb-4"}`}>
                        <MapPin className="w-6 h-6" />
                     </div>
                     
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <h3 className="font-bold text-slate-900">{room.name}</h3>
                           <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${
                              room.status === "available" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                              room.status === "busy" ? "bg-rose-50 text-rose-700 border-rose-200" :
                              "bg-amber-50 text-amber-700 border-amber-200"
                           }`}>
                              {room.status}
                           </Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                           <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {room.capacity} Seats</span>
                           <span className="flex items-center gap-1"><Monitor className="w-3 h-3" /> Projector</span>
                           <span className="flex items-center gap-1"><Wifi className="w-3 h-3" /> WiFi</span>
                        </div>
                     </div>
                  </div>

                  <div className={viewMode === "list" ? "" : "mt-4 pt-4 border-t border-slate-100 flex justify-between items-center"}>
                     {viewMode === "grid" && (
                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{room.type}</span>
                     )}
                     <Button 
                        size="sm" 
                        variant={selectedRoom?.id === room.id ? "default" : "secondary"}
                        className={selectedRoom?.id === room.id ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}
                     >
                        {selectedRoom?.id === room.id ? "Selected" : "Select"}
                     </Button>
                  </div>
                </motion.div>
              ))
            )}
           </div>
        </div>

        {/* Booking Panel */}
        <div className="space-y-6">
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm sticky top-6"
           >
             <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
               <Calendar className="w-4 h-4 text-slate-900" />
               <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Book a Slot</h2>
             </div>

             <div className="space-y-4">
               <div>
                 <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Date</label>
                 <div className="relative">
                    <input 
                      type="date" 
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    />
                 </div>
               </div>
               
               <div>
                 <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Time Slot</label>
                 <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(t => (
                       <button
                          key={t}
                          onClick={() => setTime(t)}
                          className={`text-sm py-2 rounded-md transition-all ${
                             time === t 
                                ? "bg-slate-900 text-white shadow-sm" 
                                : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent hover:border-slate-200"
                          }`}
                       >
                          {t}
                       </button>
                    ))}
                 </div>
               </div>

               <div className="pt-4 border-t border-slate-100 mt-4">
                 {selectedRoom ? (
                   <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                     <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                           <p className="text-sm font-semibold text-blue-900">Booking Summary</p>
                           <p className="text-xs text-blue-700 mt-1">
                              <strong>{selectedRoom.name}</strong><br/>
                              {date} at {time}
                           </p>
                        </div>
                     </div>
                   </div>
                 ) : (
                   <div className="mb-4 p-4 text-center text-slate-400 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
                     <p className="text-sm">Select a room to proceed</p>
                   </div>
                 )}
                 
                 <Button 
                   className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md group" 
                   disabled={!selectedRoom}
                   onClick={handleBook}
                 >
                   Confirm Booking <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </div>
             </div>
           </motion.div>
        </div>
      </div>
      
      {/* Upcoming Bookings */}
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.2 }}
         className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
      >
         <h2 className="font-bold text-slate-900 text-lg mb-4">Upcoming Schedule</h2>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-slate-200">
                     <th className="p-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Room</th>
                     <th className="p-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</th>
                     <th className="p-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Booked By</th>
                     <th className="p-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Purpose</th>
                     <th className="p-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {bookings.map((booking) => {
                     const room = rooms.find(r => r.id === booking.roomId);
                     return (
                        <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                           <td className="p-3">
                              <div className="flex items-center gap-2">
                                 <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500">
                                    <MapPin className="w-4 h-4" />
                                 </div>
                                 <span className="font-medium text-slate-900 text-sm">{room?.name || 'Unknown Room'}</span>
                              </div>
                           </td>
                           <td className="p-3">
                              <div className="flex flex-col">
                                 <span className="text-sm text-slate-700 font-medium">{booking.date}</span>
                                 <span className="text-xs text-slate-500">{booking.time}</span>
                              </div>
                           </td>
                           <td className="p-3">
                              <div className="flex items-center gap-2">
                                 <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                    {booking.user.charAt(0)}
                                 </div>
                                 <span className="text-sm text-slate-600">{booking.user}</span>
                              </div>
                           </td>
                           <td className="p-3">
                              <span className="text-sm text-slate-600">{booking.purpose || "Meeting"}</span>
                           </td>
                           <td className="p-3 text-right">
                              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Confirmed</Badge>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </motion.div>
    </div>
  );
};

export default RoomBooking;
