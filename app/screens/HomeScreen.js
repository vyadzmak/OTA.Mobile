import React from 'react';
import { View, Text,Alert, Button,  } from 'react-native';
import {Container, Header, Left, Right, Content} from 'native-base'
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

// import Icon from 'react-native-vector-icons/MaterialIcons'

import ProductCategoriesScreen from './ProductCategories'
import FlatListGridScreen from './FlatListGridScreen'
import DashboardScreen from './DashboardScreen'
import DrawerMenu from './../components/DrawerComponent'
import TestDrawerScreen from './TestDrawerScreen'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
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
  FlatListGrid :FlatListGridScreen,
  TestDrawer :TestDrawerScreen
},
{
  initialRouteName: 'TestDrawer',
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