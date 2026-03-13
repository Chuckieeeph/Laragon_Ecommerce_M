function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div>
        <h3>ShopX Studio</h3>
        <p>Curated fashion and lifestyle products for modern routines.</p>
      </div>

      <div>
        <h4>Navigate</h4>
        <button className="footer-link" onClick={() => onNavigate("Home")}>Home</button>
        <button className="footer-link" onClick={() => onNavigate("Shop")}>Shop</button>
        <button className="footer-link" onClick={() => onNavigate("Deals")}>Deals</button>
        <button className="footer-link" onClick={() => onNavigate("Support")}>Support</button>
      </div>

      <div>
        <h4>Community</h4>
        <p>Email: hello@shopx.local</p>
        <p>Instagram: @shopxstudio</p>
        <p>Copyright 2026 ShopX Studio</p>
      </div>
    </footer>
  );
}

export default Footer;
