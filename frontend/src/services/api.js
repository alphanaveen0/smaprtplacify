const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export function getToken() {
  return localStorage.getItem("smartplacify_token");
}

export function setSession(session) {
  localStorage.setItem("smartplacify_token", session.token);
  localStorage.setItem("smartplacify_user", JSON.stringify(session.user));
}

export function clearSession() {
  localStorage.removeItem("smartplacify_token");
  localStorage.removeItem("smartplacify_user");
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("smartplacify_user") || "null");
  } catch (_error) {
    return null;
  }
}

export async function api(path, options = {}) {
  const token = getToken();
  const headers = new Headers(options.headers || {});

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    body: options.body instanceof FormData ? options.body : options.body ? JSON.stringify(options.body) : undefined
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to connect to server");
  }

  return data;
}
