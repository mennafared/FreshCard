import React, { useContext, useEffect } from 'react'
import { wishlistContext } from '../../Context/Wishlist.context';
import Loading from '../../Components/Loading/Loading';
import emptyWishlist from "../../assets/no wishlist.png"
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/Cart.context';
import { Helmet } from 'react-helmet';

export default function Wishlist() {
  const {
    wishlist,
    getWishlistInfo,
    removeProductFromWishlist,
  } = useContext(wishlistContext);

  const { addProductToCart } = useContext(cartContext);

  async function getWishlist() {
    await getWishlistInfo();
  }

  useEffect(() => {
    getWishlist();
  }, []);


  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      {wishlist === null ? (<Loading />) : (
        <section className='wishlist py-5'>
          <div className="container p-3 bg-gray-100">
            <div className='flex my-2 items-center justify-center'>
              <i className='fa-solid fa-heart text-2xl text-red-600'></i>
              <h2 className='text-2xl  mx-3 font-semibold'>Wishlist</h2>
              <i className='fa-solid fa-heart text-2xl text-red-600'></i>
            </div>
            {wishlist.length === 0 ? (
              <div className='empty-wishlist flex flex-col items-center justify-center my-4'>
                <img src={emptyWishlist} alt="" />
                <h3 className='text-xl font-medium mb-4 text-gray-800'>The wishlist is empty</h3>
                <Link to="/products" className='btn font-medium text-lg'>Go Shopping</Link>
              </div>
            ) : (
              <div className="product-wishlist">
                {wishlist.map((product) => (
                  <div key={product._id} className='lg:grid my-3 pt-10 lg:grid-cols-10'>
                    <div className="col-span-3 lg:col-start-2">
                      <div className="flex mb-3">
                        <img src={product.imageCover}
                          className='w-24'
                          alt="" />
                        <div className="details ml-3 mt-2">
                          <h3 className='text-lg font-semibold text-teal-500'>{product.title}</h3>
                          <h4 className='m-1'>{product.brand?.name}</h4>
                          <div>
                            <i className='fa-solid fa-star text-yellow-300 mx-1'></i>
                            {product.ratingsAverage}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between lg:justify-around lg:col-span-6">
                      <div className="col-span-3 ml-2 lg:ml-0 font-medium text-2xl text-gray-700 flex justify-center items-center">
                        {product.price}
                      </div>

                      <div className="col-span-3 flex justify-center items-center">
                        <button onClick={() => { addProductToCart({ id: product.id }) }} className='btn mr-3'>
                          <i className='fa-solid fa-cart-shopping mr-2'></i>
                          Add To Cart
                        </button>
                        <button onClick={() => (
                          removeProductFromWishlist({ id: product.id })
                        )}
                          className='btn bg-red-600 hover:bg-red-700'>
                          <i className='fa-solid fa-trash mr-2'></i>
                          Remove
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}


