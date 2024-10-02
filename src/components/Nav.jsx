import { Link } from "react-router-dom";
import Home from "../images/home.png";

function Nav() {
  return (
    <nav className="cont__nav">
      <Link to="/">
        <img className="products__home" src={Home} alt="Home" />
      </Link>
    </nav>
  );
}

export default Nav;
