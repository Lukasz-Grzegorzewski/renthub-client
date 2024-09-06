import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
  query ListCategories {
    items: listCategories {
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
        picture {
          name
          uri
          urlHD
          urlMiniature
        }
      }
      picture {
        name
        uri
        urlHD
        urlMiniature
      }
      productReferences {
        name
        id
      }
    }
  }
`;
