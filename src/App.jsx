import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Layout from "./Components/Layout/Layout"
import NotFound from "./Pages/NotFound/NotFound"
import Register from "./Pages/Register/Register"
import { Toaster } from "react-hot-toast"
import Login from "./Pages/Login/Login"
import Categories from "./Pages/Categories/Categories"
import ProtectRoute from "./Components/ProtectRoute/ProtectRoute"
import UserProvider from "./Context/User.context"
import ProductDetails from "./Pages/ProductDetails/ProductDetails"
import Cart from "./Pages/Cart/Cart"
import CartProvider from "./Context/Cart.context"
import Checkout from "./Pages/Checkout/Checkout"
import Orders from "./Pages/Orders/Orders"
import Products from "./Pages/Products/Products"
import Brands from "./Pages/Brands/Brands"
import Wishlist from "./Pages/Wishlist/Wishlist"
import WishlistProvider from "./Context/Wishlist.context"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword"
import VerifyCode from "./Pages/VerifyCode/VerifyCode"
import ProtectedResetPassword from "./Components/ProtectedResetPassword/ProtectedResetPassword"
import ResetPassword from "./Pages/ResetPassword/ResetPassword"

function App() {

  const routes = createBrowserRouter([
    {
      path: "/",
      element:
        <ProtectRoute>
          <Layout />
        </ProtectRoute>,
      children: [
        { index: true, element: <Home /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/allorders", element: <Orders /> },
        { path: "/categories", element: <Categories /> },
        { path: "/products", element: <Products /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "/brands", element: <Brands /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/auth",
      element: <Layout />,
      children: [
        { path: "signup", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "verifyCode", element: <VerifyCode /> },
        { path: "resetPassword", element: <ProtectedResetPassword><ResetPassword /></ProtectedResetPassword> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);


  const myClient = new QueryClient();


  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserProvider>
          <CartProvider>
            <WishlistProvider>
              <RouterProvider router={routes}></RouterProvider>
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
