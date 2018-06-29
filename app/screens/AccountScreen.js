import React from "react";
import {
  View,  Text,  Button,  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";

import { Container, Content, Icon, Header, Body } from 'native-base'
import {DrawerNavigator} from 'react-navigation'

export default class AccountScreen extends React.Component {
  static navigationOptions = {
    title: "Профиль пользователя",
    route:'/userProfile',
    userProfile:{}
  };

  componentDidMount(){

    params =[{"name":"user_id","value":USER_ID}]
    response =getWithParams(this.state.route,params).then(
      response=> {
        
       if (response.message==undefined){
       this.setState({
          isLoading:false,
          userProfile:response,
          
        })}
        
      }
    )    
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Аккаунт</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
