import { Link, useLocation } from "react-router-dom";
import Shopping from "../images/shoppingcart.png";
import Statistics from "../images/statistic.png";

function Icons() {
  const location = useLocation();

  const icon = location.pathname === "/shoppingList" ? Statistics : Shopping;

  const linkTo =
    location.pathname === "/shoppingList" ? "/statistics" : "/shoppingList";

  return (
    <Link to={linkTo}>
      <img className="products__home" src={icon} alt="Navigation Icon" />
    </Link>
  );
}

export default Icons;
