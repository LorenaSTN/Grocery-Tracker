import "../scss/components/Header.scss";

function Header() {
  return (
    <>
      <header>
        <h1 className="header-title">Grocery Tracker</h1>
      </header>

      <div className="home-sectionwrapper">
        <section className="home-section1"></section>
        <section className="home-section2">
          <div className="section2-wrapper">
            <div className="slider">
              <input type="radio" name="slide" id="slide1" defaultChecked />
              <input type="radio" name="slide" id="slide2" />

              <div className="slides">
                <div className="first-slide">
                  <h4 className="section2-titles">
                    Crea y organiza tu lista de compras
                  </h4>
                  <p>Agrega productos fácilmente a tu lista.</p>
                  <p>
                    Marca los artículos como "comprados" y registra su precio de
                    manera sencilla.
                  </p>
                </div>
                <div className="second-slide">
                  <h4 className="section2-titles">Controla tus gastos</h4>
                  <p>
                    Introduce el precio de cada producto comprado y lleva un
                    seguimiento de tus gastos en tiempo real.
                  </p>
                  <p>Revisa cuánto has gastado en total durante el mes.</p>
                </div>
              </div>

              <div className="buttons">
                <label htmlFor="slide1"></label>
                <label htmlFor="slide2"></label>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Header;
