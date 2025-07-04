import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AxiosError } from "axios";

export default function Login() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("admin_user");
  const [password, setPassword] = useState("adminpass");
  const [error, setError] = useState("");

  if (!context) {
    throw new Error(
      "AuthContext is undefined. Did you forget to wrap with AuthProvider?"
    );
  }

  const { setUser } = context;

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { username, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      setUser(user.attributes);
      navigate("/admin");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <h1 data-testid="login-title">Login</h1>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        data-testid="username-input"
        placeholder="Username"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        data-testid="password-input"
        placeholder="Password"
      />

      <button onClick={handleLogin} data-testid="login-button">
        Login
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
