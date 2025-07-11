import "@styles/page/Header.css";
import TicketHubLogo from "@assets/Logo/logo-removebg.svg";
import { Link, useNavigate } from "react-router-dom";
import { PATH_PUBLIC } from "@/routes/paths";

const Header = () => {
  const navigate = useNavigate();

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
      </div>
    </header>
  );
};

export default Header;
