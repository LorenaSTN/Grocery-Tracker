import "../scss/main/ProductsList.scss";
import Juice from "../images/juice.png";

function ProductsList({
  product,
  onInputChange,
  onAddProduct,
  products,
  onCheckedProduct,
  onAddValue,
}) {
  return (
    <div className="container_products">
      <img className="products__juice" src={Juice} alt="Juice" />
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
                  onChange={() => onCheckedProduct(index)}
                />
                <span
                  className={`products__span ${prod.checked ? "checked" : ""}`}
                >
                  {prod.name}
                </span>
              </li>
            ))}
          </ul>
          <form className="form__value" onSubmit={onAddValue}>
            <label htmlFor="value">Value</label>
            <input className="input__submit" type="number" name="value" />
            <button className="button" type="submit">
              Submit{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
