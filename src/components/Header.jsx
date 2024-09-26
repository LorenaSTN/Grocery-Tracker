import Grocery from "../images/grocery.png";
import "../scss/main/Header.scss";
import Menu from "../components/Menu.jsx";
import Baguette from "../images/baguette.png";

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

      <img className="header__baguette" src={Baguette} alt="" />

      <Menu />
    </header>
  );
}

export default Header;
