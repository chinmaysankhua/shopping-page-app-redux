import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

const Product = () => {
  const dispatch = useDispatch();

  const product = {
    id: 1,
    title: "Test",
    price: 6,
    description: "This is a first product - amazing!",
  };

  const addToCartHandler = () => {
    dispatch(addItem(product));
  };

  return (
    <div className="product">
      <h2>{product.title}</h2>

      <p>{product.description}</p>

      <span>${product.price.toFixed(2)}</span>

      <button onClick={addToCartHandler}>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;