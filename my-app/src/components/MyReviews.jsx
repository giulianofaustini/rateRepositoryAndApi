import { useUserReviews } from "./hooks/useUserReviews";
import { StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";

export const MyReviews = () => {
  const { user, loading, error } = useUserReviews();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const userReviews = user?.reviews?.edges?.map(edge => edge.node);

  return (
    <View>
      {userReviews?.map(review => (
        <View key={review.id} style={styles.reviewContainer}>
          <Text style={styles.rating}>{review.rating}</Text>
          <View style={styles.usernameContainer}>
            {review.repository && (
              <Text style={styles.text}>{review.repository.name}</Text>
            )}
            <Text>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
            <Text style={styles.description}>{review.text}</Text>
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
  description : {
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
