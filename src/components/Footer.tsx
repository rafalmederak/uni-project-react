import React from "react";
import "styles/footer.css";
import logo from "assets/images/logo.png"; 
import { NavLink } from "react-router-dom"; 


const Footer: React.FC = () => {
  return (
      <footer className="footer">
          <img src={logo} alt="Logo" className="footer-logo" />
          <div className="footer-links">
              <NavLink to="/posts">Posts</NavLink>
              <NavLink to="/albums">Albums</NavLink>
              <NavLink to="/photos">Photos</NavLink>
              <NavLink to="/users">Users</NavLink>
          </div>
          <p>2024 React Project Uni</p>
      </footer>
  );
}


export default Footer;
