//import system components
import React from "react";
import {
  View,  Text,  Button,  StyleSheet,
  TouchableOpacity,ActivityIndicator,
  TextInput,AsyncStorage,ScrollView
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
//imort dashboard components
import DashboardSliderComponent from './../components/DashboardSliderComponent'
import {DashboardBadgesComponent} from './../components/DashboardBadgesComponent'
import {DashboardRecommendationsComponent} from '../components/DashboardRecommendationsComponent'
import {DashboardBrandsComponent} from './../components/DashboardBrandsComponent'



var self
class DashboardScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showBar:false,
      isLoading:true,
      self:this,
      userData: {},
      show_slider :false,
      show_badges:false,
      show_recommendations:false,
      show_brands:false,
      show_badge_popular:false,
      show_badge_discount:false,
      show_badge_stock:false,
      show_badge_partners:false,
      slider_images_data:[],
      recomendation_elements_data:[],
      brand_elements_data:[],
      partner_elements_data:[]
    }
    }

    _retrieveData = async (name) => {
      try {
        const value = await AsyncStorage.getItem(name);
        if (value !== null) {
          //alert(JSON.parse(value).view_settings.show_slider)
          _show_slider = JSON.parse(value).view_settings.show_slider
          _show_badges = JSON.parse(value).view_settings.show_badges
          _show_recommendations = JSON.parse(value).view_settings.show_recommendations
          _show_brands = JSON.parse(value).view_settings.show_brands
          _show_badge_popular = JSON.parse(value).view_settings.show_badge_popular
          _show_badge_discount = JSON.parse(value).view_settings.show_badge_discount
          _show_badge_stock = JSON.parse(value).view_settings.show_badge_stock
          _show_badge_partners = JSON.parse(value).view_settings.show_badge_partners
          
          _slider_images_data = JSON.parse(value).view_settings.slider_images_data
          _recomendation_elements_data = JSON.parse(value).view_settings.recomendation_elements_data
          _brand_elements_data = JSON.parse(value).view_settings.brand_elements_data
          _partner_elements_data = JSON.parse(value).view_settings.partner_elements_data

          //alert("OOO: "+JSON.stringify(_slider_images_data))

          // We have data!!
          this.setState({
            userData:value,
            show_slider:_show_slider,
            show_badges:_show_badges,
            show_recommendations:_show_recommendations,
            show_brands:_show_brands,
            show_badge_popular:_show_badge_popular,
            show_badge_discount:_show_badge_discount,
            show_badge_stock:_show_badge_stock,
            show_badge_partners:_show_badge_partners,
            slider_images_data:_slider_images_data,
            recomendation_elements_data:_recomendation_elements_data,
            brand_elements_data:_brand_elements_data,
            partner_elements_data:_partner_elements_data,
            isLoading:false
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

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }

    return (
      //
      <Container style ={styles.container}>
      
        <SearchBarComponent navigation={this.props.navigation}  ref={ref => (this.child = ref)} />
        
        <ScrollView>
        <DashboardSliderComponent  style={styles.slider_component} images_data={this.state.slider_images_data} show_slider={this.state.show_slider}/>
        <DashboardBadgesComponent navigation={this.props.navigation} show_badge_popular={this.state.show_badge_popular} show_badge_partners={this.state.show_badge_partners} show_badge_discount={this.state.show_badge_discount} show_badge_stock={this.state.show_badge_stock} show_badges={this.state.show_badges}/>
        
        {/* <Text>Категории</Text> */}
        <ProductsCategoryList navigation={this.props.navigation} style={{paddingBottom: 50,}}/>
        <DashboardRecommendationsComponent  images_data={this.state.recomendation_elements_data} show_recommendations={this.state.show_recommendations}/>
        <DashboardBrandsComponent images_data={this.state.brand_elements_data} show_brands={this.state.show_brands}/>
        </ScrollView>
      
      </Container>
      
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6ffff",
    flex: 1,    
  },
  slider_component:{
    marginTop: 10,
    height:100,
    width:'100%'
  },
  recommendation_component:{
   // marginTop:200
  }
});

export default withNavigation(DashboardScreen)