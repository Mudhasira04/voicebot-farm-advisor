export interface ScanEntry {
  date: string;
  crop: string;
  confidence: number;
  N: number;
  P: number;
  K: number;
}

export interface User {
  name: string;
  email: string;
  state: string;
}

export function getHistory(): ScanEntry[] {
  try {
    return JSON.parse(localStorage.getItem('vb_history') || '[]');
  } catch { return []; }
}

export function addHistory(entry: ScanEntry) {
  const h = getHistory();
  h.unshift(entry);
  localStorage.setItem('vb_history', JSON.stringify(h));
}

export function getToken() { return localStorage.getItem('vb_token'); }
export function setToken(t: string) { localStorage.setItem('vb_token', t); }
export function getUser(): User | null {
  try { return JSON.parse(localStorage.getItem('vb_user') || 'null'); } catch { return null; }
}
export function setUser(u: User) { localStorage.setItem('vb_user', JSON.stringify(u)); }

export function logout() {
  localStorage.removeItem('vb_token');
  localStorage.removeItem('vb_history');
  localStorage.removeItem('vb_user');
}
