import Home from "../images/home.png";
import { Link } from "react-router-dom";

function Statistics() {
  return (
    <div>
      <nav className="cont__nav">
        <Link to="/">
          <img className="products__home" src={Home} alt="Home" />
        </Link>
      </nav>
    </div>
  );
}

export default Statistics;
