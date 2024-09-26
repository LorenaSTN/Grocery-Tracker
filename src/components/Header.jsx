import Grocery from "../images/grocery.png";
import "../scss/main/Header.scss";
import Menu from "../components/Menu.jsx";
import Baguette from "../images/baguette.png";
import Donut from "../images/donut2.png";

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

      <a href="https://subpng.com/png/baguette-french-bread-png-jfx-y3zp0j9c0ds8yngk.html">
        {" "}
        <img className="header__baguette" src={Baguette} alt="Baguette" />
      </a>

      <a href="https://subpng.com/png/pink-sprinkle-donut-png-91-86uhwlbsqitrnvy4.html">
        <img className="header__donut" src={Donut} alt="" />
      </a>

      <Menu />
    </header>
  );
}

export default Header;
