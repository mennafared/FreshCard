import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";


export default function useProducts() {

  async function getProduct() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    }
    return await axios.request(options);

  }

  let productResponse = useQuery({
    queryKey: ["products"],
    queryFn: getProduct
  })


  return productResponse;
}

