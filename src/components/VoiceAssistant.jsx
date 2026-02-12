import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, X, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const VoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! I'm your Campus Assistant. Ask me about bus timings, mess menu, or upcoming events." }
  ]);
  const messagesEndRef = useRef(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleListen = () => {
    if (isListening) return;
    setIsListening(true);
    
    // Simulate listening delay
    setTimeout(() => {
      setIsListening(false);
      const userQueries = [
        "Where is Lab 302?",
        "Show me today's timetable",
        "When is the next bus?",
        "What's on the mess menu?",
        "How full is the library dustbin?"
      ];
      const randomQuery = userQueries[Math.floor(Math.random() * userQueries.length)];
      
      addMessage("user", randomQuery);
      
      // Simulate bot response
      setTimeout(() => {
        let response = "";
        if (randomQuery.includes("menu") || randomQuery.includes("lunch")) {
           response = "Today's Mess Menu: \n🍱 Lunch: Veg Thali, Chicken Biryani \n🥪 Snacks: Grilled Sandwich, Tea \n🍲 Dinner: Roti, Paneer Butter Masala";
        }
        else if (randomQuery.includes("bus")) {
           response = "🚌 Next Bus Updates: \nRoute A: Arriving Main Gate in 5 mins \nRoute B: Departed 10 mins ago \nLive Status: On Time";
        }
        else if (randomQuery.includes("timetable")) {
           response = "📅 Today's Timetable: \n10:00 AM - Data Structures (Lab 302) \n11:30 AM - Database Systems (Room 204) \n02:00 PM - AI Ethics (Seminar Hall)";
        }
        else if (randomQuery.includes("Lab 302")) {
           response = "📍 Lab 302 is located in the Main Building, 3rd Floor. \nRoute: Take the central elevator to 3rd floor, turn right. \n♿ Disabled-friendly path available via Ramp B.";
        }
        else if (randomQuery.includes("dustbin")) {
           response = "🗑️ Smart Dustbin Status: \nLibrary: 85% Full (Critical) \nCafeteria: 40% Full (Normal)";
        }
        else {
           response = "I'm not sure about that, but I can help you navigate the dashboard.";
        }
        
        addMessage("bot", response);
      }, 1000);
    }, 2000);
  };

  const addMessage = (type, text) => {
    setMessages(prev => [...prev, { type, text }]);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col max-h-[500px]"
          >
            {/* Header */}
            <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Mic className="w-4 h-4 text-white" />
                 </div>
                 <div>
                    <h3 className="font-bold text-sm">Campus Assistant</h3>
                    <p className="text-xs text-slate-400">Online</p>
                 </div>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleOpen} className="text-slate-400 hover:text-white hover:bg-slate-800">
                 <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-3 min-h-[300px]">
               {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                        msg.type === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none shadow-sm'
                     }`}>
                        {msg.text}
                     </div>
                  </div>
               ))}
               {isListening && (
                  <div className="flex justify-start">
                     <div className="bg-white p-3 rounded-xl rounded-bl-none shadow-sm border border-slate-200 flex items-center gap-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                     </div>
                  </div>
               )}
               <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
               <Button 
                  className={`w-full relative overflow-hidden ${isListening ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                  onClick={handleListen}
               >
                  {isListening ? (
                     <>
                        <span className="absolute inset-0 bg-red-500/10 animate-pulse"></span>
                        <Mic className="w-4 h-4 mr-2 animate-pulse" /> Listening...
                     </>
                  ) : (
                     <>
                        <Mic className="w-4 h-4 mr-2" /> Tap to Speak
                     </>
                  )}
               </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 w-14 h-14 bg-slate-900 text-white rounded-full shadow-xl flex items-center justify-center z-50 hover:bg-slate-800 transition-colors border-4 border-white ring-2 ring-slate-100"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </motion.button>
    </>
  );
};

export default VoiceAssistant;
