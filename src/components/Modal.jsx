import "../scss/main/Modal.scss";

function Modal({
  showModal,
  onCloseModal,
  onPriceChange,
  selectedProductIndex,
  price,
  onSubmitPrice,
  products,
}) {
  if (!showModal) {
    return null;
  }

  return (
    <>
      <div className="modal-overlay"></div>
      <div className="modal">
        <div className="modal__content">
          <span className="modal__close" onClick={onCloseModal}>
            <i class="fa-solid fa-xmark"></i>
          </span>
          <h2>Add price for {products[selectedProductIndex]?.name}</h2>
          <form onSubmit={onSubmitPrice}>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={onPriceChange}
              placeholder="Enter price"
              required
              className="modal__input"
            />
            <button className="button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal;
