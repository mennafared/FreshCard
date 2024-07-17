import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Helmet } from 'react-helmet';

export default function VerifyCode() {
  const [errorMsg, serErrorMsg] = useState(null);
  const navigate = useNavigate();

  const validation = Yup.object({
    resetCode: Yup.string()
      .required("code is required")
      .min(4, "code is invalid")
  });

  async function verifyCode(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values
      }

      const { data } = await axios.request(options);
      console.log(data);

      toast.success("verify code is correct");
      setTimeout(() => {
        if (data.status === "Success") {
          localStorage.setItem("verifyCode", data.status);
          navigate("/resetPassword");
        }
      }, 2000)

    } catch (error) {
      toast.error(error.response?.data?.message);
      serErrorMsg(error.response?.data?.message);
      console.log(error);
    }
  }


  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validation,

    onSubmit: verifyCode,

  })


  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <section className="login pb-5 lg:pb-0">
        <div className="container mx-auto ">
          <form className="flex flex-col gap-8 mb-3 w-3/4 mx-auto" onSubmit={formik.handleSubmit} >
            <div className='flex items-center text-teal-500 mt-8'>
              <h2 className='font-medium text-2xl '>Please enter your verification code</h2>
            </div>

            <div className="relative ">
              <input
                name="resetCode"
                value={formik.values.resetCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text" id="code"
                className=" rounded block p-3 w-full text-base bg-transparent border-0 border-b border-teal-400 appearance-none focus:outline-none focus:ring-0 focus:border-teal-400 peer" placeholder=" " />
              <label htmlFor="code" className="absolute text-base text-gray-700 ps-3 duration-300 transform -translate-y-6 top-3 origin-[0] peer-focus:start-0 peer-focus:text-teal-500 border-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ">code</label>
              {formik.errors.resetCode && formik.touched.resetCode ? (
                <div className='text-red-600 font-bold mt-3'>
                  * {formik.errors.resetCode}
                </div>
              ) : ("")}
              {errorMsg ? (
                <div className='text-red-600 font-bold mt-3'>
                  * {errorMsg}
                </div>
              ) : ("")}
            </div>

            <div className='flex items-center justify-between'>
              <button type="submit" className="btn text-white">
                Verify
              </button>
            </div>
          </form>
        </div>
      </section>
    </>

  )
}
