import React from 'react';
// import { View, Text,AsyncStorage, ActivityIndicator } from 'react-native';
// import { createStackNavigator } from 'react-navigation';

// import HomeScreen from './app/screens/HomeScreen'
// import LoginScreen from './app/screens/LoginScreen'
// import RegistrationScreen from './app/screens/RegistrationScreen'
// import TestAsyncScreen from './app/screens/TestAsyncScreen'
// import ConfirmationCodeScreen from './app/screens/ConfirmationCodeScreen'
// import {GetStorageValue,SetStorageValue,GetWrap} from './app/modules/AsyncStorageModule'
// import {USER_ID, USER_NAME, CLIENT_ID, CLIENT_NAME} from './app/modules/StorageVars'
import StartScreen from './app/screens/StartScreen'


export default class AppScreen extends React.Component {

  render() {
    return (<StartScreen/>)
  }
}
