import express from 'express';
import cors from 'cors';
import http from 'node:http';
import jwt from 'jsonwebtoken';
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
  createBooking,
  loginUser,
  registerUser,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice
} from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// Debug: log all incoming requests
app.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} body:`, JSON.stringify(req.body));
  }
  next();
});

const JWT_SECRET = process.env.JWT_SECRET || 'smart-campus-jwt-secret-2024';
const JWT_EXPIRES_IN = '24h';

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', () => {});

// ─── JWT Auth Middleware ───
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

// Optional auth — attaches user if token present, but doesn't block
function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token) {
    try { req.user = jwt.verify(token, JWT_SECRET); } catch {}
  }
  next();
}

// ─── Auth Routes (public) ───
app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ error: 'Email, phone, or roll number and password required' });
  }
  const user = loginUser(identifier, password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials. Please check your email/phone/roll number and password.' });
  }
  // Generate JWT
  const token = jwt.sign(
    { id: user.id, rollNo: user.rollNo, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
  res.json({ user, token });
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, phone, rollNo, password, batch, year } = req.body;
  if (!name || !email || !phone || !rollNo || !password) {
    return res.status(400).json({ error: 'Name, email, phone, roll number, and password are required' });
  }
  const result = await registerUser({ name, email, phone, rollNo, password, batch, year });
  if (result.error) {
    return res.status(409).json({ error: result.error });
  }
  // Auto-login: generate token for newly registered user
  const token = jwt.sign(
    { id: result.id, rollNo: result.rollNo, role: result.role, name: result.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
  res.json({ user: result, token });
});

// Verify token endpoint
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// ─── Protected API Routes ───
// ─── Notices (admin can manage, all can view) ───
app.get('/api/notices', optionalAuth, (req, res) => {
  res.json(getNotices());
});

app.post('/api/notices', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'faculty') {
    return res.status(403).json({ error: 'Only admin/faculty can create notices' });
  }
  const { title, desc, category, date, file, isNew } = req.body;
  if (!title || !date) {
    return res.status(400).json({ error: 'Title and date are required' });
  }
  const notice = createNotice({ title, desc: desc || '', category: category || 'General', date, file: file || '', isNew: isNew || false });
  res.json({ notice });
});

app.put('/api/notices/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'faculty') {
    return res.status(403).json({ error: 'Only admin/faculty can edit notices' });
  }
  const notice = updateNotice(req.params.id, req.body);
  if (!notice) return res.status(404).json({ error: 'Notice not found' });
  res.json({ notice });
});

app.delete('/api/notices/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'faculty') {
    return res.status(403).json({ error: 'Only admin/faculty can delete notices' });
  }
  const ok = deleteNotice(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Notice not found' });
  res.json({ ok: true });
});

// ─── Events (admin can manage, all authenticated can view) ───
app.get('/api/events', optionalAuth, (req, res) => {
  res.json(getEvents());
});

app.post('/api/events', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'faculty') {
    return res.status(403).json({ error: 'Only admin/faculty can create events' });
  }
  const { title, desc, category, location, time, date, color } = req.body;
  if (!title || !date) {
    return res.status(400).json({ error: 'Title and date are required' });
  }
  const event = createEvent({ title, desc: desc || '', category: category || 'General', location: location || '', time: time || '', date, color: color || 'blue' });
  res.json({ event });
});

app.put('/api/events/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'faculty') {
    return res.status(403).json({ error: 'Only admin/faculty can edit events' });
  }
  const event = updateEvent(req.params.id, req.body);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json({ event });
});

app.delete('/api/events/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'faculty') {
    return res.status(403).json({ error: 'Only admin/faculty can delete events' });
  }
  const ok = deleteEvent(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Event not found' });
  res.json({ ok: true });
});

app.get('/api/students', authenticateToken, (req, res) => {
  res.json(getStudents());
});

app.get('/api/attendance/stats', authenticateToken, (req, res) => {
  res.json(getTodayAttendanceStats());
});

app.post('/api/attendance/:id', authenticateToken, (req, res) => {
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

app.get('/api/books', authenticateToken, (req, res) => {
  res.json(getBooks());
});

app.post('/api/books/:id/borrow', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  const ok = borrowBook(id);
  if (!ok) {
    res.status(400).json({ error: 'not available' });
    return;
  }
  io.emit('book_borrowed', { id });
  res.json({ ok: true });
});

app.get('/api/menu', authenticateToken, (req, res) => {
  res.json(getMenu());
});

app.get('/api/cafeteria/insights', authenticateToken, (req, res) => {
  const baseFootfall = 300;
  const variance = Math.floor(Math.random() * 50);
  const expectedFootfall = baseFootfall + variance;
  const recommendedPrep = Math.ceil(expectedFootfall * 1.1);

  const insights = {
    trends: [60, 80, 45, 90, 75, 50, 65].map(v => Math.min(100, Math.max(0, v + (Math.random() * 20 - 10)))),
    waste: {
      reduction: 12,
      saved: 85,
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

app.post('/api/orders', authenticateToken, (req, res) => {
  const { itemId } = req.body;
  if (!itemId) {
    res.status(400).json({ error: 'itemId required' });
    return;
  }
  const user = req.user.rollNo;
  createOrder({ itemId, user });
  io.emit('order_created', { itemId, user });
  res.json({ ok: true });
});

app.get('/api/orders', authenticateToken, (req, res) => {
  res.json(getOrdersForUser(req.user.rollNo));
});

app.get('/api/security/alerts', authenticateToken, (req, res) => {
  res.json(getAlerts());
});

app.post('/api/security/alerts', authenticateToken, (req, res) => {
  const { type, location, status } = req.body;
  addAlert({ type, location, status });
  const alert = { type, location, status: status || 'Active' };
  io.emit('security_alert', alert);
  res.json({ ok: true });
});

app.post('/api/security/emergency', authenticateToken, (req, res) => {
  addAlert({ type: 'Emergency', location: 'Campus', status: 'Active' });
  io.emit('security_alert', { type: 'Emergency', location: 'Campus', status: 'Active' });
  res.json({ ok: true });
});

app.get('/api/rooms', authenticateToken, (req, res) => {
  res.json(getRooms());
});

app.get('/api/bookings', authenticateToken, (req, res) => {
  res.json(getBookings());
});

app.post('/api/bookings', authenticateToken, (req, res) => {
  const { roomId, date, time } = req.body;
  if (!roomId || !date || !time) {
    res.status(400).json({ error: 'Missing fields' });
    return;
  }
  createBooking({ roomId, user: req.user.rollNo, date, time });
  io.emit('booking_created', { roomId, user: req.user.rollNo, date, time });
  res.json({ ok: true });
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});
