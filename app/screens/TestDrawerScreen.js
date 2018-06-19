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
import FlatListGridScreen from './FlatListGridScreen'

//library imports 
import { Container, Content, Icon, Header, Body, Left } from 'native-base'
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView,createDrawerNavigator } from 'react-navigation'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const AccountsStack = StackNavigator({
    // Account: {
    //   screen: AccountScreen,
    //   navigationOptions: ({ navigation }) => ({
    //     title: 'AccountScreen',  // Title to appear in status bar
    //     headerLeft: <Icon name="menu"  onPress={ () => navigation.toggleDrawer() } />
    //   })
    // },
    FlatListGrid :{
        screen:FlatListGridScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'ЗДЕСЬ ДОБАВИТЬ ДАШБОАРД',  // Title to appear in status bar
            headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
            headerStyle: {
                backgroundColor: '#074c99',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              }
          })
    }
  });
  
  const UserAgreementStack = StackNavigator({
    UserAgreement: {
      screen: UserAgreementScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'UserAgreement',  // Title to appear in status bar
        headerLeft: <Icon name="menu"  onPress={ () => navigation.toggleDrawer() } />
      })
    }
  });
  
  const Root = DrawerNavigator({
    UserAgreement: {
      screen: UserAgreementStack,
      navigationOptions: {
        title: 'UserAgreement' // Text shown in left menu
      }
    },
    Account: {
      screen: AccountsStack,
      navigationOptions: {
        title: 'Accounts',  // Text shown in left menu
      }
    }    
  })


  export default class TestDrawer extends Component {
    
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