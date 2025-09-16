import { CONFIG } from "../app/config";

async function http(method, path, body) {
  const res = await fetch(`${CONFIG.apiBaseUrl}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`[${res.status}] ${text || "HTTP error"}`);
  }
  return res.status === 204 ? null : res.json();
}

export const httpClient = {
  get: (path) => http("GET", path),
  post: (path, body) => http("POST", path, body),
  del: (path) => http("DELETE", path),
};
