import { NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/images/brand_MedTrack.svg";

const Navbar = () => {
  const location = useLocation();

  // Function to determine link text based on the current route
  const getLinkText = () => {
    if (location.pathname === "/") {

      return "Inventory";
    } else if (location.pathname === "/inventory") {

      return "Home";
    }
    return "Home";
  };

  return (
    <div className="nav-bar d-flex justify-content-between align-items-center">
      <header>
        <img src={Logo} alt="Logo" className="px-2" />
        <h2>MedTrack</h2>
      </header>
      <nav className="px-4">
        <NavLink to={location.pathname === "/" ? "/pharmacy" : "/"}>{getLinkText()}</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
