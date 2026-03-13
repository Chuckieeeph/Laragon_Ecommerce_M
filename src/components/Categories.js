function Categories({ categories, onSelect }) {
  return (
    <section className="page-block">
      <div className="section-heading">
        <h2>Shop By Category</h2>
        <p>Tap any category to jump directly to filtered products.</p>
      </div>
      <div className="categories-grid">
        {categories.map((category) => (
          <button
            key={category}
            className="category-card"
            onClick={() => onSelect(category)}
          >
            <h3>{category}</h3>
            <p>Explore latest {category.toLowerCase()} collections.</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;
