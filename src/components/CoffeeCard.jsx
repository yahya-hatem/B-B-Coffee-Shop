import styles from "./CoffeeCard.module.css";

function CoffeeCard({ coffee, onAddToCart }) {
  return (
    <article className={styles.card}>
      <div className={styles.image}>
        <span className={styles.emoji}>
          {coffee.image}
        </span>

        {coffee.bestSeller && (
          <span className={styles.badge}>
            ⭐ Best Seller
          </span>
        )}
      </div>

      <div className={styles.details}>
        <div className={styles.title}>
          <h3>{coffee.name}</h3>

          <span className="rating">
            ⭐ {coffee.rating}
          </span>
        </div>

        <p className={styles.category}>
          {coffee.category}
        </p>

        <div className={styles.info}>
          <span>
            Size: {coffee.size}
          </span>

          <strong className={styles.price}>
            {coffee.price} EGP
          </strong>
        </div>

        <button
          className={
            coffee.available
              ? styles.button
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