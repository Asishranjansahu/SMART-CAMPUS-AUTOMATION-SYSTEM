import express from 'express';
import cors from 'cors';
import http from 'node:http';
import { Server } from 'socket.io';
import {
  getStudents,
  getTodayAttendanceStats,
  setAttendance,
  getBooks,
  borrowBook,
  getMenu,
  createOrder,
  getOrdersForUser,
  getAlerts,
  addAlert,
  getRooms,
  getBookings,
  createBooking
} from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', () => {});

app.get('/api/students', (req, res) => {
  res.json(getStudents());
});

app.get('/api/attendance/stats', (req, res) => {
  res.json(getTodayAttendanceStats());
});

app.post('/api/attendance/:id', (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;
  if (!['present', 'absent'].includes(status)) {
    res.status(400).json({ error: 'invalid status' });
    return;
  }
  setAttendance(id, status);
  io.emit('attendance_updated', { id, status });
  res.json({ ok: true });
});

app.get('/api/books', (req, res) => {
  res.json(getBooks());
});

app.post('/api/books/:id/borrow', (req, res) => {
  const id = Number(req.params.id);
  const ok = borrowBook(id);
  if (!ok) {
    res.status(400).json({ error: 'not available' });
    return;
  }
  io.emit('book_borrowed', { id });
  res.json({ ok: true });
});

app.get('/api/menu', (req, res) => {
  res.json(getMenu());
});

app.get('/api/cafeteria/insights', (req, res) => {
  // Mock AI Prediction Logic
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];
  
  // Randomize slightly for "live" feel
  const baseFootfall = 300;
  const variance = Math.floor(Math.random() * 50);
  const expectedFootfall = baseFootfall + variance;
  const recommendedPrep = Math.ceil(expectedFootfall * 1.1); // 10% buffer
  
  const insights = {
    trends: [60, 80, 45, 90, 75, 50, 65].map(v => Math.min(100, Math.max(0, v + (Math.random() * 20 - 10)))), // Add noise
    waste: {
      reduction: 12, // %
      saved: 85, // kg
      message: "Based on yesterday's leftovers, we suggest reducing rice preparation by 5kg today."
    },
    prediction: {
      nextMeal: "Lunch",
      expectedFootfall,
      recommendedPrep,
      confidence: 85 + Math.floor(Math.random() * 10),
      popularItem: "Veg Thali Deluxe"
    }
  };
  
  res.json(insights);
});

app.post('/api/orders', (req, res) => {
  const { itemId, user } = req.body;
  if (!itemId) {
    res.status(400).json({ error: 'itemId required' });
    return;
  }
  createOrder({ itemId, user });
  io.emit('order_created', { itemId, user: user || 'guest' });
  res.json({ ok: true });
});

app.get('/api/orders', (req, res) => {
  const user = req.query.user || 'guest';
  res.json(getOrdersForUser(user));
});

app.get('/api/security/alerts', (req, res) => {
  res.json(getAlerts());
});

app.post('/api/security/alerts', (req, res) => {
  const { type, location, status } = req.body;
  addAlert({ type, location, status });
  const alert = { type, location, status: status || 'Active' };
  io.emit('security_alert', alert);
  res.json({ ok: true });
});

app.post('/api/security/emergency', (req, res) => {
  addAlert({ type: 'Emergency', location: 'Campus', status: 'Active' });
  io.emit('security_alert', { type: 'Emergency', location: 'Campus', status: 'Active' });
  res.json({ ok: true });
});

app.get('/api/rooms', (req, res) => {
  res.json(getRooms());
});

app.get('/api/bookings', (req, res) => {
  res.json(getBookings());
});

app.post('/api/bookings', (req, res) => {
  const { roomId, user, date, time } = req.body;
  if (!roomId || !date || !time) {
    res.status(400).json({ error: 'Missing fields' });
    return;
  }
  createBooking({ roomId, user: user || 'guest', date, time });
  io.emit('booking_created', { roomId, user, date, time });
  res.json({ ok: true });
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});
