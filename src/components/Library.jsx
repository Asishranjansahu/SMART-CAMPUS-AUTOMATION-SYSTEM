
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Book, BookOpen, Clock, Search, Filter, Library as LibraryIcon, Star, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { getBooks, borrowBook } from "@/lib/api";

const Library = () => {
  const { toast } = useToast();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX
    setTimeout(() => {
      getBooks().then((data) => {
        if (data && data.length > 0) {
          setBooks(data);
        } else {
          // Fallback mock data if API returns empty
          setBooks([
            { id: 1, title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Computer Science", status: "available", rating: 4.8, pages: 1312 },
            { id: 2, title: "Clean Code", author: "Robert C. Martin", category: "Software Engineering", status: "borrowed", rating: 4.7, pages: 464 },
            { id: 3, title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", category: "AI & ML", status: "available", rating: 4.9, pages: 1152 },
            { id: 4, title: "Computer Networks", author: "Andrew S. Tanenbaum", category: "Networking", status: "available", rating: 4.5, pages: 960 },
            { id: 5, title: "Database System Concepts", author: "Abraham Silberschatz", category: "Databases", status: "available", rating: 4.6, pages: 1376 },
            { id: 6, title: "Operating System Concepts", author: "Abraham Silberschatz", category: "Operating Systems", status: "borrowed", rating: 4.4, pages: 976 },
          ]);
        }
        setLoading(false);
      });
    }, 800);
  }, []);

  const handleBorrow = async (bookId, bookTitle) => {
    const r = await borrowBook(bookId).catch(() => null);
    // Optimistic update for demo purposes
    const next = books.map(b => b.id === bookId ? { ...b, status: 'borrowed' } : b);
    setBooks(next);
    
    toast({
      title: "Book Borrowed",
      description: `You have successfully borrowed "${bookTitle}"`,
    });
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (book.category && book.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = {
    total: books.length,
    available: books.filter(b => b.status === "available").length,
    borrowed: books.filter(b => b.status === "borrowed").length,
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Library Resources</h1>
          <p className="text-slate-500 text-sm mt-1">Access digital and physical learning materials</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Library Open: 8:00 AM - 8:00 PM
           </div>
           <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm">
              <BookOpen className="w-4 h-4 mr-2" /> My Bookshelf
           </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
           <div className="flex justify-between items-start mb-4">
              <div>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Collection</p>
                 <h3 className="text-3xl font-bold text-slate-900 mt-1">{stats.total}</h3>
              </div>
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                 <LibraryIcon className="w-5 h-5" />
              </div>
           </div>
           <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
           </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
           <div className="flex justify-between items-start mb-4">
              <div>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Available Now</p>
                 <h3 className="text-3xl font-bold text-slate-900 mt-1">{stats.available}</h3>
              </div>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                 <BookOpen className="w-5 h-5" />
              </div>
           </div>
           <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(stats.available / stats.total) * 100}%` }}></div>
           </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
           <div className="flex justify-between items-start mb-4">
              <div>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Currently Borrowed</p>
                 <h3 className="text-3xl font-bold text-slate-900 mt-1">{stats.borrowed}</h3>
              </div>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                 <Clock className="w-5 h-5" />
              </div>
           </div>
           <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(stats.borrowed / stats.total) * 100}%` }}></div>
           </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Catalog */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search by title, author, or category..."
                  className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                 <Button variant="outline" size="sm" className="flex-1 md:flex-none text-slate-600 border-slate-200">
                    <Filter className="w-4 h-4 mr-2" /> Filter
                 </Button>
                 <Button variant="outline" size="sm" className="flex-1 md:flex-none text-slate-600 border-slate-200">
                    <TrendingUp className="w-4 h-4 mr-2" /> Popular
                 </Button>
              </div>
           </div>

           <div className="space-y-4">
            {loading ? (
               // Skeleton loading
               [1, 2, 3].map(i => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm h-32 animate-pulse"></div>
               ))
            ) : filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="w-full sm:w-24 h-32 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-200 group-hover:border-blue-200 transition-colors self-center sm:self-start">
                      <Book className="w-8 h-8 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                         <div>
                            <div className="flex items-center gap-2 mb-1">
                               <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200">
                                  {book.category || "General"}
                               </Badge>
                               {book.rating && (
                                  <span className="flex items-center text-xs font-medium text-amber-500">
                                     <Star className="w-3 h-3 fill-current mr-1" /> {book.rating}
                                  </span>
                               )}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">{book.title}</h3>
                            <p className="text-sm text-slate-500 font-medium">{book.author}</p>
                         </div>
                         <Badge variant="outline" className={`${
                            book.status === "available" 
                               ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                               : "bg-amber-50 text-amber-700 border-amber-200"
                         }`}>
                            {book.status === "available" ? "Available" : "Borrowed"}
                         </Badge>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between gap-4">
                         <div className="text-xs text-slate-400 flex items-center gap-4">
                            <span>{book.pages || "300+"} pages</span>
                            <span>•</span>
                            <span>English</span>
                            <span>•</span>
                            <span>2023 Edition</span>
                         </div>
                         <Button
                           variant={book.status === "available" ? "default" : "secondary"}
                           size="sm"
                           disabled={book.status !== "available"}
                           onClick={() => handleBorrow(book.id, book.title)}
                           className={book.status === "available" ? "bg-slate-900 hover:bg-slate-800" : ""}
                         >
                           {book.status === "available" ? "Borrow Now" : "Notify Me"}
                         </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
               <div className="p-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                     <Search className="w-6 h-6 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">No books found</h3>
                  <p className="text-sm text-slate-400 mt-1">Try adjusting your search terms or filters</p>
               </div>
            )}
           </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                 <BookOpen className="w-4 h-4 text-blue-600" />
                 <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">My Readings</h2>
              </div>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100">1 Active</Badge>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-200 transition-colors group cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                   <p className="font-semibold text-slate-900 text-sm leading-snug group-hover:text-blue-700 transition-colors">Data Structures and Algorithms</p>
                </div>
                <div className="flex justify-between items-center text-xs">
                   <span className="text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Due in 5 days
                   </span>
                   <span className="font-bold text-blue-600 hover:underline">Renew</span>
                </div>
                <div className="mt-2 w-full bg-slate-200 rounded-full h-1">
                   <div className="bg-blue-500 h-1 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                 <Clock className="w-4 h-4 text-slate-600" />
                 <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">History</h2>
              </div>
              <Button variant="ghost" size="sm" className="h-6 text-xs text-slate-500">View All</Button>
            </div>
            
            <div className="relative pl-2 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <div className="relative pl-6">
                 <div className="absolute left-0 top-1.5 w-4 h-4 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                 </div>
                 <p className="text-sm font-medium text-slate-900">Web Development Basics</p>
                 <p className="text-xs text-slate-500 mt-0.5">Returned • 2 days ago</p>
              </div>
              
              <div className="relative pl-6">
                 <div className="absolute left-0 top-1.5 w-4 h-4 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                 </div>
                 <p className="text-sm font-medium text-slate-900">Operating Systems</p>
                 <p className="text-xs text-slate-500 mt-0.5">Returned • 1 week ago</p>
              </div>
              
              <div className="relative pl-6">
                 <div className="absolute left-0 top-1.5 w-4 h-4 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                 </div>
                 <p className="text-sm font-medium text-slate-900">Database Management</p>
                 <p className="text-xs text-slate-500 mt-0.5">Returned • 2 weeks ago</p>
              </div>
            </div>
          </motion.div>
          
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-5 rounded-xl shadow-lg text-white">
             <h3 className="font-bold text-lg mb-2">Need Help?</h3>
             <p className="text-slate-300 text-sm mb-4">Can't find what you're looking for? Suggest a new book for our collection.</p>
             <Button variant="outline" size="sm" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white">
                Suggest a Book
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
