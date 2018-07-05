import React from "react";
import {
  View,     StyleSheet,
  TouchableOpacity,
  TextInput, ActivityIndicator
} from "react-native";

import { Container,Text, Content, Icon, Header, Body, List, ListItem, Left,Right, Thumbnail, CardItem, Item, Button } from 'native-base'
import {DrawerNavigator} from 'react-navigation'
import {getWithParams,getWithSlashParams} from './../modules/Http'
import {USER_ID, CART_ID,USER_DATA, SetUserCartId,SetUserData,SetUserCartProductsCount} from './../modules/VarContainer'
import Toast from 'react-native-simple-toast';
import {ProductCardProductRemmendationsComponent,ProductCardGalleryComponent,ProductCardInfoComponent} from './../components/ProductCardElements'
//import {USER_ID, CART_ID} from './../modules/VarContainer'
export default class ProductCardScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading :true, 
      productDetails:{}, 
      route:'/productDetails',
      routeAdd: '/addCartPositionToCart',
      product_id:-1,
      product_name:" ",
      user_id:USER_ID,
      count :1
    }
    
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'ТОВАР'),
    };
  };

  componentDidMount(){
    //alert(this.state.product_id)
    this.props.navigation.setParams({title: this.state.product_name})

    params =[{"name":"user_id","value":this.state.user_id},{"name":"product_id","value":this.state.product_id}]
        
              response =getWithParams(this.state.route,params).then(
                response=> {
                  //alert(JSON.stringify(response))
                  if (response==undefined){
                    alert("Connection error")
                    this.setState({
                      isLoading:false,
                    })
                    return
                  }
                  this.setState({
                    productDetails:response,
                    isLoading:false,
                    
                  })
                }
              )
  
}

clickItem(id){
  try{
   console.log(id)
  }
  catch (err){
    console.log(err)
  }
}
  add_to_cart()
  {
  user_id = USER_ID
  count = this.state.count
  cart_id = CART_ID
  _product_id = this.state.productDetails.id

  params =[
    {"name":"user_id","value":user_id},
    {"name":"user_cart_id","value":cart_id},
    {"name":"product_id","value":_product_id},
    {"name":"count","value":count}

  ]
  


  //alert(JSON.stringify(params))
  response =getWithParams(this.state.routeAdd,params).then(
    response=> {
      //if (response.)
      //alert(JSON.stringify(response))
      SetUserCartProductsCount(response.products_count)
      //alert(response.products_count)
      SetUserCartId(response.id)
      Toast.show('Продукт был добавлен в корзину');
      //alert(CART_ID)
    }
    )
  
  }


  addCount()
  {
    c= this.state.count
    c+=1
    this.setState({count:c})
    
    

  }
  
  minusCount()
  {
    if (this.state.count>1)
     { c= this.state.count
      c-=1
      this.setState({count:c})
     }  
  }



  render() {
    const { navigation } = this.props;
    const product_id = navigation.getParam('product_id', -1);
    const product_name = navigation.getParam('product_name', " ");
    this.state.product_id = product_id
    this.state.product_name = product_name

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }


    


   
    return (
        // <View style={styles.container}>
        <Container style={styles.container}>
           <Content padder style={{padding:0}}>
           <Item style={{padding:0}}>
            <ProductCardGalleryComponent gallery_images_data={this.state.productDetails.gallery_images_data}></ProductCardGalleryComponent>
           </Item>
          <Item>
              <ProductCardInfoComponent product_details={this.state.productDetails}></ProductCardInfoComponent>
          </Item>
           <Item>
            <ProductCardProductRemmendationsComponent product_recomendations_data={this.state.productDetails.product_recomendations_data}></ProductCardProductRemmendationsComponent>
            </Item>
            <Item>
            {/* <View style={{flexDirection:'row',alignItems: "center" ,justifyContent: "center"}}> */}
            <Left>
            <Button block danger onPress={()=>this.minusCount()}>
              <Text>-</Text>
            </Button>
            </Left>
            <Body>
            <Button block primary onPress={()=>this.add_to_cart()}>
              <Text>Добавить в корзину ({this.state.count})</Text>
            </Button>
            </Body>
            <Right>
            <Button block success onPress={()=>this.addCount()}>
              <Text>+</Text>
            </Button>
            </Right>
            {/* </View> */}
            </Item>

          </Content>
        
        </Container>
        // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    //flex: 1,
    //alignItems: "center",
    //justifyContent: "center",
    marginVertical: 5
  },
  nameText:{
    color: '#000',
    fontSize: 16,
    // marginLeft: 30,
    // marginTop: 10,
  },
  icons :{
    // padding:10,
    paddingHorizontal: 50,
    width: 96,
    height: 96
  }
});
