import React from 'react';
import { View, Text, Button, Linking } from 'react-native';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_GIT_URL } from './graphql/queries';
import { RepositoryItem } from './RepositoryItem'; 

export const SingleRepositoryView = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_GIT_URL, {
    variables: { id },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const { repository } = data;

//   console.log('repository in single repository view', repository);

  const handleOpenGitHub = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View>
      <RepositoryItem item={repository} />
      <Button title="Open in GitHub" onPress={handleOpenGitHub} />
    </View>
  );
};


