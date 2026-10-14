const API_URL = "http://localhost:8080/api/auth";

export async function registerUser(user){
    const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json().catch(()=>({}));
  if(!response.ok){
    throw new Error(data.message || data.error || "Registration failed");
  }
  return data;
}
export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || "Login failed.");
  }

  return data;
}