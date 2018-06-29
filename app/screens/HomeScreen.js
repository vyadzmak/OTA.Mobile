import React from 'react';
import { View, Text,Alert, Button,  } from 'react-native';
import {Container, Header, Left, Right, Content} from 'native-base'
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

// import Icon from 'react-native-vector-icons/MaterialIcons'

import ProductCategoriesScreen from './ProductCategoriesScreen'

import DashboardScreen from './DashboardScreen'
import DrawerMenu from './../components/DrawerComponent'
import RootScreen from './RootScreen'
import LoginScreen from './LoginScreen'

export default class HomeScreen extends React.Component {
  
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props)
    
  }

  

  render() {
    return (
      <DashStack /> 
    );
  }  
}

const DashStack = createStackNavigator({
  Drawer :DrawerMenu,
  Dashboard :DashboardScreen,
  ProductCategories: ProductCategoriesScreen,  
  RootScreen :RootScreen,
  Login: LoginScreen
},
{
  initialRouteName: 'RootScreen',
  initialRouteParams: {navigation:this.navigation},
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#074c99',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});