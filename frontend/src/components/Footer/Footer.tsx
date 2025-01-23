import { Link } from "react-router-dom";
import "./Footer.css";

// Footer which displays the contact email at the bottom of the page
function Footer() {
  return (
    <footer className="footerComponent" aria-label="website footer">
      <Link to="/contact">Contact us</Link>
      <Link to="/privacypolicy">Privacy policy</Link>
    </footer>
  );
}

export default Footer;
