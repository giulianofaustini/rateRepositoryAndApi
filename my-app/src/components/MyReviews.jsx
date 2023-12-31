import { useUserReviews } from "./hooks/useUserReviews";
import { Button, StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";

import { DELETE_REVIEW_MUTATION } from "./graphql/mutations";
import { useMutation } from "@apollo/client";
import { Alert } from "react-native";
import { useNavigate } from "react-router-native";

export const MyReviews = () => {
  const { user, loading, error , refetch} = useUserReviews();

  const [deleteReview] = useMutation(DELETE_REVIEW_MUTATION);

    const navigate = useNavigate();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const userReviews = user?.reviews?.edges?.map((edge) => edge.node);

  const handleDeleteReview = (reviewId) => {

    console.log("I D in reviewId in my reviews", reviewId);
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: reviewId } });
              
               refetch();
            } catch (error) {
              console.error("Error deleting review:", error);
            }
          },
        },
      ]
    );
  };

    const handleViewRepository = (repositoryId) => {
    navigate(`/git-url/${repositoryId}`);
    }


  return (
    
    <View>
      {userReviews?.map((review) => (
        <View key={review.id} style={styles.reviewContainer}>
          <Text style={styles.rating}>{review.rating}</Text>
          <View style={styles.usernameContainer}>
            {review.repository && (
              <Text style={styles.text}>{review.repository.name}</Text>
            )}
            <Text>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
            <Text style={styles.description}>{review.text}</Text>
          </View>
          <View style={styles.buttonContainer}>
          <View style={{ backgroundColor: 'red', borderRadius: 5 }}> 
          <Button
            title="View Repository"
            onPress={() => handleViewRepository(review.repository.id)}
          />
          </View>
            <View style={{flexDirection:"column" }}>
          <Button
            style={{ flex: 1 , alignItems: "bottom"}}
            title="Delete"
            onPress={() => handleDeleteReview(review.id)}
          />
          </View>
        </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
    flexDirection: "row",
    alignItems: "center",
   
    width: "100%",
    marginBottom: 10,
  },
  usernameContainer: {
    flex: 1,
    marginLeft: 20,
  },
  text: {
    fontWeight: "bold",
    marginBottom: 2,
    fontSize: 18,
  },
  description: {
    marginBottom: 5,
    fontStyle: "italic",
    fontSize: 16,
  },

  rating: {
    fontWeight: "bold",
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#0366d6",
    borderRadius: 25,
    color: "#0366d6",
    textAlign: "center",
    lineHeight: 46,
    marginRight: 10,
    

  },

    
});
