export const createCart = async (lineItems) => {
  const response = await fetch(import.meta.env.VITE_SHOPIFY_STORE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_API_ACCESS_TOKEN,
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation cartCreate($input: CartInput) {
          cartCreate(input: $input) {
            cart {
              id
              checkoutUrl
            }
            userErrors {
              field
              message
            }
          }
        }
      `,
      variables: {
        input: { lines: lineItems },
      },
    }),
  });

  const { data, errors }  = await response.json();
  console.log("Response from Shopify API:", data);
  console.log("Errors:", errors);

  if (errors) {
    throw new Error(`Shopify error: ${errors.map((e) => e.message).join(', ')}`)
  }

  return data.cartCreate.cart.checkoutUrl
}