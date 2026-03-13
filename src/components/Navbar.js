function Navbar({ navItems, currentPage, onNavigate, cartCount }) {
  return (
    <header className="navbar">
      <div className="brand" onClick={() => onNavigate("Home")}>
        <span className="brand-dot">SX</span>
        <div>
          <h1>ShopX Studio</h1>
          <p>Modern Everyday Store</p>
        </div>
      </div>

      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item}>
              <button
                className={item === currentPage ? "nav-btn active" : "nav-btn"}
                onClick={() => onNavigate(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <button className="cart-chip" onClick={() => onNavigate("Shop")}>
        Cart ({cartCount})
      </button>
    </header>
  );
}

export default Navbar;
