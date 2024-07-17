import axios from 'axios';
import React from 'react'
import Loading from '../../Components/Loading/Loading';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';

export default function Brands() {

  async function getBrands() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    }
    return await axios.request(options);

  }

  let { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands
  })

  if (isLoading) {
    return <Loading />;
  }


  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <section className="brand p-3 ">
        <div className="grid my-10 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-5">
          {data.data.data.map((brand) => (
            <Link key={brand._id} to={`/products`} className="col-span-2 bg-gray-100 shadow-md rounded-lg overflow-hidden">
              <div className="card-img ">
                <img src={brand.image} className='w-full block object-cover' alt="" />
              </div>
              <div className="card-content bg-gray-100 p-3">
                <h2 className='text-teal-500 font-bold'>{brand.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>

  )
}

