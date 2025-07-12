import "@styles/page/Header.css";
import TicketHubLogo from "@assets/Logo/logo-removebg.svg";
import { Link, useNavigate } from "react-router-dom";
import { PATH_PUBLIC } from "@/routes/paths";
import useAuth from "@/hooks/useAuth.hook";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    signOut();
    setIsDropdownOpen(false);
    navigate(PATH_PUBLIC.home);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo và Title */}
        <Link to={PATH_PUBLIC.home} className="header-brand">
          <img src={TicketHubLogo} alt="Logo" className="header-logo" />
          <div className="header-brand-text">
            <h1 className="header-title">
              Ticket<span>Hub</span>
            </h1>
            <span className="header-subtitle">Find your perfect event</span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="header-nav">
          <Link to={PATH_PUBLIC.notFound} className="nav-link">
            Events
          </Link>
          <Link to={PATH_PUBLIC.notFound} className="nav-link">
            My Tickets
          </Link>
          <Link to={PATH_PUBLIC.notFound} className="nav-link">
            Contact
          </Link>
        </nav>

        {/* User Actions */}
        {isAuthenticated ? (
          <div className="header-user-section">
            <div className="user-dropdown" ref={dropdownRef}>
              <button
                className={`user-dropdown-trigger ${
                  isDropdownOpen ? "active" : ""
                }`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="user-name">Hello, {user?.fullName}</span>
                <svg
                  className={`dropdown-icon ${isDropdownOpen ? "rotated" : ""}`}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="user-dropdown-menu">
                  <Link
                    to={PATH_PUBLIC.notFound}
                    className="dropdown-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to={PATH_PUBLIC.notFound}
                    className="dropdown-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Tickets
                  </Link>
                  <Link
                    to={PATH_PUBLIC.notFound}
                    className="dropdown-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    className="dropdown-item sign-out-btn"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="header-actions">
            <button
              className="btn btn-secondary"
              onClick={() => navigate(PATH_PUBLIC.signIn)}
            >
              Sign In
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate(PATH_PUBLIC.signUpCustomer)}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
