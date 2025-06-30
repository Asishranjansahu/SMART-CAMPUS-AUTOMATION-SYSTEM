
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Book, BookOpen, Clock, Search } from "lucide-react";

const Library = () => {
  const { toast } = useToast();

  const handleBorrow = (bookTitle) => {
    toast({
      title: "Book Borrowed",
      description: `You have successfully borrowed "${bookTitle}"`,
    });
  };

  const books = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      author: "John Smith",
      status: "available",
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      author: "Sarah Johnson",
      status: "borrowed",
    },
    {
      id: 3,
      title: "Modern Physics",
      author: "Michael Brown",
      status: "available",
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
          <h1 className="text-3xl font-bold gradient-text">Library Management</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search books..."
              className="pl-10 pr-4 py-2 rounded-lg border bg-white/50"
            />
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-4 hover-scale"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Book className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{book.title}</h3>
                  <p className="text-sm text-gray-500">{book.author}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  book.status === "available" ? "text-green-500" : "text-yellow-500"
                }`}>
                  {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                </span>
                <Button
                  variant={book.status === "available" ? "default" : "outline"}
                  size="sm"
                  disabled={book.status !== "available"}
                  onClick={() => handleBorrow(book.title)}
                >
                  {book.status === "available" ? "Borrow" : "Borrowed"}
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
            <BookOpen className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Currently Reading</h2>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-white/50 rounded-lg">
              <p className="font-medium">Data Structures and Algorithms</p>
              <p className="text-sm text-gray-500">Due in 5 days</p>
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
            <h2 className="text-xl font-semibold">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-white/50 rounded-lg">
              <p className="font-medium">Returned: Web Development Basics</p>
              <p className="text-sm text-gray-500">2 days ago</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Library;
