import React from 'react'
import amazonPay from "../../assets/amazon-pay.png"
import paypal from "../../assets/paypal.png"
import masterCard from "../../assets/mastercard.webp"
import americanexpress from "../../assets/American-Express-Color.png"
import appStore from "../../assets/get-apple-store.png"
import googlePlay from "../../assets/get-google-play.png"

export default function Footer() {
  return (
    <>
      <footer className='bg-gray-200 absolute p-2 right-0 left-0 bottom-0'>
        <div className="container mx-auto py-8">
          <div className="my-6">
            <h2 className='text-3xl font-medium'>Get the FreshCard App</h2>
            <p className='my-3'>We will send ou a link, open it on your phone to download the app</p>
            <div className="flex gap-4">
              <input type="text" className="form-control flex-grow" placeholder='Email ...' />
              <button className='btn'>Share App Link</button>
            </div>
          </div>
          <div className='lg:flex items-center justify-between my-3 py-6 px-2 border-y border-gray-300'>
            <div className='flex gap-6 items-center mb-2 lg:mb-0'>
              <span className='text-lg'>Payment Partners</span>
              <div className='flex gap-2 items-center'>
                <img src={paypal} className='w-14' alt="" />
                <img src={americanexpress} className='w-14' alt="" />
                <img src={amazonPay} className='w-14' alt="" />
                <img src={masterCard} className='w-14' alt="" />
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <span className='text-lg'>Payment Partners</span>
              <div className='flex gap-2 items-center'>
                <img src={googlePlay} className='w-24' alt="" />
                <img src={appStore} className='w-24' alt="" />
              </div>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}
