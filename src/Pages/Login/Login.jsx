import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from "yup";
import { Helmet } from 'react-helmet';
import { userContext } from '../../Context/User.context';

export default function Login() {
  const [errorMsg, serErrorMsg] = useState(null);
  const navigate = useNavigate();
  const { token, setToken } = useContext(userContext)

  const passwordRegex = /^[A-Z][0-9A-Za-z]{5,25}$/;

  const validation = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("email is not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(passwordRegex, "password is not valid"),
  });

  async function sendDataToLogin(values) {
    let id;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values
      }

      id = toast.loading("Waiting...");

      const { data } = await axios.request(options);
      console.log(data);

      toast.dismiss(id);
      toast.success("Successfully Login");
      setTimeout(() => {
        if (data.message === "success") {
          localStorage.setItem("token", data.token)
          setToken(data.token)
          navigate("/");
        }
      }, 2000)

    } catch (error) {
      toast.dismiss(id);
      toast.error(error.response.data.message);
      serErrorMsg(error.response.data.message);
      console.log(error);
    }
  }


  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,

    onSubmit: sendDataToLogin,

  })



  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section className="login pb-5 lg:pb-0">
        <div className="container mx-auto ">
          <form className="flex flex-col gap-8 mb-3 w-3/4 mx-auto" onSubmit={formik.handleSubmit} >
            <div className='flex items-center text-teal-500 mt-8'>
              <i className="fa-regular fa-circle-user text-2xl mr-2"></i>
              <h2 className='font-medium text-2xl py-3 '>Login</h2>
            </div>

            <div className="relative ">
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email" id="uerEmail"
                className=" rounded block p-3 w-full text-base bg-transparent border-0 border-b border-teal-400 appearance-none focus:outline-none focus:ring-0 focus:border-teal-400 peer" placeholder=" " />
              <label htmlFor="uerEmail" className="absolute text-base text-gray-700 ps-3 duration-300 transform -translate-y-6 top-3 origin-[0] peer-focus:start-0 peer-focus:text-teal-500 border-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ">email</label>
              {formik.errors.email && formik.touched.email ? (
                <div className='text-red-600 font-bold mt-3'>
                  * {formik.errors.email}
                </div>
              ) : ("")}
            </div>

            <div className="relative ">
              <input
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password" id="userPassword" className=" rounded block p-3 w-full text-base bg-transparent border-0 border-b border-teal-400 appearance-none focus:outline-none focus:ring-0 focus:border-teal-400 peer" placeholder=" " />
              <label htmlFor="userPassword" className="absolute text-base text-gray-700 ps-3 duration-300 transform -translate-y-6 top-3 origin-[0] peer-focus:start-0 peer-focus:text-teal-500 border-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ">password</label>
              {formik.errors.password && formik.touched.password ? (
                <div className='text-red-600 font-bold mt-3'>
                  * {formik.errors.password}
                </div>
              ) : ("")}
              {errorMsg ? (
                <div className='text-red-600 font-bold mt-3'>
                  * {errorMsg}
                </div>
              ) : ("")}
            </div>

            <Link to="/auth/forgetPassword" className='pl-2 cursor-pointer text-gray-800 font-medium hover:text-teal-500'>Forget Password ?</Link>

            <div className='flex items-center justify-between'>
              <button type="submit" className="btn text-white">
                Login
              </button>
              <div>
                <span>New User? </span>
                <Link to="/auth/signup" className='text-teal-500 font-medium'>Creat Account</Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>

  )
}
