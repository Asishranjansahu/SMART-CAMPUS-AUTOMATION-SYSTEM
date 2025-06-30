
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Coffee, ShoppingCart, Clock, Utensils } from "lucide-react";

const Cafeteria = () => {
  const { toast } = useToast();

  const handleOrder = (itemName) => {
    toast({
      title: "Order Placed",
      description: `Your order for ${itemName} has been placed successfully`,
    });
  };

  const menuItems = [
    {
      id: 1,
      name: "Breakfast Combo",
      price: "RS.50",
      description: "Eggs, toast, and coffee",
      category: "Breakfast",
    },
    {
      id: 2,
      name: "Chicken Sandwich",
      price: "RS.70",
      description: "Grilled chicken with fresh veggies",
      category: "Lunch",
    },
    {
      id: 3,
      name: "Vegetarian Pizza",
      price: "RS.100",
      description: "Fresh vegetables and cheese",
      category: "Lunch",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold gradient-text">Campus Cafeteria</h1>
          <Button variant="outline" className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>My Orders</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-4 hover-scale"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Utensils className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">{item.price}</span>
                <Button
                  size="sm"
                  onClick={() => handleOrder(item.name)}
                >
                  Order Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Coffee className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Today's Specials</h2>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-white/50 rounded-lg">
              <p className="font-medium">Chef's Special Pasta</p>
              <p className="text-sm text-gray-500">Limited time offer: RS.50</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Opening Hours</h2>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-white/50 rounded-lg">
              <p className="font-medium">Breakfast: 7:00 AM - 10:00 AM</p>
              <p className="font-medium">Lunch: 12:30 PM - 1:30 PM</p>
              <p className="font-medium">Snacks: 6:30 PM - 7:30 PM</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cafeteria;
