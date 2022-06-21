import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <nav>
        <ul>
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            to="/fav"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Favs</li>
          </NavLink>
        </ul>
      </nav>
      <h1>// Watch me now</h1>
    </div>
  );
};

export default Header;
