import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

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
    </div>
  );
};

export default Dashboard;
