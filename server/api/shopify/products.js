//Shopify Storefront API and GraphQl queries and calls

// Fetch products list function for Products.jsx
export const fetchProducts = async () => {
  const response = await fetch(import.meta.env.VITE_SHOPIFY_STORE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_API_ACCESS_TOKEN,
      "Accept": "application/json",
    },
    body: JSON.stringify({
      query: `
        {
          products(first: 5) {
            edges {
              node {
                id
                title
                handle
                totalInventory
                descriptionHtml
                images(first: 1) {
                  edges {
                    node {
                      src
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      priceV2 {
                        amount
                        currencyCode
                      }
                    }
                  }
                } 
              }
            }
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.products.edges;
};

// Function for fetching a single product for ProductPage and ProductPreview
export const fetchProduct = async (handle) => {
  const response = await fetch(import.meta.env.VITE_SHOPIFY_STORE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_API_ACCESS_TOKEN,
      Accept: "application/json",
    },
    body: JSON.stringify({
      variables: { handle },
      query: `
        query {
          productByHandle(handle: "${handle}") {
            id
            title
            options {
              name
              values
            }
            handle
            totalInventory
            productType
            descriptionHtml
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
            variants(first: 12) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            } 
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.productByHandle;
};

export const fetchRelatedProducts = async () => {
  const response = await fetch(import.meta.env.VITE_SHOPIFY_STORE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_API_ACCESS_TOKEN,
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          products(first: 5) {
            edges {
              node {
                id
                title
                handle
                totalInventory
                descriptionHtml
                images(first: 1) {
                  edges {
                    node {
                      src
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      priceV2 {
                        amount
                      }
                    }
                  }
                } 
              }
            }
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.products.edges
};