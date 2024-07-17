import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import ReactImageGallery from 'react-image-gallery';
import { cartContext } from '../../Context/Cart.context';
import { Helmet } from 'react-helmet';


export default function ProductDetails() {
  const [details, setDetails] = useState(null);
  let { id } = useParams();
  const { addProductToCart } = useContext(cartContext);

  async function getProductDetails() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
    }

    const { data } = await axios.request(options);
    setDetails(data.data)
  }

  useEffect(() => {
    getProductDetails();
  }, []);


  const images = details?.images.map((imgURL) => {
    return {
      original: imgURL,
      thumbnail: imgURL,
    }
  })

  return (
    <>

      {details === null ? <Loading /> :
        <>
          <Helmet>
            <title>{details.title}</title>
            <meta name="description" content={details.description} />
          </Helmet>
          <div className='grid md:grid-cols-12 gap-5 my-6'>
            <div className='col-start-2 col-span-3'>
              <ReactImageGallery items={images} showPlayButton={false} />
            </div>
            <div className='col-span-7 md:pl-5 m-3'>
              <h2 className='text-2xl font-semibold'>{details.title}</h2>
              <h3 className='text-teal-500 m-1 font-medium'>{details.category.name}</h3>
              <div className='space-x-7 ml-1 font-medium my-3 text-gray-700'>
                <span>
                  <i className='fa-solid fa-star text-yellow-300 mr-2'></i>
                  {details.ratingsAverage}
                </span>
                <span>
                  <i className='fa-regular fa-comment mr-2'></i>
                  {details.ratingsQuantity} reviews
                </span>
                <span>
                  <i className='fa-solid fa-bag-shopping mr-2'></i>
                  {details.sold} orders
                </span>
              </div>
              <div className='my-9'>
                <div className='text-lg'>
                  <span className='font-semibold'>Description : </span>
                  {details.description}
                </div>
                <div className='text-lg'>
                  <span className='font-semibold'>Brand : </span>
                  {details.brand.name}
                </div>
              </div>
              <div className='text-lg  text-gray-700 font-medium'>
                <i className="fa-solid fa-coins text-yellow-300 mx-2"></i>
                {details.price} EGP
              </div>
              <button
                onClick={() => { addProductToCart({ id: details.id }) }}
                className='btn my-5 w-full'>Add To Cart</button>
            </div>
          </div></>


      }
    </>

  )
}
