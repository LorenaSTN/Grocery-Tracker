function ProductsList({ product, onInputChange, onAddProduct, products }) {
  return (
    <div>
      <section className="section1">
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

        <div>
          <h3>Product List:</h3>
          <ul>
            {products.map((prod, index) => (
              <li>
                <input type="checkbox" />
                <span key={index}>{prod}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default ProductsList;
