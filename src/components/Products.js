function Products({ title, subtitle, items, onSelect, onAddToCart }) {
  return (
    <section className="page-block">
      <div className="section-heading">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="product-grid">
        {items.map((item) => (
          <article
            key={item.id}
            className="product-card"
            onClick={() => onSelect(item.id)}
          >
            <p className="badge">{item.badge}</p>
            <h3>{item.name}</h3>
            <p className="muted">{item.category}</p>
            <p className="description">{item.description}</p>
            <p className="muted">Rating: {item.rating} / 5</p>
            <div className="card-row">
              <strong>PHP {item.price.toLocaleString()}</strong>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  onAddToCart(item);
                }}
              >
                Add
              </button>
            </div>
          </article>
        ))}
        {items.length === 0 && <p className="muted">No products found.</p>}
      </div>
    </section>
  );
}

export default Products;
