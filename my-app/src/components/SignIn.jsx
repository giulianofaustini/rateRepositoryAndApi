
import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Formik } from 'formik';
import { FormikTextInput } from './FormikTextInput';
import * as yup from 'yup';
import { useSignIn } from './hooks/useSignIn';

const validationSchema = yup.object().shape({
  username: yup.string().min(5, 'Username must be at least 5 characters').required('Username is required'),
  password: yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
});

export const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const accessToken = await signIn({ username, password });

      console.log('Access Token in SignIn component:', accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" style={styles.input} />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry style={styles.input} />

          <Pressable onPress={handleSubmit}>
            <Text style={styles.button} color='textPrimary'>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    padding: 20,
    marginTop: 20,
    border: 5,
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


// baf1266959c3b2be3ff4252c8c6f99dac5011232