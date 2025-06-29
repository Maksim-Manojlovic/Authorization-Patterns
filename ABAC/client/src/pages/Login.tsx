import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "AuthContext is undefined. Did you forget to wrap with AuthProvider?"
    );
  }

  const { setUser } = context;
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();

  const handleLogin = () => {
    setUser({ role });
    navigate("/dashboard");
  };

  return (
    <div>
      <h1 data-testid="login-title">Login</h1>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        data-testid="role-select"
      >
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      <button onClick={handleLogin} data-testid="login-button">
        Login
      </button>
    </div>
  );
}
