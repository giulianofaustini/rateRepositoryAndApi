// useRepositories.js
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { Text } from 'react-native';




const useRepositories = () => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

//   console.log('data', data);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const edges = data?.repositories?.edges || [];

//   console.log('edges', edges);

  const repositories = edges.map(edge => edge.node);

//   console.log('repositories', repositories);

  return { repositories, loading, error, refetch };
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