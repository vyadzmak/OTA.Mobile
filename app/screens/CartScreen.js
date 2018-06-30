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
export default class CartScreen extends React.Component {
  constructor(props){
    super(props)

    //alert('-------')
    this.state = {
      isLoading:true,
      cartPositions:[],
      route:'/userCartDetails',
     
      
    }
    //navigation.setParam({ title:'Allog' })
  }
  static navigationOptions = {
    title: "Корзина",
    
  };

  update_cart(){
    try{
      data = {
        'id':this.cart.id,
        'cart_positions': this.cart.cart_positions
      }
      update_route ='/manageUserCartDetails'
      //alert(JSON.stringify(data))
      response =postRequest(update_route, data).then(
        response=> {
          //txt = JSON.stringify(response)
          
          
          status = response.code
          if (status==400){
              Alert.alert(JSON.stringify(response.message))
              this.setState({isLoading:false})
            }
          else{
            //alert(JSON.stringify(response))
            this.cart = response
            this.setState({ cartPositions:{}}, function () {
              this.setState({cartPositions:this.cart}, function () {
                
              } )
           });

          }

          
          //this.setState({user_data:{...this.state.user_data,user_name : txt}})
        }
      )

    } catch(err){
      alert(err)
    }
  }

  componentDidMount(){

    params =[{"name":"user_id","value":USER_ID},{"name":"user_cart_id","value":CART_ID}]
    //alert(USER_ID +" "+CART_ID)
    if (CART_ID!=-1)
    //alert('1')
    {response =getWithParams(this.state.route,params).then(
      response=> {
        //formatProductsCatalogToData(response)
       //console.log(JSON.stringify(response))
       //this.check_favorites(response) 
        alert(JSON.stringify(response))
        if (response==undefined){
          this.setState({
            isLoading:false,
          })
        }
       if (response.message==undefined){
       // alert(JSON.stringify(response))
       this.setState({
          isLoading:false,
          cartPositions:response,
          //currency_data:c
        })}
        this.cart = response
      }
    )}else{
      this.setState({
        isLoading:false,
      })
    }
    
  }

  plus_count(id){
    index=-1
    for (i=0;i<this.cart.cart_positions.length; i++){
      if (this.cart.cart_positions[i].id==id){        
        this.cart.cart_positions[i].count+=1
        break
      }
    } 
    this.setState({ cartPositions:{}}, function () {
    this.setState({cartPositions:this.cart}, function () {
      this.update_cart()
    } )
 });

}

minus_count(id){
  index=-1
  update=false
  for (i=0;i<this.cart.cart_positions.length; i++){
    if (this.cart.cart_positions[i].id==id){        
      if (this.cart.cart_positions[i].count>1){
      this.cart.cart_positions[i].count-=1
      update=true
      }
      break
      
    }
  } 
  if (update==true)
  this.setState({ cartPositions:{}}, function () {
  this.setState({cartPositions:this.cart}, function () {
    this.update_cart()
  } )
});

}

remove_item(id){
  for (i=0;i<this.cart.cart_positions.length; i++){
    if (this.cart.cart_positions[i].id==id){        
      this.cart.cart_positions.splice(i, 1);
    }
  } 
  
  this.setState({ cartPositions:{}}, function () {
  this.setState({cartPositions:this.cart}, function () {
    this.update_cart()
  } )
});

}

prepare_order(){
  try{
    //this.props.navigation.popToTop()
  this.props.navigation.navigate('PrepareOrder')
}catch(err){alert(err)}}


  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    if (this.state.cartPositions.cart_positions!=undefined){
    
      return(
      <Container>
      <Header style={styles.headerStyle}><Text style={styles.headerText}>ТОВАРЫ В КОРЗИНЕ</Text></Header>
      <Content>
      
        <List dataArray={ this.state.cartPositions.cart_positions}
          renderRow={(item) =>
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: API_URL+item.user_cart_position_product_data.default_image_data.thumb_file_path }} />
            </Left>
            <Body>
              <Text style={styles.nameTextStyle}>{item.user_cart_position_product_data.name}</Text>
              <Text note>{item.user_cart_position_product_data.short_description}</Text>

              
              <Text note style={{fontSize:8}}>Цена за ед.: {item.user_cart_position_product_data.amount}{this.state.cartPositions.currency_data.display_value}</Text>
              <Text note style={{fontSize:8}}>Цена за ед. с уч. скидки: {item.user_cart_position_product_data.discount_amount} {this.state.cartPositions.currency_data.display_value}</Text>
             
             </Body>
            <Right>
            <View style={{flexDirection:'row', alignItems: "center",justifyContent: "center" }}>
            <Button danger style={styles.buttonsStyle} onPress={()=>this.minus_count(item.id)}>
                <Text>-</Text>
              </Button>
              
              

             
              <Text style={styles.countStyle}>{item.count}</Text>
              

              <Button success style={styles.buttonsStyle} onPress={()=>this.plus_count(item.id)}>
                <Text>+</Text>
              </Button>

              <Button light style={styles.buttonsStyle} icon onPress={()=>{Alert.alert(
                'Удаление',
                'Вы действительно хотите удалить данную позицию из заказа?',
                [
                  {text: 'Отмена', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'Да', onPress: () => {this.remove_item(item.id) }},
                ],
                { cancelable: false }
              )}}>
                <Text>X</Text>
              </Button>
              </View>
              <View style={{flexDirection:'row', marginTop:10}}>
              <Text style={styles.nameTextStyle}>Счет-фактура</Text>
              <Switch value={item.need_invoice} />
              </View>
            </Right>
          </ListItem>
        
        }> 
        

        }
          
        </List>
        <List>
        <Separator bordered>
            <Text style={{fontSize:14}}>Общее</Text>
          </Separator>
          <ListItem >
              <Left>
                <Text>Количество товаров</Text>
              </Left>
              <Right>
                <Text>{this.state.cartPositions.products_count}</Text>
              </Right>
          </ListItem>
          <ListItem >
              <Left>
                <Text>Итого</Text>
              </Left>
              <Right>
                <Text>{this.state.cartPositions.total_amount_without_discount}{this.state.cartPositions.currency_data.display_value}</Text>
              </Right>
          </ListItem>

          <ListItem >
              <Left>
                <Text>Итого учетом скидки</Text>
              </Left>
              <Right>
                <Text>{this.state.cartPositions.total_amount}{this.state.cartPositions.currency_data.display_value}</Text>
              </Right>
          </ListItem>

          <ListItem >
              <Left>
                <Text>Скидка</Text>
              </Left>
              <Right>
                <Text>{this.state.cartPositions.discount_amount} {this.state.cartPositions.currency_data.display_value}</Text>
              </Right>
          </ListItem>
        </List>
        
        <Button block success onPress={()=>this.prepare_order()}>
            <Text>Оформить заказ</Text>
          </Button>
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
  }

});
