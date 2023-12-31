import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';



import Costants from 'expo-constants'

const httpLink = createHttpLink({

  
 

 uri: Costants.expoConfig.extra.apolloUri,
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
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
    cache
   
  });
};

export default createApolloClient;

