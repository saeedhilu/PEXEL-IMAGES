// WishlistPage.js
import React, { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "./ControlWishlist";
import './Whislist.css';
import Navbar from "../Navbar/Navbar";
import Animation from '../images/Animation.gif';

const WishlistPage = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    const storedWishlist = getWishlist();
    setWishlistProducts(Object.values(storedWishlist));
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    setWishlistProducts(prevWishlist => prevWishlist.filter(product => product.id !== productId));
  };

  return (
    <div>
      <Navbar />
      <div className="wishlist-page">
        <h2>Wishlist</h2>
        {wishlistProducts.length > 0 ? (
          <div className="wishlist-grid">
            {wishlistProducts.map((product, index) => (
              <div key={index} className="wishlist-card">
                <img src={product.src?.medium} alt={product.alt} />
                <button onClick={() => handleRemoveFromWishlist(product.id)}>X</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="wishlist-empty">
            <img src={Animation} alt="Animation" style={{ width: '200px' }} />
            <p>Your wishlist is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
