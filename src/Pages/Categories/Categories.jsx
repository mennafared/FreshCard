import React from 'react'
import Loading from '../../Components/Loading/Loading';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useCategory from '../../Hooks/useCategory';

export default function Categories() {

  const { data, isLoading } = useCategory();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <section className="category p-3 ">
        <div className="grid my-10 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-5">
          {data.data.data.map((category) => (
            <Link key={category._id} to={`/products`} className="col-span-2 bg-gray-100 shadow-md rounded-lg overflow-hidden">
              <div className="card-img ">
                <img src={category.image} className='w-full h-96 sm:h-72 block object-cover' alt="" />
              </div>
              <div className="card-content bg-gray-100 p-3">
                <h3 className='text-teal-500 font-bold'>{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>

  )
}
