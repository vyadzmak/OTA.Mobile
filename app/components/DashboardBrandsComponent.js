import React from 'react';
import { StyleSheet,AsyncStorage,Image} from 'react-native';
import {View,Text, Container, Content, Icon, Header, Body, Left,Item, Input } from 'native-base'
import API_URL from './../modules/Settings'
import {  Thumbnail } from 'native-base';
import {NO_IMAGE_URL} from './../modules/VarContainer'
export default class DashboardBrandsComponent extends React.Component {   
  
  render() {

    //alert('this.props.show_slider: '+this.props.show_slider)
    //alert('this.props.images_data: '+JSON.stringify(this.props.images_data))


    if (this.props.show_brands){
    if (this.props.images_data!=null && this.props.images_data!=undefined){
      return (
            //    <Thumbnail
            //         source={{uri:API_URL+this.props.image_url}}
            //         style = {styles.thumbImage}                    
            //         />
             <View><Text>ЗДЕСЬ БУДЕТ СЛАЙДЕР С БРЕНДАМИ</Text></View>
          
      );} else{
        return (null  
      );
      }
    
    } else {
        return ( <View></View>)
    }
    
  }
}


  const styles = StyleSheet.create({
    container : {
      flexGrow: 1,
      justifyContent:'center',
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
  },
  testStyle :{
     //flex:1,
     alignItems: 'center',
     justifyContent: 'center',
     width:'90%',
     height:'90%'
    //borderWidth: 3,
    //borderColor: "red",
  },
  imgStyle :{
    
   position: 'absolute',
   top: 5,
   left: 5,
    bottom: 5,
    right: 5,
   // backgroundColor: 'rgba(0,0,0,0.5)',    

  },
  thumbImage: {
    height: 96,
    width: 96,
    
    paddingHorizontal:20
  },
  });