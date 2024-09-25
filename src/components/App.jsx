import "../scss/App.scss";
import { useState } from "react";
import Header from "./Header";
import ProductList from "./ProductsList";

function App() {
  const [product, setProduct] = useState("");
  const [productsList, setProductsList] = useState([]);

  const handleInputChange = (ev) => {
    setProduct(ev.target.value);
  };

  const handleAddProduct = (ev) => {
    ev.preventDefault();
    if (product.trim() !== "") {
      setProductsList([...productsList, product]);
    }
  };

  return (
    <div>
      <Header />

      <ProductList
        product={product}
        onInputChange={handleInputChange}
        onAddProduct={handleAddProduct}
        products={productsList}
      />
    </div>
  );
}

export default App;
