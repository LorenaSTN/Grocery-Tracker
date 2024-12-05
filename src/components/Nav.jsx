import React from "react";
import "../scss/components/Nav.scss";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="Nav-wrapper">
      <ul className="Nav-ul">
        <li className="Nav-li">
          <Link to="/#inicio">Inicio</Link>
        </li>
        <li className="Nav-li">
          <Link to="/#compras">Compras</Link>
        </li>
        <li className="Nav-li">
          <Link to="/#gastos">Gastos</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
