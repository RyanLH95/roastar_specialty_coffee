import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/state';
import { fetchProduct, fetchRelatedProducts } from '../../../../server/api/shopify/products';
import './ProductPage.css';
import '../../App.css';
import { Minus, Plus, ChevronLeft } from 'lucide-react';

const ProductPage = () => {
  const { handle } = useParams();
  const dispatch = useDispatch();

  // State fetches and displays product from Products.jsx when clicked
  const [product, setProduct] = useState(null);
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
        setProduct(data);
        
        /* const firstAvailableVariant = data.variants.edges.find(
          ({ node }) => node.availableForSale
        )?.node; 

        setSelectedVariant(firstAvailableVariant || null); */
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
    const variant = product.variants.edges.find(
      ({ node }) => node.id === variantId
    )?.node;
    setSelectedVariant(variant || null);
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
        handle: product.handle, // Ensure this is logged
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
    };
  };

  if (loading) return <div className='pnf-container'/>;
  // If error is made, returns this error message
  if (error) return <div className='pnf-container'><p>{error}</p></div>; 
  // If product is not found, returns this error message
  if (!product) return <div className='pnf-container'></div>;

  // Checks if the entire product is sold out
  const allVariantsUnavailable = !product.variants.edges.some(
    ({ node }) => node.availableForSale
  );

  return (
    <div className='product-page-background'>
      <div className='product-page-container'>
        <Link to='/Shop' reloadDocument>
          <ChevronLeft style={{ position: 'relative', top: '0.45rem', color: 'white'}}/><h5>BACK TO SHOP</h5>
        </Link>
        <div className='product-content'>
          <h1>{product.title}</h1>
          <div className='product-main'>
            {/* PRODUCT IMAGE */}
            {product.images.edges.length > 0 && (
              <img 
                src={product.images.edges[0].node.src} 
                alt={product.title} 
                width={600}
                className='product-img'
              />
            )}
            <div className='product-details'>
              {/* PRODUCT DETAILS */}
              <div className='product-desc' dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
              {/* PRODUCT PRICE */}
              <h2>
                £{
                   selectedVariant ? 
                   parseFloat(selectedVariant.priceV2.amount).toFixed(2) : 
                   parseFloat(product.variants.edges[0].node.priceV2.amount).toFixed(2)
                 }
              </h2>
              {product.totalInventory === 0 && <h3 style={{ color: 'white', marginTop: '1rem', letterSpacing: '1.5px'}}>SOLD OUT</h3>}
              {/* `${parseFloat(productDetails.variants.edges[0].node.priceV2.amount).toFixed(2)}`*/}
              {/* QUANTITY/AMOUNT */}
              <div className={product.totalInventory === 0 ? 'product-quantity disabled' : 'product-quantity'}>
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
                <select 
                  value={selectedVariant?.id || ''}
                  onChange={(e) => handleVariantChange(e.target.value)} 
                  name='grind'
                  disabled={product.totalInventory === 0}
                >
                  <option value='' disabled>SELECT {product.options[1].name.toUpperCase()}</option>
                  {product.variants.edges
                    .filter(({ node }) => node.availableForSale)
                    .map(({ node }) => (
                      <option key={node.id} value={node.id}>
                        {node.title.toUpperCase()} {/*£{`${parseFloat(node.priceV2.amount).toFixed(2)}`}*/}
                      </option>
                  ))}
                </select>
              </div>
              {/* ADD TO CART/CHECKOUT */}
              <button 
                onClick={() => {
                  handleAddToCart();
                  selectedVariant?.id || alert(`Please choose a ${product.options[1].name.toLowerCase()} option.`);
                }}
                className='add-to-cart'
                disabled={product.totalInventory === 0}
              >
                ADD TO CART
              </button>
            </div>
          </div>
          {/* RELATED PRODUCTS*/}
          <h2 className='related-product-title'>RELATED PRODUCTS</h2>
          <div className='related-product-list'>
            {
              relatedProducts
              .filter(({ node }) => node.handle !== product.handle)
              .slice(0,4).map(({ node }) => (
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