import React from "react";
import {
  View,  Text,  Button,  StyleSheet,
  TouchableOpacity,
  TextInput,ActivityIndicator
} from "react-native";

import { Container, Header, Content, Tab, Tabs,TabHeading } from 'native-base';
import {DrawerNavigator} from 'react-navigation'
import {USER_DATA,USER_ID, CART_ID} from './../modules/VarContainer'
import {getWithParams,getWithSlashParams} from './../modules/Http'
import TabProfileUser from './TabProfileUser'
import TabProfileClient from './TabProfileClient'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
export default class AccountScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading:true,
      route:'/userProfile',
      userProfile:{}
    }
  }

  static navigationOptions = {
    title: "Профиль пользователя",
  };

  componentDidMount(){

    // params =[{"name":"user_id","value":USER_ID}]
    // response =getWithParams(this.state.route,params).then(
    //   response=> {
    //   //alert(JSON.stringify(response))
    //    if (response.message==undefined){
    //    this.setState({
    //       userProfile:response,
    //       isLoading:false,   

    //     })

    //     }
    //   }
    // )    
  }


  render() {

    // if(this.state.isLoading){
    //   return(
    //     <View style={{flex: 1, padding: 20}}>
    //       <ActivityIndicator size="large" color="#0000ff"/>
    //     </View>
    //   )
    // }
    return (
      <Container style={styles.container}>
        {/* <Header hasTabs /> */}
        <Tabs >
        <Tab   heading={ <TabHeading style={styles.tabHeaderStyle}><MCIcon name="account" size={24}/><Text>Пользователь</Text></TabHeading>}>
            <TabProfileUser />
          </Tab>
          <Tab  heading={ <TabHeading style={styles.tabHeaderStyle}><MCIcon name="home" size={24}/><Text>Организация</Text></TabHeading>}>
            <TabProfileClient />
          </Tab>
          
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tabHeaderStyle:{
    height:50,
    backgroundColor:'#d3d3d3'
  }
});
