import { useState } from "react";
import { login } from "../services/api";
import "./LoginPage.css";

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    if (!/^[A-Za-z]{3,}$/.test(name)) {
      setError("Name must contain at least 3 English letters");
      return;
    }

    await login(name);
    localStorage.setItem("user", name);
    onLogin();
  };

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
      >
        <h2>Welcome</h2>

        <input
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        {error && <div className="error">{error}</div>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
