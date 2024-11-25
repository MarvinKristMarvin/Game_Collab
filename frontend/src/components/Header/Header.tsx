import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import searchIcon from "../../assets/images/searchIcon.png";
import profileIcon from "../../assets/images/profileIcon.png";
import "./Header.css";

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
