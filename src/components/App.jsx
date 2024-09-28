import "../scss/App.scss";
import { useState, useEffect } from "react";
import Header from "./Header";
import ProductList from "./ProductsList";
import { Route, Routes } from "react-router-dom";
import localStorage from "../services/localStorage";
import Statistics from "./Statistics";

function App() {
  const [product, setProduct] = useState("");
  const [productsList, setProductsList] = useState(
    localStorage.get("groceryList", [])
  );
  const [total, setTotal] = useState(localStorage.get("totalPrice", 0));
  const [showModal, setShowModal] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [price, setPrice] = useState(0);

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

    setSelectedProductIndex(index);
    setShowModal(true);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = productsList.filter((_, i) => i !== index);
    setProductsList(updatedProducts);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProductIndex(null);
    setPrice(0);
  };

  const handlePriceChange = (ev) => {
    setPrice(parseFloat(ev.target.value));
  };

  const handleSubmitPrice = (ev) => {
    ev.preventDefault();
    if (!isNaN(price) && price > 0) {
      const updatedProducts = [...productsList];
      updatedProducts[selectedProductIndex].price = price;
      setProductsList(updatedProducts);

      const newTotal = updatedProducts.reduce(
        (acc, prod) => acc + (prod.price || 0),
        0
      );
      setTotal(newTotal);
      handleCloseModal();
    }
  };
  useEffect(() => {
    localStorage.set("groceryList", productsList);
    localStorage.set("totalPrice", total);
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
              onRemoveProduct={handleRemoveProduct}
              showModal={showModal}
              selectedProductIndex={selectedProductIndex}
              price={price}
              onPriceChange={handlePriceChange}
              onSubmitPrice={handleSubmitPrice}
              total={total}
              onCloseModal={handleCloseModal}
            />
          }
        />

        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </div>
  );
}

export default App;
