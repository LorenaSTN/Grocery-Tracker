import "../scss/main/ProductsList.scss";

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

        <div className="products_list">
          <h3>Grocery List:</h3>
          <ul>
            {products.map((prod, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={prod.checked}
                  onChange={() => onCheckedProduct(index)}
                />
                <span className={prod.checked ? "checked" : ""}>
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
