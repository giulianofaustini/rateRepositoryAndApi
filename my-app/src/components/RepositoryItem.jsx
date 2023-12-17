import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TextWithThemes } from './TextWithThemes';

const formatCount = (count) => {
  if (count >= 1000) {
    const formattedCount = (count / 1000).toFixed(1);
    return `${formattedCount}k`;
  }
  return count.toString();
};

export const RepositoryItem = ({ item, color, fontSize, fontWeight, style }) => {
  return (
    <View style={{backgroundColor:"#e1e4e8" }} >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <TextWithThemes color="textSecondary" fontWeight="bold">
            {item.fullName}
          </TextWithThemes>
          <TextWithThemes color="textPrimary">{item.description}</TextWithThemes>
          <TextWithThemes color="textPrimary" fontWeight="bold" style={{color:"white" , backgroundColor: '#0366d6' , width: '40%' , borderRadius: 2, padding: 3}} >
            
            {item.language}
          </TextWithThemes>
        </View>
      </View>

      <View>
        <View style={styles.additionalInfoContainer}>
          <View>
          <Text style={{fontWeight:"bold"}} >{formatCount(item.forksCount)}</Text>
            <Text>Forks</Text> 
          </View>
          <View>
          <Text  style={{fontWeight:"bold"}}>{formatCount(item.stargazersCount)}</Text>
            <Text>Stars</Text>
          </View>
          <View>
          <Text  style={{fontWeight:"bold"}}t>{item.ratingAverage}</Text>
            <Text>Rating</Text>
            
          </View>
          <View>
          <Text  style={{fontWeight:"bold"}}>{item.reviewCount}</Text>
            <Text>Review</Text>
           
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
   

  },
  imageContainer: {
  
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
 
  },
  additionalInfoContainer: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
