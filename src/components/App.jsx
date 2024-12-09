import "../scss/App.scss";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import localStorage from "./services/localStorage";
import useSectionObserver from "./services/useSectionObserver";
import Nav from "./Nav";
import Header from "./Header";
import Shopping from "./Shopping";
import Statistics from "./Statistics";

function App() {
  const [product, setProduct] = useState("");
  const [productsList, setProductsList] = useState(
    localStorage.get("groceryList", [])
  );
  const [total, setTotal] = useState(localStorage.get("totalPrice", 0));
  const [showModal, setShowModal] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [price, setPrice] = useState("");
  const [monthlyTotals, setMonthlyTotals] = useState(
    localStorage.get("monthlyTotals", {})
  );
  const [currentSlide, setCurrentSlide] = useState(1);
  const [hash, setHash] = useState("");
  const location = useLocation();

  const handleInputChange = (ev) => setProduct(ev.target.value);

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
    setProductsList(updatedProducts);
    setTotal(newTotal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPrice(0);
    setSelectedProductIndex(null);
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

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const formatMonthYear = (monthYear, short = false) => {
    const [month, year] = monthYear.split("/");
    return short
      ? `${month}/${year.slice(-2)}`
      : `${monthNames[+month - 1]} / ${year}`;
  };

  const formattedData = Object.entries(monthlyTotals).map(
    ([date, { total }]) => ({
      x: formatMonthYear(date, true),
      y: total,
    })
  );

  const formattedDataDonut = formattedData.filter((data) => data.y > 0);

  const yValues = formattedData.map((data) => data.y);
  const yMin = Math.floor(Math.min(...yValues));
  const yMax = Math.ceil(Math.max(...yValues));
  const tickValues = Array.from(
    { length: yMax - yMin + 1 },
    (_, i) => yMin + i
  );

  const colors = [
    "hsl(100,91%,17.5%)",
    "hsl(114.4,26.2%,52.2%)",
    "hsl(99,47.6%,83.5%)",
    "hsl(109, 48%, 67%)",
    "hsl(109, 48%, 9%)",
    "hsl(109, 48%, 30%)",
    "hsl(125, 60%, 67%)",
    "hsl(67.9,70.6%,60%)",
    "hsl(115, 16%, 67%)",
    "hsl(115, 72%, 33%)",
    "hsl(115, 100%, 100%)",
    "hsl(0,0%,69.8%)",
  ];

  useSectionObserver(setHash);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === 1 ? 2 : 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const radio = document.getElementById(`slide${currentSlide}`);
    if (radio) radio.checked = true;
  }, [currentSlide]);

  useEffect(() => {
    localStorage.set("groceryList", productsList);
    localStorage.set("totalPrice", total);
    localStorage.set("monthlyTotals", monthlyTotals);
  }, [productsList, total, monthlyTotals]);

  return (
    <div>
      <Nav />
      <div id="inicio">
        <Header />
      </div>
      <div id="compras">
        <Shopping
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
          monthlyTotals={monthlyTotals}
        />
      </div>
      <div id="gastos">
        <Statistics
          formattedData={formattedData}
          formattedDataDonut={formattedDataDonut}
          tickValues={tickValues}
          colors={colors}
        />
      </div>
    </div>
  );
}

export default App;
