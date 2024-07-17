import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";


export const wishlistContext = createContext();

export default function WishlistProvider({ children }) {

  const { token } = useContext(userContext);
  const [wishlist, setWishlist] = useState(null);

  async function getWishlistInfo() {
    setWishlist(null);
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(options);

      if (data.data.length === 0) {
        setWishlist([]);
      } else {
        setWishlist(data.data);
      }

    } catch (error) {
      if (error.response.data.message.includes("No wishlist")) {
        setCartInfo([]);
      }
      console.log(error);
    }

  }

  async function addProductToWishlist({ id }) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        }
      };

      const { data } = await axios.request(options);
      getWishlistInfo();
      toast.success("product added to wishlist")
      setWishlist(data.data);

    } catch (error) {
      console.log(error);
    }
  }

  async function removeProductFromWishlist({ id }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(options);
      getWishlistInfo();

      if (data.data.length === 0) {
        setWishlist([]);
      } else {
        setWishlist(data.data);
      }

      toast.error("product removed successfully")

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <wishlistContext.Provider value={{
      addProductToWishlist,
      wishlist,
      getWishlistInfo,
      removeProductFromWishlist,
      setWishlist
    }}>
      {children}
    </wishlistContext.Provider>
  );
}