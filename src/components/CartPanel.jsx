import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../redux/slices/cartSlice";

function CartPanel({ onClose }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <aside className="cart-panel" aria-label="Shopping cart">
      <div className="cart-panel-header">
        <h2>Your Cart</h2>
        <button type="button" onClick={onClose} aria-label="Close cart">×</button>
      </div>

      {items.length === 0 ? (
        <p>Your cart is empty ☕</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <span>{item.name} - {item.price} EGP</span>
                <button type="button" onClick={() => dispatch(removeItem(item.id))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <strong>Total: {total} EGP</strong>
          <button type="button" className="clear-cart-button" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
        </>
      )}
    </aside>
  );
}

export default CartPanel;
