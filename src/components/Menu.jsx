import Wallet from "../images/wallet.png";
import ShoppingCart from "../images/shoppingcart.png";
import "../scss/main/Menu.scss";

function Menu() {
  return (
    <div className="menu__container">
      <img className="menu__circles" src={ShoppingCart} alt="" />
      <img className="menu__circles" src={Wallet} alt="Wallet" />
      <img className="menu__circles" src="" alt="" />
    </div>
  );
}

export default Menu;
