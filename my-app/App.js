import {Main} from './src/components/Main';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/components/utils/apolloClient';

import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import Costants from 'expo-constants';
import AuthStorage from './src/components/utils/authStorage';

import AuthStorageContext from './src/components/contexts/AuthStorageContext'

const authStorage = new AuthStorage();


const apolloClient = createApolloClient(authStorage);

const App = () => {

  console.log('Constants', Costants.expoConfig);



  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;



// http://localhost:5001/api/repositories 
// http://192.168.32.135:5001/api/repositories
// http://localhost:4000/
// https://5db1-193-210-162-123.ngrok-free.app/graphql