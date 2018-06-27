import React from "react";
import {
  View,  Text,  Button,  StyleSheet,
  TouchableOpacity,
  TextInput,AsyncStorage
} from "react-native";
import {GetStorageValue,SetStorageValue} from './../modules/AsyncStorageModule'

export default class FavoritesScreen extends React.Component {
  static navigationOptions = {
    title: "Избранное"
  };

  clickGet(){
    try{
         //let user =await AsyncStorage.getItem('jname')
         //alert(user)
        GetStorageValue('title')
    } catch(err){

    }
  }

  clickSet (){
      //let user = 'Josn Snow'
      //AsyncStorage.setItem('jname', user)
      //console.log('OK')
      SetStorageValue('title','Lorem ipsum')
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => {this.clickSet()}} title='Set'></Button>
        <Button onPress={() => {this.clickGet()}} title='Get'></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
