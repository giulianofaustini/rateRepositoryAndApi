import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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
  query GetCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            
            id
            text
            rating
            createdAt
            repository {
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
        }
      }
    }
  }
`;


export const GET_REPOSITORY_AND_REVIEWS = gql`
  query RepositoryReviews($id: ID!) {
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
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
