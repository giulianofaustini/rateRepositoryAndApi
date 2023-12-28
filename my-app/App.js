import React from 'react';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/components/utils/apolloClient';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import AuthStorage from './src/components/utils/authStorage';
import AuthStorageContext from './src/components/contexts/AuthStorageContext';
import { NavigationContainer } from '@react-navigation/native';
import { Main } from './src/components/Main'; // Ensure the path is correct
import { NativeRouter } from 'react-router-native';


const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  console.log('Constants', Constants.expoConfig);

  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <NavigationContainer >
          <NativeRouter>
          <Main />
          </NativeRouter>
        </NavigationContainer>
      </AuthStorageContext.Provider>
      <StatusBar style="auto" />
    </ApolloProvider>
  );
};

export default App;


// http://localhost:5001/api/repositories 
// http://192.168.32.135:5001/api/repositories
// http://localhost:4000/
// https://5db1-193-210-162-123.ngrok-free.app/graphql