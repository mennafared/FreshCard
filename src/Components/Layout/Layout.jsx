import React from 'react'
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-2 pb-96 pt-28">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
