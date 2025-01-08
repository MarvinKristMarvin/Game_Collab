import { NavLink } from "react-router-dom";
import logo from "/logo.webp";
import searchIcon from "/searchIcon.webp";
import profileIcon from "/profileIcon.webp";
import "./Header.css";

// Header with navlinks
function Header() {
  return (
    <div className="headerComponent">
      <nav>
        <ul>
          <li>
            <NavLink to="/search" className="navlink">
              <img src={searchIcon} alt="" /> SEARCH
            </NavLink>
          </li>
          <li className="logo">
            <NavLink to="/" className="navlink logolink">
              <img src={logo} alt="" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className="navlink">
              <img src={profileIcon} alt="" /> PROFILE
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Header;
