import { gql } from "@apollo/client";

export const QUERY_USER_GETBYID = gql`
  query UserGetById($id: ID!) {
    item: userGetById(id: $id) {
      id
      email
      firstName
      lastName
      nickName
      dateOfBirth
      phoneNumber
      lastConnectionDate
      isVerified
      avatar {
        id
        name
        uri
        mimetype
        urlHD
        urlMiniature
      }
      role {
        id
        name
        right
      }
      cart {
        id
        totalPrice
        productCarts {
          id
          quantity
          dateTimeStart
          dateTimeEnd
          productReference {
            id
            price
            category {
              id
              name
              parentCategory {
                id
                name
              }
            }
          }
        }
      }
      createdBy {
        id
        email
        firstName
        lastName
        nickName
      }
      createdAt
      updatedAt
      orders {
        id
        status
        orderStocks {
          id
          dateTimeStart
          dateTimeEnd
          stock {
            id
            name
            productReference {
              id
              name
              price
            }
            serialNumber
          }
        }
      }
      updatedBy {
        id
        email
      }
    }
  }
`;
