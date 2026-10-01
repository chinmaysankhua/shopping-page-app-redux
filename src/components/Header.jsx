import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../store/cartSlice";

const Header = () => {
  const dispatch = useDispatch();

  const totalQuantity = useSelector(
    (state) => state.cart.totalQuantity
  );

  const cartHandler = () => {
    dispatch(toggleCart());
  };

  return (
    <header>
      <h1>ReduxCart</h1>

      <button onClick={cartHandler}>
        My Cart
        <span>{totalQuantity}</span>
      </button>
    </header>
  );
};

export default Header;