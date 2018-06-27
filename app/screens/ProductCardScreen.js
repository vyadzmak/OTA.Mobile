import React from "react";
import {
  View,  Text,  Button,  StyleSheet,
  TouchableOpacity,
  TextInput, ActivityIndicator
} from "react-native";

import { Container, Content, Icon, Header, Body, List, ListItem, Left,Right, Thumbnail, CardItem } from 'native-base'
import {DrawerNavigator} from 'react-navigation'
import {getWithParams,getWithSlashParams} from './../modules/Http'
import API_URL from './../modules/Settings'
import {ProductCardProductRemmendationsComponent,ProductCardGalleryComponent,ProductCardInfoComponent} from './../components/ProductCardElements'
export default class ProductCardScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading :true, 
      productDetails:{}, 
      route:'/productDetails',
      product_id:-1,
      product_name:" ",
      user_id:1
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
                  console.log(JSON.stringify(response))
                  this.setState({
                    isLoading:false,
                    productDetails:response
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
           <CardItem style={{padding:0}}>
            <ProductCardGalleryComponent gallery_images_data={this.state.productDetails.gallery_images_data}></ProductCardGalleryComponent>
           </CardItem>
          <CardItem>
              <ProductCardInfoComponent product_details={this.state.productDetails}></ProductCardInfoComponent>
          </CardItem>
           <CardItem>
            <ProductCardProductRemmendationsComponent product_recomendations_data={this.state.productDetails.product_recomendations_data}></ProductCardProductRemmendationsComponent>
            </CardItem>

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
