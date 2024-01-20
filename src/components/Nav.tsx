import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/posts">Posts</NavLink>
      <NavLink to="/albums">Albums</NavLink>
      <NavLink to="/photos">Photos</NavLink>
      <NavLink to="/users">Users</NavLink>
    </nav>
  );
};

export default Nav;
