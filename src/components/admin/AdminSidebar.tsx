import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "@styles/admin/AdminSidebar.css";
import TicketHubLogo from "@assets/Logo/logo-removebg.svg";
import { PATH_PUBLIC } from "@/routes/paths";
import useAuth from "@/hooks/useAuth.hook";

interface MenuItem {
  icon: string;
  label: string;
  path: string;
  badge?: string;
}

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate(PATH_PUBLIC.home);
  };

  const menuItems: MenuItem[] = [
    { icon: "📊", label: "Dashboard", path: "/admin/dashboard" },
    { icon: "👥", label: "Users", path: "/admin/users" },
    { icon: "🎫", label: "Events", path: "/admin/events" },
    { icon: "🎟️", label: "Tickets", path: "/admin/tickets" },
    { icon: "💰", label: "Transactions", path: "/admin/transactions" },
    { icon: "📈", label: "Analytics", path: "/admin/analytics" },
    { icon: "⚙️", label: "Settings", path: "/admin/settings" },
    { icon: "🔄", label: "Updates", path: "/admin/updates", badge: "14" },
    { icon: "📦", label: "Products", path: "/admin/products", badge: "14+" },
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="admin-sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <img
              className="admin-header-logo"
              src={TicketHubLogo}
              alt="Ticket Hub Logo"
            />
          </div>
          <div className="logo-text">TicketHub</div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div
            key={item.path}
            className={`nav-item ${
              location.pathname === item.path ? "active" : ""
            }`}
            onClick={() => handleMenuClick(item.path)}
          >
            <div className="nav-content">
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </div>
          </div>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <button className="upgrade-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
