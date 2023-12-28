import { Formik } from "formik";
import { View, TextInput, Text, Button } from 'react-native';
import * as yup from 'yup';
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "./graphql/mutations";

const signUpSchema = yup.object({
    username: yup.string().min(5).max(30).required('Username is required'),
  password: yup.string().min(5).max(50).required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    });



export const SignUpForm = ({ onSignUp }) => {
    const [createUser] = useMutation(CREATE_USER);
    
    const handleSubmit = async (values) => {
        const { username, password } = values;

        try {
            const { data } = await createUser({
                variables: {
                    user: {
                        username,
                        password
                    }
                }
            });
           onSignUp(data.createUser);
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <Formik
          initialValues={{ username: '', password: '', confirmPassword: '' }}
          validationSchema={signUpSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              <TextInput
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                placeholder="Username"
              />
              {errors.username && <Text>{errors.username}</Text>}
    
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
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

    
    export default SignUpForm;