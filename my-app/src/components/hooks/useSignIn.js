

import { AUTHORIZE } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

export const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHORIZE);
  
    const signIn = async ({ username, password }) => {
      try {
        const { data } = await mutate({
          variables: { credentials: { username, password } },
        });
  
        if (!data || !data.authenticate || !data.authenticate.accessToken) {
          console.log('Authentication failed. Data:', data);
          throw new Error('Authentication failed');
        }
  
        console.log('Access Token:', data.authenticate.accessToken);
  
        return data.authenticate.accessToken;
      } catch (error) {
        console.error('Authentication failed:', error);
        throw error;
      }
    };
  
    return [signIn, result];
  };

  