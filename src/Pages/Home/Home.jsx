import React from 'react'
import ProductCard from '../../Components/ProductCard/ProductCard'
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';
import HomeSlider from '../../Components/HomeSlider/HomeSlider';
import CategorySlider from '../../Components/CategorySlider/CategorySlider';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import useProducts from '../../Hooks/useProducts';

export default function Home() {

  const { data, isLoading } = useProducts();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <section className="home p-3 mt-3">
        <HomeSlider />
        <CategorySlider />
        <div className="grid my-10 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-5">
          {data.data.data.map((product) => (<ProductCard productInfo={product} key={product._id} />))}
        </div>
      </section>
    </>
  )
}
