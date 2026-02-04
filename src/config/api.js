// Central place to configure the backend API base URL.
//
// Works for:
// 1) Local dev: defaults to http://localhost:3001
// 2) Hosted frontend + hosted backend: set VITE_API_BASE_URL in your frontend env
// 3) Same-origin deployments (frontend served by backend): set VITE_API_BASE_URL="" and proxy /api

export function getApiBaseUrl() {
  const envUrl = import.meta.env?.VITE_API_BASE_URL;

  // If explicitly provided (e.g. https://your-backend.onrender.com)
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.replace(/\/$/, '');
  }

  // If running in the browser and backend is behind same origin, you can rely on relative /api paths.
  // Otherwise, fall back to localhost for local development.
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (isLocalhost) return 'http://localhost:3001';

  // Production fallback (so auth won't break if the Vercel env var isn't set).
  // You can still override this by setting VITE_API_BASE_URL on Vercel.
  return 'https://quiz-backend-oy5t.onrender.com';
}
