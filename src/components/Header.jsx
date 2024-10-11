import Grocery from "../images/grocery.png";
import "../scss/main/Header.scss";
import Menu from "./Menu.jsx";

function Header() {
  return (
    <header className="header">
      <img className="header__title" src={Grocery} alt="Grocery Tracker" />

      <Menu />
    </header>
  );
}

export default Header;
