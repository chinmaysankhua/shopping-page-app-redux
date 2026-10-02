import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import Cart from "./components/Cart";
import Product from "./components/Product";
import Notification from "./components/Notification";
import {
  setCart,
  sendCartData,
  clearNotification,
} from "./store/cartSlice";


import { fetchCart } from "./firebaseCart";

const App = () => {
  const dispatch = useDispatch();

  // --------------------------------
  // REDUX STATE
  // --------------------------------

  const cart = useSelector(
    (state) => state.cart
  );

  // --------------------------------
  // LOCAL STATE
  // --------------------------------

  const [cartLoaded, setCartLoaded] =
    useState(false);

  const initialLoad = useRef(true);

  // --------------------------------
  // LOAD CART FROM FIREBASE
  // --------------------------------

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await fetchCart();

        if (data) {
          dispatch(setCart(data));
        }
      } catch (error) {
        console.error(
          "Failed to load cart:",
          error
        );
      } finally {
        setCartLoaded(true);
      }
    };

    loadCart();
  }, [dispatch]);

  // --------------------------------
  // SEND CART TO FIREBASE
  // --------------------------------

  useEffect(() => {
    // Don't send before Firebase cart
    // has been loaded.
    if (!cartLoaded) {
      return;
    }

    // Don't send the cart immediately
    // after the initial Firebase load.
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }

    dispatch(sendCartData(cart));
  }, [
    cart.items,
    cart.totalQuantity,
    cartLoaded,
    dispatch,
  ]);

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <>
     <Notification
  status={cart.notification.status}
  message={cart.notification.message}
  onClear={() => dispatch(clearNotification())}
/>

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