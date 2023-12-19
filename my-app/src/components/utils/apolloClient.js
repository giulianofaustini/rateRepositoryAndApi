import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import Costants from 'expo-constants'

const httpLink = createHttpLink({

  
 

 uri: Costants.expoConfig.extra.apolloUri,
});

const createApolloClient = () => {
  return new ApolloClient({
    
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;

