import { useSelector } from "react-redux";

const Cart = () => {
  const isCartVisible = useSelector((state) => state.cart.isVisible);

  if (!isCartVisible) {
    return null;
  }

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>

      <div className="cart-item">
        <h2>Test Item</h2>

        <p>$18.00 ($6.00/item)</p>

        <div>
          <button>-</button>
          <span>x 3</span>
          <button>+</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;