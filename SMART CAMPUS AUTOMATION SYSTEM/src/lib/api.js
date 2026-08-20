const BASE = 'http://localhost:4000/api';

// ─── Token helpers ───
function getToken() {
  return localStorage.getItem('jwt_token');
}

function authHeaders(extra = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...extra };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

// Auto-handle 401: clear auth and redirect to login
// Skip intercepting auth endpoints (login/register) so they can return proper errors
async function apiFetch(url, options = {}) {
  const isAuthEndpoint = url.includes('/api/auth/login') || url.includes('/api/auth/register');
  const r = await fetch(url, options);
  if (r.status === 401 && !isAuthEndpoint) {
    // Token expired or invalid — clear auth state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRollNo');
    localStorage.removeItem('jwt_token');
    throw new Error('Session expired. Please log in again.');
  }
  return r;
}

// ─── Auth ───
export const loginUser = async (identifier, password) => {
  const r = await apiFetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password })
  });
  if (!r.ok) {
    const data = await r.json().catch(() => ({}));
    throw new Error(data.error || 'Login failed');
  }
  return r.json();
};

export const registerUser = async ({ name, email, phone, rollNo, password, batch, year }) => {
  const r = await apiFetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, rollNo, password, batch, year })
  });
  if (!r.ok) {
    const data = await r.json().catch(() => ({}));
    throw new Error(data.error || 'Registration failed');
  }
  return r.json();
};

export const verifyToken = async () => {
  const r = await apiFetch(`${BASE}/auth/me`, { headers: authHeaders() });
  if (!r.ok) throw new Error('Token invalid');
  return r.json();
};

// ─── Events ───
export const getEvents = async () => {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const r = await fetch(`${BASE}/events`, { headers });
  return r.json();
};

export const createEvent = async (event) => {
  const r = await apiFetch(`${BASE}/events`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(event)
  });
  if (!r.ok) {
    const data = await r.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to create event');
  }
  return r.json();
};

export const updateEvent = async (id, updates) => {
  const r = await apiFetch(`${BASE}/events/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(updates)
  });
  if (!r.ok) {
    const data = await r.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to update event');
  }
  return r.json();
};

export const deleteEvent = async (id) => {
  const r = await apiFetch(`${BASE}/events/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  if (!r.ok) {
    const data = await r.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to delete event');
  }
  return r.json();
};

// ─── Notices ───
export const getNotices = async () => {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const r = await fetch(`${BASE}/notices`, { headers });
  return r.json();
};

export const createNotice = async (notice) => {
  const r = await apiFetch(`${BASE}/notices`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(notice)
  });
  if (!r.ok) { const d = await r.json().catch(() => ({})); throw new Error(d.error || 'Failed'); }
  return r.json();
};

export const updateNotice = async (id, updates) => {
  const r = await apiFetch(`${BASE}/notices/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(updates)
  });
  if (!r.ok) { const d = await r.json().catch(() => ({})); throw new Error(d.error || 'Failed'); }
  return r.json();
};

export const deleteNotice = async (id) => {
  const r = await apiFetch(`${BASE}/notices/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  if (!r.ok) { const d = await r.json().catch(() => ({})); throw new Error(d.error || 'Failed'); }
  return r.json();
};

// ─── Students ───
export const getStudents = async () => {
  const r = await apiFetch(`${BASE}/students`, { headers: authHeaders() });
  return r.json();
};

export const getAttendanceStats = async () => {
  const r = await apiFetch(`${BASE}/attendance/stats`, { headers: authHeaders() });
  return r.json();
};

export const markAttendance = async (id, status) => {
  const r = await apiFetch(`${BASE}/attendance/${id}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ status })
  });
  return r.json();
};

// ─── Books ───
export const getBooks = async () => {
  const r = await apiFetch(`${BASE}/books`, { headers: authHeaders() });
  return r.json();
};

export const borrowBook = async (id) => {
  const r = await apiFetch(`${BASE}/books/${id}/borrow`, {
    method: 'POST',
    headers: authHeaders()
  });
  return r.json();
};

// ─── Cafeteria ───
export const getMenu = async () => {
  const r = await apiFetch(`${BASE}/menu`, { headers: authHeaders() });
  return r.json();
};

export const getCafeteriaInsights = async () => {
  const r = await apiFetch(`${BASE}/cafeteria/insights`, { headers: authHeaders() });
  return r.json();
};

export const createOrder = async (itemId) => {
  const r = await apiFetch(`${BASE}/orders`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ itemId })
  });
  return r.json();
};

export const getOrders = async () => {
  const r = await apiFetch(`${BASE}/orders`, { headers: authHeaders() });
  return r.json();
};

// ─── Security ───
export const getAlerts = async () => {
  const r = await apiFetch(`${BASE}/security/alerts`, { headers: authHeaders() });
  return r.json();
};

export const sendEmergency = async () => {
  const r = await apiFetch(`${BASE}/security/emergency`, {
    method: 'POST',
    headers: authHeaders()
  });
  return r.json();
};

// ─── Rooms ───
export const getRooms = async () => {
  const r = await apiFetch(`${BASE}/rooms`, { headers: authHeaders() });
  return r.json();
};

export const getBookings = async () => {
  const r = await apiFetch(`${BASE}/bookings`, { headers: authHeaders() });
  return r.json();
};

export const createBooking = async ({ roomId, date, time }) => {
  const r = await apiFetch(`${BASE}/bookings`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ roomId, date, time })
  });
  return r.json();
};
