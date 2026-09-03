import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CartBadge from "./CartBadge";
import ThemeToggle from "./ThemeToggle";

function Header({ cartCount, onCartClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      
      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }
  };

  return (
    <header className="header">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between">

          <NavLink to="/" className="logo">
            ☕ <span>B&B</span>
          </NavLink>

          <nav className="d-none d-md-flex gap-4 align-items-center">

            <NavLink
              to="/"
              className="text-decoration-none"
            >
              Home
            </NavLink>

            <button
              type="button"
              className="nav-section-link"
              onClick={() => goToSection("menu")}
            >
              Menu
            </button>
            <ThemeToggle />

            <NavLink
              to="/about"
              className="text-decoration-none"
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className="text-decoration-none"
            >
              Contact
            </NavLink>

            <button
              type="button"
              className="nav-section-link"
              onClick={() => goToSection("feedback")}
            >
              Feedback
            </button>

            <button
              type="button"
              className="nav-section-link"
              onClick={() => goToSection("reviews")}
            >
              Reviews
            </button>

          </nav>

          <button
            className="btn btn-dark rounded-pill px-3"
            onClick={onCartClick}
          >
            🛒 Cart
            <CartBadge count={cartCount} />
          </button>

        </div>
      </div>
    </header>
  );
}

export default Header;