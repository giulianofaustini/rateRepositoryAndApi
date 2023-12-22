import { Link } from "react-router-native";
import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import { TextWithThemes } from "./TextWithThemes";
import { ScrollView } from "react-native";
import { ME } from "./graphql/queries";
import { useQuery } from "@apollo/client";
import { useSignOut } from "./hooks/useSignOut";
import { useContext } from "react";
import AuthStorageContext from "./contexts/AuthStorageContext";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
  },

  link: {
    padding: 2,
    flexGrow: 0,
    flexDirection: "row",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export const AppBar = () => {

  const authStorage = useContext(AuthStorageContext);
  console.log("AuthStorage Context:", authStorage);


  const { data } = useQuery(ME , { 
    fetchPolicy: 'network-only',
    onError: (error) => {
      console.error("Error fetching ME query:", error);
    },
  });





  console.log("data in appbar that contain the user ME ", authStorage);
  console.log("data in appbar that contain the user ME ", signedIn);

  const fetchSignedInUser = async () => {
    const user = await authStorage.getAccessToken();
    console.log("user in appbar that contain the user ME ", user);
  }
  fetchSignedInUser();

  const signedIn = data?.me ? true : false;
  if (data) {
    console.log("data in appbar that contain the user ME ", data);
  }


 
 


  const signOut = useSignOut()

  return (
    <ScrollView>
      <View style={styles.container}>
        {!signedIn ? (
          <Link to="/signIn">
            <TextWithThemes
              fontSize="subheading"
              fontWeight="bold"
              style={styles.link}
            >
              Sign in
            </TextWithThemes>
          </Link>
        ) : (
          <Pressable onPress={signOut}>
       
            <TextWithThemes
              fontSize="subheading"
              fontWeight="bold"
              style={styles.link}
            >
              Sign out
            </TextWithThemes>
      
          </Pressable>
        )}

        <Link to="/">
          <TextWithThemes
            fontSize="subheading"
            fontWeight="bold"
            style={styles.link}
          >
            Repositories
          </TextWithThemes>
        </Link>
      </View>
    </ScrollView>
  );
};
