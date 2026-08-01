const BASE_URL =
  "https://legal-document-analyzer-production-bf96.up.railway.app";

// =======================
// REGISTER
// =======================
export async function registerUser(userData) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    let message = "Registration failed";

    if (typeof data.detail === "string") {
      message = data.detail;
    } else if (Array.isArray(data.detail)) {
      message = data.detail.map((err) => err.msg).join(", ");
    }

    throw new Error(message);
  }

  return data;
}

// =======================
// LOGIN
// =======================
export async function loginUser(userData) {
  const formData = new URLSearchParams();

  // Swagger OAuth2 expects username/password
  // We send email as username
  formData.append("username", userData.email);
  formData.append("password", userData.password);

  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    let message = "Login failed";

    if (typeof data.detail === "string") {
      message = data.detail;
    } else if (Array.isArray(data.detail)) {
      message = data.detail.map((err) => err.msg).join(", ");
    }

    throw new Error(message);
  }

  // Save JWT token
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
// LOGOUT
// =======================
export function logoutUser() {
  localStorage.removeItem("token");
}