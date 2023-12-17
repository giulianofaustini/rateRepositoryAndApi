
import { Link } from 'react-router-native';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import {TextWithThemes} from './TextWithThemes';
import { ScrollView } from 'react-native';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height:100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
  },

 
  link: {
    padding: 2,
    flexGrow: 0,
    flexDirection: 'row',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});



export const AppBar = () => {
  return (
    <ScrollView>
    <View style={styles.container}>    
        <Link to="/" >
        <TextWithThemes fontSize="subheading" fontWeight="bold" style={styles.link}   >
          Repositories
        </TextWithThemes>
        </Link>
       
       
        <Link to="/signIn" >
        <TextWithThemes fontSize="subheading" fontWeight="bold"  style={styles.link} >
          Sign in
        </TextWithThemes>
        </Link>
    </View>
    </ScrollView>
  );
};



