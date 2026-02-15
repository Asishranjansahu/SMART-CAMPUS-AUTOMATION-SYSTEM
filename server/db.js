import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'node:path';
import { nanoid } from 'nanoid';

const adapter = new JSONFile(path.join(process.cwd(), 'server', 'data.json'));
const db = new Low(adapter, {
  students: [],
  attendance: [],
  books: [],
  menu_items: [],
  orders: [],
  security_alerts: []
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
  await write();
};
await seedIfEmpty();

export const getStudents = () => db.data.students;
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
