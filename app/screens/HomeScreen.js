import React from "react";
import { View, Text, Alert, Button, BackHandler } from "react-native";
import { Container, Header, Left, Right, Content } from "native-base";
import { createStackNavigator } from "react-navigation"; // Version can be specified in package.json

// import Icon from 'react-native-vector-icons/MaterialIcons'

import ProductCategoriesScreen from "./ProductCategoriesScreen";

import DashboardScreen from "./DashboardScreen";
import DrawerMenu from "./../components/DrawerComponent";
import RootScreen from "./RootScreen";
import LoginScreen from "./LoginScreen";
//import StartScreen from './StartScreen'
export default class HomeScreen extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", function() {
      Alert.alert(
        "Выход",
        "Вы действительно хотите выйти?",
        [
          {
            text: "Cancel",
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

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    //alert(JSON.stringify(this.p_nav))
  }

  render() {
    return <DashStack />;
  }
}

const DashStack = createStackNavigator(
  {
    Drawer: DrawerMenu,
    Dashboard: DashboardScreen,
    ProductCategories: ProductCategoriesScreen,
    RootScreen: RootScreen
    //Start: StartScreen
  },
  {
    initialRouteName: "RootScreen",
    initialRouteParams: { navigation: this.navigation },
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#074c99"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);
