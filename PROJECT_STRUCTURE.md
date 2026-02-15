# Smart Campus Automation System - Project Structure

## 📁 Directory Overview

```
SMART-CAMPUS-AUTOMATION-SYSTEM/
├── SMART CAMPUS AUTOMATION SYSTEM/    # Main application directory
│   ├── src/                           # Frontend source code
│   │   ├── components/                # React components
│   │   │   ├── ui/                    # Reusable UI components
│   │   │   ├── Dashboard.jsx          # Main dashboard
│   │   │   ├── Login.jsx              # Authentication
│   │   │   ├── Attendance.jsx         # Attendance tracking
│   │   │   ├── Library.jsx            # Library management
│   │   │   ├── Cafeteria.jsx          # Cafeteria services
│   │   │   ├── Transport.jsx          # Transport management
│   │   │   ├── RoomBooking.jsx        # Room booking system
│   │   │   ├── Events.jsx             # Campus events
│   │   │   ├── Notices.jsx            # Notice board
│   │   │   ├── Placement.jsx          # Placement portal
│   │   │   ├── Security.jsx           # Security monitoring
│   │   │   ├── CampusMap.jsx          # Interactive campus map
│   │   │   ├── LostAndFound.jsx       # Lost & found items
│   │   │   ├── AntiRagging.jsx        # Anti-ragging helpline
│   │   │   ├── SmartDustbin.jsx       # Smart waste management
│   │   │   ├── Premises.jsx           # Premises monitoring
│   │   │   ├── Analytics.jsx          # Analytics dashboard
│   │   │   ├── VoiceAssistant.jsx     # Voice assistant feature
│   │   │   ├── Navbar.jsx             # Navigation bar
│   │   │   ├── Footer.jsx             # Footer component
│   │   │   ├── Welcome.jsx            # Welcome screen
│   │   │   └── ProtectedRoute.jsx     # Route protection
│   │   ├── lib/                       # Utility libraries
│   │   ├── App.jsx                    # Main app component
│   │   ├── main.jsx                   # Application entry point
│   │   └── index.css                  # Global styles
│   ├── server/                        # Backend server
│   │   ├── server.js                  # Express server
│   │   ├── db.js                      # Database configuration
│   │   ├── data.json                  # JSON database
│   │   └── package.json               # Server dependencies
│   ├── public/                        # Static assets
│   ├── dist/                          # Production build output
│   ├── node_modules/                  # Frontend dependencies
│   ├── package.json                   # Frontend dependencies
│   ├── vite.config.js                 # Vite configuration
│   ├── tailwind.config.js             # Tailwind CSS config
│   ├── postcss.config.js              # PostCSS config
│   ├── index.html                     # HTML entry point
│   ├── vercel.json                    # Vercel deployment config
│   └── .gitignore                     # Git ignore rules
├── server/                            # Additional server files
│   └── db.js                          # Database utilities
├── README.md                          # Project documentation
└── PROJECT_STRUCTURE.md               # This file

```

## 🎯 Key Features

### 1. **Student Services**
- **Attendance Tracking**: Real-time attendance monitoring
- **Library Management**: Book search, issue, and return
- **Cafeteria Services**: Menu viewing and ordering
- **Room Booking**: Classroom and facility booking

### 2. **Campus Operations**
- **Transport Management**: Bus tracking and schedules
- **Security Monitoring**: Campus security features
- **Smart Dustbin**: Waste management monitoring
- **Premises Monitoring**: Campus facility oversight

### 3. **Information & Communication**
- **Events**: Campus event calendar
- **Notices**: Digital notice board
- **Placement Portal**: Job opportunities and placements
- **Lost & Found**: Item tracking system

### 4. **Safety & Support**
- **Anti-Ragging Helpline**: Emergency support system
- **Campus Map**: Interactive navigation
- **Voice Assistant**: Voice-controlled features

### 5. **Analytics**
- **Dashboard Analytics**: Real-time campus statistics
- **Data Visualization**: Charts and graphs using Recharts

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 4.4.5
- **Styling**: Tailwind CSS 3.3.3
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Routing**: React Router DOM 6.16.0
- **Charts**: Recharts 3.7.0
- **Maps**: Leaflet & React Leaflet
- **Face Recognition**: @vladmandic/face-api
- **Real-time**: Socket.IO Client

### Backend
- **Runtime**: Node.js
- **Framework**: Express 4.18.2
- **Database**: LowDB 7.0.1 (JSON-based)
- **Real-time**: Socket.IO 4.7.2
- **CORS**: CORS 2.8.5

### Development Tools
- **Linter**: ESLint
- **CSS Processing**: PostCSS, Autoprefixer
- **Build Optimization**: Terser

## 📦 Component Architecture

### UI Components (Reusable)
Located in `src/components/ui/`:
- `avatar.jsx` - User avatars
- `badge.jsx` - Status badges
- `button.jsx` - Custom buttons
- `dialog.jsx` - Modal dialogs
- `dropdown-menu.jsx` - Dropdown menus
- `input.jsx` - Form inputs
- `progress.jsx` - Progress bars
- `textarea.jsx` - Text areas
- `toast.jsx` - Toast notifications
- `toaster.jsx` - Toast container
- `use-toast.js` - Toast hook

### Feature Components
Located in `src/components/`:
- Each feature has its own component file
- Components use Radix UI primitives
- Styled with Tailwind CSS
- Integrated with backend APIs

## 🔄 Data Flow

1. **Client → Server**: HTTP requests via fetch/axios
2. **Server → Database**: LowDB for data persistence
3. **Real-time Updates**: Socket.IO for live features
4. **State Management**: React hooks (useState, useEffect)

## 🚀 Deployment

- **Frontend**: Configured for Vercel deployment
- **Backend**: Express server with Socket.IO support
- **Database**: JSON-based (LowDB) for simplicity

## 📝 Configuration Files

- `vite.config.js` - Vite bundler configuration
- `tailwind.config.js` - Tailwind CSS customization
- `postcss.config.js` - PostCSS plugins
- `vercel.json` - Vercel deployment settings
- `.gitignore` - Git exclusion rules

## 🔐 Security Features

- Protected routes with authentication
- Face recognition integration
- Anti-ragging emergency system
- Security monitoring dashboard

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS responsive utilities
- Adaptive layouts for all screen sizes

## 🎨 Design System

- **Color Scheme**: Defined in Tailwind config
- **Typography**: Custom font configurations
- **Animations**: Tailwind animate + Framer Motion
- **Icons**: Lucide React icons

## 🔧 Development Workflow

1. **Install Dependencies**: `npm install`
2. **Run Frontend**: `npm run dev`
3. **Run Backend**: `cd server && npm start`
4. **Build**: `npm run build`
5. **Preview**: `npm run preview`

## 📊 Database Schema

The application uses LowDB with JSON storage. Main collections:
- Users
- Attendance records
- Library books
- Cafeteria orders
- Room bookings
- Events
- Notices
- Lost & found items
- Transport schedules

## 🌟 Future Enhancements

- Mobile app integration
- Advanced analytics
- AI-powered recommendations
- Multi-language support
- Progressive Web App (PWA) features
