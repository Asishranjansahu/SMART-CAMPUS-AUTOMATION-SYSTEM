import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-blue-600 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-white"
                >
                  <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                  <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                  <path d="M10 6h4" />
                  <path d="M10 10h4" />
                  <path d="M10 14h4" />
                  <path d="M10 18h4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-none tracking-tight">VIGNAN</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Institute</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Empowering students with technology and management skills for a brighter future. Excellence in education since 2008.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300"><Facebook size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-400 hover:text-white transition-all duration-300"><Twitter size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all duration-300"><Instagram size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-all duration-300"><Linkedin size={16} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/dashboard" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-slate-600 rounded-full"></span> Dashboard</Link></li>
              <li><Link to="/attendance" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-slate-600 rounded-full"></span> Attendance</Link></li>
              <li><Link to="/library" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-slate-600 rounded-full"></span> Library</Link></li>
              <li><Link to="/map" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-slate-600 rounded-full"></span> Campus Map</Link></li>
              <li><Link to="/rooms" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-slate-600 rounded-full"></span> Room Booking</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-slate-600 rounded-full"></span> Student Portal</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-slate-600 rounded-full"></span> Faculty Login</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-slate-600 rounded-full"></span> Academic Calendar</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-slate-600 rounded-full"></span> Exam Results</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-slate-600 rounded-full"></span> Support Center</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center flex-shrink-0 text-blue-500">
                  <MapPin size={16} />
                </div>
                <span className="text-slate-400 leading-relaxed">Vignan Institute of Technology & Management, Berhampur, Odisha 760001</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center flex-shrink-0 text-blue-500">
                  <Phone size={16} />
                </div>
                <span className="text-slate-400">+91 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center flex-shrink-0 text-blue-500">
                  <Mail size={16} />
                </div>
                <span className="text-slate-400">info@vignan.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {currentYear} Vignan Institute. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
