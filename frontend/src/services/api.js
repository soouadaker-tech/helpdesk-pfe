const API_URL = "http://localhost:5000/api";

const logoutUser = () => {
  localStorage.removeItem("token");
};

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      logoutUser();
    }
    return { success: false, error: data.error || "Erreur API", status: res.status };
  }
  return { success: true, data };
};

// --- Auth ---
export const registerUser = async (user) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const result = await handleResponse(res);
    if (result.success && result.data.token) {
      localStorage.setItem("token", result.data.token);
      return { success: true, token: result.data.token, user: result.data.user };
    }
    return { success: false, error: result.error };
  } catch (err) {
    console.error("Erreur API registerUser:", err);
    return { success: false, error: err.message };
  }
};

export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await handleResponse(res);

    if (result.success && result.data.token) {
      localStorage.setItem("token", result.data.token);
      return { success: true, token: result.data.token, user: result.data.user };
    }
    return { success: false, error: result.error };
  } catch (err) {
    console.error("Erreur API loginUser:", err);
    return { success: false, error: err.message };
  }
};

// --- Tickets ---
export const getAllTickets = async () => {
  const res = await fetch(`${API_URL}/tickets`, { headers: getAuthHeaders() });
  return res.ok ? res.json() : [];
};

export const getTicketDetails = async (id) => {
  const res = await fetch(`${API_URL}/tickets/${id}`, { headers: getAuthHeaders() });
  return res.ok ? res.json() : null;
};


export async function createTicket(ticketData) {
  try {
    const res = await fetch(`${API_URL}/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`, // إذا route محمي
      },
      body: JSON.stringify(ticketData),
    });
    if (!res.ok) throw new Error("Erreur API: " + res.statusText);
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export const deleteTicket = async (id) => {
  const res = await fetch(`${API_URL}/tickets/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return await handleResponse(res);
};

// --- Comments ---
export const getComments = async (ticketId) => {
  const res = await fetch(`${API_URL}/comments/${ticketId}`, { headers: getAuthHeaders() });
  return res.ok ? res.json() : [];
};

export const addComment = async (ticketId, content) => {
  const res = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ ticket_id: ticketId, content }),
  });
  return await handleResponse(res);
};

// --- Attachments ---
export const getAttachments = async (ticketId) => {
  const res = await fetch(`${API_URL}/attachments/${ticketId}`, { headers: getAuthHeaders() });
  return res.ok ? res.json() : [];
};

// --- Dashboard ---
export const getDashboardStats = async () => {
  const res = await fetch(`${API_URL}/dashboard`, { headers: getAuthHeaders() });
  return res.ok ? res.json() : {};
};

export const getTicketsStats = async () => {
  return await getDashboardStats();
};

// --- Notifications ---
export const getNotifications = async (userId) => {
  if (!userId) return [];
  const res = await fetch(`${API_URL}/notifications/${userId}`, { headers: getAuthHeaders() });
  return res.ok ? res.json() : [];
};

export const addNotificationAPI = async (userId, message) => {
  const res = await fetch(`${API_URL}/notifications`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify({ user_id: userId, message }),
  });
  return await handleResponse(res);
};

// --- Users ---
export const getAllUsers = async () => {
  const res = await fetch(`${API_URL}/users`, { headers: getAuthHeaders() });
  return res.ok ? res.json() : [];
};

export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return await handleResponse(res);
};

// --- Helper ---
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  console.log("Token present:", !!token);
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}


export const getTicketById = async (id) => {
  const res = await fetch(`${API_URL}/tickets/${id}`, { headers: getAuthHeaders() });
  return await handleResponse(res);
};

export const updateTicket = async (id, data) => {
  const res = await fetch(`${API_URL}/tickets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  return await handleResponse(res);
};

export const createUser = async (user) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(user),
  });
  return await handleResponse(res);
};

export const getUserById = async (id) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    headers: getAuthHeaders(),
  });
  return await handleResponse(res);
};

export const updateUser = async (id, data) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  return await handleResponse(res);
};
