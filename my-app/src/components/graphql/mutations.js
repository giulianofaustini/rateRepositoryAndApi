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
    }
  }
`;


export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
    }
  }
`;




export const DELETE_REVIEW_MUTATION = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;
