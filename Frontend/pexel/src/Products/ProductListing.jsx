import React, { useEffect, useState } from 'react';
import './ProductListing.css'
const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [whshList,setwhishlist] = useState('')
  useEffect(() => {
    const fetchProducts = async () => {
      const apiKey = 'CBo9wUkfBPFUFZ5TKvD9kxWg1v2KcqxbAQLIgbzQIGBcmttIADdQBVxm';
      const url = 'https://api.pexels.com/v1/search?query=products&per_page=15';

      try {
        const response = await fetch(url, {
          headers: {
            'Authorization': apiKey
          }
        });
        const data = await response.json();
        setProducts(data.photos);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  const wishlistHandler = (index) => {
    const newLiked = [...whshList]
    newLiked[index] = !newLiked[index]
    setwhishlist(newLiked)
  };

  return (
    <div className="image-listing">
      <div className="image-grid">
        {products.map((product) => (
          <div key={product.id} className="image-card">
            <i class="fa-regular fa-heart wishlist-icon " style={{
              background :whshList
            }} onClick={wishlistHandler} ></i>
            <i class="fa-regular fa-bookmark save-icon"></i>
            <img src={product.src.medium} alt={product.photographer} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
