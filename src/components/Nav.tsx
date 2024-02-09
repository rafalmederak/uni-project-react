import { NavLink } from "react-router-dom";
import "styles/nav.css";
import logo from "assets/images/logo.png"; 



const Nav = () => {
  const currentUser = { id: "1" }; 
  return (
    <nav>
      <img src={logo} alt="Logo" className="nav-logo" />
      <NavLink to={`/user/${currentUser.id}`}>Current User</NavLink>

      <NavLink to="/">Home</NavLink>
      
      <NavLink to="/posts">Posts</NavLink>
      <NavLink to="/albums">Albums</NavLink>
      <NavLink to="/photos">Photos</NavLink>
      <NavLink to="/users">Users</NavLink>

    </nav>
  );
};

export default Nav;
