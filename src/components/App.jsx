import "../scss/App.scss";
import { useState } from "react";
import Header from "./Header";
import ProductList from "./ProductsList";
import { Route, Routes } from "react-router-dom";

function App() {
  const [product, setProduct] = useState("");
  const [productsList, setProductsList] = useState([]);

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

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Header />} />

        <Route
          path="/shoppinglist"
          element={
            <>
              <ProductList
                product={product}
                onInputChange={handleInputChange}
                onAddProduct={handleAddProduct}
                products={productsList}
                onCheckedProduct={handleCheckedProduct}
              />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
