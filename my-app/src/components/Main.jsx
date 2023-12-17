
import { Text, StyleSheet, View, Pressable } from "react-native";
import { RepositoryList} from "./RepositoryList"
import { AppBar } from "./AppBar";
import { Route, Routes, Navigate } from "react-router-native";
import { SignIn } from "./SignIn";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

export const Main = () => {
  return (
    <View>
      <View>
        <Pressable>
          <AppBar />
        </Pressable>
      </View>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signIn" element={<SignIn to="/signIn" replace />} />

      </Routes>
    </View>
  );
};

