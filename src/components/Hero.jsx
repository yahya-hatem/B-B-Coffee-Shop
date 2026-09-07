function Hero() {
  const scrollToMenu = () => {
    document.getElementById("menu").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <span className="hero-tag">YOUR DAILY RITUAL, ELEVATED</span>

        <h1>
          Good coffee,
          <br />
          <span>better days.</span>
        </h1>

        <p>
          Small-batch beans, thoughtful recipes, and a warm place to land.
          Start your morning with a cup made just for your rhythm.
        </p>

        <div className="hero-actions">
          <button className="hero-button" onClick={scrollToMenu}>
            Explore the menu <span aria-hidden="true">→</span>
          </button>
          <button className="hero-link" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
            Our story <span aria-hidden="true">↗</span>
          </button>
        </div>

        <div className="hero-stats" aria-label="Brew and Bean highlights">
          <div>
            <strong>12k+</strong>
            <span>happy sips</span>
          </div>
          <div>
            <strong>4.9</strong>
            <span>guest rating</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>good energy</span>
          </div>
        </div>
      </div>

      <div className="hero-visual" aria-label="A freshly brewed cup of coffee">
        <div className="hero-glow" />
        <div className="hero-coffee">
          <span className="coffee-steam steam-one" />
          <span className="coffee-steam steam-two" />
          <span className="coffee-cup" aria-hidden="true">☕</span>
        </div>
        <div className="hero-note">
          <span className="note-icon">✦</span>
          <span><strong>Roasted today</strong><small>Delivered with care</small></span>
        </div>
      </div>
    </section>
  );
}

export default Hero;