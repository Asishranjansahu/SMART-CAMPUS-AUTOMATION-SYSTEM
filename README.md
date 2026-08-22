# Smart Campus Automation System

A full-stack web application for streamlining academic and operational workflows across a campus environment.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-38B2AC?logo=tailwind-css)
![Express](https://img.shields.io/badge/Express-4.18.2-000000?logo=express)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7.2-010101?logo=socket.io)

## Overview

Smart Campus Automation System provides a centralized digital platform for students, faculty, and administrators to manage key campus services, including attendance, library operations, transport, room bookings, announcements, and safety workflows.

## Core Capabilities

### Student Services
- Attendance tracking with reporting
- Library catalog and issue/return workflows
- Cafeteria menu, ordering, and payment workflows
- Classroom and facility booking

### Campus Operations
- Transport monitoring and schedule management
- Security and premises monitoring
- Smart dustbin status tracking
- Maintenance visibility for campus facilities

### Communication and Engagement
- Events calendar and notifications
- Digital notice board for announcements
- Placement portal for opportunities
- Lost and found management

### Safety and Assistance
- Anti-ragging support and reporting
- Interactive campus navigation (Leaflet)
- Voice-enabled assistant workflows

### Analytics
- Operational dashboards and KPIs
- Data visualizations using Recharts
- Face-recognition-based attendance support

## Technology Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Radix UI
- Framer Motion
- React Router DOM
- Recharts
- Leaflet
- Socket.IO Client

### Backend
- Node.js
- Express
- LowDB
- Socket.IO
- CORS

## Getting Started

### Prerequisites
- Node.js 16+
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Asishranjansahu/SMART-CAMPUS-AUTOMATION-SYSTEM.git
   cd SMART-CAMPUS-AUTOMATION-SYSTEM
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd server
   npm install
   cd ..
   ```

## Run Locally

1. Start the backend server:
   ```bash
   cd server
   npm start
   ```
   Backend runs at `http://localhost:3000`

2. Start the frontend in a new terminal:
   ```bash
   npm run dev
   ```
   Frontend runs at `http://localhost:5173`

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```text
SMART-CAMPUS-AUTOMATION-SYSTEM/
├── public/                  # Static assets
├── server/                  # Backend (Express + LowDB)
│   ├── server.js
│   ├── db.js
│   └── data.json
├── src/                     # Frontend source (React)
│   ├── components/
│   ├── lib/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

For full details, see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

## Security Considerations

- Route-level authentication controls
- Role-specific operational workflows
- Sensitive workflows (attendance/safety) isolated by module boundaries

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "feat: describe your change"`)
4. Push the branch
5. Open a pull request

## License

This project is distributed under the [MIT License](LICENSE).

## Authors

- Asish Ranjan Sahu
- Renuka Swain

## Support

For support, open an issue in this repository.
