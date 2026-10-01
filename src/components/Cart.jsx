import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
} from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const isCartVisible = useSelector(
    (state) => state.cart.isVisible
  );

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  if (!isCartVisible) {
    return null;
  }

  const addItemHandler = (item) => {
    dispatch(addItem(item));
  };

  const removeItemHandler = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 && (
        <p>Your cart is empty.</p>
      )}

      {cartItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <div>
            <h2>{item.title}</h2>

            <p>
              ${item.price.toFixed(2)} / item
            </p>
          </div>

          <div>
            <p>
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <div className="quantity-controls">
              <button
                onClick={() => removeItemHandler(item.id)}
              >
                -
              </button>

              <span>
                x {item.quantity}
              </span>

              <button
                onClick={() => addItemHandler(item)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;