import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'node:path';
import { nanoid } from 'nanoid';
import crypto from 'node:crypto';

const hashPassword = (pw) => crypto.createHash('sha256').update(pw).digest('hex');  const adapter = new JSONFile(path.join(process.cwd(), 'data.json'));
const db = new Low(adapter, {
  users: [],
  events: [],
  notices: [],
  students: [],
  attendance: [],
  books: [],
  menu_items: [],
  orders: [],
  security_alerts: [],
  rooms: [],
  bookings: []
});
await db.read();
const write = async () => { await db.write(); };

const seedIfEmpty = async () => {
  if (!db.data.students.length) {
    db.data.students = [
      { id: 1, name: 'Asish Kumar Sahani' },
      { id: 2, name: 'Sibani Swain' },
      { id: 3, name: 'Renuka Swain' },
      { id: 4, name: 'Asish Ranjan Sahu' },
      { id: 5, name: 'Ankita Mahapatra' }
    ];
    const today = new Date().toISOString().slice(0, 10);
    db.data.attendance = [
      { id: nanoid(), student_id: 1, date: today, status: 'present' },
      { id: nanoid(), student_id: 2, date: today, status: 'absent' },
      { id: nanoid(), student_id: 3, date: today, status: 'present' },
      { id: nanoid(), student_id: 4, date: today, status: 'present' },
      { id: nanoid(), student_id: 5, date: today, status: 'absent' }
    ];
  }
  if (!db.data.books.length) {
    db.data.books = [
      { id: 1, title: 'Introduction to Computer Science', author: 'John Smith', status: 'available' },
      { id: 2, title: 'Advanced Mathematics', author: 'Sarah Johnson', status: 'borrowed' },
      { id: 3, title: 'Modern Physics', author: 'Michael Brown', status: 'available' }
    ];
  }
  if (!db.data.menu_items.length) {
    db.data.menu_items = [
      { id: 1, name: 'Breakfast Combo', price: 50, description: 'Eggs, toast, and coffee', category: 'Breakfast' },
      { id: 2, name: 'Chicken Sandwich', price: 70, description: 'Grilled chicken with fresh veggies', category: 'Lunch' },
      { id: 3, name: 'Vegetarian Pizza', price: 100, description: 'Fresh vegetables and cheese', category: 'Lunch' }
    ];
  }
  if (!db.data.security_alerts.length) {
    db.data.security_alerts = [
      { id: nanoid(), type: 'Gate Access', location: 'Main Gate', time: '10:30 AM', status: 'Resolved' },
      { id: nanoid(), type: 'Motion Detected', location: 'Library', time: '11:45 AM', status: 'Active' }
    ];
  }
  if (!db.data.users) db.data.users = [];
  if (!db.data.events) db.data.events = [];
  if (!db.data.notices) db.data.notices = [];
  if (!db.data.rooms) db.data.rooms = [];
  if (!db.data.bookings) db.data.bookings = [];

  // Seed events if empty
  if (!db.data.events.length) {
    db.data.events = [
      { id: nanoid(), title: 'TechFest 2026 — Annual Technical Symposium', desc: 'Three-day technical festival featuring coding competitions, robotics, hackathon, and guest lectures from industry leaders.', category: 'Technical', location: 'Main Auditorium', time: '10:00 AM', date: '2026-08-28', color: 'blue', createdAt: new Date().toISOString() },
      { id: nanoid(), title: 'Campus Recruitment Drive — TCS & Infosys', desc: 'Joint campus placement drive for final year B.Tech students. Pre-placement talk followed by written test and interviews.', category: 'Placement', location: 'Seminar Hall', time: '9:00 AM', date: '2026-09-05', color: 'emerald', createdAt: new Date().toISOString() },
      { id: nanoid(), title: 'Workshop on AI & Machine Learning', desc: 'Hands-on workshop covering Python, TensorFlow, and real-world ML applications. Certificates provided for all participants.', category: 'Workshop', location: 'Computer Lab 3', time: '2:00 PM', date: '2026-09-12', color: 'purple', createdAt: new Date().toISOString() },
      { id: nanoid(), title: 'Annual Sports Meet — VITAM Olympics', desc: 'Inter-department sports competition featuring cricket, football, badminton, athletics, and more. Cash prizes worth ₹50,000.', category: 'Sports', location: 'Sports Ground', time: '7:00 AM', date: '2026-09-20', color: 'amber', createdAt: new Date().toISOString() },
    ];
  }

  // Seed notices if empty
  if (!db.data.notices.length) {
    db.data.notices = [
      { id: nanoid(), title: 'Notice Details — Exam Schedule & Guidelines', desc: 'Detailed examination schedule, guidelines for students, and internal assessment criteria for the odd semester 2026-27.', category: 'Examination', date: '2026-08-15', isNew: true, file: '/Notice Details.pdf', createdAt: new Date().toISOString() },
      { id: nanoid(), title: 'Revised Academic Calendar — Odd Semester 2026', desc: 'Updated academic calendar with mid-term holidays, internal exam dates, and semester end examination schedule.', category: 'Academic', date: '2026-08-10', isNew: true, file: '/Notice Details.pdf', createdAt: new Date().toISOString() },
      { id: nanoid(), title: 'Campus Placement Drive — TCS, Infosys, Wipro', desc: 'Eligibility criteria, registration process, and preparation guidelines for the upcoming joint campus placement drive.', category: 'Placement', date: '2026-08-05', isNew: false, file: '/Notice Details.pdf', createdAt: new Date().toISOString() },
      { id: nanoid(), title: 'Anti-Ragging Committee — Zero Tolerance Policy', desc: 'Mandatory anti-ragging affidavit submission for all new admissions. Helpline numbers and reporting procedures.', category: 'General', date: '2026-07-28', isNew: false, file: '/Notice Details.pdf', createdAt: new Date().toISOString() },
      { id: nanoid(), title: 'TechFest 2026 — Registration Open', desc: 'Annual technical festival registrations are now open. Teams can register for hackathon, robotics, and coding events.', category: 'Events', date: '2026-07-20', isNew: false, file: '/Notice Details.pdf', createdAt: new Date().toISOString() },
      { id: nanoid(), title: 'Library Timing Extension During Exams', desc: 'Central library will remain open until 10 PM during the examination period. Additional study rooms available.', category: 'Academic', date: '2026-07-15', isNew: false, file: '/Notice Details.pdf', createdAt: new Date().toISOString() },
    ];
  }

  // Seed users if empty
  if (!db.data.users.length) {
    db.data.users = [
      { id: nanoid(), rollNo: 'admin', name: 'Admin User', email: 'admin@vignan.edu.in', phone: '9000000000', password: hashPassword('admin'), batch: '2024', year: '4th', role: 'admin', createdAt: new Date().toISOString() },
      { id: nanoid(), rollNo: '21CS001', name: 'Asish Ranjan Sahu', email: 'asish@vignan.edu.in', phone: '9111111111', password: hashPassword('student'), batch: '2021', year: '4th', role: 'student', createdAt: new Date().toISOString() },
      { id: nanoid(), rollNo: 'FAC001', name: 'Dr. Renuka Swain', email: 'renuka@vignan.edu.in', phone: '9222222222', password: hashPassword('faculty'), batch: '', year: '', role: 'faculty', createdAt: new Date().toISOString() },
    ];
  }
  
  if (!db.data.rooms.length) {
    db.data.rooms = [
      { id: 1, name: 'Conference Hall A', capacity: 100, features: 'Projector, Sound System' },
      { id: 2, name: 'Seminar Room', capacity: 30, features: 'Whiteboard, TV' },
      { id: 3, name: 'Computer Lab 1', capacity: 50, features: '50 PCs, Internet' },
      { id: 4, name: 'Meeting Room', capacity: 10, features: 'Round Table' }
    ];
  }
  await write();
};
await seedIfEmpty();

export const getStudents = () => {
  const today = new Date().toISOString().slice(0, 10);
  return db.data.students.map(student => {
    const record = db.data.attendance.find(a => a.student_id === student.id && a.date === today);
    return { ...student, status: record ? record.status : 'present' };
  });
};
export const getTodayAttendanceStats = () => {
  const today = new Date().toISOString().slice(0, 10);
  const rows = db.data.attendance.filter(a => a.date === today);
  const present = rows.filter(r => r.status === 'present').length;
  const absent = rows.filter(r => r.status === 'absent').length;
  return { present, absent };
};
export const setAttendance = async (id, status) => {
  const today = new Date().toISOString().slice(0, 10);
  const existing = db.data.attendance.find(a => a.student_id === id && a.date === today);
  if (existing) {
    existing.status = status;
  } else {
    db.data.attendance.push({ id: nanoid(), student_id: id, date: today, status });
  }
  await write();
};
export const getBooks = () => db.data.books;
export const borrowBook = async (id) => {
  const book = db.data.books.find(b => b.id === id);
  if (!book) return false;
  if (book.status !== 'available') return false;
  book.status = 'borrowed';
  await write();
  return true;
};
export const getMenu = () => db.data.menu_items;
export const createOrder = async ({ itemId, user }) => {
  const time = new Date().toLocaleTimeString();
  db.data.orders.push({ id: nanoid(), item_id: itemId, user: user || 'guest', time, status: 'Placed' });
  await write();
};
export const getOrdersForUser = (user) => db.data.orders.filter(o => o.user === user).sort((a, b) => b.id.localeCompare(a.id));
export const getAlerts = () => db.data.security_alerts.slice().reverse();
export const addAlert = async ({ type, location, status }) => {
  const time = new Date().toLocaleTimeString();
  db.data.security_alerts.push({ id: nanoid(), type, location, time, status: status || 'Active' });
  await write();
};
export const getRooms = () => db.data.rooms;
export const getBookings = () => db.data.bookings;
export const createBooking = async ({ roomId, user, date, time }) => {
  db.data.bookings.push({ id: nanoid(), roomId, user, date, time });
  await write();
};

// ─── Events ───
export const getEvents = () => db.data.events.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
export const createEvent = async (event) => {
  const newEvent = { id: nanoid(), ...event, createdAt: new Date().toISOString() };
  db.data.events.push(newEvent);
  await write();
  return newEvent;
};
export const updateEvent = async (id, updates) => {
  const event = db.data.events.find(e => e.id === id);
  if (!event) return null;
  Object.assign(event, updates);
  await write();
  return event;
};
export const deleteEvent = async (id) => {
  const idx = db.data.events.findIndex(e => e.id === id);
  if (idx === -1) return false;
  db.data.events.splice(idx, 1);
  await write();
  return true;
};

// ─── Notices ───
export const getNotices = () => db.data.notices.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
export const createNotice = async (notice) => {
  const newNotice = { id: nanoid(), ...notice, createdAt: new Date().toISOString() };
  db.data.notices.push(newNotice);
  await write();
  return newNotice;
};
export const updateNotice = async (id, updates) => {
  const notice = db.data.notices.find(n => n.id === id);
  if (!notice) return null;
  Object.assign(notice, updates);
  await write();
  return notice;
};
export const deleteNotice = async (id) => {
  const idx = db.data.notices.findIndex(n => n.id === id);
  if (idx === -1) return false;
  db.data.notices.splice(idx, 1);
  await write();
  return true;
};

// ─── Auth ───
export const findUserByEmail = (email) => {
  return db.data.users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
};

export const findUserByPhone = (phone) => {
  return db.data.users.find(u => u.phone === phone);
};

export const findUserByRollNo = (rollNo) => {
  return db.data.users.find(u => u.rollNo.toLowerCase() === rollNo.toLowerCase());
};

export const loginUser = (identifier, password) => {
  // identifier can be email, phone, or roll number
  let user = findUserByEmail(identifier);
  if (!user) user = findUserByPhone(identifier);
  if (!user) user = findUserByRollNo(identifier);
  if (!user) return null;
  if (user.password !== hashPassword(password)) return null;
  const { password: _, ...safe } = user;
  return safe;
};

export const registerUser = async ({ name, email, phone, rollNo, password, batch, year }) => {
  if (findUserByEmail(email)) return { error: 'Email already registered' };
  if (findUserByPhone(phone)) return { error: 'Phone number already registered' };
  if (findUserByRollNo(rollNo)) return { error: 'Roll number already registered' };
  const role = rollNo.toUpperCase().startsWith('FAC') ? 'faculty' : 'student';
  const user = {
    id: nanoid(),
    name,
    email,
    phone,
    rollNo,
    password: hashPassword(password),
    batch: batch || '',
    year: year || '',
    role,
    createdAt: new Date().toISOString(),
  };
  db.data.users.push(user);
  await write();
  const { password: _, ...safe } = user;
  return safe;
};
