import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image, Button
} from "react-native";


import AccountScreen from './AccountScreen'
import UserAgreementScreen from "./UserAgreementScreen";
import DashboardScreen from './DashboardScreen'
import ProductCategoriesScreen from './ProductCategoriesScreen'
import ProductsCatalogScreen from './ProductsCatalogScreen'
//library imports 
import { Container, Content, Icon, Header, Body, Left } from 'native-base'
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView,createDrawerNavigator, createStackNavigator } from 'react-navigation'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const AccountsStack = StackNavigator({
    Account: {
      screen: AccountScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'AccountScreen',  // Title to appear in status bar
        headerLeft: <Icon name="menu"  onPress={ () => navigation.toggleDrawer() } />
      })
    },
    
  });
  
  const UserAgreementStack = StackNavigator({
    UserAgreement: {
      screen: UserAgreementScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Пользовательское соглашение',  // Title to appear in status bar
        headerLeft: <Icon name="menu"  onPress={ () => navigation.toggleDrawer() } />
      })
    }
  });

  
const DashboardStack= createStackNavigator({
  Dashboard: {screen:DashboardScreen, navigationOptions: ({ navigation }) => ({
          title: 'Главная',  // Title to appear in status bar
          headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
})},
  ProductCategories: {screen:ProductCategoriesScreen},
  ProductsCatalog: {screen:ProductsCatalogScreen},

 // Registration: RegistrationScreen,
},
{
  initialRouteName: 'Dashboard',
  navigationOptions: ({ navigation }) => ({
            title: 'Главная',  // Title to appear in status bar
            //headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
            headerStyle: {
                backgroundColor: '#074c99',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              }
          }),
          //mode: 'modal',
        
});

const Root = DrawerNavigator({
    Dashboard: {
      screen: DashboardStack,
      navigationOptions: {
        title: 'Главная' // Text shown in left menu
      }
    },
    UserAgreement: {
      screen: UserAgreementStack,
      navigationOptions: {
        title: 'Пользовательское соглашение' // Text shown in left menu
      }
    },
    Account: {
      screen: AccountsStack,
      navigationOptions: {
        title: 'Профиль',  // Text shown in left menu
      }
    }    
  })

  export default class RootScreen extends Component {
    
    static navigationOptions = {
        headerMode: 'none',
        header: null
      };
    render() {
      return (
        
        <Root />
      )
    }
  }