import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from 'react-router-native';
import { RepositoryItem } from "./RepositoryItem"; 
import useRepositories from './hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();

  

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/git-url/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

export const RepositoryList = () => {
  const { repositories } = useRepositories(); // Make sure to import useRepositories

  return <RepositoryListContainer repositories={repositories} />;
};

