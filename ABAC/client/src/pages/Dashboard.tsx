import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext)!;

  return (
    <div data-testid="dashboard-page">
      <h1>Dashboard</h1>
      <p>Welcome to the protected dashboard page.</p>
      <button onClick={logout} data-testid="logout-button">
        Logout
      </button>
    </div>
  );
}
