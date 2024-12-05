import "../scss/components/Header.scss";
import Fruit from "../images/fruit.png";
import { Link } from "react-router-dom";

function Header({ setCurrentSlide }) {
  return (
    <div className="header-wrapper">
      <div className="header-backgroundshape"></div>
      <header className="header-divtitle">
        <h1 className="header-title">Grocery Tracker</h1>
      </header>

      <div className="home-sectionwrapper">
        <section className="home-section1">
          <img className="home-image" src={Fruit} alt="Cesta de fruta" />
        </section>
        <section className="home-section2">
          <div className="section2-wrapper">
            <div className="slider">
              <input type="radio" name="slide" id="slide1" defaultChecked />
              <input type="radio" name="slide" id="slide2" />

              <div className="slides">
                <div className="first-slide">
                  <h4 className="section2-titles">
                    Crea y organiza tus compras
                  </h4>
                  <ul>
                    <li>Agrega productos fácilmente y organiza tu compra.</li>
                    <li>
                      Marca los artículos como "comprados" y registra su precio
                      de manera sencilla.
                    </li>
                  </ul>
                </div>
                <div className="second-slide">
                  <h4 className="section2-titles">Controla tus gastos</h4>
                  <ul>
                    <li>
                      Introduce el precio de cada producto comprado y lleva un
                      seguimiento de tus gastos en tiempo real.
                    </li>
                    <li>Revisa cuánto has gastado en total durante el mes.</li>
                  </ul>
                </div>
              </div>

              <div className="buttons">
                <label
                  htmlFor="slide1"
                  onClick={() => setCurrentSlide(1)}
                ></label>
                <label
                  htmlFor="slide2"
                  onClick={() => setCurrentSlide(2)}
                ></label>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="header-icon">
        <Link to="/#compras">
          <i className="fa-solid fa-caret-down"></i>
        </Link>
      </div>
    </div>
  );
}

export default Header;
