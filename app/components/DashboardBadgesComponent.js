import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
   Image 
} from 'react-native';

import { Container, Header, Content, List, ListItem, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,Switch,Badge, Item } from 'native-base';
import API_URL from './../modules/Settings'
import {NO_IMAGE_URL} from './../modules/VarContainer'



export class DashboardBadgePopularComponent extends React.Component {   

  click_badge(){
    try{
      this.props.navigation.push('FilterProducts', {
        filter_parameter :9,
        filter_value: -1
      });
    }
    catch (err){
      console.log(err)
    }
  }
  
  render() {

    
    if (this.props.show_badge_popular){
      return (
            
        <Badge success style={styles.badgeStyle}>
          <Text onPress={()=>this.click_badge()}>Популярное</Text>
        </Badge>
          
      );
    
    } else {
        return (null)
    }    
  }
}

export class DashboardBadgePartnersComponent extends React.Component {   

  click_badge(){
    try{
      this.props.navigation.push('FilterProducts', {
        filter_parameter :8,
        filter_value: -1
      });
    }
    catch (err){
      console.log(err)
    }
  }
  
  render() {

    
    if (this.props.show_badge_partners){
      return (
            
        <Badge success style={styles.badgeStyle}>
          <Text onPress={()=>this.click_badge()}>Партнеры</Text>
        </Badge>
          
      );
    
    } else {
        return (null)
    }    
  }
}

export class DashboardBadgeDiscountComponent extends React.Component {   

  click_badge(){
    try{
      this.props.navigation.push('FilterProducts', {
        filter_parameter :6,
        filter_value: -1
      });
    }
    catch (err){
      console.log(err)
    }
  }
  
  render() {

    
    if (this.props.show_badge_discount){
      return (
            
        <Badge success style={styles.badgeStyle}>
          <Text onPress={()=>this.click_badge()}>Скидки</Text>
        </Badge>
          
      );
    
    } else {
        return (null)
    }    
  }
}

export class DashboardBadgeStockComponent extends React.Component {   

  click_badge(){
    try{
      this.props.navigation.push('FilterProducts', {
        filter_parameter :7,
        filter_value: -1
      });
    }
    catch (err){
      console.log(err)
    }
  }
  
  render() {

    
    if (this.props.show_badge_stock){
      return (
            
        <Badge success style={styles.badgeStyle}>
          <Text onPress={()=>this.click_badge()}>Акции</Text>
        </Badge>
          
      );
    
    } else {
        return (null)
    }    
  }
}

export class DashboardBadgesComponent extends React.Component {   
  
  render() {

    //alert('this.props.show_slider: '+this.props.show_slider)
    //alert('this.props.images_data: '+JSON.stringify(this.props.images_data))
    //show_badge_popular={this.state.show_badge_popular} 
    //show_badge_partners={this.state.show_badge_partners} 
    //show_badge_discount={this.state.show_badge_discount} 
    //show_badge_stock={this.state.show_badge_stock} 
    //show_badges={this.state.show_badges}

    if (this.props.show_badges){
      return (
            
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollStyle}>
       
          <DashboardBadgePopularComponent navigation={this.props.navigation} show_badge_popular={this.props.show_badge_popular} />
          
          <DashboardBadgePartnersComponent  navigation={this.props.navigation}  show_badge_partners={this.props.show_badge_partners} />
          <DashboardBadgeDiscountComponent navigation={this.props.navigation}  show_badge_discount={this.props.show_badge_discount} />
          <DashboardBadgeStockComponent navigation={this.props.navigation}  show_badge_stock={this.props.show_badge_stock} />
        </ScrollView>
          
      );
    
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
    scrollStyle:{
      padding: 10,
      marginLeft: 10,
      height:50,
      width:'100%'
    },
    badgeStyle:{
      //marginHorizontal: 50,
      marginRight: 10,
    }
  });