import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { cartContext } from '../../Context/Cart.context';
import { userContext } from '../../Context/User.context';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Checkout() {

  const { cartInfo, setCartInfo } = useContext(cartContext);
  const { token } = useContext(userContext);
  const [orderType, setOrderType] = useState(null);
  const navigate = useNavigate();

  async function createCashOrder(values) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        values,
      }
    }

    let { data } = await axios.request(options);
    setCartInfo([]);
    navigate("/allorders");
  }

  async function createOnlineOrder(values) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5173`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        values,
      }
    }

    let { data } = await axios.request(options);
    setCartInfo([]);
    console.log(cartInfo);

    toast.loading("redirect to payment gatway");

    setTimeout(() => {
      if (data.status === "success") {
        window.location.href = data.session.url;
        setCartInfo([]);
      }
    }, 3000)
    setCartInfo([]);

  }

  let formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },

    onSubmit: (values) => {
      if (orderType === "cash") {
        createCashOrder(values);
      } else {
        createOnlineOrder(values);
      }
    },

  })


  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <section className="register pb-5 lg:pb-0">
        <div className="container mx-auto">
          <form className="flex flex-col gap-8 w-3/4 mx-auto" onSubmit={formik.handleSubmit} >
            <div className='flex items-center text-teal-500 mt-8'>
              <h2 className='font-medium text-2xl py-3 '>Shipping Address</h2>
            </div>

            <div className="relative ">
              <input
                name="shippingAddress.city"
                value={formik.values.shippingAddress.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text" id="userName" className=" rounded block p-3 w-full text-base bg-transparent border-0 border-b border-teal-400 appearance-none focus:outline-none focus:ring-0 focus:border-teal-400 peer" placeholder=" " />
              <label htmlFor="userName" className="absolute text-base text-gray-700 ps-3 duration-300 transform -translate-y-6 top-3 origin-[0] peer-focus:start-0 peer-focus:text-teal-500 border-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ">city</label>

            </div>

            <div className="relative ">
              <input
                name="shippingAddress.phone"
                value={formik.values.shippingAddress.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="tel" id="phone" className="rounded block p-3 w-full text-base bg-transparent border-0 border-b border-teal-400 appearance-none focus:outline-none focus:ring-0 focus:border-teal-400 peer" placeholder=" " />
              <label htmlFor="phone" className="absolute text-base text-gray-700 ps-3 duration-300 transform -translate-y-6 top-3 origin-[0] peer-focus:start-0 peer-focus:text-teal-500 border-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ">phone</label>

            </div>

            <div className="relative ">
              <textarea
                name="shippingAddress.details"
                value={formik.values.shippingAddress.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="details" className="rounded block p-3 w-full text-base bg-transparent border-0 border-b border-teal-400 appearance-none focus:outline-none focus:ring-0 focus:border-teal-400 peer" placeholder=" " >

              </textarea>
              <label htmlFor="details" className="absolute text-base text-gray-700 ps-3 duration-300 transform -translate-y-6 top-3 origin-[0] peer-focus:start-0 peer-focus:text-teal-500 border-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ">details</label>

            </div>

            <div>
              <button
                onClick={() => {
                  setOrderType("cash")
                }}
                type="submit" className="btn bg-gray-500 hover:bg-gray-600 mb-4 text-white">
                Cash Order
              </button>

              <button
                onClick={() => {
                  setOrderType("online")
                }}
                type="submit" className="btn mx-3 mb-4 text-white">
                Online Order
              </button>
            </div>
          </form>
        </div>
      </section>


    </>
  )
}
