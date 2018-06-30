import React from 'react';
import { Image,StyleSheet,AsyncStorage} from 'react-native';
import {View,Text, Container, Content, Icon, Header, Body, Left,Item, Input } from 'native-base'
import API_URL from './../modules/Settings'
import {  Thumbnail } from 'native-base';

export default class DrawerLogo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userData: {},
      userName: 'Пользователь',
      noAvatarUrl:'',
      avatarUrl: '',
      clientName:''
    }
  }


  _retrieveData = async (name) => {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value !== null) {
        // We have data!!
        this.setState({
          userData:value,
          userName: JSON.parse(value).user_data.name,
          noAvatarUrl:JSON.parse(value).no_avatar_url,
          avatarUrl: JSON.parse(value).avatar_url,
          clientName: JSON.parse(value).user_data.client_data.name,
        })
        //alert( this.state.avatarUrl)
      }
     } catch (error) {
       // Error retrieving data
     }
  }
  
  componentDidMount() {
    //this.props.navigation.setParams({ increaseCount: this._increaseCount });
    this._retrieveData('user_data')
  }

  render() {
    if (this.state.avatarUrl!=undefined && this.state.avatarUrl!=''){
      return (
          <View style={styles.container}>
               <Thumbnail
                    source={{uri:API_URL+this.state.avatarUrl}}
                    style={{ width: 96, height: 96 }}
                    />
              <Text style={styles.logoText}>{this.state.userName}</Text>
              <Text style={styles.clientText}>{this.state.clientName}</Text>
              
          </View>
    
      );} else{
        return (
          <View style={styles.container}>
               <Thumbnail
                    source={{uri:API_URL+this.state.noAvatarUrl}}
                    style={{ width: 96, height: 96 }}
                    />
              <Text style={styles.logoText}>{this.state.userName}</Text>
              <Text style={styles.clientText}>{this.state.clientName}</Text>
              
          </View>
    
      );
      }
    }
  }


  const styles = StyleSheet.create({
    container : {
      flexGrow: 1,
      justifyContent:'flex-end',
      alignItems: 'center'
    },
    logoText : {
        marginVertical: 5,
        fontSize:14,
        color:'rgba(255, 255, 255, 0.7)'
    },

    clientText : {
      paddingBottom: 10,
      fontSize:14,
      color:'rgba(255, 255, 255, 0.7)'
  }
  });