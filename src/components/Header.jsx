import Grocery from "../images/grocery.png";
import "../scss/main/Header.scss";
import Menu from "../components/Menu.jsx";
import Profile from "../images/profile.png";
import Donut from "../images/donut2.png";
import Donut2 from "../images/donut3.png";

function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul>
          <li className="header__li">
            <img className="header__profile" src={Profile} alt="" />
          </li>
        </ul>
      </nav>
      <img className="header__title" src={Grocery} alt="Grocery Tracker" />

      <img className="header__donut1" src={Donut2} alt="Donut" />

      <a href="https://subpng.com/png/pink-sprinkle-donut-png-91-86uhwlbsqitrnvy4.html">
        <img className="header__donut" src={Donut} alt="" />
      </a>

      <Menu />
    </header>
  );
}

export default Header;
