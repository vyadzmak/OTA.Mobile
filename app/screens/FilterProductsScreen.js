import React from 'react';
import { StyleSheet, View, FlatList, Dimensions,Image,ActivityIndicator, TouchableOpacity } from 'react-native';
import renderIf from './../modules/RenderIf'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Container, Header, Content, List, ListItem, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import StarRating from 'react-native-star-rating';
import {getWithParams,getWithSlashParams} from './../modules/Http'
import API_URL from './../modules/Settings'
import {ProductStockIcon, ProductDiscountIcon,ProductAmountText, ProductAmountDiscountText,ProductDiscountText} from '../components/ProductListCardElements'
import ProductsList from './../components/ProductsListComponent'
import {USER_DATA, USER_ID} from './../modules/VarContainer'
export default class FilterProductsScreen extends React.Component {
  constructor(props){
    super(props)

    //alert('-------')
    this.state = {
      isLoading :true, 
      productsCatalog:[], 
      filter_value:'',
      filter_parameter:-1,
      parent_category_name:"",
      user_id : USER_ID,
      route:'/filterProducts',
      category_name: 'Фильтр'
    }
    //navigation.setParam({ title:'Allog' })
  }
    clickItem(id){
      alert(id)
         
    }

    check_favorites(response){
      _products = response
      try{
        favorites_products = []

        favorites_products=USER_DATA.user_favorites_products.products_ids
        
        //alert('2')
        if (favorites_products.length!=null || favorites_products.length!=undefined)
        for (var i = 0; i < favorites_products.length; i++) {
          value = favorites_products[i]
          //alert(this.state.products.length)
          
          for (var j=0; j<_products.length; j++){
            product = _products[j]
            if (product.is_favorite){
              continue
            }
            product.is_favorite = false
            
            if (product.id==value){
              //alert("YA"+value)
              product.is_favorite = true
            } 

          }
       }
       
      } catch(err){
        //alert(err)
      } finally{
        this.setState({              
          productsCatalog:_products,
          //isLoading:false
        })
      }
      
    }


    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('title', 'Товары'),
      };
    };
      componentDidMount(){

        params =[{"name":"user_id","value":this.state.user_id},{"name":"filter_parameter","value":this.state.filter_parameter},{"name":"filter_value","value":this.state.filter_value}]
        
        response =getWithParams(this.state.route,params).then(
          response=> {
            //formatProductsCatalogToData(response)
           //console.log(JSON.stringify(response))
           this.check_favorites(response) 
          //  this.setState({
          //     isLoading:false,
          //     productsCatalog:response
          //   })
          }
        )
        
      }


  clickItem(id,name){
    try{
      this.props.navigation.push('ProductCard', {
        product_id: id,
        product_name: name,
        navigation :this.props.navigation
      });

      console.log(name)
    }
    catch (err){
      console.log(err)
    }

    
  }

  render() {
    const { navigation } = this.props;
    const _filter_parameter = navigation.getParam('filter_parameter', -1);
    const _filter_value = navigation.getParam('filter_value', -1);
    //const otherParam = navigation.getParam('otherParam', 'some default value');
    this.state.filter_parameter=_filter_parameter
    this.state.filter_value=_filter_value
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }

    
    return (
      <ProductsList navigation={this.props.navigation} products = {this.state.productsCatalog} categoryName={this.state.category_name} />
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    backgroundColor:"#ffffff"
  },
  item: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: '#C0C0C0',
   // height: Dimensions.get('window').width / numColumns+40, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent'
  },
  itemText: {
    color: '#696969',
    fontSize: 16,
    marginTop: 10,
  },
  image: {
    height: 96,
    width: 96,
    
    paddingHorizontal:20
  },
  touchableOpacity:{
    flex:1,
    flexDirection: 'column',
  },icon: {
    width: 24,
    height: 24,
  },
  icons :{
    padding:10,
    paddingHorizontal: 50,
  }
});