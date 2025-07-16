import { FaFacebookF, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";
import {
  MdEmail,
  MdLocationOn,
  MdPhone,
  MdAccessTime,
  MdLanguage,
} from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { BsBuilding, BsShieldLock, BsQuestionCircle } from "react-icons/bs";
import {
  HiOutlineNewspaper,
  HiOutlineUserGroup,
  HiOutlineBriefcase,
} from "react-icons/hi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

import "@styles/page/Footer.css";
import TicketHubLogo from "@assets/Logo/logo-removebg.svg";
import AppleLogo from "@assets/Logo/Apple_logo_black.svg";
import GooglePlayLogo from "@assets/Logo/logo-google-playstore.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <div className="footer-logo">
            <div className="logo-box">
              <img
                src={TicketHubLogo}
                alt="TicketHub Logo"
                style={{ width: "40px", height: "40px" }}
              />
            </div>
            <div>
              <h1>TicketHub</h1>
              <p>Connecting fans to events</p>
            </div>
          </div>
          <p className="footer-description">
            Your trusted platform for finding and booking the best events
            nationwide.
          </p>
          <div className="footer-info">
            <p>
              <MdLocationOn /> 123 Event Street, Ho Chi Minh City
            </p>
            <p>
              <MdPhone /> (+84) 123-456-789
            </p>
            <p>
              <MdEmail /> support@tickethub.com
            </p>
            <p>
              <MdAccessTime /> Monday–Friday: 8:30 AM–5:30 PM
            </p>
            <p>
              <MdLanguage /> Available in over 30 provinces
            </p>
          </div>
        </div>

        {/* Company */}
        <div className="footer-column">
          <h3>Company</h3>
          <ul className="footer-list">
            <li>
              <BsBuilding /> About Us
            </li>
            <li>
              <FiMail /> Contact
            </li>
            <li>
              <HiOutlineBriefcase /> Careers
            </li>
            <li>
              <HiOutlineNewspaper /> News
            </li>
            <li>
              <HiOutlineUserGroup /> Partners
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-column">
          <h3>Support</h3>
          <ul className="footer-list">
            <li>
              <BsQuestionCircle /> Help Center
            </li>
            <li>
              <BsQuestionCircle /> FAQs
            </li>
            <li>
              <BsShieldLock /> Ticket Guarantee
            </li>
            <li>
              <FiMail /> Support Contact
            </li>
            <li>
              <IoShieldCheckmarkOutline /> Refund Policy
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-column">
          <h3>Legal</h3>
          <ul className="footer-list">
            <li>
              <BsShieldLock /> Terms of Service
            </li>
            <li>
              <BsShieldLock /> Privacy Policy
            </li>
            <li>
              <BsShieldLock /> Cookie Policy
            </li>
            <li>
              <BsShieldLock /> Accessibility
            </li>
          </ul>
        </div>

        {/* Subscribe */}
        <div className="footer-column">
          <h3>
            <FiMail /> Subscribe for Updates
          </h3>
          <p>Get the latest news and updates delivered to your inbox</p>
          <div className="subscribe">
            <input type="email" placeholder="Enter your email" />
            <div className="subscribe-button">
              <button>Subscribe</button>
            </div>
          </div>
          <p className="footer-note">
            By subscribing, you agree to our Privacy Policy
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social">
          <h3>Connect with us</h3>
          <div className="social-links">
            <a href="#">
              <FaFacebookF /> Facebook
            </a>
            <a href="#">
              <FaTwitter /> Twitter
            </a>
            <a href="#">
              <FaInstagram /> Instagram
            </a>
            <a href="#">
              <FaTiktok /> TikTok
            </a>
          </div>
        </div>
        <div className="apps">
          <h3>Download mobile app</h3>
          <h5>
            Get exclusive offers and manage your tickets anytime, anywhere
          </h5>
          <div className="apps-buttons">
            <button>
              <img src={AppleLogo} alt="App Store" />
              App Store
            </button>
            <button>
              <img src={GooglePlayLogo} alt="Google Play" />
              Google Play
            </button>
          </div>
        </div>
      </div>
      <div className="copyright">
        © 2025 TicketHub. All rights reserved. Secure payments provided by
        Stripe.
      </div>
    </footer>
  );
};

export default Footer;
