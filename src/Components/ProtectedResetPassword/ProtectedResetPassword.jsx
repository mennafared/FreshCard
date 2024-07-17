import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedResetPassword({ children }) {

  if (localStorage.getItem("verifyCode") !== null) {
    return children
  } else {
    return <Navigate to="/login" />
  }

}
