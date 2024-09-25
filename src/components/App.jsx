import "../scss/App.scss";
import { useState } from "react";
import Header from "./Header";
import ProductList from "./ProductsList";

function App() {
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState([]);

  const handleInputChange = (ev) => {
    setProduct(ev.target.value);
  };

  const handleAddProduct = (ev) => {
    ev.preventDefault();
    if (product.trim() !== "") {
      setProducts([...products, product]);
      setProduct("");
    }
  };

  return (
    <div>
      <Header />

      <ProductList
        product={product}
        onInputChange={handleInputChange}
        onAddProduct={handleAddProduct}
        products={products}
      />
    </div>
  );
}

export default App;
