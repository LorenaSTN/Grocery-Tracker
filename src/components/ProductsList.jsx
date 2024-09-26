import "../scss/main/ProductsList.scss";
import Paper from "../images/paper.png";

function ProductsList({
  product,
  onInputChange,
  onAddProduct,
  products,
  onCheckedProduct,
}) {
  return (
    <div className="container_products">
      <div className="products__form">
        <form className="form" onSubmit={onAddProduct}>
          <input
            className="input js-inputAdd"
            type="text"
            name="addProduct"
            id="addProduct"
            placeholder="New Product"
            value={product}
            onChange={onInputChange}
          />
          <button className="button js-buttonAdd" type="submit">
            Add
          </button>
        </form>

        <div
          className="products__list"
          style={{
            backgroundImage: `url(${Paper})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "40vw",
          }}
        >
          <h3 className="products__title">Grocery List:</h3>
          <ul>
            {products.map((prod, index) => (
              <li key={index}>
                <input
                  type="checkbox"
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
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
