import React, { useState } from "react";
import { FlatList, View, StyleSheet, Pressable, Text } from "react-native";
import { useNavigate } from "react-router-native";
import { RepositoryItem } from "./RepositoryItem";
import useRepositories from "./hooks/useRepositories";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "./TextInput";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: "whitesmoke",
    padding: 2,
    textAlign: "center",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  console.log("repositories in repository list container", repositories);
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
  const [sortingCriteria, setSortingCriteria] = useState("CREATED_AT");


  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const onSearchChange = (value) => {
    setSearchKeyword(value);
    
  };

 

  const { repositories, loading, error, refetch } =
    useRepositories(sortingCriteria, debouncedSearchKeyword);

  const onSortingCriteriaChange = (value) => {
    setSortingCriteria(value);
    refetch();
  };

  console.log("repositories in repository list", repositories);

  return (
    <View>
      <View style={styles.container}>
        <Picker
          selectedValue={sortingCriteria}
          onValueChange={onSortingCriteriaChange}
        >
          <Picker.Item
            style={{ color: "#0366d6" }}
            label="Latest repositories"
            value="CREATED_AT-DESC"
          />
          <Picker.Item
            style={{ color: "#0366d6" }}
            label="Highest rated repositories"
            value="RATING_AVERAGE-DESC"
          />
          <Picker.Item
            style={{ color: "#0366d6" }}
            label="Lowest rated repositories"
            value="RATING_AVERAGE-ASC"
          />

          {loading && <Text>loading...</Text>}
          {error && <Text>Error fetching repositories</Text>}
        </Picker>
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder="Search repositories..."
          onChangeText={onSearchChange}
          value={searchKeyword}
          style={{ padding: 10, borderColor: "gray", borderWidth: 1 }}
        />
      </View>
      <View>
        <RepositoryListContainer repositories={repositories} />
      </View>
    </View>
  );
};
