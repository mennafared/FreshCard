import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/shopping-cart-logo.png";
import { userContext } from '../../Context/User.context';
import { cartContext } from '../../Context/Cart.context';
import { wishlistContext } from '../../Context/Wishlist.context';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logOut } = useContext(userContext);
  const { getCartInfo, cartInfo } = useContext(cartContext);
  const { getWishlistInfo, wishlist } = useContext(wishlistContext);

  useEffect(() => {
    getCartInfo();
  }, []);

  useEffect(() => {
    getWishlistInfo();
  }, []);

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };


  return (
    <>
      <nav className={`nav bg-gray-200 fixed shadow-md z-50 left-0 right-0 top-0 ${styles.nav}`}>
        <div className='bg-teal-500 text-white py-2'>
          <div className="container px-3 mx-auto flex justify-between items-center">
            <a href='https://www.gmail.com/' target='_blank' className='flex items-center cursor-pointer'>
              <i className='fa-solid fa-envelope pr-2'></i>
              <span className='mb-0.5 font-medium'>brand@gmail.com</span>
            </a>
            <ul className='flex justify-between items-center gap-3'>
              <li>
                <a href="http://www.facebook.com/" className='cursor-pointer hover:text-black' target="_blank" >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="http://www.tiktok.com/" className='cursor-pointer hover:text-black' target="_blank" >
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </li>
              <li>
                <a href="http://www.x.com/" className='cursor-pointer hover:text-black' target="_blank" >
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="http://www.instagram.com/" className='cursor-pointer hover:text-black' target="_blank" >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="http://www.linkedin.com/" className='cursor-pointer hover:text-black' target="_blank" >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="http://www.youtube.com/" className='cursor-pointer hover:text-black' target="_blank" >
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container px-2 flex py-3 flex-wrap items-center justify-between mx-auto text-black">
          <h1 className="text-2xl md:text-[2rem] font-semibold">
            <Link to="/" className='flex items-center'>
              <img src={logo} className='w-9 mr-2' alt="" />
              <span>FreshCard</span>
            </Link>
          </h1>

          {token ?
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="cursor-pointer inline-flex items-center p-2 justify-center text-black rounded-lg lg:hidden" aria-controls="navbar-default" aria-expanded={isOpen}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
            : ""}
          {token ?
            <div className={`${isOpen ? 'block' : 'hidden'} w-full lg:block lg:w-auto`} id="navbar-default">
              <ul className="flex flex-col gap-3 text-center mt-4  lg:flex-row lg:mt-0 rounded-lg">
                <li className='p-2 w-fit mx-auto'>
                  <NavLink to="/" className="block text-center cursor-pointer p-1 rounded-md relative before:absolute before:bottom-0 before:w-0 hover:before:w-[89%] before:transition-all before:duration-500 before:h-0.5 before:bg-teal-500" onClick={handleNavLinkClick}>Home</NavLink>
                </li>
                <li className='p-2 w-fit mx-auto'>
                  <NavLink to="/products" className="block cursor-pointer p-1 rounded-md relative before:absolute before:bottom-0 before:w-0 hover:before:w-[89%] before:transition-all before:duration-500 before:h-0.5 before:bg-teal-500" onClick={handleNavLinkClick}>Products</NavLink>
                </li>
                <li className='p-2 w-fit mx-auto'>
                  <NavLink to="/allorders" className="block cursor-pointer p-1 rounded-md relative before:absolute before:bottom-0 before:w-0 hover:before:w-[89%] before:transition-all before:duration-500 before:h-0.5 before:bg-teal-500" onClick={handleNavLinkClick}>Orders</NavLink>
                </li>
                <li className='p-2 w-fit mx-auto'>
                  <NavLink to="/categories" className="block cursor-pointer p-1 rounded-md relative before:absolute before:bottom-0 before:w-0 hover:before:w-[89%] before:transition-all before:duration-500 before:h-0.5 before:bg-teal-500" onClick={handleNavLinkClick}>Categories</NavLink>
                </li>
                <li className='p-2 w-fit mx-auto'>
                  <NavLink to="/brands" className="block cursor-pointer p-1 rounded-md relative before:absolute before:bottom-0 before:w-0 hover:before:w-[89%] before:transition-all before:duration-500 before:h-0.5 before:bg-teal-500" onClick={handleNavLinkClick}>Brands</NavLink>
                </li>
              </ul>
            </div>
            : ""}

          {token ?
            <div className={`${isOpen ? 'block' : 'hidden'} w-full lg:block lg:w-auto`}>
              <ul className='flex justify-end items-center'>
                <li className='relative'>
                  <Link to="/cart" className="block cursor-pointer py-2 px-3 rounded-md" onClick={handleNavLinkClick}>
                    <i className='fa-solid fa-cart-shopping text-lg'></i>
                    <span className='bg-teal-500 text-sm font-semibold rounded-full absolute top-0 right-0 w-5 h-5 flex items-center justify-center'>
                      {cartInfo === null ? <i className='fa-solid fa-spinner fa-spin'></i> : cartInfo.numOfCartItems || 0}
                    </span>
                  </Link>
                </li>
                <li className='relative'>
                  <Link to="/wishlist" className="block cursor-pointer py-2 px-3 rounded-md" onClick={handleNavLinkClick}>
                    <i className='fa-solid fa-heart text-xl'></i>
                    <span className='bg-red-500 text-sm font-semibold rounded-full absolute top-0 right-0 w-5 h-5 flex items-center justify-center'>
                      {wishlist === null ? <i className='fa-solid fa-spinner fa-spin'></i> : wishlist.length || 0}
                    </span>
                  </Link>
                </li>
                <li>
                  <span onClick={logOut} className="block cursor-pointer py-2 px-3 rounded-md" onClick={handleNavLinkClick}>
                    <i className='fa-solid fa-right-from-bracket text-lg'></i>
                  </span>
                </li>
              </ul>
            </div>
            : ""}

          {!token ?
            <div>
              <ul className='flex justify-between items-center gap-3 mr-1'>
                <li className='p-2'>
                  <NavLink to="/login" className="block cursor-pointer p-1 rounded-md relative before:absolute before:bottom-0 before:w-0 hover:before:w-[89%] before:transition-all before:duration-500 before:h-0.5 before:bg-teal-500">Login</NavLink>
                </li>
                <li className='p-2'>
                  <NavLink to="/signup" className="block cursor-pointer p-1 rounded-md relative before:absolute before:bottom-0 before:w-0 hover:before:w-[89%] before:transition-all before:duration-500 before:h-0.5 before:bg-teal-500">SignUp</NavLink>
                </li>

              </ul>
            </div> : ""}

        </div>
      </nav>
    </>
  )
}
