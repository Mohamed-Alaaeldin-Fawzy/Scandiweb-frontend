import { client } from "./client";
import { gql } from "@apollo/client";

export const fetchProducts = async () => {
  const { data } = await client.query({
    query: gql`
      {
        products {
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
  });

  return data.products;
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
