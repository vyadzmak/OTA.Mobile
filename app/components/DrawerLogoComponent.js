import React from 'react';
import { Image,StyleSheet,AsyncStorage} from 'react-native';
import {View,Text, Container, Content, Icon, Header, Body, Left,Item, Input } from 'native-base'

import {  Thumbnail } from 'native-base';

export default class DrawerLogo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userData: {},
      userName: 'Пользователь'
    }
  }


  _retrieveData = async (name) => {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value !== null) {
        // We have data!!
        this.setState({
          userData:value,
          userName: JSON.parse(value).user_data.name
        })
        //alert( JSON.parse(value).user_data.name)
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
      return (
          <View style={styles.container}>
               <Thumbnail
                    source={{uri:'http://sharik.ua/images/elements_big/3207-1220_m1.jpg'}}
                    style={{ width: 96, height: 96 }}
                    />
              <Text style={styles.logoText}>{this.state.userName}</Text>
              
          </View>
        
      );
    }
  }


  const styles = StyleSheet.create({
    container : {
      flexGrow: 1,
      justifyContent:'flex-end',
      alignItems: 'center'
    },
    logoText : {
        marginVertical: 15,
        fontSize:18,
        color:'rgba(255, 255, 255, 0.7)'
    }
  });