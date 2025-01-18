import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext); 

  useEffect(() => {
   checkAuthentication();
  }, []); 



  const checkAuthentication = () => {
    let yourpholioData = JSON.parse(localStorage.getItem('yourpholio'));
    if (yourpholioData && yourpholioData.uid) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('yourpholio'); 
    setIsAuthenticated(false); 
    navigate('/signin'); 
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          {isAuthenticated && (
            <>
              <NavLink to="/" activeClassName="active-link">Details</NavLink>
              <NavLink to="/resume" activeClassName="active-link">Resume</NavLink>
            </>
          )}
        </div>

        <button className="navbar-toggler" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <div className={`navbar-right ${isOpen ? 'active' : ''}`}>
          {!isAuthenticated && (
            <>
              <NavLink to="/signin" activeClassName="active-link">Sign In</NavLink>
              <NavLink to="/signup" activeClassName="active-link">Sign Up</NavLink>
            </>
          )}
          {isAuthenticated && (
            <span onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</span>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
