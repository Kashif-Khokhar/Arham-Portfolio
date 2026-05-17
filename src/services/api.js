const API_BASE = '/api';

export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(API_BASE + endpoint, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'API error');
  return data;
}
