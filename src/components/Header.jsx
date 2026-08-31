import CartBadge from "./CartBadge";

function Header({ cartCount, onCartClick }) {
  return (
    <header className="header">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between">
          <a href="#home" className="logo">
            ☕ <span>B&B</span>
          </a>

          <nav className="d-none d-md-flex gap-4">
            <a href="#home">Home</a>
            <a href="#menu">Menu</a>
            <a href="#about">About</a>
            <a href="#feedback">Feedback</a>
            <a href="#reviews">Reviews</a>
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
