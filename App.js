import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './app/screens/HomeScreen'
import LoginScreen from './app/screens/LoginScreen'

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen
},
{
  initialRouteName: 'Login',
  navigationOptions: {
    // headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});