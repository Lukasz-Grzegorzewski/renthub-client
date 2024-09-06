import { gql } from "@apollo/client";

export const MUTATION_DELETE_USER = gql`
  mutation UserDelete($userDeleteId: ID!) {
    userDelete(id: $userDeleteId) {
      id
    }
  }
`;
