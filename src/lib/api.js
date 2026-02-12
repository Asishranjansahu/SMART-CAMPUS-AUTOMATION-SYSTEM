const BASE = 'http://localhost:4000/api';

export const getStudents = async () => {
  const r = await fetch(`${BASE}/students`);
  return r.json();
};
export const getAttendanceStats = async () => {
  const r = await fetch(`${BASE}/attendance/stats`);
  return r.json();
};
export const markAttendance = async (id, status) => {
  const r = await fetch(`${BASE}/attendance/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  return r.json();
};
export const getBooks = async () => {
  const r = await fetch(`${BASE}/books`);
  return r.json();
};
export const borrowBook = async (id) => {
  const r = await fetch(`${BASE}/books/${id}/borrow`, { method: 'POST' });
  return r.json();
};
export const getMenu = async () => {
  const r = await fetch(`${BASE}/menu`);
  return r.json();
};
export const getCafeteriaInsights = async () => {
  const r = await fetch(`${BASE}/cafeteria/insights`);
  return r.json();
};
export const createOrder = async (itemId, user) => {
  const r = await fetch(`${BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ itemId, user })
  });
  return r.json();
};
export const getOrders = async (user) => {
  const r = await fetch(`${BASE}/orders?user=${encodeURIComponent(user || 'guest')}`);
  return r.json();
};
export const getAlerts = async () => {
  const r = await fetch(`${BASE}/security/alerts`);
  return r.json();
};
export const sendEmergency = async () => {
  const r = await fetch(`${BASE}/security/emergency`, { method: 'POST' });
  return r.json();
};
export const getRooms = async () => {
  const r = await fetch(`${BASE}/rooms`);
  return r.json();
};
export const getBookings = async () => {
  const r = await fetch(`${BASE}/bookings`);
  return r.json();
};
export const createBooking = async ({ roomId, user, date, time }) => {
  const r = await fetch(`${BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roomId, user, date, time })
  });
  return r.json();
};
