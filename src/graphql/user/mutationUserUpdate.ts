import { gql } from "@apollo/client";

export const MUTATION_UPDATE_USER = gql`
  mutation UserUpdate($userId: ID!, $data: UserUpdateInput!) {
    item: userUpdate(userId: $userId, data: $data) {
      id
      email
      firstName
      lastName
      phoneNumber
    }
  }
`;
