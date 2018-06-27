import React from 'react';
import { StyleSheet, View, FlatList, Dimensions,Image,ActivityIndicator, TouchableOpacity } from 'react-native';
import renderIf from './../modules/RenderIf'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Container, Header, Content, List, ListItem, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import StarRating from 'react-native-star-rating';
import {getWithParams,getWithSlashParams} from './../modules/Http'
import API_URL from './../modules/Settings'
import {ProductStockIcon, ProductDiscountIcon,ProductAmountText, ProductAmountDiscountText,ProductDiscountText} from '../components/ProductListCardElements'
//import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

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
      user_id : 1,
      route:'/filterProducts',
      category_name: 'NONE'
    }
    //navigation.setParam({ title:'Allog' })
  }
    clickItem(id){
      alert(id)
         
    }

    

    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('title', 'Товары'),
      };
    };
      componentDidMount(){
        
        
        
        // if (this.state.current_category_id!=-1){
        //   //params =[{"name":"user_id","value":this.state.user_id},{"name":"category_id","value":this.state.current_category_id}]
        //   _route = "/productCategories/"+this.state.current_category_id

        //   _response =getWithSlashParams(_route).then(
        //     _response=> {
        //       //formatProductCategoriesToData(response)
        //       //alert(JSON.stringify(_response.name))
        //       this.props.navigation.setParams({title: _response.name})
        //     }
        //   )
        // }

        params =[{"name":"user_id","value":this.state.user_id},{"name":"filter_parameter","value":this.state.filter_parameter},{"name":"filter_value","value":this.state.filter_value}]
        
        response =getWithParams(this.state.route,params).then(
          response=> {
            //formatProductsCatalogToData(response)
            console.log(JSON.stringify(response))
            this.setState({
              isLoading:false,
              productsCatalog:response
            })
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

    var items = ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can'];
    return (
      
          <List dataArray={ this.state.productsCatalog}
            renderRow={(item) =>
            //   <ListItem>
            <TouchableOpacity style ={styles.touchableOpacity} onPress={()=>this.clickItem(item.id,item.name)}>
                <Card style={{flex: 1,padding:0}} >
                    <CardItem >
                    {/* <Left style={{alignItems: 'center'}} > */}
                        
                        <Thumbnail source={{uri: API_URL+item.default_image_data.thumb_file_path}} style={styles.image} />
                        
                    {/* </Left> */}
                    <Body style={{paddingLeft:20}}>
                        <Text>{item.name}</Text>
                        <Text note>{item.short_description}</Text>
                        {/* <Text>{item.amount} {item.product_currency_data.display_value}</Text> */}
                        <View style={{flexDirection:'row'}}>
                        <ProductAmountText amount ={item.amount} currency_display_value ={item.product_currency_data.display_value} discount_amount={item.discount_amount}></ProductAmountText>
                          <ProductAmountDiscountText currency_display_value ={item.product_currency_data.display_value} discount_amount={item.discount_amount}></ProductAmountDiscountText>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <StarRating
                                disabled={false}
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                maxStars={5}
                                rating={item.rate}
                                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                fullStarColor={'orange'}
                                starSize ={20}
                            />
                            <Text style={{color:'orange',fontSize:16}}> ({item.comments_count})</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                          <ProductStockIcon is_stock_product={item.is_stock_product} style={styles.icons}/>
                          <ProductDiscountIcon is_discount_product={item.is_discount_product} style={styles.icons}/>
                        </View>
                        <ProductDiscountText stock_text={item.stock_text}></ProductDiscountText>

                        </Body>
                    {/* <Right><MaterialIcon name="shopping-cart" style={{color:'red',fontSize:48}} /></Right> */}
                    </CardItem>
                    <CardItem>
                     {/* <Left><View></View></Left>
                      <Body>
                      </Body> */}
                    </CardItem>
                </Card>
                </TouchableOpacity>
            //   </ListItem>
            }>
          </List>
          
        
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