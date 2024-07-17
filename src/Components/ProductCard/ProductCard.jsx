import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/Cart.context';
import { wishlistContext } from '../../Context/Wishlist.context';


export default function ProductCard({ productInfo }) {

  const { id, imageCover, title, price, category, ratingsAverage } = productInfo;
  const { addProductToCart } = useContext(cartContext);
  const { addProductToWishlist, removeProductFromWishlist, wishlist } = useContext(wishlistContext);

  function handleWishlistClick(event) {
    event.stopPropagation();
    const isInWishlist = Array.isArray(wishlist) && wishlist.some(product => product.id === id);


    if (isInWishlist) {
      removeProductFromWishlist({ id });

    } else {
      addProductToWishlist({ id });
    }
  }

  const isInWishlist = Array.isArray(wishlist) && wishlist.some(product => product.id === id);


  return (
    <>
      <div className="col-span-2 bg-gray-100 group/layer shadow-md rounded-lg overflow-hidden">
        <div className="card-img relative">
          <img src={imageCover} className='w-full block object-cover' alt="" />
          <div className="layer group-hover/layer:opacity-100 opacity-0 transition-opacity duration-500 absolute bg-black bg-opacity-30 left-0 top-0 h-full w-full">
            <div className='text-white text-sm gap-3 flex items-center justify-center h-full '>
              <div className="icon cursor-pointer hover:scale-100 transition-all duration-400 hover:rotate-6 hover:text-black w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center">
                <i
                  onClick={handleWishlistClick}
                  className={` fa-heart ${isInWishlist ? 'fa-solid text-red-600' : 'fa-regular'}`}
                ></i>
              </div>
              <div onClick={() => { addProductToCart({ id }) }} className="icon cursor-pointer hover:scale-100 transition-all duration-400 hover:rotate-6 hover:text-black w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center">
                <i className='fa-solid fa-cart-shopping'></i>
              </div>
              <Link to={`/product/${id}`} className="icon cursor-pointer hover:scale-100 transition-all duration-400 hover:rotate-6 hover:text-black w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center">
                <i className='fa-solid fa-eye '></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="card-content bg-gray-100 p-3">
          <h3 className='text-teal-500'>{category.name}</h3>
          <h2 className='font-medium text-lg line-clamp-1'>{title}</h2>
          <div className='flex items-center justify-between my-4'>
            <span>{price} EGP</span>
            <div className='flex items-center gap-1'>
              <i className='fa-solid fa-star text-yellow-300'></i>
              <span className='text-gray-500'>{ratingsAverage}</span>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}



