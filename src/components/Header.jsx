import { useDispatch } from "react-redux";
import { toggleCart } from "../store/cartSlice";

const Header = () => {
  const dispatch = useDispatch();

  const cartHandler = () => {
    dispatch(toggleCart());
  };

  return (
    <header>
      <h1>ReduxCart</h1>

      <button onClick={cartHandler}>
        My Cart
        <span>1</span>
      </button>
    </header>
  );
};

export default Header;