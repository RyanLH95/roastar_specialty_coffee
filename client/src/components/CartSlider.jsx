import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import { fetchProducts } from '../../../server/api/shopify/products';
import Loader from '../pages/Shop/components/Loader';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const CartSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log(data); // Check the data structure here
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, [])

  if (loading) return <Loader />
  
  return (
    <div className='cart-slider'>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={2}
        loop={true}
        autoplay={{ delay: 3000 }}
      >
        {products.map(({ node }) => (
          <SwiperSlide 
            key={node.id} 
            className='cart-track' 
            style={{ textAlign: 'center'}}
          >
            <Link to={`/product/${node.handle}`} reloadDocument style={{ textDecoration: 'none', color: 'black' }}>
              {node.images.edges.length > 0 && (
                <img 
                  src={node.images.edges[0].node.src}
                  alt={node.title}
                  width={150}
                  className='cart-slide'
                />
              )}
              <p>{node.title}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CartSlider