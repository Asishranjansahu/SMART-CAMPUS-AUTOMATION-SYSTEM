<div align="center">

# 🏛️ Smart Campus Automation System (SCAS)

### Next-Generation Distributed Campus Operations & Real-Time IoT Telemetry Platform

[![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-Passing-2ea44f?style=flat-square&logo=githubactions&logoColor=white)](https://github.com/Asishranjansahu/SMART-CAMPUS-AUTOMATION-SYSTEM)
[![React](https://img.shields.io/badge/React-v18.2.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-v4.4.5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v18.x_%7C_v20.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-v4.18.2-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Socket.io](https://img.shields.io/badge/Socket.IO-v4.7.2-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v3.3.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

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

**Smart Campus Automation System (SCAS)** is a centralized, high-concurrency operations management platform engineered for modern higher education institutions. It aggregates disparate institutional services—ranging from **edge biometric verification** and **IoT waste telemetry** to **live geospatial fleet tracking** and **emergency critical incident dispatch**—into an event-driven, single-pane-of-glass architecture.

### Key Architectural Highlights
- **Privacy-First Edge Biometrics:** Client-side neural inferencing via WebGL eliminates server-side raw facial image storage.
- **Bi-Directional Event Mesh:** Real-time push updates via WebSockets (Socket.IO) for live IoT telemetry and fleet tracking.
- **Micro-Modular Domain Design:** Clean separation of concerns across authentication, spatial mapping, resource allocation, and facility services.
- **Lightweight State & Persistence:** Zero-overhead atomic JSON document store backed by LowDB with zero database setup requirement for rapid staging.

---

## 🏗️ System Architecture

```mermaid
flowchart TB
    subgraph ClientLayer ["Client Layer (React 18 Single-Page Application)"]
        UI["Tailwind CSS + Radix UI Engine"]
        Router["React Router DOM (Protected Routes)"]
        EdgeAI["@vladmandic/face-api (Client-side WebGL Tensor Inference)"]
        GeoEngine["Leaflet Geospatial Map Renderer"]
        Charts["Recharts Telemetry Dashboard"]
        SocketClient["Socket.IO Client (Reactive State Listeners)"]
    end

    subgraph TransportLayer ["Network & Ingestion Layer"]
        HTTP["RESTful HTTP/HTTPS Endpoints"]
        WS["Full-Duplex WebSocket Channels"]
    end

    subgraph ServiceLayer ["Backend Core (Express.js Monolith)"]
        AuthMid["RBAC & Session Middleware"]
        EventBus["Socket.IO Event Dispatcher"]
        
        subgraph Subsystems ["Core Service Controllers"]
            AttendanceCtrl["Attendance & Identity Controller"]
            TransitCtrl["Transit & Telemetry Controller"]
            FacilityCtrl["Facility & Resource Allocation"]
            SafetyCtrl["Emergency SOS & Anti-Ragging Dispatch"]
            ServicesCtrl["Auxiliary Services (Library / Cafeteria / Notice)"]
        end
    end

    subgraph PersistenceLayer ["Persistence & File Storage"]
        LowDB[("LowDB Typed JSON Store")]
        ModelStore[("Local Model Shards /public/models/")]
    end

    %% Flow Connections
    ClientLayer -->|REST Mutations / Queries| HTTP
    SocketClient <-->|Bi-Directional Events| WS
    EdgeAI -.->|Loads Weights On-Demand| ModelStore

    HTTP --> AuthMid
    AuthMid --> Subsystems
    WS <--> EventBus
    EventBus <--> Subsystems

    Subsystems --> LowDB
