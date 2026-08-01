const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";

// =======================
// Handle API Errors
// =======================
async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    let message = "Something went wrong.";

    if (typeof data.detail === "string") {
      message = data.detail;
    } else if (Array.isArray(data.detail)) {
      message = data.detail
        .map((err) => err.msg)
        .join(", ");
    }

    throw new Error(message);
  }

  return data;
}

// =======================
// REGISTER
// =======================
export async function registerUser(userData) {
  const response = await fetch(
    `${BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  return await handleResponse(response);
}

// =======================
// LOGIN
// =======================
export async function loginUser(userData) {
  const response = await fetch(
    `${BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  const data = await handleResponse(response);

  localStorage.setItem(
    "token",
    data.access_token
  );

  return data;
}

// =======================
// TOKEN
// =======================
export function getToken() {
  return localStorage.getItem("token");
}

// =======================
// AUTH HEADER
// =======================
export function getAuthHeaders() {
  return {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
}

// =======================
// LOGOUT
// =======================
export function logoutUser() {
  localStorage.removeItem("token");
}

// =======================
// API URL
// =======================
export { BASE_URL };