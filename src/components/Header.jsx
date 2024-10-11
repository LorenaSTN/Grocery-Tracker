import Grocery from "../images/grocery.png";
import "../scss/main/Header.scss";
import Menu from "./Menu.jsx";
import Donut from "../images/donut3.png";
import Donut2 from "../images/donut2.png";

function Header() {
  return (
    <header className="header">
      <img className="header__title" src={Grocery} alt="Grocery Tracker" />

      <a href="https://subpng.com/png/pink-sprinkle-donut-png-91-86uhwlbsqitrnvy4.html">
        <img className="header__donut1" src={Donut2} alt="Donut" />{" "}
      </a>

      <a href="https://subpng.com/png/cheesecake-donut-png-05232024-sgdage1jnkv0nc95.html">
        <img className="header__donut" src={Donut} alt="Donut" />
      </a>

      <Menu />
    </header>
  );
}

export default Header;
