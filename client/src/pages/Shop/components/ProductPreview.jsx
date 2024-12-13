import React, { useState, useEffect} from 'react'
import { Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { previewAnimate } from '../../../assets/popups/product_preview/animation'
import { addToCart } from '../../../store/state'
import Backdrop from '../../../assets/popups/product_preview/Backdrop'
import { Plus, Minus, X } from 'lucide-react'
import { fetchProduct } from '../../../../../server/api/shopify/products'

const ProductPreview = ({ handle, handleClose }) => {
  const dispatch =  useDispatch();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProduct(handle);
        console.log("Fetched product data:", data);
        setProduct(data);
        if (data.variants.edges.length > 0) {
          setSelectedVariant(data.variants.edges[0].node);
        }
      } catch (error) {
        console.log("Failed to fetch product:", error)
      }
    }
    
    getProduct();
  }, [handle])

  const handleVariantChange = (variantId) => {
    const variant = product.variants.edges.find(
      ({ node }) => node.id === variantId
    ).node;
    setSelectedVariant(variant);
  };

  // Count functions for increasing or decreasing quantity
  const handleClickPlus = () => {
    setCounter(counter + 1)
  }

  const handleClickMinus = () => {
    setCounter(counter => Math.max(counter - 1, 1))
  }

  const handleAddToCart = () => {
    if (selectedVariant && product) {
      console.log({
        id: selectedVariant.id,
        title: product.title,
        variant: selectedVariant.title,
        price: parseFloat(selectedVariant.priceV2.amount),
        quantity: counter,
        image: product.images.edges[0]?.node.src,
        handle: product.handle,
      });

      dispatch(addToCart({
        id: selectedVariant.id,
        title: product.title,
        variant: selectedVariant.title,
        price: parseFloat(selectedVariant.priceV2.amount),
        quantity: counter,
        image: product.images.edges[0]?.node.src,
        handle: product.handle,
      }));
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <Backdrop>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className='product-preview-container'
        variants={previewAnimate}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <button onClick={handleClose}><X size={35} strokeWidth={1.5} /></button>
        <div className='product-preview-content'>
          {/* PRODUCT TITLE */}
          <h1>{product.title}</h1>
          <div className='product-preview-main'>
            {/* PRODUCT IMAGE */}
            {product.images.edges.length > 0 && (
              <img 
                src={product.images.edges[0].node.src} 
                alt={product.title} 
                width={500}
                className='product-img'
              />
            )}
            <div className='product-preview-details'>
              {/* PRODUCT PRICE */}
              <h2 className='product-preview-price'>£{selectedVariant ? parseFloat(selectedVariant.priceV2.amount).toFixed(2) : "0.00"}</h2>
              {/* `${parseFloat(product.variants.edges[0].node.priceV2.amount).toFixed(2)}`*/}
              {/* QUANTITY/AMOUNT */}
              <div className='product-preview-quantity'>
                <button className='product-preview-quantity-minus' onClick={handleClickMinus}><Minus size={15}/></button>
                  <p className='product-preview-quantity-amount'>{counter}</p>
                <button className='product-preview-quantity-plus' onClick={handleClickPlus}><Plus size={15}/></button>
              </div>
              {/* CHOICE OF TYPE(GRIND) */}
              <div className='product-preview-coffee-grind'>
                <select onChange={(e) => handleVariantChange(e.target.value)} name='grind'>
                  {product.variants.edges.map(({ node }) => (
                    <option key={node.id} value={node.id}>
                      {node.title.toUpperCase()} {/*£{`${parseFloat(node.priceV2.amount).toFixed(2)}`}*/}
                    </option>
                  ))}
                </select>
              </div>
              {/* ADD TO CART/CHECKOUT */}
              <button 
                onClick={handleAddToCart}
                className='product-add-to-cart'
              >
                ADD TO CART
              </button>
              <button 
                className='product-purchase'
              >
                BUY NOW
              </button>
              <Link className='view-details' to={`/product/${handle}`}>
                VIEW DETAILS
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  )
}

export default ProductPreview