import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Calendar, MapPin, Users, Ticket, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Events = () => {
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: "Tech Summit 2024",
      date: "May 20, 2024",
      time: "10:00 AM",
      location: "Main Auditorium",
      type: "Conference",
      spots: 120,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=200&h=150"
    },
    {
      id: 2,
      title: "Hackathon: Code for Future",
      date: "May 25, 2024",
      time: "09:00 AM",
      location: "CS Department Labs",
      type: "Competition",
      spots: 50,
      image: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?auto=format&fit=crop&q=80&w=200&h=150"
    },
    {
      id: 3,
      title: "Alumni Meet & Greet",
      date: "June 01, 2024",
      time: "06:00 PM",
      location: "Campus Gardens",
      type: "Social",
      spots: 200,
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=200&h=150"
    }
  ];

  const handleRegister = (event) => {
    setSelectedEvent(event);
    toast({
      title: "Registration Successful",
      description: "Your entry pass has been generated.",
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Ticket className="w-6 h-6 text-purple-600" />
            Events & Entry
          </h1>
          <p className="text-slate-500 text-sm mt-1">Register for events and get QR entry passes</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
          >
            <div className="h-32 bg-slate-100 relative">
               {/* Use colored placeholder if image fails or just a gradient */}
               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 opacity-90"></div>
               <div className="absolute inset-0 p-4 flex items-end">
                 <h3 className="text-white font-bold text-lg shadow-black drop-shadow-md">{event.title}</h3>
               </div>
            </div>
            
            <div className="p-4 flex-1 space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                {event.date} • {event.time}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                {event.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users className="w-4 h-4 text-slate-400" />
                {event.spots} spots remaining
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <Button 
                className="w-full bg-slate-900 hover:bg-slate-800"
                onClick={() => handleRegister(event)}
              >
                <QrCode className="w-4 h-4 mr-2" />
                Register & Get QR
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* QR Code Modal Overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-purple-600 p-6 text-center text-white">
                <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
                <p className="text-purple-100 text-sm mt-1">Entry Pass</p>
              </div>
              
              <div className="p-8 flex flex-col items-center">
                <div className="bg-white p-2 rounded-xl border-4 border-slate-900 mb-4">
                  {/* Simulated QR Code */}
                  <div className="w-48 h-48 bg-slate-900 flex items-center justify-center text-white text-xs">
                     <div className="grid grid-cols-6 grid-rows-6 gap-1 w-full h-full p-2">
                        {[...Array(36)].map((_, i) => (
                           <div key={i} className={`bg-white ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
                        ))}
                     </div>
                  </div>
                </div>
                
                <p className="text-slate-500 text-sm text-center mb-6">
                  Scan this QR code at the venue entrance.
                </p>

                <div className="w-full space-y-2">
                   <div className="flex justify-between text-sm py-2 border-b border-slate-100">
                      <span className="text-slate-500">Date</span>
                      <span className="font-medium text-slate-900">{selectedEvent.date}</span>
                   </div>
                   <div className="flex justify-between text-sm py-2 border-b border-slate-100">
                      <span className="text-slate-500">Venue</span>
                      <span className="font-medium text-slate-900">{selectedEvent.location}</span>
                   </div>
                </div>

                <Button className="w-full mt-6" variant="outline" onClick={() => setSelectedEvent(null)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;
