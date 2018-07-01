import React from "react";
import {
  View,     StyleSheet,
  TouchableOpacity,
  TextInput,ActivityIndicator,Alert
} from "react-native";

import { Container, Header, Content, List, ListItem, Left, Body, Right,Badge, Thumbnail, Text, Button,Separator,Switch } from 'native-base';
import API_URL from './../modules/Settings'
import {USER_DATA,USER_ID, CART_ID} from './../modules/VarContainer'
import {getWithParams,getWithSlashParams} from './../modules/Http'
import {postRequest} from './../modules/Http'

export default class OrdersHistoryScreen extends React.Component {
  constructor(props){
    super(props)

    //alert('-------')
    this.state = {
      isLoading:true,
      orders:[],
      route:'/ordersHistory',
     
      
    }
    //navigation.setParam({ title:'Allog' })
  }
  static navigationOptions = {
    title: "История заказов"
  };

  componentDidMount(){

    params =[{"name":"user_id","value":USER_ID}]
    //alert(USER_ID +" "+CART_ID)
    if (CART_ID!=-1)
    //alert('1')
    {response =getWithParams(this.state.route,params).then(
      response=> {
        //formatProductsCatalogToData(response)
       //console.log(JSON.stringify(response))
       //this.check_favorites(response) 
        //alert(JSON.stringify(response))
        if (response==undefined){
          this.setState({
            isLoading:false,
          })
        }
       if (response.message==undefined){
       // alert(JSON.stringify(response))
       this.setState({
          isLoading:false,
          orders:response,
          //currency_data:c
        })}
        //this.cart = response
      }
    )}else{
      this.setState({
        isLoading:false,
      })
    }
    
  }

  clickItem(id){
    try{
      //alert(id)
      this.props.navigation.push('OrderDetails', {
        order_id: id,
        navigation :this.props.navigation
      });

      //console.log(name)
    }
    catch (err){
      console.log(err)
    }

    
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    if (this.state.orders!=undefined){
    
      return(
      <Container>
      <Header style={styles.headerStyle}><Text style={styles.headerText}>ИСТОРИЯ ЗАКАЗОВ</Text></Header>
      <Content>
      
        <List dataArray={ this.state.orders}
          renderRow={(item) =>
            
          <ListItem >
            <TouchableOpacity style ={styles.touchableOpacity} onPress={()=>this.clickItem(item.id)}>
            
            <Body >
              <Text style={styles.nameTextStyle}>Заказ №{item.number}</Text>
              <Text note>Дата заказа: {item.creation_date}</Text>
              <Text note>Адрес: {item.client_address_data.address}</Text>
              <Text note >Сумма: {item.total_amount} {item.currency_data.display_value}</Text>
              <Text note >Статус: {item.order_state_data.title}</Text>

              </Body>
              </TouchableOpacity>
          </ListItem>
        }> 
        

        }
          
        </List>
        
      </Content>
    </Container>
    )} else{
      return(
      <View>
        <Text> Ваша корзина пуста</Text>
      </View>)
    }
}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonsStyle:{
    width:40,
    height:40,
    //paddingHorizontal: 2,
    
  },
  countStyle:{
    padding:10
  },
  nameTextStyle:{
    fontSize: 12,
  },
  headerStyle:{
    backgroundColor:"#d3d3d3",
    alignItems: "center",
    justifyContent: "center",
    height:40
  },
  headerText:{
    color:'#ffffff'
  },touchableOpacity:{
    flex:1,
    flexDirection: 'column',
  }

});
