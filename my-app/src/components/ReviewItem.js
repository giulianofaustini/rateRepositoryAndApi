import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { format } from "date-fns";

const styles = StyleSheet.create({
  reviewContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  usernameContainer: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontWeight: "bold",
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

export const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");

  return (
    <View style={styles.reviewContainer}>
      <Text style={styles.rating}>{review.rating}</Text>
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text>{formattedDate}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

