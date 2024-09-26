import Wallet from "../images/wallet.png";
import ShoppingCart from "../images/shoppingcart.png";
import "../scss/main/Menu.scss";

function Menu() {
  return (
    <div className="menu__container">
      <a className="menu__a" href="">
        <img className="menu__circles" src={ShoppingCart} alt="Shopping Cart" />
      </a>

      <a className="menu__a" href="">
        <img className="menu__circles" src={Wallet} alt="Wallet" />
      </a>

      <a className="menu__a" href="">
        <img className="menu__circles" src="" alt="" />
      </a>
    </div>
  );
}

export default Menu;
