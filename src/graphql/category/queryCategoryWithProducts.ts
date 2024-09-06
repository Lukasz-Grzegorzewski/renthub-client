import { gql } from "@apollo/client";

export const GET_CATEGORY_PRODUCT = gql`
  query FindCategory($findCategoryId: ID!) {
    item: findCategory(id: $findCategoryId) {
      id
      name
      index
      display
      createdBy {
        id
      }
      updatedBy {
        id
      }
      createdAt
      updatedAt
      parentCategory {
        id
        index
        name
      }
      childCategories {
        id
        index
        name
      }
      picture {
        name
        uri
        urlHD
        urlMiniature
      }
      productReferences {
        name
        brandName
        price
        description
        id
        pictures {
          urlHD
          urlMiniature
          name
        }
      }
    }
  }
`;
