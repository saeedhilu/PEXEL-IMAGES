import React, { useState, useEffect } from 'react';
import './Navstyle.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  return (
    <div className='navbar'>
      <div className='navbar__logo'>Pexel</div>
      <div className='navbar__links'>
        <Link to='/'>Home</Link>
        <Link to='/whishlist'>Wishlist</Link>
        <Link to='#'>SavedList</Link>
        {isLoggedIn ? (
          <Link to='/account'>Account <i className="fa-solid fa-user"></i></Link>
        ) : (
          <Link to='/login'>Sign In <i className="fa-solid fa-user"></i></Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
