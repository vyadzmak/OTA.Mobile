import React from 'react';
import { StyleSheet,AsyncStorage,Image} from 'react-native';
import {View,Text, Container, Content, Icon, Header, Body, Left,Item, Input } from 'native-base'
import API_URL from './../modules/Settings'
import {  Thumbnail } from 'native-base';
import {NO_IMAGE_URL} from './../modules/VarContainer'
export class ThumbComponent extends React.Component {   
  
  render() {
    if (this.props.image_url!=null && this.props.image_url!=undefined){
      return (
               <Thumbnail
                    source={{uri:API_URL+this.props.image_url}}
                    style = {styles.thumbImage}                    
                    />
              
          
      );} else{
        return (
          <Thumbnail
                    source={{uri:API_URL+NO_IMAGE_URL}}     
                    style = {styles.thumbImage}                    

                    />
    
      );
      }
    }
  }

  export class ImageComponent extends React.Component {   
  
    render() {
      //
      if (this.props.image_url!=null){
        return (
                 <Image
                     resizeMode="contain"
                      source={{uri:API_URL+this.props.image_url}}     
                      style = {styles.imgStyle}               
                      />
            
        );} else{
          return (
            <Image
                      source={{uri:API_URL+NO_IMAGE_URL}}    
                      resizeMode="contain"
                      style = {styles.imgStyle}                
                      />
        );
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