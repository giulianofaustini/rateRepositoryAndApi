import { AUTHORIZE } from "../graphql/mutations";
import { ApolloClient, useApolloClient, useMutation } from "@apollo/client";

import useAuthStorage from "./useAuthStorage";

export const useSignIn = () => {
  const authStorage = useAuthStorage();

  const [mutate, result] = useMutation(AUTHORIZE);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { credentials: { username, password } },
      });

      if (!data || !data.authenticate || !data.authenticate.accessToken) {
        console.log("Authentication failed. Data:", data);
        throw new Error("Authentication failed");
      }

      console.log(
        "Data access token in useSign:",
        data.authenticate.accessToken
      );

      
      await authStorage.setAccessToken(data.authenticate.accessToken);

      const storedToken = await authStorage.getAccessToken();

      console.log("Stored Token in useSign iN:", storedToken);

      await apolloClient.resetStore();

      // console.log('Access Token:', data.authenticate.accessToken);

      return data.authenticate.accessToken;
    } catch (error) {
      console.error("Authentication failed:", error);
      throw error;
    }
  };

  return [signIn, result];
};
