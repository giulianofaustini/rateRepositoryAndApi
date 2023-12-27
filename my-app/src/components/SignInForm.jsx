import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { FormikTextInput } from './FormikTextInput';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  username: yup.string().min(5, 'Username must be at least 5 characters').required('Username is required'),
  password: yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
});

export const SignInForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={formStyles.container}>
          <FormikTextInput name="username" placeholder="Username" style={formStyles.input} />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry style={formStyles.input} />

          <Pressable onPress={handleSubmit}>
            <Text style={formStyles.button}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const formStyles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    padding: 20,
    borderRadius: 5,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
  },
  button: {
    color: 'white',
    backgroundColor: 'blue',
    padding: 5,
    marginTop: 20,
    borderRadius: 5,
    textAlign: 'center',
  },
});

export default SignInForm;
