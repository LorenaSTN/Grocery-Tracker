import ShoppingCart from "../images/shoppingcart.png";
import Statistic from "../images/statistic.png";
import "../scss/main/Menu.scss";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="menu__container">
      <Link
        className="menu__a"
        to="./shoppinglist"
        data-tooltip="Shopping List"
      >
        <img className="menu__circles" src={ShoppingCart} alt="Shopping Cart" />
      </Link>
      <Link className="menu__a" to="./statistics" data-tooltip="Statistics">
        <img className="menu__circles" src={Statistic} alt="Statistic" />
      </Link>
    </div>
  );
}

export default Menu;
