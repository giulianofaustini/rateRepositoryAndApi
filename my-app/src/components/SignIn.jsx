import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSignIn } from './hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import { SignInForm } from './SignInForm';

export const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const accessToken = await signIn({ username, password });
      console.log('Access Token in SignIn component:', accessToken);

      if (accessToken) {
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <SignInForm onSubmit={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    padding: 20,
    marginTop: 20,
    borderRadius: 5,
  },
});




// baf1266959c3b2be3ff4252c8c6f99dac5011232