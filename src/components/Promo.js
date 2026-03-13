function Promo({ onNavigate }) {
  return (
    <section className="promo">
      <div>
        <p className="eyebrow">Limited Time Campaign</p>
        <h2>Save More With Bundle Checkout</h2>
        <p>
          Combine 3 or more eligible items and unlock stackable discounts up to
          40%.
        </p>
      </div>
      <div className="promo-actions">
        <button onClick={() => onNavigate("Deals")}>View Deals</button>
        <button className="ghost" onClick={() => onNavigate("Collections")}>
          Browse Collections
        </button>
      </div>
    </section>
  );
}

export default Promo;
