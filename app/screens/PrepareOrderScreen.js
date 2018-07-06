import React from "react";
import {
  View,      StyleSheet,
  TouchableOpacity,Alert,
  TextInput,ActivityIndicator, Picker
} from "react-native";

import {DrawerNavigator} from 'react-navigation'
import {USER_DATA,USER_ID, CART_ID, CLIENT_ID,SetUserCartId} from './../modules/VarContainer'
import { Container, Content,Text,Input, Icon, Header, Body, Left,Form,Label, Footer, Item,Separator,Card, CardItem,List,Button, ListItem, Right, Switch } from 'native-base'

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
      addresses:null,
      address:'',
      confirmed: true,
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
       // alert(JSON.stringify(response))
       if (response.message==undefined){

       this.setState({
          addresses:response,
          
        })


        if (response!=null && response!=undefined){
          _address =response[0]
          for (i=0;i<response.length;i++){
            if (response[i].is_default){
              _address= response[i]
              //alert(JSON.stringify(_address))
              this.change_address(_address.address)
              this.setState({isLoading:false})
              break
            }
          }

          // this.setState({
          //   address: _address,
          //   confirmed: _address.confirmed,
          //   isLoading:false,   
          //   order_params:{...this.state.order_params,client_address_id : _address.id}
          // })
        }
        
        } else{
          Alert.alert(
            'Ошибка',
            'Не найдено ни одного адреса. Оформить заказ невозможно. Добавьте адрес в профиле',
            [
              {text: 'Да'},
            ],
            { cancelable: false }
          )
          this.setState({
            //addresses:response,
            isLoading:false
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
            this.setState({
              confirmed:this.state.addresses[i].confirmed
            })
            //alert(JSON.stringify(this.state.addresses[i]))
            this.setState({order_params:{...this.state.order_params,client_address_id : id}})
            
            this.setState({address: _address})
            break
        }
    }
  }

  complete_order(){
    SetUserCartId(-1)
    this.props.navigation.navigate('Dashboard', {

    });
  }

  make_order(data){
    try{
      
      update_route ='/makeUserOrder'
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
            if (response.status_code==200){
              Alert.alert(
                'Успех',
                'Ваш заказ был успешно оформлен',
                [
                  {text: 'Да', onPress: () => {this.complete_order() }},
                ],
                { cancelable: false }
              )
              
            }  
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
     if (this.state.confirmed==true){
     this.make_order(this.state.order_params)
     } else{
      Alert.alert(
        'Ошибка',
        'На этот адрес невозможно оформить заказ, так как он не был проверен. Обратитесь в поддержку',
        [
          {text: 'Да', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
      )
     }
  }catch(err){alert(err)}}

  render() {
    const { navigation } = this.props;
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    if (this.state.addresses!=null && this.state.addresses!=undefined){
    return (

      

      <View style={{ flex: 1,backgroundColor:"#ffffff" }}>
      <Container>
      <Content>
          <Form>
        <Label>Выберите адрес заказа</Label>
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
    );} else{
      return(
        <View style={{ flex: 1,backgroundColor:"#ffffff" }}>
        <Text>Невозможно оформить заказ, так как нет ни одного адреса</Text>
        </View>

      )
    }
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
