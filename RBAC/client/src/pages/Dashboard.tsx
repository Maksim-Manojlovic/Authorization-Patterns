import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return <p>Unauthorized access. Please log in.</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.username}!</p>

      {user.role === "admin" && (
        <div>
          <h3>Admin Panel</h3>
          <p>You have full access.</p>
        </div>
      )}

      {user.role === "user" && (
        <div>
          <h3>User Dashboard</h3>
          <p>You have limited access.</p>
        </div>
      )}

      {user.role === "guest" && (
        <div>
          <h3>Guest View</h3>
          <p>You have read-only access.</p>
        </div>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
