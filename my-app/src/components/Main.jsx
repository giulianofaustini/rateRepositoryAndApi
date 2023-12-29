
import {  View} from "react-native";
import {RepositoryList} from "./RepositoryList"
import { AppBar } from "./AppBar";
import { Route, Routes } from "react-router-native";
import { SignIn } from "./SignIn";
import {SingleRepositoryView} from "./SingleRepositoryView";
import { ReviewForm } from "./ReviewForm";
import {SignUpForm} from "./SignUpForm";



export const Main = () => {

  const handleSignUp = (userData) => {
    console.log("User signed up:", userData);
    
  };
  
  return (
    <View>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/git-url/:id" element={<SingleRepositoryView />} />
        <Route path="/create-review" element={<ReviewForm />} />
        <Route path="/signUp" element={<SignUpForm onSignUp={handleSignUp} />} />
      </Routes>
    </View>
  );
};
