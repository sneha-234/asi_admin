import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const [homeOpen, setHomeOpen] = useState(
    ["/content", "/glance-cards", "/building-cards"].includes(location.pathname)
  );

  const [aboutOpen, setAboutOpen] = useState(
    ["/about-content", "/values", "/leaders"].includes(location.pathname)
  );

  const closeMenu = () => {
    if (window.innerWidth <= 768) {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {menuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside className={`sidebar ${menuOpen ? "show" : ""}`}>
        <div className="sidebar-header">
          <div className="admin-badge">ADMIN</div>
          <div className="logo">
            ASI <span>Associate</span>
          </div>
        </div>

        <div className="sidebar-menu">

          <Link
            to="/dashboard"
            className={`menu-link ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <i className="ti ti-layout-dashboard" />
            Dashboard
          </Link>

        
          {/* Home */}
          <div className={`has-sub ${homeOpen ? "open" : ""}`}>

            <div className="parent-row">

              <Link
                to="/content"
                className="parent-link"
                onClick={closeMenu}
              >
                <i className="ti ti-home" />
                Home
              </Link>

              <i
                className="ti ti-chevron-down chevron"
                onClick={() => setHomeOpen(!homeOpen)}
              />

            </div>

            <div className="submenu">

              <Link
                to="/glance-cards"
                className={`submenu-link ${
                  location.pathname === "/glance-cards" ? "active" : ""
                }`}
                onClick={closeMenu}
              >
                <i className="ti ti-cards" />
                Glance Cards
              </Link>

              <Link
                to="/building-cards"
                className={`submenu-link ${
                  location.pathname === "/building-cards" ? "active" : ""
                }`}
                onClick={closeMenu}
              >
                <i className="ti ti-building" />
                Building Cards
              </Link>

            </div>

          </div>

          {/* About Us */}
          <div className={`has-sub ${aboutOpen ? "open" : ""}`}>

            <div className="parent-row">

              <Link
                to="/about-content"
                className="parent-link"
                onClick={closeMenu}
              >
                <i className="ti ti-info-circle" />
                About Us
              </Link>

              <i
                className="ti ti-chevron-down chevron"
                onClick={() => setAboutOpen(!aboutOpen)}
              />

            </div>

            <div className="submenu">

              <Link
                to="/values"
                className={`submenu-link ${
                  location.pathname === "/values" ? "active" : ""
                }`}
                onClick={closeMenu}
              >
                <i className="ti ti-heart" />
                Values
              </Link>

              <Link
                to="/leaders"
                className={`submenu-link ${
                  location.pathname === "/leaders" ? "active" : ""
                }`}
                onClick={closeMenu}
              >
                <i className="ti ti-user-star" />
                Leadership
              </Link>

            </div>

          </div>

          <Link
            to="/products"
            className={`menu-link ${
              location.pathname === "/products" ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <i className="ti ti-package" />
            Products & Services
          </Link>

          <Link
            to="/customer-stats"
            className={`menu-link ${
              location.pathname === "/customer-stats" ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <i className="ti ti-chart-bar" />
            Stats
          </Link>

          <Link
            to="/why-choose-us"
            className={`menu-link ${
              location.pathname === "/why-choose-us" ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <i className="ti ti-star" />
            Why Choose Us
          </Link>

          <div className="divider" />

          <Link
            to="/enquiries"
            className={`menu-link ${
              location.pathname === "/enquiries" ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <i className="ti ti-message-dots" />
            Enquiries
          </Link>

          <Link
            to="/careers"
            className={`menu-link ${
              location.pathname === "/careers" ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <i className="ti ti-briefcase" />
            Careers
          </Link>

          <Link
            to="/brands"
            className={`menu-link ${
              location.pathname === "/brands" ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <i className="ti ti-badge" />
            Brands
          </Link>

          <Link
            to="/contact-us"
            className={`menu-link ${
              location.pathname === "/contact-us" ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <i className="ti ti-phone" />
            Contact Us
          </Link>
        </div>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <i className="ti ti-logout" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}