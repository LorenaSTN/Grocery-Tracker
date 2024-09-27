import Wallet from "../images/wallet.png";
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
      <a className="menu__a" href="">
        <img className="menu__circles" src={Statistic} alt="Statistic" />
      </a>
      {/* <a className="menu__a" href="./wallet">
        <img className="menu__circles" src={Wallet} alt="Wallet" />
      </a> */}
    </div>
  );
}

export default Menu;
