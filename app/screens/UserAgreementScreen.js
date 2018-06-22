import React from "react";
import {
  View,  Text,  Button,  StyleSheet, ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";

import { Container, Content, Icon, Header, Body } from 'native-base'
import {DrawerNavigator} from 'react-navigation'
import {getWithParams,getWithSlashParams} from './../modules/Http'
import API_URL from './../modules/Settings'
export default class UserAgreementScreen extends React.Component {
  static navigationOptions = {
    title: "Пользовательское соглашение"
  };

  constructor(props) {
    super(props);
    this.state = {
      agreement_text: 'Useless Multiline Placeholder',
      isLoading :true, 
      user_id : 1,
      route:'/adminSettings',

      //productsCatalog:[],
    };
  }

  componentDidMount(){
        
    params =[{"name":"user_id","value":this.state.user_id}]
    
    response =getWithParams(this.state.route,params).then(
      response=> {
        //formatProductsCatalogToData(response)
        console.log(JSON.stringify(response))
        this.setState({
          isLoading:false,
          agreement_text:response[0].user_agreement
        })
       
      }
    ) .catch(function(error) {
      console.log('ALARMA: '+error)
      // this.setState({
      //   isLoading:false,
      //   agreement_text:response[0].user_agreement
      // })
    });
    
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text > {this.state.agreement_text}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    padding:10
    // alignItems: "center",
    // justifyContent: "center"
  }
});
