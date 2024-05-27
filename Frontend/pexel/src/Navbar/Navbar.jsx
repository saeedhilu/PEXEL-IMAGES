import React, { useState, useEffect } from 'react';
import './Navstyle.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user-data');
    setIsLoggedIn(!!userData);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user-data');
    setIsLoggedIn(false);
    navigate('/'); 
  };

  return (
    <div className='navbar'>
      <div className='navbar__logo'>Pexel</div>
      <div className='navbar__links'>
        <Link to='/'>Home</Link>
        <Link to='/whishlist'>Wishlist</Link>
       
        {isLoggedIn ? (
          <>
            <a href="#" onClick={handleSignOut}>Sign Out <i className="fa-solid fa-user"></i></a>
            <Link to='/account'> </Link>
          </>
        ) : (
          <Link to='/login'>Sign In <i className="fa-solid fa-user"></i></Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
