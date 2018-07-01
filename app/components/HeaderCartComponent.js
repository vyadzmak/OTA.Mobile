import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconBadge from 'react-native-icon-badge';

import React from "react";
import {
  View,  Text,  Button,  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";

import { Container, Content, Icon, Header, Body } from 'native-base'
import {DrawerNavigator} from 'react-navigation'
import {CART_PRODUCTS_COUNT} from './../modules/VarContainer'
export default class HeaderCartComponent extends React.Component {
  
    constructor(props){
        super(props)
        this.state = {
          BadgeCount:0
        }
        //navigation.setParam({ title:'Allog' })
      }

      componentDidMount(){
        this.setState({
          BadgeCount:0
        })
      }
  render() {
    return (
        <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
        <IconBadge
          MainElement={
            <MCIcon name="cart" style={{color:'#ffffff',fontSize:32,marginRight:10}}  onPress={()=>this.props.navigation.navigate('Cart')}/>
          }
          BadgeElement={
            <Text style={{color:'#FFFFFF'}}>{this.state.BadgeCount}</Text>
          }
          IconBadgeStyle={
            {width:20,
            height:20,
            backgroundColor: 'orange',
            top: 0,
            bottom:1
        }
          }
          Hidden={this.state.BadgeCount==0}
          />
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
