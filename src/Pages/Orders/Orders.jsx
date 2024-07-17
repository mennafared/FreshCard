import React, { useContext } from 'react';
import { userContext } from '../../Context/User.context';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import emptyOrders from "../../assets/no order.png"
import Loading from '../../Components/Loading/Loading';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function Orders() {
  const { token } = useContext(userContext);
  const { id } = jwtDecode(token);

  async function getUserOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    }
    return await axios.request(options);
  }

  let { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getUserOrders
  })



  if (isLoading) {
    return <Loading />;
  }


  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <section className='orders pt-5'>
        {data?.data?.length === 0 ? (
          <div className='empty-orders flex flex-col items-center justify-center my-4'>
            <img src={emptyOrders} alt="" />
            <h3 className='text-xl font-medium mb-4 text-gray-800'>There are no orders yet</h3>
            <Link to="/products" className='btn font-medium text-lg'>Go Shopping</Link>
          </div>
        ) : (
          <div className='order '>
            <h2 className='font-semibold text-2xl ml-5 text-teal-500'>Orders</h2>
            {data.data.map((order) => (
              <div key={order._id} className='shadow-xl mt-6 p-5 border border-teal-400 rounded-md'>
                <div className='sm:flex mb-5 items-center justify-between'>
                  <div className='mb-2'><span className=' font-semibold text-lg'>Order ID : </span># {order.id}</div>
                  <div>
                    {order.isPaid ? (
                      <span className='btn bg-emerald-500 hover:bg-emerald-500'>Paid</span>
                    ) : (
                      <span className='btn bg-red-600 hover:bg-red-600'>Not Paid</span>
                    )}

                    {order.isDelivered ? (
                      <span className='btn ml-2 hover:bg-teal-500'>Delivered</span>
                    ) : (
                      <span className='btn ml-2 hover:bg-teal-500'>Under Delivery</span>
                    )}

                  </div>
                </div>
                <div className='grid grid-cols-12'>
                  {order.cartItems.map((product) => (
                    <div key={product._id} className="product shadow-xl m-3 p-2 border border-teal-400 rounded-md col-span-6 md:col-span-4 lg:col-span-2">
                      <img src={product.product.imageCover} alt=""
                        className='w-full object-contain'
                      />
                      <div className='p-2 text-center border-t mt-1 border-teal-400'>
                        <h3 className='font-medium line-clamp-1 text-lg'>{product.product.title}</h3>
                        <h3 className='my-1 text-lg text-gray-900'>{product.count} Piece</h3>
                        <h4 className='my-1 text-md text-gray-700'>{product.price} EGP</h4>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='text-gray-800 text-lg p-1 font-medium text-end '>
                  <span className='text-teal-500 font-semibold text-xl '>Total Price : </span>
                  {order.totalOrderPrice} EGP
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </>
  )
}
