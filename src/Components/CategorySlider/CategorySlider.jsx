import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Loading from '../Loading/Loading';
import useCategory from '../../Hooks/useCategory';

export default function CategorySlider() {

  const { data, isLoading } = useCategory();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>

      <div className="category-slider my-9">
        <h2 className='font-medium text-lg mb-3'>Shop Popular Categories</h2>
        <Swiper
          slidesPerView={6}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {data.data.data.map((category) => (
            <SwiperSlide key={category._id}>
              <div className='w-full'>
                <img src={category.image} className='w-full h-72 block object-cover' alt="" />
                <h3 className='my-1'>{category.name}</h3>
              </div>
            </SwiperSlide>

          ))}
        </Swiper>

      </div>

    </>
  )
}


