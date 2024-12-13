import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/state';
import { fetchProduct, fetchRelatedProducts } from '../../../../server/api/shopify/products';
import './ProductPage.css';
import '../../App.css';
import { Minus, Plus } from 'lucide-react';

const backBtn = '<< BACK TO SHOP'

const ProductPage = () => {
  const { handle } = useParams();
  const dispatch =  useDispatch();
  // State fetches and displays product from Products.jsx when clicked
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  // States that return whether product(s) are loading or an error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State for changing variant
  const [selectedVariant, setSelectedVariant] = useState(null);
  // State for increasing and decresing quantity
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProduct(handle);
        console.log("Fetched product data:", data);
        setProductDetails(data);
        if (data.variants.edges.length > 0) {
          setSelectedVariant(data.variants.edges[0].node);
        }
      } catch (error) {
        console.log("Error fetching product", error);
        setError("FAILED TO LOAD PRODUCT DETAILS")
      } finally {
        setLoading(false);
      }
    };

    const getRelatedProducts = async () => {
      try {
        const data = await fetchRelatedProducts();
        setRelatedProducts(data);
      } catch (error) {
        console.error("Error fetching product list:", error);
      } finally {
        setLoading(false);
      }
    };

    getRelatedProducts();
    getProduct();
  }, [handle]);

  const handleVariantChange = (variantId) => {
    const variant = productDetails.variants.edges.find(
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
    if (selectedVariant && productDetails) {
      console.log({
        id: selectedVariant.id,
        title: productDetails.title,
        variant: selectedVariant.title,
        price: parseFloat(selectedVariant.priceV2.amount),
        quantity: counter,
        image: productDetails.images.edges[0]?.node.src,
        handle: productDetails.handle, // Ensure this is logged
      });

      dispatch(addToCart({
        id: selectedVariant.id,
        title: productDetails.title,
        variant: selectedVariant.title,
        price: parseFloat(selectedVariant.priceV2.amount),
        quantity: counter,
        image: productDetails.images.edges[0]?.node.src,
        handle: productDetails.handle,
      }));
    };
  };

  if (loading) return <p className='pnf-container'>Loading product details...</p>;
  // If error is made, returns this error message
  if (error) return <div className='pnf-container'><p>{error}</p></div>; 
  // If product is not found, returns this error message
  if (!productDetails) return <div className='pnf-container'><p>PRODUCT NOT FOUND</p></div>;

  return (
    <div className='product-page-background'>
      <div className='product-page-container'>
        <Link to='/Shop' reloadDocument>
          <h5>
            {backBtn}
          </h5>
        </Link>
        <div className='product-content'>
          <h1>{productDetails.title}</h1>
          <div className='product-main'>
            {/* PRODUCT IMAGE */}
            {productDetails.images.edges.length > 0 && (
              <img 
                src={productDetails.images.edges[0].node.src} 
                alt={productDetails.title} 
                width={600}
                className='product-img'
              />
            )}
            <div className='product-details'>
              {/* PRODUCT DETAILS */}
              <div className='product-desc' dangerouslySetInnerHTML={{ __html: productDetails.descriptionHtml }} />
              {/* PRODUCT PRICE */}
              <h2>£{selectedVariant ? parseFloat(selectedVariant.priceV2.amount).toFixed(2) : "0.00"}</h2>
              {/* `${parseFloat(product.variants.edges[0].node.priceV2.amount).toFixed(2)}`*/}
              {/* QUANTITY/AMOUNT */}
              <div className='product-quantity'>
                <button className='product-quantity-minus' onClick={handleClickMinus}>
                  <Minus size={15}/>
                </button>
                  <p>{counter}</p>
                <button className='product-quantity-plus' onClick={handleClickPlus}>
                  <Plus size={15}/>
                </button>
              </div>
              {/* CHOICE OF TYPE(GRIND) */}
              <div className='product-coffee-grind'>
                <select onChange={(e) => handleVariantChange(e.target.value)} name='grind'>
                  {productDetails.variants.edges.map(({ node }) => (
                    <option key={node.id} value={node.id}>
                      {node.title.toUpperCase()} {/*£{`${parseFloat(node.priceV2.amount).toFixed(2)}`}*/}
                    </option>
                  ))}
                </select>
                {/*{selectedVariant && (
                  <p>
                    Selected: {selectedVariant.title} - £{selectedVariant.priceV2.amount}{' '}
                  </p>
                )}*/}
              </div>
              {/* ADD TO CART/CHECKOUT */}
              <button 
                onClick={handleAddToCart}
                className='add-to-cart'
              >
                ADD TO CART
              </button>
            </div>
         </div>
          {/* RELATED PRODUCTS*/}
          <h2 className='related-product-title'>RELATED PRODUCTS</h2>
          <div className='related-product-list'>
            {
              relatedProducts.slice(0,4).map(({ node }) => (
                <div 
                  className='related-product-card'
                  key={node.id}
                >
                  {/* Ensure the link is by handle */}
                  <Link
                    to={`/product/${node.handle}`}
                    reloadDocument
                  >
                    {node.images.edges.length > 0 && (
                      <img 
                        src={node.images.edges[0].node.src} 
                        alt={node.title} 
                        width={200}
                      />
                    )}
                    <h3>{node.title}</h3>
                    <div>
                      <button>PREVIEW PRODUCT</button>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage;