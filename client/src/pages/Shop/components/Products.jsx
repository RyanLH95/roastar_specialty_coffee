import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { fetchProducts } from '../../../../../server/api/shopify/products';
import { AnimatePresence } from 'framer-motion';
import ProductPreview from './ProductPreview';

const Products = ({ addToCart }) => {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  // State for Quickview/Preview of product
  const [selectedProduct, setSelectedProduct] = useState(null);

  // handles for opening and closing preview of product
  const handleOpenModal = (handle) => setSelectedProduct(handle);
  const handleCloseModal = () => setSelectedProduct(null)

  useEffect(() => {
    handleCloseModal();

    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProductsList(data);
      } catch (error) {
        console.error("Error fetching product list:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <div className='loading'><div className='loader'></div></div>;
  
  return (
    <div className="product-container">
      <div className='product-grid'>
      {
        productsList.map(({ node }) => (
          <div
            className='product-card' 
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
                  width={300}
                />
              )}
              {/* <div dangerouslySetInnerHTML={{ __html: node.descriptionHtml }} /> */}
              <h2>{node.title}</h2>
              <div className='view-product'> 
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenModal(node.handle)
                  }} 
                  type='button'
                  className='product-view'
                >
                  PRODUCT PREVIEW
                </button>
              </div>
            </Link>
            <p>£{`${parseFloat(node.variants.edges[0].node.priceV2.amount).toFixed(2)}`}</p>
          </div>
        ))
      }
      <AnimatePresence>
        {selectedProduct && (
          <ProductPreview 
            handle={selectedProduct}
            handleClose={handleCloseModal}
            addToCart={addToCart}
          />
        )}
      </AnimatePresence>
      </div>
    </div>
  )
}

export default Products