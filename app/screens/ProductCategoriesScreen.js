import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions,Image,ActivityIndicator, TouchableOpacity } from 'react-native';
import renderIf from './../modules/RenderIf'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import {getWithParams,getWithSlashParams} from './../modules/Http'
import API_URL from './../modules/Settings'
import {USER_DATA,USER_ID} from './../modules/VarContainer'
import ProductCategoriesComponent from './../components/ProductCategoriesComponent'
import SearchBarComponent from './../components/SearchBarComponent'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Container, Content, Icon, Header, Body, Left } from 'native-base'
import HeaderCartComponent from './../components/HeaderCartComponent'
export default class ProductCategoriesScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading :false, 
      showBar:false,
      self:this,
    }
    //navigation.setParam({ title:'Allog' })
  }
  

    

    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('title', 'Категория'),
        headerRight: 
        <View style={{flexDirection:'row'}}>
        <HeaderCartComponent navigation={navigation}/>
          {/* <MCIcon name="cart" style={{color:'#ffffff',fontSize:32,marginRight:10}}  onPress={()=>navigation.navigate('Cart')}/> */}
          <MaterialIcon name="search" style={{color:'#ffffff',fontSize:32,marginRight:10}}  onPress={navigation.getParam('manageBar')}/>
        </View>
      };
    };
      componentDidMount(){
        this.props.navigation.setParams({ manageBar: this._manageBar });
        this.state = {
          isLoading :false, 
        }

        
      }
      _manageBar = () => {
        if (this.state.showBar==false){
          this.child.showBar()
        
      } else{
        
          this.child.hideBar()
        }
      };

  render() {
    const { navigation } = this.props;
    const _current_category_id = navigation.getParam('current_category_id', -1);
    const _parent_category_id = navigation.getParam('parent_category_id', -1);
    //const otherParam = navigation.getParam('otherParam', 'some default value');
    //alert(_current_category_id)
    this.state.current_category_id=_current_category_id
    this.state.parent_category_id=_parent_category_id
    //alert(this.state.current_category_id)
    //alert('P'+this.state.parent_category_id)
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    //aler('R')
    return (
      
      <Container style ={styles.container}>
        <SearchBarComponent navigation={this.props.navigation}  ref={ref => (this.child = ref)} />
        
          <ProductCategoriesComponent current_category_id={this.state.current_category_id} navigation={this.props.navigation}/>
        </Container>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    backgroundColor:"#ffffff"
  }
});