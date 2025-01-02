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
          product(handle: "${handle}") {
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
            metafield(namespace: "custom", key: "ingredients") {
              namespace
              key
              value
            }
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
                  selectedOptions {
                    name
                    value
                  }
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
  return data.product;
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