//import system components
import React from "react";
import {
  View,  Text,  Button,  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Container, Content, Icon, Header, Body, Left } from 'native-base'
import {DrawerNavigator, withNavigation} from 'react-navigation'

//import custom components

import ProductsCategoryList from './../components/ProductsCategoryListComponent'
//import another
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

class DashboardScreen extends React.Component {
  constructor(props){
    super(props)
    }

    static navigationOptions = {
    title: "Главная XXX",
    
  };

  render() {
    return (
      //
      <View style ={styles.container}>
      
      {/* <Text>Категории</Text> */}
      <ProductsCategoryList navigation={this.props.navigation}/>

      
      </View>
      
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    //alignItems: "center",
    //justifyContent: "center",
    //borderColor: "#ff0000",
    //borderWidth: 3,
  }
});

export default withNavigation(DashboardScreen)