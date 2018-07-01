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
import {USER_ID} from './../modules/VarContainer'
export default class OrderDetailsScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading :true, 
      orderDetails:{}, 
      orderPositions: [],
      routeOrderPositions:'/orderPositionsByOrders',
      routeOrder:'/orders',
      order_id:-1,
      product_name:" ",
      user_id:USER_ID
    }
    
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Детали заказа'),
    };
  };

  componentDidMount(){
    //alert(this.state.product_id)
    //this.props.navigation.setParams({title: this.state.product_name})
    _response =getWithSlashParams(this.state.routeOrder+"/"+this.state.order_id).then(
      response=> {
        //alert(JSON.stringify(response))
        this.setState({
          
          orderDetails:response
          
        })


      }
    )
    params =[{"name":"user_id","value":this.state.user_id},{"name":"order_id","value":this.state.order_id}]
        
              response =getWithParams(this.state.routeOrderPositions,params).then(
                response=> {
                  //alert(JSON.stringify(response))
                  this.setState({
                    isLoading:false,
                    orderPositions:response
                    
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
    const order_id = navigation.getParam('order_id', -1);
    this.state.order_id = order_id
    //alert(order_id)
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
          <Text>Общая информация</Text>
          <List>
            <ListItem>
              <Left>
                <Text>
                  № заказа
                </Text>
              </Left>

              <Body>
                <Text>{this.state.orderDetails.number}</Text>
              </Body>
            </ListItem>

            <ListItem>
              <Left>
                <Text>
                Дата заказа
                </Text>
              </Left>

              <Body>
                <Text>{this.state.orderDetails.creation_date}</Text>
              </Body>
            </ListItem>

            <ListItem>
              <Left>
                <Text>
                Адрес
                </Text>
              </Left>

              <Body>
                <Text>{this.state.orderDetails.client_address_data.address}</Text>
              </Body>
            </ListItem>

            <ListItem>
              <Left>
                <Text>
                Сумма
                </Text>
              </Left>

              <Body>
                <Text>{this.state.orderDetails.total_amount} {this.state.orderDetails.currency_data.display_value}</Text>
              </Body>
            </ListItem>

             <ListItem>
              <Left>
                <Text>
                Статус
                </Text>
              </Left>

              <Body>
                <Text>{this.state.orderDetails.order_state_data.title} </Text>
              </Body>
            </ListItem>

          {/* <Text style={styles.nameTextStyle}>Заказ №{item.number}</Text>
              <Text note>Дата заказа: {item.creation_date}</Text>
              <Text note>Адрес: {item.client_address_data.address}</Text>
              <Text note >Сумма: {item.total_amount} {item.currency_data.display_value}</Text>
              <Text note >Статус: {item.order_state_data.title}</Text> */}

          </List>
          <Text>Товары</Text>

           <List dataArray={ this.state.orderPositions}
          renderRow={(item) =>
            
          <ListItem >
            <Body >
              <Text style={styles.nameTextStyle}>{item.product_data.name}</Text>
              <Text note>Цена за единицу: {item.amount_per_item} {this.state.orderDetails.currency_data.display_value}</Text>
              <Text note>Цена за единицу (скидка): {item.amount_per_item_discount} {this.state.orderDetails.currency_data.display_value}</Text>
              <Text note>Количество: {item.count}</Text>
              <Text note>Итого: {item.total_amount} {this.state.orderDetails.currency_data.display_value}</Text>
              {/* 'amount_per_item':fields.Float,
    'amount_per_item_discount':fields.Float,
    'total_amount':fields.Float,               */}
              </Body>
              
          </ListItem>
        }> 
        

        }
          
        </List>
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
