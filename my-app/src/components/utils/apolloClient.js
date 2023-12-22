import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';



import Costants from 'expo-constants'

const httpLink = createHttpLink({

  
 

 uri: Costants.expoConfig.extra.apolloUri,
});

const createApolloClient = ( authStorage ) => {

  const authLink = setContext(async (_, { headers }) => {

    try {
      const accessToken = await authStorage.getAccessToken();
      console.log('Access Token in apollo Client file:', accessToken);
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    }
    catch (e) {
      console.log('Error:', e);
    }
  }
  );
  
    return new ApolloClient({  
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;

