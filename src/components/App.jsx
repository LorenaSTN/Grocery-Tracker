import "../scss/App.scss";
import { useState, useEffect } from "react";
import Header from "./Header";
import ProductList from "./ProductsList";
import { Route, Routes } from "react-router-dom";
import localStorage from "../services/localStorage";
import Wallet from "./Wallet";

function App() {
  const [product, setProduct] = useState("");
  const [productsList, setProductsList] = useState(
    localStorage.get("groceryList", [])
  );

  const handleInputChange = (ev) => {
    setProduct(ev.target.value);
  };

  const handleAddProduct = (ev) => {
    ev.preventDefault();
    if (product.trim() !== "") {
      setProductsList([...productsList, { name: product, checked: false }]);
      setProduct("");
    }
  };

  const handleCheckedProduct = (index) => {
    const updatedProducts = productsList.map((prod, i) =>
      i === index ? { ...prod, checked: !prod.checked } : prod
    );
    setProductsList(updatedProducts);
  };

  useEffect(() => {
    localStorage.set("groceryList", productsList);
  }, [productsList]);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Header />} />

        <Route
          path="/shoppinglist"
          element={
            <ProductList
              product={product}
              onInputChange={handleInputChange}
              onAddProduct={handleAddProduct}
              products={productsList}
              onCheckedProduct={handleCheckedProduct}
            />
          }
        />

        <Route path="/wallet" element={<Wallet />} />
      </Routes>
    </div>
  );
}

export default App;
