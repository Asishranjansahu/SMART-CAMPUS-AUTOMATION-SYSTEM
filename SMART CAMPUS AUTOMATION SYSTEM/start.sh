#!/bin/bash
echo "🚀 Starting Smart Campus Automation System..."

# Start backend server
echo "📡 Starting backend on port 4000..."
cd server && node server.js &
SERVER_PID=$!
cd ..

# Wait for server to be ready
sleep 2

# Verify server is up
if curl -s http://localhost:4000/api/notices > /dev/null 2>&1; then
  echo "✅ Backend running at http://localhost:4000"
else
  echo "❌ Backend failed to start!"
  exit 1
fi

# Start frontend dev server
echo "🌐 Starting frontend on port 5173..."
npx vite &
FRONTEND_PID=$!

sleep 3
echo ""
echo "✅ Both servers are running!"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:4000"
echo ""
echo "🔑 Demo Login Credentials:"
echo "   Admin:    admin / admin"
echo "   Student:  21CS001 / student"
echo "   Faculty:  FAC001 / faculty"
echo ""
echo "Press Ctrl+C to stop both servers."
trap "kill $SERVER_PID $FRONTEND_PID 2>/dev/null; exit" SIGINT SIGTERM
wait
