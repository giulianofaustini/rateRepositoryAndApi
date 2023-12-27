
import {  View, Pressable } from "react-native";
import {RepositoryList} from "./RepositoryList"
import { AppBar } from "./AppBar";
import { Route, Routes, Navigate } from "react-router-native";
import { SignIn } from "./SignIn";
import {SingleRepositoryView} from "./SingleRepositoryView";
import { ReviewForm } from "./ReviewForm";
import { NavigationContainer } from "@react-navigation/native";



export const Main = () => {
  return (
    <NavigationContainer> 
    <View>
      <View>
        <Pressable>
          <AppBar />
        </Pressable>
      </View>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/git-url/:id" element={<SingleRepositoryView />} />
        <Route path="/create-review" element={<ReviewForm />} />
      </Routes>
    </View>
    </NavigationContainer> 
  );
};

