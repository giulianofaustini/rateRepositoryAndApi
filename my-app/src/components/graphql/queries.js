import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          name
          ownerName
          createdAt
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
        }
      }
      totalCount
    }
  }
`;


export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;  

export const GET_GIT_URL = gql`
query Repository($id: ID!) {
  repository(id: $id) {
    id
    fullName
    url
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
  }
}
`;
