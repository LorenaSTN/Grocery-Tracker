import ShoppingCart from "../images/shoppingcart.png";
import Statistic from "../images/statistic.png";
import "../scss/main/Menu.scss";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="menu__container">
      <Link className="menu__a" to="./shoppinglist">
        <img className="menu__circles" src={ShoppingCart} alt="Shopping Cart" />
      </Link>

      <Link className="menu__a" to="./statistics">
        <img className="menu__circles" src={Statistic} alt="Statistic" />
      </Link>
    </div>
  );
}

export default Menu;
