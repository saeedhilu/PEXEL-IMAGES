import React, { useEffect, useState } from "react";
import { getWishlist,removeFromWishlist } from "./ControlWishlist";
import './Whislist.css';
import Navbar from "../Navbar/Navbar";
import Animation from '../images/Animation.gif'

const WishlistPage = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    const storedWishlist = getWishlist();
    console.log('Stored Wishlist:', storedWishlist); 
    setWishlistProducts(Object.values(storedWishlist));
  }, []);

  const removeFromWishlistHandler = (productId) => {
    removeFromWishlist(productId);
    setWishlistProducts((prevWishlistProducts) => prevWishlistProducts.filter(product => product.id !== productId));
  };

  return (
    <div>
        <Navbar/>
<div className="wishlist-page">
      <h2>Wishlist</h2>
      <div className="wishlist-grid">
        {wishlistProducts.length > 0 ? (
          wishlistProducts.map((product) => (
            <div key={product.id} className="wishlist-card">
<i className="fa fa-solid fa-heart wishlist-icon" onClick={() => removeFromWishlistHandler(product.id)}></i>       
       <img src={product.src?.medium} alt={product.alt} />
       <div className="photographer-name">{product.alt}</div>
            </div>
          ))
        ) : (
            <div className="animation-container">
                <div>
                <img src={Animation} alt="Animation" style={{
                    width:'200px'
                }}></img>
                </div>
                

            </div>

        )}
      </div>
    </div>
    </div>

    
  );
};

export default WishlistPage;
