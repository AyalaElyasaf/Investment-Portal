const API = "https://localhost:7146/api/investments";

export const login = (name: string) =>
  fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(name),
  });

export const getState = async (user: string) => {
  const res = await fetch(`${API}/state?userName=${user}`);
  if (!res.ok) throw await res.text();
  return res.json();
};

export const invest = async (user: string, name: string) => {
  const res = await fetch(`${API}/invest/${name}?userName=${user}`, {
    method: "POST",
  });
  if (!res.ok) throw await res.text();
};

export const getHistory = async (user: string) => {
  const res = await fetch(`${API}/history/${user}`);
  if (!res.ok) throw await res.text();
  return res.json();
};
