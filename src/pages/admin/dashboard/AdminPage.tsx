import React from "react";
import "@styles/admin/AdminDashboard.css";

const AdminDashboardPage: React.FC = () => {
  const transactions = [
    {
      code: "BT92X",
      user: "alex.sear@gmail.com",
      date: "2025/01/1",
      frequency: "Monthly",
      succeeded: true,
      amount: "$18.99",
    },
    {
      code: "VH54P",
      user: "john.doe@gmail.com",
      date: "2025/17/1",
      frequency: "Yearly",
      succeeded: false,
      amount: "$165.99",
    },
    {
      code: "N562A",
      user: "sarah.jane@email.com",
      date: "2025/16/1",
      frequency: "Yearly",
      succeeded: true,
      amount: "$165.99",
    },
    {
      code: "GA46E",
      user: "liza.miller@tech.com",
      date: "2025/14/1",
      frequency: "Monthly",
      succeeded: true,
      amount: "$18.99",
    },
    {
      code: "JC82L",
      user: "mike.todd@email.com",
      date: "2025/16/1",
      frequency: "Monthly",
      succeeded: false,
      amount: "$18.99",
    },
    {
      code: "JC82L",
      user: "mike.todd@email.com",
      date: "2025/16/1",
      frequency: "Monthly",
      succeeded: true,
      amount: "$18.99",
    },
  ];

  const getInitials = (email: string) => {
    const name = email.split("@")[0];
    return name.slice(0, 2).toUpperCase();
  };

  const getRandomColor = (email: string) => {
    const colors = [
      "linear-gradient(135deg, #6366f1, #8b5cf6)",
      "linear-gradient(135deg, #f59e0b, #f97316)",
      "linear-gradient(135deg, #22c55e, #16a34a)",
      "linear-gradient(135deg, #ef4444, #dc2626)",
      "linear-gradient(135deg, #8b5cf6, #a855f7)",
      "linear-gradient(135deg, #06b6d4, #0891b2)",
    ];
    const index = email.length % colors.length;
    return colors[index];
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <button className="new-invoice-btn">
          <span>+</span>
          New Invoice
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-title">👥 Subscriptions</div>
            <div className="stat-change positive">+10%</div>
          </div>
          <div className="stat-value">1240</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "75%" }}></div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-title">💰 Revenue</div>
            <div className="stat-change negative">-22%</div>
          </div>
          <div className="stat-value">$35,231.81</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "60%" }}></div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-title">📊 MRR</div>
            <div className="stat-change positive">+14%</div>
          </div>
          <div className="stat-value">$5,632</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "85%" }}></div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="transactions-section">
        <div className="transactions-header">
          <h2 className="transactions-title">Last Transactions</h2>
          <button className="export-btn">📤 Export</button>
        </div>

        <table className="transactions-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>User</th>
              <th>Date ↕</th>
              <th>Frequency</th>
              <th>Succeeded</th>
              <th>Amount ↕</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.code}</td>
                <td>
                  <div className="user-cell">
                    <div
                      className="user-avatar"
                      style={{ background: getRandomColor(transaction.user) }}
                    >
                      {getInitials(transaction.user)}
                    </div>
                    {transaction.user}
                  </div>
                </td>
                <td>{transaction.date}</td>
                <td>
                  <span
                    className={`frequency-badge ${
                      transaction.frequency.toLowerCase() === "monthly"
                        ? "frequency-monthly"
                        : "frequency-yearly"
                    }`}
                  >
                    {transaction.frequency}
                  </span>
                </td>
                <td>
                  {transaction.succeeded ? (
                    <span className="status-success">✓</span>
                  ) : (
                    <span style={{ color: "#ef4444" }}>✗</span>
                  )}
                </td>
                <td className="amount-cell">{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button className="pagination-btn">← Previous</button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <span style={{ color: "#64748b" }}>...</span>
          <button className="pagination-btn">Next →</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
