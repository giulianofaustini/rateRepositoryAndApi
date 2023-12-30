import { ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";


export const useUserReviews = () => {
    
      const { data, loading, error } = useQuery(ME, {
     fetchPolicy: 'cache-and-network',
     variables: { includeReviews: true },
      });
    
      return { user: data && data.me , loading, error}
    };

