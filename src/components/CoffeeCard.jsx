function CoffeeCard({ coffee, onAddToCart }) {
  return (
    <article className="coffee-card">
      <div className="coffee-image">
        <span className="coffee-emoji">
          {coffee.image}
        </span>

        {coffee.bestSeller && (
          <span className="best-seller">
            ⭐ Best Seller
          </span>
        )}
      </div>

      <div className="coffee-details">
        <div className="coffee-title">
          <h3>{coffee.name}</h3>

          <span className="rating">
            ⭐ {coffee.rating}
          </span>
        </div>

        <p className="category">
          {coffee.category}
        </p>

        <div className="coffee-info">
          <span>
            Size: {coffee.size}
          </span>

          <strong>
            {coffee.price} EGP
          </strong>
        </div>

        <button
          className={
            coffee.available
              ? "add-button"
              : "sold-button"
          }
          disabled={!coffee.available}
          onClick={() => onAddToCart(coffee)}
        >
          {coffee.available
            ? "Add to Cart"
            : "Sold Out"}
        </button>
      </div>
    </article>
  );
}

export default CoffeeCard;