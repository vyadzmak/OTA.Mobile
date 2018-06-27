import React from 'react';
import { View, Text,AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './app/screens/HomeScreen'
import LoginScreen from './app/screens/LoginScreen'
import RegistrationScreen from './app/screens/RegistrationScreen'
import TestAsyncScreen from './app/screens/TestAsyncScreen'
import {GetStorageValue,SetStorageValue,GetWrap} from './app/modules/AsyncStorageModule'
import {USER_ID, USER_NAME, CLIENT_ID, CLIENT_NAME} from './app/modules/StorageVars'
route_name ='Login'
export default class App extends React.Component {
  ///ЗДЕСЬ надо добавить конструктор, в котором проверять есть ли в хранилище параметр USER_ID
  //если его нет то начальной страницей делаем LOGIN 
  //иначе начальной страницей делаем HOMe
  constructor(props){
    super(props)
    //this.clickSet()
    this.state = {
      isLoading :true, 
      user_id:-1
    }
    //SetStorageValue(USER_ID,'1')
  }



  componentDidMount(){  
    //alert('TT')
    GetStorageValue(USER_ID)
    .then((response) => {
      //alert(response)
      this.setState({
        isLoading:false,
        user_id:response
      })
    })
       
  }

  render() {
    //console.log("WORK")
    return <RootStack />;
  }
}

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
  Registration: RegistrationScreen,
  TestAsync :TestAsyncScreen
},
{
  initialRouteName: route_name,
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