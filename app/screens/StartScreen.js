import React from "react";
import {
  View,
  Text,
  AsyncStorage,
  ActivityIndicator,
  Alert,
  BackHandler
} from "react-native";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";

import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";
import TestAsyncScreen from "./TestAsyncScreen";
import ConfirmationCodeScreen from "./ConfirmationCodeScreen";
import {
  GetStorageValue,
  SetStorageValue,
  GetWrap
} from "./../modules/AsyncStorageModule";
import {
  USER_ID,
  USER_NAME,
  CLIENT_ID,
  CLIENT_NAME
} from "./../modules/StorageVars";
import AuthLoadingScreen from "./AuthLoadingScreen";
import RootScreen from "./RootScreen";
import DrawerNavigator from "./DrawerNavigator";
route_name = "StackAuth";
export default class StartScreen extends React.Component {
  ///ЗДЕСЬ надо добавить конструктор, в котором проверять есть ли в хранилище параметр USER_ID
  //если его нет то начальной страницей делаем LOGIN
  //иначе начальной страницей делаем HOMe
  constructor(props) {
    super(props);
    //this.clickSet()
    this.state = {
      isLoading: true,
      user_id: -1,
      userData: {},
      signedIn: false
    };
    //SetStorageValue(USER_ID,'1')
  }

  _retrieveData = async name => {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value !== null) {
        // We have data!!
        this.setState({
          userData: JSON.parse(value),
          isLoading: false
        });
        //alert('V='+JSON.parse(value).id)
        id = JSON.parse(value).id;

        if (id > 0 && id != null && id != undefined) {
          //this.props.navigation.navigate('Home')
          this.setState({ signedIn: true });
        }
      } else {
        this.setState({
          isLoading: false
        });
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentDidMount() {
    this._retrieveData("user_data");
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

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return <MyNavigator />;
  }
}

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Registration: RegistrationScreen,
    ConfirmationCode: ConfirmationCodeScreen
  },
  {
    initialRouteName: "Login",
    navigationOptions: {
      // headerTitle: <LogoTitle />,
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

const MyNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: DrawerNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);
