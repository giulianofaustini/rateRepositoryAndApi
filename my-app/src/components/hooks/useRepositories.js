import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_REPOSITORY_REVIEWS } from '../graphql/queries';
import { Text } from 'react-native';

const useRepositories = (sortingCriteria, searchKeyword) => {
  const orderBy = sortingCriteria.split('-')[0];
  const orderDirection = sortingCriteria.split('-')[1] || 'DESC';

  const { data, loading, error, refetch, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy,
        orderDirection,
        searchKeyword,
      },
    });
  };

  const fetchRepositoryReviews = (repositoryId, first = 3, after) => {
    const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY_REVIEWS, {
      variables: { id: repositoryId, first, after },
    });

    const handleFetchMoreReviews = () => {
      const canFetchMore = !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;

      if (!canFetchMore) {
        return;
      }

      fetchMore({
        variables: {
          id: repositoryId,
          first: 3,
          after: data.repository.reviews.pageInfo.endCursor,
        },
      });
    };

    return { reviews: data?.repository?.reviews, loading, error, fetchMoreReviews: handleFetchMoreReviews };
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const edges = data?.repositories?.edges || [];
  const repositories = edges.map(edge => edge.node);


  return { repositories, loading, error, refetch, fetchMore: handleFetchMore, fetchRepositoryReviews, ...result };
};

export default useRepositories;



// import { useState, useEffect } from 'react';

// const useRepositories = () => {
//   const [repositories, setRepositories] = useState();
//   const [loading, setLoading] = useState(false);

//   const fetchRepositories = async () => {
//     setLoading(true);

//     const response = await fetch('http://192.168.32.135:5001/api/repositories');
//     const json = await response.json();

//     setLoading(false);
//     setRepositories(json);
//   };

//   useEffect(() => {
//     fetchRepositories();
//   }, []);

//   return { repositories, loading, refetch: fetchRepositories };
// };

// export default useRepositories;