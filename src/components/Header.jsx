function Header({ cartCount, onCartClick }) {
  return (
    <header className="header">
      <a href="#home" className="logo">
        ☕ <span>B&B</span>
      </a>

      <nav>
        <a href="#home">Home</a>
        <a href="#menu">Menu</a>
        <a href="#about">About</a>
        <a href="#reviews">Reviews</a>
      </nav>

      <button className="cart-button" onClick={onCartClick}>
        🛒 Cart ({cartCount})
      </button>
    </header>
  );
}

export default Header;