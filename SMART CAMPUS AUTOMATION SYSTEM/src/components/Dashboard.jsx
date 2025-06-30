
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  BookOpen,
  Users,
  Coffee,
  Bell,
  Shield,
  Calendar,
} from "lucide-react";

const Dashboard = () => {
  const { toast } = useToast();

  const stats = [
    {
      title: "Students Present",
      value: "1,234",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Books Borrowed",
      value: "156",
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      title: "Cafeteria Orders",
      value: "89",
      icon: Coffee,
      color: "bg-yellow-500",
    },
    {
      title: "Active Alerts",
      value: "3",
      icon: Bell,
      color: "bg-red-500",
    },
  ];

  const handleEmergency = () => {
    toast({
      title: "Emergency Alert Sent",
      description: "Security team has been notified.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold gradient-text">Campus Overview</h1>
          <Button
            variant="destructive"
            onClick={handleEmergency}
            className="flex items-center space-x-2"
          >
            <Shield className="w-4 h-4" />
            <span>Emergency Alert</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4 hover-scale"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Today's Schedule</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
            <div>
              <p className="font-medium">Morning Assembly</p>
              <p className="text-sm text-gray-500">08:00 AM - Main Ground</p>
            </div>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
            <div>
              <p className="font-medium">Department Meeting</p>
              <p className="text-sm text-gray-500">10:30 AM - Conference Room</p>
            </div>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Campus News</h2>
          <div className="space-y-4">
            <div className="p-3 bg-white/50 rounded-lg">
              <p className="font-medium">Annual Sports Meet</p>
              <p className="text-sm text-gray-500">Registration starts next week</p>
            </div>
            <div className="p-3 bg-white/50 rounded-lg">
              <p className="font-medium">New Library Resources</p>
              <p className="text-sm text-gray-500">Digital archives now available</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button className="w-full">Mark Attendance</Button>
            <Button className="w-full">Book Room</Button>
            <Button className="w-full">Submit Request</Button>
            <Button className="w-full">View Reports</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
