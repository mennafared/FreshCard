import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";


export default function useCategory() {

  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    }

    return await axios.request(options);
  }

  let categoryResponse = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  })


  return categoryResponse;
}
