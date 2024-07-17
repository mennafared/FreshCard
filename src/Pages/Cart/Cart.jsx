import React, { useContext, useEffect } from 'react'
import emptyCart from "../../assets/emptycart.png"
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/Cart.context'
import Loading from '../../Components/Loading/Loading';
import { Helmet } from 'react-helmet';

export default function Cart() {
  const { cartInfo, removeProductFromCart, getCartInfo, updateProductCount, clearCart } = useContext(cartContext);

  async function getCart() {
    await getCartInfo();
  }

  useEffect(() => {
    getCart();
  }, [])

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartInfo === null ? (<Loading />) : (
        <section className='shopping-cart py-5'>
          <div className="container p-3 bg-gray-200">
            <h2 className='text-2xl text-teal-500 font-semibold'>Shopping Cart</h2>
            {cartInfo.length === 0 ? (
              <div className='empty-cart flex flex-col items-center justify-center my-4'>
                <img src={emptyCart} alt="" />
                <h3 className='text-xl font-medium mb-4 text-gray-800'>The cart is empty</h3>
                <Link to="/products" className='btn font-medium text-lg'>Go Shopping</Link>
              </div>
            ) : (
              <div className="product-cart">
                {cartInfo?.data.products.map((product) => (
                  <div key={product._id} className='lg:grid my-3 pt-7 lg:grid-cols-10'>
                    <div className="col-span-2 lg:col-start-2">
                      <div className="flex mb-3">
                        <img src={product.product.imageCover}
                          className='w-24'
                          alt="" />
                        <div className="details ml-3 mt-2">
                          <h3 className='text-lg font-semibold mb-1 text-teal-500'>{product.product.title}</h3>
                          <h4>{product.product.brand?.name}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between lg:justify-around lg:col-span-6">
                      <div className="col-span-2 ml-2 lg:ml-0 font-medium text-xl text-gray-800 flex justify-center items-center">
                        {product.price}
                      </div>
                      <div className="col-span-2 flex justify-center items-center">
                        <span
                          onClick={() => {
                            updateProductCount({ id: product.product.id, count: product.count - 1 })
                          }}
                          className='w-5 cursor-pointer mb-[1px] pb-[1px] text-center inline-block text-xl border border-teal-500 rounded-md'>-</span>
                        <span className='mx-3 text-lg font-medium'>{product.count}</span>
                        <span
                          onClick={() => {
                            updateProductCount({ id: product.product.id, count: product.count + 1 })
                          }}
                          className='w-5 cursor-pointer px-[0.5px] text-center inline-block text-xl border border-teal-500 rounded-md'>+</span>
                      </div>
                      <div className="col-span-2 flex justify-center items-center">
                        <button onClick={() => (
                          removeProductFromCart({ id: product.product.id })
                        )} 
                        className='btn bg-red-600 hover:bg-red-700'>
                          <i className='fa-solid fa-trash mr-2'></i>
                          Remove
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
                <div className='text-gray-800 text-xl lg:w-4/5 mx-auto mt-7 mb-4 border-t-2 border-teal-500 pt-3 font-medium'>
                  <span className='text-teal-500 font-semibold text-2xl'>Total Price : </span>
                  {cartInfo.data.totalCartPrice} EGP
                </div>
                <div className='flex justify-end mt-10'>
                  <button
                    onClick={clearCart}
                    className='btn mx-3 bg-red-600 hover:bg-red-700'>
                    <i className='fa-solid fa-trash mr-2'></i>
                    Clear Cart
                  </button>
                  <Link to="/checkout" className='btn'>
                    Next Step
                    <i className="fa-solid fa-angle-right ml-2"></i>
                  </Link>
                </div>
              </div>

            )}
          </div>
        </section>
      )}

    </>
  )
}

