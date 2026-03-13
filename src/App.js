import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Promo from "./components/Promo";
import Footer from "./components/Footer";
import ProductTable from "./components/data-table/data_table";
import toolItems from "./default/data.json";
import "./App.css";

const NAV_ITEMS = ["Home", "Shop", "Collections", "Deals", "Tools", "Support"];

const SHOP_ITEMS = [
  {
    id: "p-101",
    name: "Amber Knit Jacket",
    category: "Outerwear",
    price: 2490,
    rating: 4.8,
    badge: "Bestseller",
    description: "Structured knit jacket with warm lining and utility pockets.",
  },
  {
    id: "p-102",
    name: "Metro Cargo Pants",
    category: "Bottoms",
    price: 1790,
    rating: 4.5,
    badge: "New",
    description: "Relaxed-fit cargo pants with tapered leg and stretch fabric.",
  },
  {
    id: "p-103",
    name: "Coastline Linen Shirt",
    category: "Tops",
    price: 1390,
    rating: 4.6,
    badge: "Trending",
    description: "Breathable linen blend shirt designed for all-day comfort.",
  },
  {
    id: "p-104",
    name: "Runner Flex Sneakers",
    category: "Footwear",
    price: 2890,
    rating: 4.7,
    badge: "Hot",
    description: "Lightweight sneakers with responsive cushioning and grip sole.",
  },
  {
    id: "p-105",
    name: "Aurora Pleated Dress",
    category: "Dresses",
    price: 2190,
    rating: 4.9,
    badge: "Editor Pick",
    description: "Flowy pleated dress with modern neckline and premium texture.",
  },
  {
    id: "p-106",
    name: "Commuter Tech Backpack",
    category: "Accessories",
    price: 1650,
    rating: 4.4,
    badge: "Limited",
    description: "Water-resistant backpack with laptop sleeve and cable pocket.",
  },
  {
    id: "p-107",
    name: "Classic Denim Shirt",
    category: "Tops",
    price: 1490,
    rating: 4.5,
    badge: "Popular",
    description: "Soft denim shirt with button-down collar and easy fit.",
  },
  {
    id: "p-108",
    name: "Stride Everyday Sandals",
    category: "Footwear",
    price: 1290,
    rating: 4.3,
    badge: "Value",
    description: "Comfort sandals with anti-slip outsole and cushioned footbed.",
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");
  const [selectedProductId, setSelectedProductId] = useState(SHOP_ITEMS[0].id);
  const [cartItems, setCartItems] = useState([]);

  const categories = useMemo(() => {
    return ["All", ...new Set(SHOP_ITEMS.map((item) => item.category))];
  }, []);

  const filteredShopItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filtered = SHOP_ITEMS.filter((item) => {
      const byCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const bySearch =
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return byCategory && bySearch;
    });

    const sorted = [...filtered];
    if (sortOption === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sortOption === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sortOption === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [searchQuery, selectedCategory, sortOption]);

  const selectedProduct =
    filteredShopItems.find((item) => item.id === selectedProductId) ||
    filteredShopItems[0] ||
    null;

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  function addToCart(product) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function openShopWithCategory(categoryName) {
    setSelectedCategory(categoryName);
    setCurrentPage("Shop");
  }

  const homeFeatured = SHOP_ITEMS.slice(0, 4);

  return (
    <div className="app-shell">
      <Navbar
        navItems={NAV_ITEMS}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        cartCount={cartCount}
      />

      <main className="content-shell">
        {currentPage === "Home" && (
          <>
            <Hero onPrimaryAction={() => setCurrentPage("Shop")} />
            <Categories
              categories={categories.filter((category) => category !== "All")}
              onSelect={openShopWithCategory}
            />
            <Products
              title="Featured Picks"
              subtitle="Handpicked essentials curated from this week's top sellers."
              items={homeFeatured}
              onSelect={setSelectedProductId}
              onAddToCart={addToCart}
            />
            <Promo onNavigate={setCurrentPage} />
          </>
        )}

        {currentPage === "Shop" && (
          <section className="page-block">
            <div className="section-heading">
              <h2>Shop All Products</h2>
              <p>
                Browse with fast filters, smart sorting, and direct cart actions.
              </p>
            </div>
            <div className="shop-toolbar">
              <input
                className="shop-input"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products..."
              />
              <select
                className="shop-select"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                className="shop-select"
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Sort: Price Low-High</option>
                <option value="price-desc">Sort: Price High-Low</option>
                <option value="rating">Sort: Top Rated</option>
              </select>
            </div>

            <div className="shop-layout">
              <Products
                title="Catalog"
                subtitle={`${filteredShopItems.length} products available`}
                items={filteredShopItems}
                onSelect={setSelectedProductId}
                onAddToCart={addToCart}
              />

              <aside className="side-card">
                <h3>Quick View</h3>
                {selectedProduct ? (
                  <div className="quick-view">
                    <p className="badge">{selectedProduct.badge}</p>
                    <h4>{selectedProduct.name}</h4>
                    <p>{selectedProduct.description}</p>
                    <p>Category: {selectedProduct.category}</p>
                    <p>Rating: {selectedProduct.rating} / 5</p>
                    <p className="price">PHP {selectedProduct.price.toLocaleString()}</p>
                    <button onClick={() => addToCart(selectedProduct)}>
                      Add To Cart
                    </button>
                  </div>
                ) : (
                  <p>No product selected.</p>
                )}
              </aside>

              <aside className="side-card">
                <h3>Cart Summary</h3>
                {cartItems.length === 0 && <p>Your cart is empty.</p>}
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-row">
                    <div>
                      <strong>{item.name}</strong>
                      <p>
                        {item.quantity} x PHP {item.price.toLocaleString()}
                      </p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}>-</button>
                  </div>
                ))}
                <p className="total">Total: PHP {cartTotal.toLocaleString()}</p>
              </aside>
            </div>
          </section>
        )}

        {currentPage === "Collections" && (
          <section className="page-block">
            <div className="section-heading">
              <h2>Collections</h2>
              <p>
                Explore styled bundles designed for work, weekend, and travel.
              </p>
            </div>
            <div className="collection-grid">
              <article className="collection-card sunrise">
                <h3>Urban Workday</h3>
                <p>Sharp layers and comfort basics for daily office routines.</p>
              </article>
              <article className="collection-card twilight">
                <h3>Weekend Motion</h3>
                <p>Relaxed silhouettes with sporty details for active days.</p>
              </article>
              <article className="collection-card ocean">
                <h3>Coastal Escape</h3>
                <p>Breathable pieces and light textures for warm destinations.</p>
              </article>
            </div>
          </section>
        )}

        {currentPage === "Deals" && (
          <section className="page-block">
            <div className="section-heading">
              <h2>Daily Deals</h2>
              <p>Flash offers updated every day. Grab them before stocks run out.</p>
            </div>
            <div className="deal-list">
              <article className="deal-card">
                <h3>Buy 2 Tops, Get 1 Free</h3>
                <p>Valid for all tops collection until midnight.</p>
                <button onClick={() => openShopWithCategory("Tops")}>
                  Shop Tops
                </button>
              </article>
              <article className="deal-card">
                <h3>30% Off Footwear</h3>
                <p>Discount is auto-applied at checkout.</p>
                <button onClick={() => openShopWithCategory("Footwear")}>
                  Shop Footwear
                </button>
              </article>
              <article className="deal-card">
                <h3>Free Delivery Over PHP 2,000</h3>
                <p>Nationwide shipping promo for eligible orders.</p>
                <button onClick={() => setCurrentPage("Shop")}>Start Shopping</button>
              </article>
            </div>
          </section>
        )}

        {currentPage === "Tools" && (
          <section className="page-block">
            <div className="section-heading">
              <h2>Tools Inventory</h2>
              <p>Search, sort, filter, and inspect complete tools records.</p>
            </div>
            <ProductTable items={toolItems} />
          </section>
        )}

        {currentPage === "Support" && (
          <section className="page-block">
            <div className="section-heading">
              <h2>Support Center</h2>
              <p>Need help? Start with quick answers and direct contact channels.</p>
            </div>
            <div className="support-layout">
              <article className="side-card">
                <h3>FAQ</h3>
                <p>How long is delivery?</p>
                <p className="muted">2 to 5 business days nationwide.</p>
                <p>Can I return an item?</p>
                <p className="muted">
                  Yes, within 7 days for unused items with original tags.
                </p>
                <p>What payment methods are accepted?</p>
                <p className="muted">Cards, online wallets, and bank transfer.</p>
              </article>
              <article className="side-card">
                <h3>Contact Team</h3>
                <p>Email: support@shopx.local</p>
                <p>Phone: +63 912 345 6789</p>
                <p>Hours: Monday to Saturday, 9:00 AM to 7:00 PM</p>
                <button onClick={() => setCurrentPage("Shop")}>
                  Continue Shopping
                </button>
              </article>
            </div>
          </section>
        )}
      </main>

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;
