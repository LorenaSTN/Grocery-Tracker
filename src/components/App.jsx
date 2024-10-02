import "../scss/App.scss";
import { useState, useEffect } from "react";
import Header from "./Header";
import ProductList from "./ProductsList";
import { Route, Routes, useLocation } from "react-router-dom";
import localStorage from "../services/localStorage";
import Statistics from "./Statistics";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [product, setProduct] = useState("");
  const [productsList, setProductsList] = useState(
    localStorage.get("groceryList", [])
  );
  const [total, setTotal] = useState(localStorage.get("totalPrice", 0));
  const [showModal, setShowModal] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [price, setPrice] = useState(0);
  const [monthlyTotals, setMonthlyTotals] = useState(
    localStorage.get("monthlyTotals", {})
  );
  const location = useLocation();

  const handleInputChange = (ev) => {
    setProduct(ev.target.value);
  };

  const handleAddProduct = (ev) => {
    ev.preventDefault();
    if (product.trim() !== "") {
      setProductsList([
        ...productsList,
        { name: product, checked: false, price: 0 },
      ]);
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
    const removedProductPrice = productsList[index].price || 0;
    const newTotal = total - removedProductPrice;

    setProductsList(updatedProducts);
    setTotal(newTotal);
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

  const handleSaveTotal = () => {
    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const currentYear = currentDate.getFullYear();
    const currentMonthYear = `${currentMonth}/${currentYear}`;
    const updatedMonthlyTotals = { ...monthlyTotals };

    if (typeof updatedMonthlyTotals[currentMonthYear] !== "object") {
      updatedMonthlyTotals[currentMonthYear] = {
        total: 0,
        purchaseCount: 0,
      };
    }
    updatedMonthlyTotals[currentMonthYear].total += total;
    updatedMonthlyTotals[currentMonthYear].purchaseCount += 1;

    setMonthlyTotals(updatedMonthlyTotals);
    setTotal(0);
    setProductsList([]);
  };

  useEffect(() => {
    localStorage.set("groceryList", productsList);
    localStorage.set("totalPrice", total);
    localStorage.set("monthlyTotals", monthlyTotals);
  }, [productsList, total, monthlyTotals]);

  return (
    <div className="container">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Header />
              </motion.div>
            }
          />
          <Route
            path="/shoppinglist"
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
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
                  onSaveTotal={handleSaveTotal}
                />
              </motion.div>
            }
          />
          <Route
            path="/statistics"
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Statistics monthlyTotals={monthlyTotals} />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
