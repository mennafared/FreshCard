import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

export default function Register() {
  const [errorMsg, serErrorMsg] = useState(null);
  const navigate = useNavigate();

  const phoneRegex = /^01[0125][0-9]{8}$/
  const passwordRegex = /^[A-Z][0-9A-Za-z]{5,25}$/;

  const validation = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name must be more than 3")
      .max(25, "name must be less than 25"),
    email: Yup.string()
      .required("email is required")
      .email("email is not valid"),
    phone: Yup.string()
      .required("phone number is required")
      .matches(phoneRegex, "phone is not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(passwordRegex, "password is not valid"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")],
        "password and rePassword should be the same"),
  });

  async function sendDataToRegister(values) {
    let id;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values
      }

      id = toast.loading("Waiting...");

      const { data } = await axios.request(options);
      console.log(data);

      toast.dismiss(id);
      toast.success("Successfully Register");
      setTimeout(() => {
        if (data.message === "success") {
          navigate("/auth/login");
        }
      }, 2500)

    } catch (error) {
      toast.dismiss(id);
      toast.error(error.response.data.message);
      serErrorMsg(error.response.data.message);
      console.log(error);
    }
  }


  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validation,

    onSubmit: sendDataToRegister,

  })



  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <section className="register pb-5 lg:pb-0">
        <div className="container mx-auto">
          <form className="flex flex-col gap-8 w-3/4 mx-auto" onSubmit={formik.handleSubmit} >
            <div className='flex items-center text-teal-500 mt-8'>
              <i className="fa-regular fa-circle-user text-2xl mr-2"></i>
              <h2 className='font-medium text-2xl py-3 '>Register Now</h2>
            </div>
            <div className="relative ">
              <input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text" id="userName" className=" rounded block p-3 w-full text-base bg-transparent border-0 border-b border-teal-400 appearance-none focus:outline-none focus:ring-0 focus:border-teal-400 peer" placeholder=" " />
              <label htmlFor="userName" className="absolute text-base text-gray-700 ps-3 duration-300 transform -translate-y-6 top-3 origin-[0] peer-focus:start-0 peer-focus:text-teal-500 border-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ">user name</label>
              {formik.errors.name && formik.touched.name ? (
                <div className='text-red-600 font-bold mt-3'>
                  * {formik.errors.name}
                </div>
              ) : ("")}
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
              {errorMsg ? (
                <div className='text-red-600 font-bold mt-3'>
                  * {errorMsg}
                </div>
              ) : ("")}
            </div>
            <div className="relative ">
              <input
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="tel" id="phone" className="rounded block p-3 w-full text-base bg-transparent border-0 border-b border-teal-400 appearance-none focus:outline-none focus:ring-0 focus:border-teal-400 peer" placeholder=" " />
              <label htmlFor="phone" className="absolute text-base text-gray-700 ps-3 duration-300 transform -translate-y-6 top-3 origin-[0] peer-focus:start-0 peer-focus:text-teal-500 border-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ">phone number</label>
              {formik.errors.phone && formik.touched.phone ? (
                <div className='text-red-600 font-bold mt-3'>
                  * {formik.errors.phone}
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
            </div>

            <div className="relative ">
              <input
                name="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password" id="rePassword" className=" rounded block p-3 w-full text-base bg-transparent border-0 border-b border-teal-400 appearance-none focus:outline-none focus:ring-0 focus:border-teal-400 peer" placeholder=" " />
              <label htmlFor="rePassword" className="absolute text-base text-gray-700 ps-3 duration-300 transform -translate-y-6 top-3 origin-[0] peer-focus:start-0 peer-focus:text-teal-500 border-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ">re-password</label>
              {formik.errors.rePassword && formik.touched.rePassword ? (
                <div className='text-red-600 font-bold mt-3'>
                  * {formik.errors.rePassword}
                </div>
              ) : ("")}
            </div>

            <button type="submit" className="btn mb-4 self-start text-white">
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </>

  )
}
