function Products() {
  const items = [
    { name: "Hoodie", price: "$25" },
    { name: "T-shirt", price: "$15" },
    { name: "Jacket", price: "$40" },
    { name: "Jeans", price: "$35" },
    { name: "Dress", price: "$45" },
    { name: "Sweater", price: "$30" },
  ];

  return (
    <section className="products">
      <h2>Our Trendy Products</h2>
      <div className="product-grid">
        {items.map((item, index) => (
          <div key={index} className="product-card">
            <div className="product-img"></div>
            <h4>{item.name}</h4>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;