# 🎓 Smart Campus Automation System

A comprehensive web-based platform for automating and managing various campus operations, built with React, Vite, and Express.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-38B2AC?logo=tailwind-css)
![Express](https://img.shields.io/badge/Express-4.18.2-000000?logo=express)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7.2-010101?logo=socket.io)

## 📋 Overview

The Smart Campus Automation System is a modern, full-stack web application designed to streamline campus operations and enhance the student experience. It provides a centralized platform for managing attendance, library services, cafeteria, transport, room bookings, events, and much more.

## ✨ Key Features

### 🎯 Student Services
- **📊 Attendance Tracking** - Real-time attendance monitoring and reporting
- **📚 Library Management** - Book search, issue, return, and availability tracking
- **🍽️ Cafeteria Services** - Digital menu, ordering, and payment system
- **🏛️ Room Booking** - Easy classroom and facility reservation

### 🚌 Campus Operations
- **🚍 Transport Management** - Live bus tracking and schedule management
- **🔒 Security Monitoring** - Campus security features and alerts
- **♻️ Smart Dustbin** - IoT-enabled waste management monitoring
- **🏢 Premises Monitoring** - Facility oversight and maintenance tracking

### 📢 Information & Communication
- **🎉 Events Calendar** - Campus event scheduling and notifications
- **📌 Digital Notice Board** - Real-time announcements and updates
- **💼 Placement Portal** - Job opportunities and placement tracking
- **🔍 Lost & Found** - Item tracking and recovery system

### 🛡️ Safety & Support
- **🆘 Anti-Ragging Helpline** - Emergency support and reporting
- **🗺️ Interactive Campus Map** - Location-based navigation using Leaflet
- **🎤 Voice Assistant** - Voice-controlled campus information

### 📈 Analytics
- **📊 Dashboard Analytics** - Real-time campus statistics and insights
- **📉 Data Visualization** - Interactive charts using Recharts
- **👤 Face Recognition** - Advanced attendance using face-api.js

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - Modern UI library
- **Vite 4.4.5** - Lightning-fast build tool
- **Tailwind CSS 3.3.3** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations
- **React Router DOM** - Client-side routing
- **Recharts** - Data visualization
- **Leaflet** - Interactive maps
- **Socket.IO Client** - Real-time communication

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.18.2** - Web application framework
- **LowDB 7.0.1** - Lightweight JSON database
- **Socket.IO 4.7.2** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SMART-CAMPUS-AUTOMATION-SYSTEM.git
   cd SMART-CAMPUS-AUTOMATION-SYSTEM
   ```

2. **Install frontend dependencies**
   ```bash
   cd "SMART CAMPUS AUTOMATION SYSTEM"
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd "SMART CAMPUS AUTOMATION SYSTEM/server"
   npm start
   ```
   Server will run on `http://localhost:3000`

2. **Start the frontend (in a new terminal)**
   ```bash
   cd "SMART CAMPUS AUTOMATION SYSTEM"
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
cd "SMART CAMPUS AUTOMATION SYSTEM"
npm run build
npm run preview
```

## 📁 Project Structure

```
SMART-CAMPUS-AUTOMATION-SYSTEM/
├── SMART CAMPUS AUTOMATION SYSTEM/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── ui/              # Reusable UI components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── ... (20+ feature components)
│   │   ├── lib/                 # Utility libraries
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # Entry point
│   ├── server/                  # Backend server
│   │   ├── server.js            # Express server
│   │   ├── db.js                # Database config
│   │   └── data.json            # JSON database
│   ├── public/                  # Static assets
│   ├── package.json
│   └── vite.config.js
├── PROJECT_STRUCTURE.md         # Detailed structure docs
└── README.md                    # This file
```

For detailed project structure, see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

## 🎨 Features Showcase

### Dashboard
- Real-time statistics and analytics
- Quick access to all modules
- Personalized user experience

### Attendance System
- Face recognition integration
- Automated attendance marking
- Detailed attendance reports

### Library Management
- Advanced book search
- Digital issue/return system
- Availability tracking

### Transport Tracking
- Live bus location tracking
- Route information
- Schedule management

## 🔐 Security

- Protected routes with authentication
- Face recognition for attendance
- Secure data handling
- Anti-ragging emergency system

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile devices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

- Asish Ranjan Sahu - Initial work

## 🙏 Acknowledgments

- Radix UI for accessible components
- Tailwind CSS for styling utilities
- Vite for blazing fast development
- All contributors and supporters

## 📞 Support

For support, email asishranjansahu2003@gmail.com or open an issue in the repository.

## 🔮 Future Roadmap

- [ ] Mobile app (React Native/Capacitor)
- [ ] Advanced AI-powered recommendations
- [ ] Multi-language support
- [ ] Progressive Web App (PWA) features
- [ ] Integration with campus ERP systems
- [ ] Advanced analytics dashboard
- [ ] Notification system (Email/SMS)

---

**Made with ❤️ for smarter campuses**
