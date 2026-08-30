function Hero() {
  const scrollToMenu = () => {
    document.getElementById("menu").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <span className="hero-tag">
          PREMIUM COFFEE SHOP
        </span>

        <h1>
          Your Daily Cup
          <br />
          of <span>Happiness</span>
        </h1>

        <p>
          Freshly brewed coffee made with love,
          premium beans, and unforgettable taste.
        </p>

        <button
          className="hero-button"
          onClick={scrollToMenu}
        >
          Explore Our Menu ↓
        </button>
      </div>

      <div className="hero-coffee">
        ☕
      </div>
    </section>
  );
}

export default Hero;