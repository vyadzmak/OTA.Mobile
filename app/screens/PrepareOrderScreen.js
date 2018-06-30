import React from "react";
import {
  View,  Text,    StyleSheet,
  TouchableOpacity,
  TextInput,ActivityIndicator, Picker
} from "react-native";

import {DrawerNavigator} from 'react-navigation'
import {USER_DATA,USER_ID, CART_ID, CLIENT_ID} from './../modules/VarContainer'
import { Container, Content,Input, Icon, Header, Body, Left,Form,Label, Footer, Item,Separator,Card, CardItem,List,Button, ListItem, Right, Switch } from 'native-base'

import {getWithParams,getWithSlashParams} from './../modules/Http'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
var PickerItem = Picker.Item;
import {postRequest} from './../modules/Http'

export default class PrepareOrderScreen extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      isLoading:true,
      route:'/clientAddressesByClient',
      addresses:{},
      address:'',
      order_params:{
        user_cart_id : -1,
        client_address_id :-1,
        description: ''
      }
      
    }
  }
  
  static navigationOptions = {
    title: "Оформление заказа"
  };

  componentDidMount(){
    this.setState({order_params:{...this.state.order_params,user_cart_id : CART_ID}})
    params =[{"name":"user_id","value":USER_ID},{"name":"client_id","value":CLIENT_ID}]
    response =getWithParams(this.state.route,params).then(
      response=> {
      
       if (response.message==undefined){

       this.setState({
          addresses:response,
          address: response[0],
          isLoading:false,   
          order_params:{...this.state.order_params,client_address_id : response[0].id}
        })
        
        }
      }
    )  
    
  }



  change_address(_address){
    //alert('City '+_city)
    id =-1
    
    for (i=0;i<this.state.addresses.length;i++){
        if (this.state.addresses[i].address==_address){
            id = this.state.addresses[i].id
            this.setState({order_params:{...this.state.order_params,client_address_id : id}})
            
            this.setState({address: _address})
            break
        }
    }
  }

  make_order(data){
    try{
      
      update_route ='/makeUserOrder'
      //alert(JSON.stringify(data))
      response =postRequest(update_route, data).then(
        response=> {
          //txt = JSON.stringify(response)
          alert(JSON.stringify(response))
          
          status = response.code
          if (status==400){
              Alert.alert(JSON.stringify(response.message))
              this.setState({isLoading:false})
            }
          else{
            
          }

          
          //this.setState({user_data:{...this.state.user_data,user_name : txt}})
        }
      )

    } catch(err){
      alert(err)
    }
  }



  prepare_order(){
    try{
      //alert("CART_ID "+CART_ID+" USER_ID "+USER_ID)
     // alert(JSON.stringify(this.state.order_params))
     this.make_order(this.state.order_params)
  }catch(err){alert(err)}}

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }

    return (
      <View style={{ flex: 1,backgroundColor:"#ffffff" }}>
      <Container>
      <Content>
          <Form>
        <Label>Адрес</Label>
            <Picker
            selectedValue={this.state.address}
 
            onValueChange={(itemValue, itemIndex) => this.change_address(itemValue)} >
 
            { this.state.addresses.map((item, key)=>(
                <Picker.Item label={item.address} value={item.address} key={key} />)
            )}
    
          </Picker>
          <Button block success onPress={()=>this.prepare_order()}>
            <Text>ОТПРАВИТЬ</Text>
          </Button>
          </Form>
          
          </Content>
          </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
