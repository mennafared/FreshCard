import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import slider1 from "../../assets/slider-image-1.jpeg"
import slider2 from "../../assets/slider-image-2.jpeg"
import slider3 from "../../assets/slider-image-3.jpeg"

export default function HomeSlider() {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-8">
          <Swiper
            slidesPerView={1}
            loop={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide><img src={slider1} className='w-full block' alt="" /></SwiperSlide>
            <SwiperSlide><img src={slider2} className='w-full block' alt="" /></SwiperSlide>
            <SwiperSlide><img src={slider3} className='w-full block' alt="" /></SwiperSlide>
          </Swiper>
        </div>
        <div className="col-span-12 lg:col-span-4 flex lg:grid">
          <div>
            <img src={slider3} className='w-full block' alt="" />
          </div>
          <div>
            <img src={slider2} className='w-full block' alt="" />
          </div>
        </div>
      </div>

    </>
  )
}
