import React, { useEffect, useState } from 'react';
import './ProductListing.css';
import { getWishlist, removeFromWishlist, addToWishlist } from '../WhishList/ControlWishlist';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const [save, setSave] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const apiKey = 'CBo9wUkfBPFUFZ5TKvD9kxWg1v2KcqxbAQLIgbzQIGBcmttIADdQBVxm';
      const url = 'https://api.pexels.com/v1/search?query=products&per_page=25';

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: apiKey,
          },
        });
        const data = await response.json();
        setProducts(data.photos);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const wishlistHandler = (product) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = { ...prevWishlist };
      if (updatedWishlist[product.id]) {
        removeFromWishlist(product.id);
        delete updatedWishlist[product.id];
      } else {
        addToWishlist(product);
        updatedWishlist[product.id] = product;
      }
      return updatedWishlist;
    });
  };

  const savingHandler = (productId) => {
    setSave((prevSaved) => ({
      ...prevSaved,
      [productId]: !prevSaved[productId],
    }));
  };

  return (
    <div className="image-listing">
      <div className="image-grid">
        {products.map((product) => (
          <div key={product.id} className="image-card">
            <i
              className={`fa-heart wishlist-icon ${wishlist[product.id] ? 'fa-solid' : 'fa-regular'}`}
              onClick={() => wishlistHandler(product)}
            ></i>
            <i
              className={`fa-bookmark save-icon ${save[product.id] ? 'fa-solid' : 'fa-regular'}`}
              onClick={() => savingHandler(product.id)}
            ></i>
            <img src={product.src.medium} alt={product.photographer} />
            <div className="photographer-name">{product.alt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
  