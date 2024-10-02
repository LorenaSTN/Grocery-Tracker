import "../scss/main/ProductsList.scss";
import Juice from "../images/juice.png";
import Modal from "./Modal";
import Nav from "./Nav";

function ProductsList({
  product,
  onInputChange,
  onAddProduct,
  products,
  onCheckedProduct,
  onRemoveProduct,
  showModal,
  onCloseModal,
  onPriceChange,
  selectedProductIndex,
  price,
  onSubmitPrice,
  total,
  onSaveTotal,
}) {
  const handleCheck = (index) => {
    onCheckedProduct(index);
  };

  const handleRemove = (index) => {
    onRemoveProduct(index);
  };
  return (
    <div className="cont">
      <Nav />
      <div className="container_products">
        <a href="https://subpng.com/png/pressed-orange-juice-bottle-t8xpfwcrjlpt45ov.html">
          <img className="products__juice" src={Juice} alt="Juice" />
        </a>

        <div className="products__form">
          <form className="form" onSubmit={onAddProduct}>
            <input
              className="input__add"
              type="text"
              name="addProduct"
              id="addProduct"
              placeholder="New Product"
              value={product}
              onChange={onInputChange}
            />
            <button className="button" type="submit">
              Add
            </button>
          </form>

          <div className="products__list">
            <h3 className="products__title">Grocery List :</h3>
            <ul className="products__ul">
              {products.map((prod, index) => (
                <li className="products__li" key={index}>
                  <input
                    type="checkbox"
                    className="products__input"
                    checked={prod.checked}
                    onChange={handleCheck.bind(null, index)}
                  />
                  <span
                    className={`products__span ${
                      prod.checked ? "checked" : ""
                    }`}
                  >
                    {prod.name}
                  </span>
                  <button
                    className="material-symbols-outlined products__button"
                    onClick={handleRemove.bind(null, index)}
                  >
                    remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <h4 className="products__total">Total Spent: {total.toFixed(2)}€</h4>
          <button className="button" onClick={onSaveTotal}>
            Finish Purchase
          </button>
        </div>
      </div>
      <Modal
        showModal={showModal}
        onCloseModal={onCloseModal}
        onPriceChange={onPriceChange}
        selectedProductIndex={selectedProductIndex}
        price={price}
        onSubmitPrice={onSubmitPrice}
        products={products}
      />
    </div>
  );
}

export default ProductsList;
