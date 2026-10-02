import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import Cart from "./components/Cart";
import Product from "./components/Product";
import Notification from "./components/Notification";

import { setCart } from "./store/cartSlice";

import {
  fetchCart,
  saveCart,
} from "./firebaseCart";

const App = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [status, setStatus] = useState(null);
  const [cartLoaded, setCartLoaded] = useState(false);

  // Load cart from Firebase when app starts
  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await fetchCart();

        if (data) {
          dispatch(setCart(data));
        }
      } catch (error) {
        console.error(error);

        setStatus("error");

        setTimeout(() => {
          setStatus(null);
        }, 3000);
      } finally {
        setCartLoaded(true);
      }
    };

    loadCart();
  }, [dispatch]);

  // Save cart whenever Redux cart changes
  useEffect(() => {
    if (!cartLoaded) {
      return;
    }

    const sendCartData = async () => {
      setStatus("sending");

      try {
        await saveCart(cart);

        setStatus("success");

        setTimeout(() => {
          setStatus(null);
        }, 2000);
      } catch (error) {
        console.error(error);

        setStatus("error");

        setTimeout(() => {
          setStatus(null);
        }, 3000);
      }
    };

    sendCartData();
  }, [
    cart.items,
    cart.totalQuantity,
    cartLoaded,
  ]);

  return (
    <>
      <Notification status={status} />

      <Header />

      <Cart />

      <h2 className="products-title">
        BUY YOUR FAVORITE PRODUCTS
      </h2>

      <Product />
    </>
  );
};

export default App;