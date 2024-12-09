import "../scss/components/Shopping.scss";
import Modal from "./Modal.jsx";
function Shopping({
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
    <div className="container-products">
      <div className="products-backgroundshape"></div>
      <div className="products-form">
        <form className="form" onSubmit={onAddProduct}>
          <input
            className="input-add"
            type="text"
            name="addProduct"
            id="addProduct"
            placeholder="Producto"
            value={product}
            onChange={onInputChange}
          />
          <button className="button" type="submit">
            Añadir
          </button>
        </form>
        <div className="products-list">
          <div>
            <h3 className="products-title">LISTA:</h3>
            <ul className="products-ul">
              {products.map((prod, index) => (
                <li className="products-li" key={index}>
                  <input
                    type="checkbox"
                    className="products-input"
                    checked={prod.checked}
                    onChange={handleCheck.bind(null, index)}
                  />
                  <span
                    className={`products-span ${prod.checked ? "checked" : ""}`}
                  >
                    {prod.name}
                  </span>
                  <button
                    className="material-symbols-outlined products-button"
                    onClick={handleRemove.bind(null, index)}
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="products-final">
            <h4 className="products-total">Total: {total.toFixed(2)}€</h4>
            <button className="button" onClick={onSaveTotal}>
              Finalizar
            </button>
          </div>
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
export default Shopping;
