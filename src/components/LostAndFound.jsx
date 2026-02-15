import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Upload, Camera, MapPin, Calendar, Tag, CheckCircle, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const LostAndFound = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("lost"); // lost, found
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [showMatchResult, setShowMatchResult] = useState(false);

  const [items, setItems] = useState([
    {
      id: 1,
      type: "found",
      title: "Blue Water Bottle",
      location: "Library, 2nd Floor",
      date: "Today, 10:30 AM",
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1602143407151-011141951f7a?w=400&q=80",
      status: "Unclaimed"
    },
    {
      id: 2,
      type: "lost",
      title: "Scientific Calculator (Casio)",
      location: "Lab 302",
      date: "Yesterday",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1574602305221-50937a44f934?w=400&q=80",
      status: "Lost"
    },
    {
      id: 3,
      type: "found",
      title: "Car Keys (Honda)",
      location: "Main Parking",
      date: "2 days ago",
      category: "Keys",
      image: "https://images.unsplash.com/photo-1627453673322-3c22b9b99912?w=400&q=80",
      status: "Unclaimed"
    },
    {
      id: 4,
      type: "found",
      title: "Black Hoodie (Nike)",
      location: "Basketball Court",
      date: "Today, 8:00 AM",
      category: "Clothing",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80",
      status: "Unclaimed"
    }
  ]);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate AI scanning
    setTimeout(() => {
      setIsUploading(false);
      setIsMatching(true);
      // Simulate matching process
      setTimeout(() => {
        setIsMatching(false);
        setShowMatchResult(true);
      }, 2000);
    }, 1500);
  };

  const filteredItems = items.filter(item => 
    (activeTab === "all" || item.type === activeTab) &&
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Lost & Found AI</h1>
          <p className="text-slate-500 mt-1">Upload an image to find your lost item instantly.</p>
        </div>
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20">
                <Camera className="w-4 h-4 mr-2" />
                Report / Scan Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>AI Image Scan</DialogTitle>
                <DialogDescription>
                  Upload a photo of the item. Our AI will match it with reported items.
                </DialogDescription>
              </DialogHeader>
              
              {!showMatchResult ? (
                <div className="grid place-items-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors" onClick={handleUpload}>
                  {isMatching ? (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-sm font-medium text-slate-600 animate-pulse">Scanning database...</p>
                    </div>
                  ) : isUploading ? (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
                        <Upload className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="text-sm font-medium text-slate-600">Uploading...</p>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <Camera className="w-12 h-12 text-slate-300 mx-auto" />
                      <p className="text-sm font-medium text-slate-900">Click to Upload or Drag & Drop</p>
                      <p className="text-xs text-slate-500">Supports JPG, PNG (Max 5MB)</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-emerald-900">Possible Match Found!</h4>
                      <p className="text-sm text-emerald-700 mt-1">We found an item matching your description at the <strong>Security Office</strong>.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center p-3 border border-slate-100 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1602143407151-011141951f7a?w=100&q=80" alt="Match" className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <p className="font-medium text-slate-900">Blue Water Bottle</p>
                      <p className="text-xs text-slate-500">98% Match Confidence</p>
                    </div>
                    <Button size="sm" variant="outline" className="ml-auto" onClick={() => setShowMatchResult(false)}>Claim</Button>
                  </div>
                </div>
              )}

              <DialogFooter className="sm:justify-start">
                 {showMatchResult && (
                   <Button variant="ghost" onClick={() => setShowMatchResult(false)}>Scan Another</Button>
                 )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
        <div className="flex bg-slate-100 p-1 rounded-lg w-full sm:w-auto">
          {["found", "lost"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all flex-1 sm:flex-none capitalize ${
                activeTab === tab 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab} Items
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search items, location..." 
            className="pl-9 bg-slate-50 border-slate-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              layout
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={item.type === 'found' ? 'bg-emerald-500' : 'bg-amber-500'}>
                    {item.type === 'found' ? 'Found' : 'Lost'}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-slate-900 line-clamp-1">{item.title}</h3>
                </div>
                
                <div className="space-y-2 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5" />
                    {item.category}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    item.status === 'Unclaimed' || item.status === 'Lost' 
                      ? 'bg-slate-100 text-slate-600' 
                      : 'bg-blue-50 text-blue-600'
                  }`}>
                    {item.status}
                  </span>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LostAndFound;
