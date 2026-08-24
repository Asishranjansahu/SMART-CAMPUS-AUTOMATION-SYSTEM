Here is the complete, raw code for your README.md. You can click the Copy button
on the code block below and paste it directly into your project's README.md
file.

<div align="center">

# 🏛️ Smart Campus Automation System (SCAS)

### Distributed Real-Time Campus Operations & IoT Telemetry Platform

[![React](https://img.shields.io/badge/React-v18.2.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-v4.4.5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v18.x_%7C_v20.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-v4.18.2-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Socket.io](https://img.shields.io/badge/Socket.IO-v4.7.2-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v3.3.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](https://github.com/Asishranjansahu/SMART-CAMPUS-AUTOMATION-SYSTEM/pulls)

<p align="center">
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-key-modules--capabilities">Capabilities</a> •
  <a href="#-technology-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-api--event-contracts">API Reference</a> •
  <a href="#-security--privacy-architecture">Security & Privacy</a>
</p>

</div>

---

## 📌 Executive Overview

The **Smart Campus Automation System (SCAS)** is an event-driven, full-stack management platform engineered to automate institutional governance and student services. By combining **client-side edge AI biometrics**, **bi-directional WebSocket telemetry**, and an **interactive GIS mapping engine**, SCAS unifies operations—from attendance and transit tracking to IoT waste monitoring and emergency SOS response—under a single, real-time dashboard.

### Core Architectural Highlights
- **Privacy-First Edge Biometrics:** Client-side neural facial inference powered by `@vladmandic/face-api` over WebGL tensors (no raw image streaming to servers).
- **Event-Driven Pub/Sub Mesh:** High-frequency real-time updates via WebSockets (`Socket.IO`) for IoT fill levels, transit telemetry, and safety dispatches.
- **Zero-Config Persistence:** Atomic JSON document store managed by `LowDB` for fast local testing and minimal overhead.
- **Accessible UI/UX Design System:** Component primitives backed by Radix UI and Tailwind CSS with fluid Framer Motion animations.

---

## 🏗️ System Architecture

```mermaid
flowchart TB
    subgraph ClientLayer ["Presentation & Edge Layer (React 18 + Vite)"]
        UI["Tailwind CSS + Radix UI Primitives"]
        Router["React Router DOM (Protected Routes)"]
        EdgeAI["@vladmandic/face-api (Client-side WebGL Tensor Inference)"]
        GeoEngine["Leaflet GIS Geospatial Renderer"]
        AnalyticsEngine["Recharts Telemetry Dashboard"]
        SocketClient["Socket.IO Client (Reactive Event Listeners)"]
    end

    subgraph IngestionLayer ["Transport & Gateway Layer"]
        HTTP["RESTful HTTP API Endpoints"]
        WS["Full-Duplex WebSockets (Socket.IO)"]
    end

    subgraph ServiceLayer ["Core Application Engine (Node.js & Express)"]
        AuthMid["RBAC & Session Middleware"]
        EventBus["Socket.IO Central Event Dispatcher"]
        
        subgraph Subsystems ["Domain Service Modules"]
            AttendanceCtrl["Biometric Attendance Controller"]
            TransitCtrl["Transit & Fleet Controller"]
            FacilityCtrl["Room & Resource Scheduler"]
            SafetyCtrl["Emergency SOS Dispatcher"]
            AuxCtrl["Auxiliary Services (Cafeteria / Library / Notices)"]
        end
    end

    subgraph StorageLayer ["Persistence & Assets"]
        LowDB[("LowDB Typed JSON Store (data.json)")]
        ModelWeights[("Face-API Neural Weights (/public/models)")]
    end

    %% Pipeline Connections
    ClientLayer -->|REST Queries / Mutations| HTTP
    SocketClient <-->|Bi-Directional Telemetry| WS
    EdgeAI -.->|Loads Model Shards| ModelWeights

    HTTP --> AuthMid
    AuthMid --> Subsystems
    WS <--> EventBus
    EventBus <--> Subsystems

    Subsystems --> LowDB

📦 Key Modules & Capabilities

| Module                             | Core Engine              | Technical Description                                                                                      |
| :--------------------------------- | :----------------------- | :--------------------------------------------------------------------------------------------------------- |
| **Biometric Attendance**           | Edge Neural Vision       | Client-side facial verification using 128-d embeddings via `@vladmandic/face-api`. Zero raw image storage. |
| **Geospatial Fleet Tracking**      | Leaflet / OSM            | Real-time transit bus coordinate stream with interactive route polyline overlays and live speed metrics.   |
| **Smart Waste Management**         | IoT WebSocket Telemetry  | Ultrasonic bin fill-level telemetry with dynamic threshold overflow alerts and visual gauges.              |
| **Critical Safety / Anti-Ragging** | Emergency SOS Dispatcher | Instantaneous incident beaconing with location metadata and high-priority administrative broadcast.        |
| **Venue & Room Booking**           | Resource Scheduler       | Conflict-free room, lab, and auditorium reservation management with role-based validation.                 |
| **Cafeteria & Library POS**        | Catalog Management       | Token-based contactless food ordering pipeline and book inventory check-in/checkout ledger.                |
| **AI Voice Assistant**             | Web Speech API           | Integrated conversational voice command processor for hands-free system navigation.                        |
| **Telemetry Analytics**            | Recharts Engine          | Dynamic visualization of institutional footfall, attendance trends, and resource utilization.              |

🛠️ Technology Stack

├── Frontend
│   ├── Framework:             React 18.2.0
│   ├── Build Engine:          Vite 4.4.5
│   ├── Client Routing:        React Router DOM 6.16.0
│   ├── UI Primitives:         Radix UI Headless Components
│   ├── Styling Engine:        Tailwind CSS 3.3.3 + PostCSS + Autoprefixer
│   ├── Motion & Animations:   Framer Motion + Tailwind Animate
│   ├── Geospatial Engine:     Leaflet 1.9.4 + React-Leaflet 4.2.1
│   ├── Edge Machine Learning: @vladmandic/face-api (TensorFlow.js WebGL)
│   └── Visualizations:        Recharts 3.7.0
│
├── Backend
│   ├── Runtime:               Node.js (LTS v18+)
│   ├── Web Server:            Express.js 4.18.2
│   ├── Real-Time Protocol:    Socket.IO 4.7.2
│   ├── Persistence Store:     LowDB 7.0.1 (Atomic JSON Document Store)
│   └── Cross-Origin Policy:   CORS 2.8.5
│
└── Tooling & Utilities
    ├── Package Manager:       npm (or yarn / pnpm)
    ├── Code Quality:          ESLint + Prettier
    └── Build Minifier:        Terser

📂 Repository Structure

SMART-CAMPUS-AUTOMATION-SYSTEM/
├── src/                               # Frontend Single-Page Application
│   ├── components/                    # Feature domain modules
│   │   ├── ui/                        # Reusable Radix UI design primitives
│   │   ├── Analytics.jsx              # Institutional telemetry analytics
│   │   ├── AntiRagging.jsx            # Emergency SOS & helpline system
│   │   ├── Attendance.jsx             # Edge facial biometric verification
│   │   ├── Cafeteria.jsx              # Meal token and cafeteria POS
│   │   ├── CampusMap.jsx              # Interactive Leaflet GIS campus map
│   │   ├── Dashboard.jsx              # Central operational control console
│   │   ├── Library.jsx                # Book circulation & catalogue records
│   │   ├── LostAndFound.jsx           # Item registry and claim board
│   │   ├── Notices.jsx                # Institutional bulletin board
│   │   ├── Placement.jsx              # Campus recruitment drive portal
│   │   ├── Premises.jsx               # Facility occupancy & security ledger
│   │   ├── ProtectedRoute.jsx         # RBAC route authentication guard
│   │   ├── RoomBooking.jsx            # Dynamic venue scheduler
│   │   ├── Security.jsx               # Campus security monitoring portal
│   │   ├── SmartDustbin.jsx           # IoT smart waste telemetry interface
│   │   ├── Transport.jsx              # Live transit GPS fleet tracking
│   │   └── VoiceAssistant.jsx         # Voice navigation interface
│   ├── lib/                           # Utility helpers (cn, formatters)
│   ├── App.jsx                        # Application root & routing table
│   ├── main.jsx                       # React DOM root entry point
│   └── index.css                      # Global Tailwind CSS configurations
├── server/                            # Node.js Express API & WebSocket Core
│   ├── server.js                      # REST API endpoints & Socket.IO server
│   ├── db.js                          # LowDB persistence abstraction layer
│   ├── data.json                      # Seed & active JSON document database
│   └── package.json                   # Backend dependencies manifest
├── public/                            # Static distribution assets
│   └── models/                        # Pre-trained neural weights for face-api
├── vite.config.js                     # Vite build & proxy settings
├── tailwind.config.js                 # Design tokens & color system
├── vercel.json                        # Deployment & SPA rewrite routing
└── package.json                       # Root client dependencies manifest

🚦 Quick Start

Prerequisites

  - Node.js: v18.x or v20.x LTS
  - npm: v9.x or higher
  - WebCam Hardware: Required for facial recognition inference.

1. Clone the Repository

git clone git@github.com:Asishranjansahu/SMART-CAMPUS-AUTOMATION-SYSTEM.git
cd SMART-CAMPUS-AUTOMATION-SYSTEM

2. Install Backend Dependencies & Start Server

Open a terminal and start the backend service:

cd server
npm install
npm start

🟢 Backend status: Express and Socket.IO running on http://localhost:5000

3. Install Frontend Dependencies & Start Client

Open a second terminal in the project root:

npm install
npm run dev

🟢 Frontend status: Vite dev server running on http://localhost:5173

⚡ Single-Command Concurrent Launch

To launch both the frontend client and backend server simultaneously:

1.  Install concurrently in the root directory:

    npm install -D concurrently

2.  Add the following to the "scripts" block in your root package.json:

    "scripts": {
      "dev": "concurrently \"npm run dev:client\" \"npm run dev:server\"",
      "dev:client": "vite",
      "dev:server": "cd server && npm start",
      "build": "vite build",
      "preview": "vite preview"
    }

3.  Launch both services with one command:

    npm run dev

⚙️ Environment Configuration

Frontend Configuration (.env)

VITE_API_BASE_URL=http://localhost:5000
VITE_SOCKET_SERVER_URL=http://localhost:5000

Backend Configuration (server/.env)

PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

📡 API & Event Contracts

🌐 REST API Endpoints

User Authentication

POST /api/auth/login
Content-Type: application/json

{
  "username": "student@campus.edu",
  "password": "password123"
}

Response (200 OK):

{
  "status": "success",
  "data": {
    "id": "USR-1",
    "name": "Alex Mercer",
    "role": "student",
    "studentId": "STU-8823"
  }
}

Attendance Verification

POST /api/attendance/verify
Content-Type: application/json

{
  "studentId": "STU-8823",
  "studentName": "Alex Mercer"
}

⚡ WebSocket Event Specification (Socket.IO)

| Event Channel         | Direction         | Payload Structure                           | Action Triggered                      |
| :-------------------- | :---------------- | :------------------------------------------ | :------------------------------------ |
| `transport:telemetry` | `Server ➔ Client` | `[{ id, route, lat, lng, speed, status }]`  | Periodic GPS fleet coordinate stream  |
| `dustbin:update`      | `Server ➔ Client` | `{ id, fillLevel, status, lastUpdated }`    | Ultrasonic sensor fill-level update   |
| `sos:trigger`         | `Client ➔ Server` | `{ studentId, location, timestamp, level }` | Critical safety emergency dispatch    |
| `attendance:new`      | `Server ➔ Client` | `{ id, studentId, studentName, timestamp }` | Real-time attendance ledger broadcast |

🔒 Security & Privacy Architecture

1.  Client-Side Edge AI Inference:
      - Facial landmark detection and recognition execute entirely within the
        client's browser using WebGL shaders.
      - Raw video frames are discarded immediately after processing;
        only 128-dimensional floating-point embeddings are utilized.
2.  Role-Based Access Control (RBAC):
      - Protected route guards (ProtectedRoute.jsx) restrict unauthorized access
        to administrative and campus security consoles.
3.  Atomic File Write Concurrency:
      - Data mutations using LowDB execute atomic writes to data.json,
        preventing data race conditions across concurrent API requests.

🚀 Production Build & Deployment

Build Frontend Bundle:

npm run build

Generates an optimized static distribution in dist/ ready for hosting on Vercel,
Cloudflare Pages, or AWS S3.

Production Process Management (PM2):

cd server
npm install -g pm2
pm2 start server.js --name "scas-api"

🤝 Contribution Guidelines

1.  Fork the repository.
2.  Create a Feature Branch:
    git checkout -b feat/telemetry-enhancement
3.  Commit Your Changes:
    git commit -m "feat: enhance live transit coordinate stream"
4.  Push to the Branch:
    git push origin feat/telemetry-enhancement
5.  Open a Pull Request describing your additions and testing steps.

📄 License

This project is licensed under the MIT License. See the LICENSE file for
details.

👨‍💻 Maintainer

Asish Ranjan Sahu
Lead Architect & Full Stack Developer

  - GitHub: @Asishranjansahu
  - Repository: SMART-CAMPUS-AUTOMATION-SYSTEM

