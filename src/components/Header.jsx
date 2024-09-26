import Grocery from "../images/grocery.png";
import "../scss/main/Header.scss";

function Header() {
  return (
    <header className="header">
      <a
        className="header__brand"
        href="./"
        title="Haz click para volver a la página inicial"
      >
        {/* <img className="header__subtitle" src={} alt="Grocery Tracker" /> */}
      </a>

      <img className="header__title" src={Grocery} alt="Grocery Tracker" />
    </header>
  );
}

export default Header;
