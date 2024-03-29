import { NavLink } from "react-router-dom";
import "styles/nav.css";
import logo from "assets/images/logo.png";

const Nav = () => {
  return (
    <nav>
      <img src={logo} alt="Logo" className="nav-logo" />
      <NavLink to="/">Home</NavLink>
      <NavLink to="/posts">Posts</NavLink>
      <NavLink to="/albums">Albums</NavLink>
      <NavLink to="/photos">Photos</NavLink>
      <NavLink to="/users">Users</NavLink>
      <NavLink to={`/profile`}>Profile</NavLink>
    </nav>
  );
};

export default Nav;
