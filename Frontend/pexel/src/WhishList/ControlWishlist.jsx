// Example of getWishlist function
export const getWishlist = () => {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : {};
  };
  
  
  export const addToWishlist = (product) => {
    console.log('add',product);
    const wishlist = getWishlist();
    wishlist[product.id] = product;
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };
  
  export const removeFromWishlist = (productId) => {
    const wishlist = getWishlist();
    delete wishlist[productId];
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };
  
  export default getWishlist;
  