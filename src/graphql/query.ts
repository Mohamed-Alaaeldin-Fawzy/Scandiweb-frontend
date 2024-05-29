import { client } from "./client";
import { gql } from "@apollo/client";

export const fetchProducts = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        {
          products {
            id
            name
            prices {
              amount
              currency
              symbol: currency_symbol
            }
            inStock: in_stock
            gallery {
              imageUrl: image_url
            }
            category {
              name
            }
            attributes {
              id
              name
              type
              items {
                id
                displayValue: display_value
                value
              }
            }
          }
        }
      `,
    });

    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  const { data } = await client.query({
    query: gql`
      query ($id: String!) {
        product(id: $id) {
          id
          description
          name
          prices {
            amount
            currency
            symbol: currency_symbol
          }
          inStock: in_stock
          gallery {
            imageUrl: image_url
          }
          attributes {
            id
            name
            type
            items {
              id
              displayValue: display_value
              value
            }
          }
          brand
          category {
            name
          }
        }
      }
    `,
    variables: {
      id,
    },
  });
  return data.product;
};

export const fetchCategories = async () => {
  const { data } = await client.query({
    query: gql`
      {
        categories {
          id
          name
        }
      }
    `,
  });
  return data.categories;
};
