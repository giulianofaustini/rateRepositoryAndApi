import { Formik } from "formik";
import { View, TextInput, Text, Button } from "react-native";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "./graphql/mutations";
import { useNavigate } from "react-router-native";
import { useSignIn } from "./hooks/useSignIn";

const signUpSchema = yup.object().shape({
    username: yup.string().min(5).max(30).required("Username is required"),
    password: yup.string().min(5).max(50).required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
  });

export const SignUpForm = ({ onSignUp }) => {
  const [createUser] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  console.log("onSignUp in SignUpForm:", signIn);

  const handleSubmit = async (values) => {
    console.log("Form values:", values);
    const { username, password, confirmPassword } = values;

    try {
        const { data } = await createUser({
            variables: {
              user: {
                username,
                password,
                confirmPassword,
              },
            },
          });

      console.log("data in SignUpForm:", data);

      if (data && data.createUser) {
        onSignUp(data.createUser);
      }

      const accessToken = await signIn({ username, password, confirmPassword: password });
      console.log("Access Token in SignUp component:", accessToken);

      if (accessToken) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={signUpSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View>
          <TextInput
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            value={values.username}
            placeholder="Username"
          />
          {errors.username && <Text>{errors.username}</Text>}

          <TextInput
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            placeholder="Password"
            secureTextEntry
          />
          {errors.password && <Text>{errors.password}</Text>}

          <TextInput
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                placeholder="Confirm Password"
                secureTextEntry
              />
              {errors.confirmPassword && <Text>{errors.confirmPassword}</Text>}

          <Button title="Sign Up" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};
