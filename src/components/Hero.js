function Hero({ onPrimaryAction }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">Spring Summer 2026</p>
        <h2>Wear Better. Move Freely. Shop Smarter.</h2>
        <p>
          Discover curated outfits, smart bundles, and premium essentials designed
          for city life.
        </p>
        <div className="hero-actions">
          <button onClick={onPrimaryAction}>Start Shopping</button>
          <button className="ghost">See Lookbook</button>
        </div>
      </div>
      <div className="hero-visual">
        <div className="visual-card one">
          <span>New Arrival</span>
          <strong>Amber Knit Jacket</strong>
        </div>
        <div className="visual-card two">
          <span>Daily Deal</span>
          <strong>30% Off Footwear</strong>
        </div>
      </div>
    </section>
  );
}

export default Hero;
