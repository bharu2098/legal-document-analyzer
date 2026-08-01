const BASE_URL = "https://shimmering-sparkle-production-88ac.up.railway.app";

// =======================
// Handle API Response
// =======================
async function handleResponse(response) {
  let data = {};

  try {
    data = await response.json();
  } catch (error) {
    data = {};
  }

  if (!response.ok) {
    let message = "Something went wrong.";

    if (typeof data.detail === "string") {
      message = data.detail;
    } else if (Array.isArray(data.detail)) {
      message = data.detail
        .map((err) => err.msg)
        .join(", ");
    } else if (data.message) {
      message = data.message;
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

  localStorage.setItem("token", data.access_token);

  return data;
}

// =======================
// GET TOKEN
// =======================
export function getToken() {
  return localStorage.getItem("token");
}

// =======================
// AUTH HEADERS
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
// CHECK LOGIN
// =======================
export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

// =======================
// EXPORT BASE URL
// =======================
export { BASE_URL };