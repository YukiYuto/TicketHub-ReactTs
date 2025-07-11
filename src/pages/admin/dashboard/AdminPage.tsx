import React from "react";

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="admin-content">
      <h1>Admin Dashboard</h1>
      <p>
        Welcome to the Ticket Hub administration panel. Manage events, users,
        and system settings from here.
      </p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="dashboard-card-number">1,234</div>
          <h3>Total Users</h3>
          <p>Registered customers and organizers</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-number">567</div>
          <h3>Active Events</h3>
          <p>Currently running events</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-number">89</div>
          <h3>Pending Approval</h3>
          <p>Events waiting for approval</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-number">$12,345</div>
          <h3>Revenue</h3>
          <p>Total revenue this month</p>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <div className="dashboard-card">
          <h3>Quick Actions</h3>
          <p>Common administrative tasks</p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "1rem",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                padding: "0.75rem 1.5rem",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Manage Users
            </button>
            <button
              style={{
                padding: "0.75rem 1.5rem",
                background: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Review Events
            </button>
            <button
              style={{
                padding: "0.75rem 1.5rem",
                background: "#f59e0b",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              System Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
