
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Coffee, ShoppingCart, Clock, Utensils, Star, Flame, Plus, Minus, CreditCard, ChevronRight, BarChart3, TrendingDown, Leaf } from "lucide-react";
import { getMenu, createOrder, getCafeteriaInsights } from "@/lib/api";

const Cafeteria = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("menu");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    // Simulate loading
    const fetchData = async () => {
      try {
        const [menuData, insightsData] = await Promise.all([
          getMenu(),
          getCafeteriaInsights().catch(() => null) // Handle potential error if endpoint fails
        ]);

        if (menuData && menuData.length > 0) {
           setMenuItems(menuData);
        } else {
           // Mock data fallback
           setMenuItems([
              { id: 1, name: "Veg Thali Deluxe", description: "Rice, Dal, 2 Curries, Roti, Salad, Sweet", price: 120, category: "Lunch", rating: 4.8, isPopular: true, image: "🍲" },
              { id: 2, name: "Chicken Biryani", description: "Hyderabadi style aromatic rice with chicken", price: 180, category: "Lunch", rating: 4.9, isPopular: true, image: "🍗" },
              { id: 3, name: "Masala Dosa", description: "Crispy rice crepe with potato filling and chutney", price: 60, category: "Breakfast", rating: 4.7, isPopular: false, image: "🥞" },
              { id: 4, name: "Grilled Sandwich", description: "Vegetables and cheese grilled to perfection", price: 80, category: "Snacks", rating: 4.5, isPopular: false, image: "🥪" },
              { id: 5, name: "Cold Coffee", description: "Chilled coffee with chocolate syrup", price: 50, category: "Beverages", rating: 4.6, isPopular: true, image: "🥤" },
              { id: 6, name: "Fruit Salad", description: "Fresh seasonal fruits bowl", price: 70, category: "Healthy", rating: 4.4, isPopular: false, image: "🥗" },
           ]);
        }
        
        if (insightsData) {
          setInsights(insightsData);
        }
      } catch (error) {
        console.error("Failed to fetch cafeteria data", error);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(fetchData, 800);
  }, []);

  const handleAddToCart = (item) => {
    setCart(prev => ({
       ...prev,
       [item.id]: (prev[item.id] || 0) + 1
    }));
    toast({
      title: "Added to Cart",
      description: `${item.name} added to your order`,
      duration: 1500,
    });
  };

  const handleRemoveFromCart = (itemId) => {
     setCart(prev => {
        const newCart = { ...prev };
        if (newCart[itemId] > 1) {
           newCart[itemId]--;
        } else {
           delete newCart[itemId];
        }
        return newCart;
     });
  };

  const cartTotal = Object.entries(cart).reduce((total, [itemId, quantity]) => {
     const item = menuItems.find(i => i.id === parseInt(itemId));
     return total + (item ? item.price * quantity : 0);
  }, 0);

  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const handleCheckout = async () => {
    // Mock checkout
    toast({
      title: "Order Placed Successfully",
      description: `Your order #${Math.floor(Math.random() * 10000)} is being prepared!`,
    });
    setCart({});
  };

  return (
    <div className="space-y-6">
      {/* Professional Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Campus Cafeteria</h1>
          <p className="text-slate-500 text-sm mt-1">Order fresh and healthy food online</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex bg-slate-100 rounded-lg p-1 mr-2">
              <button 
                 onClick={() => setActiveTab("menu")}
                 className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${activeTab === 'menu' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                 Menu
              </button>
              <button 
                 onClick={() => setActiveTab("insights")}
                 className={`px-3 py-1 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${activeTab === 'insights' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                 <Leaf className="w-3 h-3" /> Smart Insights
              </button>
           </div>
           <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Open Now
           </div>
           <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm relative">
              <ShoppingCart className="w-4 h-4 mr-2" /> Cart
              {cartItemCount > 0 && (
                 <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
                    {cartItemCount}
                 </span>
              )}
           </Button>
        </div>
      </motion.div>

      <div className="mt-6">
        {activeTab === 'menu' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Menu Grid */}
            <div className="lg:col-span-2 space-y-6">
               {/* Categories/Filters */}
               <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {["All", "Breakfast", "Lunch", "Snacks", "Beverages"].map((cat, i) => (
                     <button 
                        key={cat}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                           i === 0 
                              ? "bg-slate-900 text-white shadow-sm" 
                              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                        }`}
                     >
                        {cat}
                     </button>
                  ))}
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading ? (
                   [1, 2, 3, 4].map(i => (
                      <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm h-40 animate-pulse"></div>
                   ))
                ) : (
                  menuItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex gap-4"
                    >
                      <div className="w-24 h-24 bg-slate-50 rounded-lg flex items-center justify-center text-4xl shadow-inner flex-shrink-0">
                         {item.image || "🥘"}
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                         <div>
                            <div className="flex justify-between items-start">
                               <h3 className="font-bold text-slate-900 line-clamp-1">{item.name}</h3>
                               <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
                                  <Star className="w-3 h-3 fill-current" /> {item.rating}
                               </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                         </div>
                         
                         <div className="flex items-center justify-between mt-3">
                            <span className="font-bold text-slate-900">₹{item.price}</span>
                            
                            {cart[item.id] ? (
                               <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                                  <button 
                                     className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:text-red-600 transition-colors"
                                     onClick={() => handleRemoveFromCart(item.id)}
                                  >
                                     <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-sm font-semibold w-4 text-center">{cart[item.id]}</span>
                                  <button 
                                     className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:text-green-600 transition-colors"
                                     onClick={() => handleAddToCart(item)}
                                  >
                                     <Plus className="w-3 h-3" />
                                  </button>
                               </div>
                            ) : (
                               <Button 
                                  size="sm" 
                                  className="h-8 bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-blue-300 shadow-sm"
                                  onClick={() => handleAddToCart(item)}
                               >
                                  Add
                               </Button>
                            )}
                         </div>
                      </div>
                    </motion.div>
                  ))
                )}
               </div>
            </div>

            {/* Sidebar: Cart & Info */}
            <div className="space-y-6">
              {/* Cart Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                     <ShoppingCart className="w-4 h-4 text-slate-900" />
                     <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Current Order</h2>
                  </div>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600">{cartItemCount} items</Badge>
                </div>
                
                {cartItemCount > 0 ? (
                   <div className="space-y-4">
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                         {Object.entries(cart).map(([itemId, quantity]) => {
                            const item = menuItems.find(i => i.id === parseInt(itemId));
                            if (!item) return null;
                            return (
                               <div key={itemId} className="flex justify-between items-center text-sm">
                                  <div className="flex items-center gap-2">
                                     <span className="text-slate-500 text-xs w-4">x{quantity}</span>
                                     <span className="font-medium text-slate-700 truncate max-w-[120px]">{item.name}</span>
                                  </div>
                                  <span className="text-slate-900 font-semibold">₹{item.price * quantity}</span>
                               </div>
                            );
                         })}
                      </div>
                      
                      <div className="border-t border-slate-100 pt-3 mt-3">
                         <div className="flex justify-between items-center mb-4">
                            <span className="text-slate-500 font-medium">Total Amount</span>
                            <span className="text-xl font-bold text-slate-900">₹{cartTotal}</span>
                         </div>
                         <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md group" onClick={handleCheckout}>
                            Proceed to Pay <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                         </Button>
                      </div>
                   </div>
                ) : (
                   <div className="py-8 text-center">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                         <ShoppingCart className="w-6 h-6 text-slate-300" />
                      </div>
                      <p className="text-sm text-slate-500">Your cart is empty</p>
                      <p className="text-xs text-slate-400 mt-1">Add some delicious items!</p>
                   </div>
                )}
              </motion.div>

              {/* Specials */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-amber-500 to-orange-600 p-5 rounded-xl shadow-lg text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Flame className="w-24 h-24" />
                </div>
                
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <Flame className="w-5 h-5" />
                  <h2 className="font-bold text-sm uppercase tracking-wide">Today's Special</h2>
                </div>
                
                <div className="relative z-10">
                   <h3 className="text-xl font-bold mb-1">Chef's Special Pasta</h3>
                   <p className="text-white/80 text-sm mb-3">Creamy white sauce with exotic vegetables</p>
                   <div className="flex items-center justify-between">
                      <span className="text-lg font-bold bg-white/20 px-2 py-1 rounded">₹150</span>
                      <Button size="sm" variant="secondary" className="bg-white text-orange-600 hover:bg-white/90 border-0">
                         Order Now
                      </Button>
                   </div>
                </div>
              </motion.div>

              {/* Opening Hours */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                  <Clock className="w-4 h-4 text-slate-600" />
                  <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Opening Hours</h2>
                </div>
                <div className="space-y-3 text-sm">
                   <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                      <span className="text-slate-500">Breakfast</span>
                      <span className="font-medium text-slate-900">07:30 AM - 10:30 AM</span>
                   </div>
                   <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                      <span className="text-slate-500">Lunch</span>
                      <span className="font-medium text-slate-900">12:30 PM - 02:30 PM</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-slate-500">Snacks</span>
                      <span className="font-medium text-slate-900">04:30 PM - 06:30 PM</span>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
               <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" /> Food Consumption Trends
               </h2>
               <div className="h-64 flex items-end justify-between gap-4 px-4 pb-4 border-b border-slate-100">
                  {/* Chart */}
                  {(insights?.trends || [60, 80, 45, 90, 75, 50, 65]).map((h, i) => (
                     <div key={i} className="w-full bg-slate-100 rounded-t-lg relative group h-full flex flex-col justify-end">
                        <div 
                           className="w-full bg-indigo-500 rounded-t-lg transition-all duration-500 group-hover:bg-indigo-600"
                           style={{ height: `${h}%` }}
                        ></div>
                        <span className="text-xs text-center text-slate-400 mt-2 absolute -bottom-6 w-full">
                           {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                        </span>
                     </div>
                  ))}
               </div>
               <p className="text-sm text-slate-500 mt-8">
                  Peak consumption is observed on Thursdays. We recommend preparing 15% more Veg Thalis to meet demand.
               </p>
            </div>
 
            <div className="space-y-6">
               <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                  <h2 className="text-lg font-bold text-emerald-900 mb-2 flex items-center gap-2">
                     <TrendingDown className="w-5 h-5" /> Waste Reduction
                  </h2>
                  <p className="text-emerald-800 text-sm mb-4">
                     {insights?.waste?.message || "Based on yesterday's leftovers, we suggest reducing rice preparation by 5kg today."}
                  </p>
                  <div className="flex items-center gap-4">
                     <div className="bg-white p-3 rounded-lg shadow-sm text-center flex-1">
                        <div className="text-2xl font-bold text-emerald-600">-{insights?.waste?.reduction || 12}%</div>
                        <div className="text-xs text-slate-500">Waste vs Last Week</div>
                     </div>
                     <div className="bg-white p-3 rounded-lg shadow-sm text-center flex-1">
                        <div className="text-2xl font-bold text-emerald-600">{insights?.waste?.saved || 85}kg</div>
                        <div className="text-xs text-slate-500">Saved this Month</div>
                     </div>
                  </div>
               </div>
 
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                     <Clock className="w-5 h-5 text-amber-500" /> Next Meal Prediction ({insights?.prediction?.nextMeal || "Lunch"})
                  </h2>
                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">Expected Footfall</span>
                        <span className="text-sm font-bold text-slate-900">{insights?.prediction?.expectedFootfall || 320} Students</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">Recommended Prep</span>
                        <span className="text-sm font-bold text-slate-900">{insights?.prediction?.recommendedPrep || 350} Meals</span>
                     </div>
                     <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[85%] rounded-full"></div>
                     </div>
                     <p className="text-xs text-slate-400">{insights?.prediction?.confidence || 85}% confidence score based on historical data</p>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cafeteria;
