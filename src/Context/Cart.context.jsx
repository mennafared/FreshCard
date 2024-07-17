import { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";


export const cartContext = createContext(null);

export default function CartProvider({ children }) {

  const { token } = useContext(userContext);
  const [cartInfo, setCartInfo] = useState(null);

  async function getCartInfo() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(options);
      
      if (data.numOfCartItems === 0) {
        setCartInfo([]);
      } else {
        setCartInfo(data);
      }

    } catch (error) {
      if (error.response.data.message.includes("No cart")) {
        setCartInfo([]);
      }
    }

  }



  async function addProductToCart({ id }) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        }
      };

      const { data } = await axios.request(options);

      toast.success("product added to cart")
      setCartInfo(data);

    } catch (error) {
      console.log(error);
    }
  }

  async function removeProductFromCart({ id }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(options);

      if (data.numOfCartItems === 0) {
        setCartInfo([]);
      } else {
        setCartInfo(data);
      }

      toast.success("product removed successfully")

    } catch (error) {
      console.log(error);
    }
  }

  async function updateProductCount({ id, count }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        }
      };

      const { data } = await axios.request(options);
      setCartInfo(data);
      if (count == 0) {
        removeProductFromCart({ id: id });
      }

    } catch (error) {
      console.log(error);
    }
  }

  async function clearCart() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(options);

      if (data.message === "success") {
        setCartInfo([]);
      } else {
        setCartInfo(data);
      }
      toast.success("cart clear successfully");
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <cartContext.Provider value={{
      clearCart,
      updateProductCount,
      cartInfo,
      addProductToCart,
      getCartInfo,
      removeProductFromCart,
      setCartInfo
    }}>
      {children}
    </cartContext.Provider>
  );
}