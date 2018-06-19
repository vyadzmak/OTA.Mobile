import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './app/screens/HomeScreen'
import LoginScreen from './app/screens/LoginScreen'
import RegistrationScreen from './app/screens/RegistrationScreen'
import TestDrawerScreen from './app/screens/TestDrawerScreen'

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
  Registration: RegistrationScreen,
  //TestDrawer: TestDrawerScreen
},
{
  initialRouteName: 'Login',
  navigationOptions: {
    // headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#074c99',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});