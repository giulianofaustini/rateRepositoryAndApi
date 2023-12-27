import { gql } from "@apollo/client";


export const AUTHORIZE = gql`
  mutation authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;


export const CREATE_REVIEW = gql`
  mutation CreateReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
    createReview(review: {
      repositoryName: $repositoryName,
      ownerName: $ownerName,
      rating: $rating,
      text: $text
    }) {
      repositoryId
      user {
        id
        username
      }
      id
    }
  }
`;
