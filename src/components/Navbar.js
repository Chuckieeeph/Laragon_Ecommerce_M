function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">ShopX</h2>
      <ul>
        <li>Home</li>
        <li>Shop</li>
        <li>Blog</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="icons">
        🔍 🛒 👤
      </div>
    </nav>
  );
}

export default Navbar;