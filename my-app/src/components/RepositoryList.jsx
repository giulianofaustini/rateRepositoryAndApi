import { FlatList, View, StyleSheet  } from "react-native";
import  {RepositoryItem}  from "./RepositoryItem";
import React, { useState, useEffect } from 'react';
import useRepositories  from './hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;



  export const RepositoryList = () => {
  

    const { repositories } = useRepositories();
    
 
  const repositoryNodes = repositories

    // console.log('repository nodes in repository list ', repositoryNodes);


    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RepositoryItem item={item} />}
      />
    );
  };

