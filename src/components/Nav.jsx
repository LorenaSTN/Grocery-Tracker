import { Link } from "react-router-dom";
import Home from "../images/home.png";
import Icons from "./Icons";

function Nav() {
  return (
    <nav className="cont__nav">
      <Link to="/">
        <img className="products__home" src={Home} alt="Home" />
      </Link>
      <Icons />
    </nav>
  );
}

export default Nav;
