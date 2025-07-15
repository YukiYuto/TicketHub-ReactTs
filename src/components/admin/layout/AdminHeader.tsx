import TicketHubLogo from "@assets/Logo/logo-removebg.svg";
import { BellIcon } from "@heroicons/react/24/outline";
import useAuth from "@/hooks/useAuth.hook";
import { useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "@/routes/paths";
import { useState, useEffect, useRef } from "react";
import "@styles/admin/AdminHeader.css";

const AdminHeader = () => {
  const { state, signOut } = useAuth();
  const { isAuthenticated, user } = state;
  const navigate = useNavigate();
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
    navigate(PATH_ADMIN.dashboard);
  };

  // Generate avatar source with fallback
  const avatarSrc =
    user?.avatarUrl &&
    user.avatarUrl !== "undefined" &&
    user.avatarUrl.trim() !== ""
      ? user.avatarUrl
      : "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(user?.fullName || "Admin") +
        "&background=1f2937&color=fff&size=32";

  return (
    <nav className="admin-header">
      <div className="admin-header-container">
        <div className="admin-header-content">
          <div className="admin-header-brand">
            <img
              className="admin-header-logo"
              src={TicketHubLogo}
              alt="Ticket Hub Logo"
            />
          </div>

          {isAuthenticated ? (
            <div className="admin-header-user-section">
              <button type="button" className="admin-notification-btn">
                <span className="sr-only">View notifications</span>
                <BellIcon
                  className="admin-notification-icon"
                  aria-hidden="true"
                />
              </button>

              {/* Profile dropdown */}
              <div className="admin-profile-dropdown" ref={dropdownRef}>
                <button
                  className="admin-profile-trigger"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="admin-profile-avatar"
                    src={avatarSrc}
                    alt="Profile"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(user?.fullName || "Admin") +
                        "&background=1f2937&color=fff&size=32";
                    }}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="admin-dropdown-menu">
                    <div className="admin-dropdown-item user-name">
                      {user?.fullName || "Admin User"}
                    </div>

                    <button
                      onClick={() => {
                        navigate(PATH_ADMIN.dashboard);
                        setIsDropdownOpen(false);
                      }}
                      className="admin-dropdown-item"
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={() => {
                        navigate("/admin/profile");
                        setIsDropdownOpen(false);
                      }}
                      className="admin-dropdown-item"
                    >
                      Profile
                    </button>

                    <button
                      onClick={() => {
                        navigate("/admin/settings");
                        setIsDropdownOpen(false);
                      }}
                      className="admin-dropdown-item"
                    >
                      Settings
                    </button>

                    <button
                      onClick={handleSignOut}
                      className="admin-dropdown-item"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="admin-header-user-section">
              {/* Empty section for non-authenticated users */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
