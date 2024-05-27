import React, { useEffect, useState } from 'react';
import './ProductListing.css';
import { getWishlist, removeFromWishlist, addToWishlist } from '../WhishList/ControlWishlist';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const apiKey = 'CBo9wUkfBPFUFZ5TKvD9kxWg1v2KcqxbAQLIgbzQIGBcmttIADdQBVxm';
      const url = 'https://api.pexels.com/v1/search?query=products&per_page=15';

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

  const handleDownload = (src, alt) => {
    console.log('hey');
    const img = new Image();
    img.crossOrigin = 'anonymous'; // To avoid CORS issues
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const download = canvas.toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');

      const downloadLink = document.createElement('a');
      downloadLink.href = download;
      downloadLink.download = alt || 'download.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.onerror = () => {
      console.error('Error loading image for download.');
    };
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
              className="fa fa-download download-icon"
              onClick={() => handleDownload(product.src.original, product.alt)}
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
