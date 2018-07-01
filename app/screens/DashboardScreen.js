//import system components
import React from "react";
import {
  View,  Text,  Button,  StyleSheet,
  TouchableOpacity,
  TextInput,AsyncStorage
} from "react-native";
import { Container, Content, Icon, Header, Body, Left } from 'native-base'
import {DrawerNavigator, withNavigation} from 'react-navigation'
import {InitVars} from './../modules/VarContainer'
//import custom components

import ProductsCategoryList from './../components/ProductsCategoryListComponent'
import SearchBarComponent from './../components/SearchBarComponent'
//import another
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import HeaderCartComponent from './../components/HeaderCartComponent'
var self
class DashboardScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showBar:false,
      self:this,
      userData: {}
    }
    }

    _retrieveData = async (name) => {
      try {
        const value = await AsyncStorage.getItem(name);
        if (value !== null) {
          // We have data!!
          this.setState({
            userData:value            
          })
          //alert(value)
        }
       } catch (error) {
         // Error retrieving data
       }
    }

    componentDidMount() {
      this.props.navigation.setParams({ manageBar: this._manageBar });
      this._retrieveData('user_data')
      InitVars()
    }

    _manageBar = () => {
      if (this.state.showBar==false){
        this.child.showBar()
      
    } else{
      
        this.child.hideBar()
      }
    };

    static navigationOptions =  ({ navigation }) => {
      return {
        
        headerRight: 
        <View style={{flexDirection:'row'}}>
        <HeaderCartComponent navigation={navigation}/>
          {/* <MCIcon name="cart" style={{color:'#ffffff',fontSize:32,marginRight:10}}  onPress={()=>navigation.navigate('Cart')}/> */}
          <MaterialIcon name="search" style={{color:'#ffffff',fontSize:32,marginRight:10}}  onPress={navigation.getParam('manageBar')}/>
        </View>
      };

      
  };

  render() {
    return (
      //
      <Container style ={styles.container}>
      
        <SearchBarComponent navigation={this.props.navigation}  ref={ref => (this.child = ref)} />
        {/* <Text>Категории</Text> */}
        <ProductsCategoryList navigation={this.props.navigation}/>

      
      </Container>
      
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    
  }
});

export default withNavigation(DashboardScreen)