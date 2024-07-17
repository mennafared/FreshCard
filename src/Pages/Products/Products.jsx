import React from 'react'
import ProductCard from '../../Components/ProductCard/ProductCard'
import Loading from '../../Components/Loading/Loading';
import { Helmet } from 'react-helmet';
import useProducts from '../../Hooks/useProducts';

export default function Products() {

  const { data, isLoading } = useProducts();

  if (isLoading) {
    return <Loading />;
  }


  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <section className="products p-3 ">

        <div className="grid my-10 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-5">
          {data.data.data.map((product) => (<ProductCard productInfo={product} key={product._id} />))}
        </div>
      </section>


    </>
  )
}
