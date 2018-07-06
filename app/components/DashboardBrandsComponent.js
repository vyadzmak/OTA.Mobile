import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
   Image 
} from 'react-native';

import { Container, Header, Content, List, ListItem, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,Switch } from 'native-base';
import API_URL from './../modules/Settings'
import StarRating from 'react-native-star-rating';
import {NO_IMAGE_URL} from './../modules/VarContainer'
import {ProductStockIcon, ProductDiscountIcon,ProductAmountText, ProductAmountDiscountText,ProductDiscountText} from './ProductListCardElements'

export class DashboardBrandsComponent extends React.Component {   
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }
  componentDidMount () {
    if (this.props.images_data!=null)
      this.setState({
        items: this.props.images_data
      })

      //alert(JSON.stringify(this.props.images_data))
  }
  render() {

    //alert('this.props.show_slider: '+this.props.show_slider)
    //alert('this.props.images_data: '+JSON.stringify(this.props.images_data))


    if (this.props.show_brands){
    if (this.props.images_data!=null && this.props.images_data!=undefined){
      return (
        <Container style={styles.container}>
          <Text>Бренды</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          this.state.items.map((item, key) => {
        return (
                  
                        <CardItem style={{width:150}} >
                            <View>
                            <Image source={{uri: API_URL+item.default_image_data_brands.thumb_file_path}} style={{height: 96, width: 96}}/>
                            <Text style={{fontSize:12}}>{item.name}</Text>
                            
                            </View>
                        </CardItem>    
              )
  })}
      </ScrollView>
      </Container>
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
      //marginVertical:50,
      height:180
    }
  });