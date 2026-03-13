const API_BASE = 'http://localhost:5000';

function getToken(): string | null {
  return localStorage.getItem('vb_token');
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export async function apiLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
  return res.json();
}

export async function apiRegister(name: string, email: string, password: string, state: string, acres: number) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, state, acres }),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Registration failed');
  return res.json();
}

export async function apiPredict(data: { N: number; P: number; K: number; pH: number; temperature: number; humidity: number; rainfall: number }) {
  const res = await fetch(`${API_BASE}/api/predict`, {
    method: 'POST', headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Prediction failed');
  return res.json();
}

export async function apiFertilizer(data: { N: number; P: number; K: number; crop: string }) {
  const res = await fetch(`${API_BASE}/api/fertilizer`, {
    method: 'POST', headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Fertilizer request failed');
  return res.json();
}

export async function apiWeather(city: string) {
  const res = await fetch(`${API_BASE}/api/weather?city=${encodeURIComponent(city)}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Weather request failed');
  return res.json();
}
