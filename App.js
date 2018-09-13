import React from "react";
// import { View, Text,AsyncStorage, ActivityIndicator } from 'react-native';
// import { createStackNavigator } from 'react-navigation';

// import HomeScreen from './app/screens/HomeScreen'
// import LoginScreen from './app/screens/LoginScreen'
// import RegistrationScreen from './app/screens/RegistrationScreen'
// import TestAsyncScreen from './app/screens/TestAsyncScreen'
// import ConfirmationCodeScreen from './app/screens/ConfirmationCodeScreen'
// import {GetStorageValue,SetStorageValue,GetWrap} from './app/modules/AsyncStorageModule'
// import {USER_ID, USER_NAME, CLIENT_ID, CLIENT_NAME} from './app/modules/StorageVars'
import StartScreen from "./app/screens/StartScreen";
import { Alert, BackHandler } from "react-native";

export default class AppScreen extends React.Component {
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", function() {
      Alert.alert(
        "Выход",
        "Вы действительно хотите выйти?",
        [
          {
            text: "Отмена",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => BackHandler.exitApp()
          }
        ],
        {
          cancelable: false
        }
      );
      return true;
    });
  }

  render() {
    return <StartScreen />;
  }
}
