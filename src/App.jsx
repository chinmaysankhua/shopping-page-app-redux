import Header from "./components/Header";
import Cart from "./components/Cart";
import Product from "./components/Product";

const App = () => {
  return (
    <>
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