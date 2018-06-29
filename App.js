import React from 'react';
import { View, Text,AsyncStorage, ActivityIndicator } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './app/screens/HomeScreen'
import LoginScreen from './app/screens/LoginScreen'
import RegistrationScreen from './app/screens/RegistrationScreen'
import TestAsyncScreen from './app/screens/TestAsyncScreen'
import ConfirmationCodeScreen from './app/screens/ConfirmationCodeScreen'
import {GetStorageValue,SetStorageValue,GetWrap} from './app/modules/AsyncStorageModule'
import {USER_ID, USER_NAME, CLIENT_ID, CLIENT_NAME} from './app/modules/StorageVars'


route_name ='Login'
export default class AppScreen extends React.Component {
  ///ЗДЕСЬ надо добавить конструктор, в котором проверять есть ли в хранилище параметр USER_ID
  //если его нет то начальной страницей делаем LOGIN 
  //иначе начальной страницей делаем HOMe
  constructor(props){
    super(props)
    //this.clickSet()
    this.state = {
      isLoading :true, 
      user_id:-1,
      userData: {},
      signedIn:false
    }
    //SetStorageValue(USER_ID,'1')
  }

  _retrieveData = async (name) => {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value !== null) {
        // We have data!!
        this.setState({
          userData:JSON.parse(value),
          isLoading:false
        })
        //alert('V='+JSON.parse(value).id)
        id = JSON.parse(value).id

        if (id>0 && id!=null && id !=undefined)
        {
          //this.props.navigation.navigate('Home')
          this.setState({signedIn : true})
        } 
      } else{
        this.setState({
          
          isLoading:false
        })
      }
     } catch (error) {
       // Error retrieving data
     }
  }

  componentDidMount(){  
    this._retrieveData('user_data')
  }

  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }


    if (this.state.signedIn==false){
      return <RootStack navigation={this.navigation}/>;
    } else {
      return <RootStackLogged navigation={this.navigation}/>
    }

  }
}

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
  Registration: RegistrationScreen,
  ConfirmationCode: ConfirmationCodeScreen,
  TestAsync :TestAsyncScreen
},
{
  initialRouteName: "Login",
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

const RootStackLogged = createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
  Registration: RegistrationScreen,
  ConfirmationCode: ConfirmationCodeScreen,
  TestAsync :TestAsyncScreen
},
{
  initialRouteName: "Home",
  initialRouteParams: {navigation:this.navigation},
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