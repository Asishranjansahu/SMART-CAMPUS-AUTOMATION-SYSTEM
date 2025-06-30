
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UserCheck, UserX, Users } from "lucide-react";

const Attendance = () => {
  const { toast } = useToast();
  const [students] = useState([
    { id: 1, name: "Asish Kumar Sahani", status: "present" },
    { id: 2, name: "Sibani Swain", status: "absent" },
    { id: 3, name: "Renuka Swain", status: "present" },
    { id: 4, name: "Asish Ranjan Sahu", status: "present" },
    { id: 5, name: "Ankita Mahapatra", status: "absent" },
  ]);

  const handleMarkAttendance = (id, status) => {
    toast({
      title: "Attendance Updated",
      description: `Student attendance marked as ${status}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold gradient-text">Attendance Management</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-green-500" />
              <span>Present: 3</span>
            </div>
            <div className="flex items-center space-x-2">
              <UserX className="w-5 h-5 text-red-500" />
              <span>Absent: 2</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {students.map((student) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-white/50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-500">ID: {student.id}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={student.status === "present" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleMarkAttendance(student.id, "present")}
                >
                  Present
                </Button>
                <Button
                  variant={student.status === "absent" ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => handleMarkAttendance(student.id, "absent")}
                >
                  Absent
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Attendance;
