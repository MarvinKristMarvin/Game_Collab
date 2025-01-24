import { NavLink } from "react-router-dom";
import logo from "/logox200.webp";
import searchIcon from "/searchIcon.webp";
import profileIcon from "/profileIcon.webp";
import "./Header.scss";

// Header with navlinks
function Header() {
  return (
    <header className="headerComponent" aria-label="website header">
      <nav aria-label="website navigation">
        <ul>
          <li>
            <NavLink
              to="/search"
              className="navlink"
              aria-label="browse profiles"
            >
              <img src={searchIcon} alt="search icon" /> SEARCH
            </NavLink>
          </li>
          <li className="logo">
            <NavLink
              to="/"
              className="navlink logolink"
              aria-label="go to homepage"
            >
              <img src={logo} alt="Game Hearts logo" />
              GAME HEARTS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className="navlink"
              aria-label="log in and modify your profile"
            >
              <img src={profileIcon} alt="profile icon" /> PROFILE
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
