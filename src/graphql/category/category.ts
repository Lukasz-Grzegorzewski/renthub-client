import { gql } from "@apollo/client";

export const MUTATION_CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CategoryCreateInput!) {
    createCategory(data: $data) {
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
        name
        id
        index
      }
      childCategories {
        name
        id
        index
        picture {
          name
          id
          urlHD
          urlMiniature
        }
      }
      picture {
        name
        id
      }
    }
  }
`;
