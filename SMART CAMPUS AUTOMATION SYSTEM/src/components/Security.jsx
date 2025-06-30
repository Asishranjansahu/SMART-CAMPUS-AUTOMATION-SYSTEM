
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Shield, Bell, Camera, AlertTriangle } from "lucide-react";

const Security = () => {
  const { toast } = useToast();

  const handleAlert = (type) => {
    toast({
      title: "Security Alert",
      description: `${type} alert has been triggered`,
      variant: "destructive",
    });
  };

  const securityAlerts = [
    {
      id: 1,
      type: "Gate Access",
      location: "Main Gate",
      time: "10:30 AM",
      status: "Resolved",
    },
    {
      id: 2,
      type: "Motion Detected",
      location: "Library",
      time: "11:45 AM",
      status: "Active",
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
          <h1 className="text-3xl font-bold gradient-text">Campus Security</h1>
          <Button
            variant="destructive"
            className="flex items-center space-x-2"
            onClick={() => handleAlert("Emergency")}
          >
            <AlertTriangle className="w-5 h-5" />
            <span>Emergency Alert</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-4 hover-scale"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 rounded-full bg-red-100">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-medium">Security Status</h3>
                <p className="text-sm text-green-500">All Systems Normal</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-4 hover-scale"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 rounded-full bg-yellow-100">
                <Bell className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-medium">Active Alerts</h3>
                <p className="text-sm text-gray-500">1 Alert Pending</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-4 hover-scale"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 rounded-full bg-blue-100">
                <Camera className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">CCTV Status</h3>
                <p className="text-sm text-gray-500">All Cameras Active</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 glass-card p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Recent Security Alerts</h2>
          <div className="space-y-4">
            {securityAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-4 bg-white/50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{alert.type}</p>
                  <p className="text-sm text-gray-500">
                    {alert.location} - {alert.time}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    alert.status === "Active"
                      ? "bg-red-100 text-red-500"
                      : "bg-green-100 text-green-500"
                  }`}
                >
                  {alert.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleAlert("Gate Lock")}
            >
              Lock Gates
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleAlert("Security Check")}
            >
              Security Check
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleAlert("Camera Check")}
            >
              Check Cameras
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleAlert("Patrol")}
            >
              Request Patrol
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Security Schedule</h2>
          <div className="space-y-4">
            <div className="p-3 bg-white/50 rounded-lg">
              <p className="font-medium">Morning Patrol</p>
              <p className="text-sm text-gray-500">06:00 AM - All Sectors</p>
            </div>
            <div className="p-3 bg-white/50 rounded-lg">
              <p className="font-medium">Evening Check</p>
              <p className="text-sm text-gray-500">06:00 PM - All Sectors</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Security;
