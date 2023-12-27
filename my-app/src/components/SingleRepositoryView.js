import React from 'react';
import { View, Text, Button, Linking, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY_AND_REVIEWS } from './graphql/queries';
import { RepositoryItem } from './RepositoryItem';
import { ReviewItem } from './ReviewItem';

export const SingleRepositoryView = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_REPOSITORY_AND_REVIEWS, {
    variables: { id },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const { repository } = data;

  const handleOpenGitHub = () => {
    Linking.openURL(repository.url);
  };

  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        <RepositoryItem item={repository} />
        <Button title="Open in GitHub" onPress={handleOpenGitHub} />

        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 16 }}>
          Reviews
        </Text>

        {/* FlatList is replaced with direct ReviewItem rendering */}
        {repository.reviews.edges.map(({ node }) => (
          <ReviewItem key={node.id} review={node} />
        ))}
      </View>
    </ScrollView>
  );
};
