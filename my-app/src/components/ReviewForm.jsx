import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../components/graphql/mutations';
import { useNavigation } from '@react-navigation/native';

const reviewSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().min(0).max(100).required('Rating is required'),
  review: yup.string(),
});

export const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigation = useNavigation();
  const [repositoryId, setRepositoryId] = useState(null);

  const handleSubmit = async (values) => {
    const { username, repositoryName, rating, review } = values;

    try {
      const { data } = await createReview({
        variables: {
          repositoryName,
          ownerName: username,
          rating: Number(rating),
          text: review,
        },
      });

      const fetchedRepositoryId = data?.repository?.id;
      if (fetchedRepositoryId) {
        setRepositoryId(fetchedRepositoryId);
      } else {
        console.error('Repository ID not found in data object');
      }

      console.log('Review created in review form:', data);
    } catch (error) {
      console.error('Failed to create review:', error);
    }
  };

  // Use useEffect to navigate once repositoryId is available
  useEffect(() => {
    if (repositoryId) {
      navigation.navigate(`/git-url/${repositoryId}`);
    }
  }, [repositoryId, navigation]);

  return (
    <Formik
      initialValues={{ username: '', repositoryName: '', rating: '', review: '' }}
      validationSchema={reviewSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.formContainer}>
          <TextInput
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
            placeholder="GitHub Username"
          />
          {errors.username && <Text>{errors.username}</Text>}

          <TextInput
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            value={values.repositoryName}
            placeholder="Repository Name"
          />
          {errors.repositoryName && <Text>{errors.repositoryName}</Text>}

          <TextInput
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            value={values.rating}
            placeholder="Rating (0-100)"
            keyboardType="numeric"
          />
          {errors.rating && <Text>{errors.rating}</Text>}

          <TextInput
            onChangeText={handleChange('review')}
            onBlur={handleBlur('review')}
            value={values.review}
            placeholder="Review"
            multiline
          />

          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
  },
});
