import React from "react";
import "../scss/components/Nav.scss";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <div className="Nav-wrapper">
        <ul className="Nav-ul">
          <li className="Nav-li">Inicio</li>
          <li className="Nav-li">Compras</li>
          <li className="Nav-li">Gastos</li>
        </ul>
      </div>
    </>
  );
}

export default Nav;
