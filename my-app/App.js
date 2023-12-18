import {Main} from './src/components/Main';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/components/utils/apolloClient';

import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import Costants from 'expo-constants';

const apolloClient = createApolloClient();

const App = () => {

  console.log('Constants', Costants.expoConfig);



  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
        <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;