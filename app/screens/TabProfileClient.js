import React from "react";
import {
  View,  Text,    StyleSheet,
  TouchableOpacity,
  TextInput,ActivityIndicator, Picker
} from "react-native";
import Modal from "react-native-modal";
import { Container, Content,Input, Icon, Header, Body, Left,Form,Label, Footer, Item,Separator,Card, CardItem,List,Button, ListItem, Right, Switch } from 'native-base'

import {DrawerNavigator} from 'react-navigation'
import {USER_DATA,USER_ID, CART_ID} from './../modules/VarContainer'
import {getWithParams,getWithSlashParams} from './../modules/Http'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
var PickerItem = Picker.Item;
import {postRequest} from './../modules/Http'

export default class TabProfileClient extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          isLoading:true,
          route:'/userProfile',
          userProfile:{},
          isModalVisible: false,

          areas :[],
          cities: [],
          area:{},
          city:{},
          c_address :{
              id: -1,
              name: '',
              address: '',
              code: '',
              tobacco_alcohol_license:false,
              city_id:-1,
              is_default: false
          }
        }
      }


      update_model(data){
        try{
          
          update_route ='/clientAddresses'
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
                //this.cart = response
                this.state.userProfile.user_data.client_data.client_addresses.push(response)
                this.c_userProfile = this.state.userProfile
                
                // this.setState({ userProfile:{}}, function () {
                //     this.setState({userProfile:this.c_userProfile}, function () {
                //         console.log("OK")
                
                //     } )
                //   })
              }
    
              
              //this.setState({user_data:{...this.state.user_data,user_name : txt}})
            }
          )
    
        } catch(err){
          alert(err)
        }
      }

      _toggleModal = () =>
        {
            if (this.state.isModalVisible==true){
            //post
                if (this.state.c_address.id==-1){
                model ={
                    client_id: this.state.userProfile.user_data.client_data.id,
                    name: this.state.c_address.name,
                    address: this.state.c_address.address,
                    code: this.state.c_address.code,
                    tobacco_alcohol_license: this.state.c_address.tobacco_alcohol_license,
                    city_id: this.state.c_address.city_id,
                    is_default:this.state.c_address.is_default
                }
                //alert(JSON.stringify(model))
                this.update_model(model)
            }

            //alert(JSON.stringify(this.state.c_address))
        }
            this.setState({ isModalVisible: !this.state.isModalVisible });
        
        }

      static navigationOptions = {
        title: "Профиль пользователя",
      };
    
      loadCities(city_id){
        params =[{"name":"user_id","value":USER_ID},{"name":"area_id","value":city_id}]
            _route = "/cityCatalogByArea"
              response =getWithParams(_route,params).then(
                response=> {
                  //console.log(JSON.stringify(response))
                  this.setState({
                    isLoading:false,
                    
                  })

                  //alert(JSON.stringify(response))
                  this.cities = response
                  this.city = response[0]
                  //alert(JSON.stringify(this.city))  
                  this.setState({ cities:[], city:{}}, function () {
                    this.setState({cities:this.cities, city:this.city}, function () {
                        this.setState({c_address:{...this.state.c_address,city_id : this.city.id}})
                
                    } )
                  })
                }
              )    
      }

      loadAreas(){
        response =getWithSlashParams('/areaCatalog').then(
            response=> {
            
             if (response.message==undefined){
             this.setState({
                areas:response,
                //isLoading:false,   
                area:response[0]    
              })
              this.loadCities(response[0].id)
              //alert(JSON.stringify(this.state.area))
              }
            }
          )    
      }

      componentDidMount(){
        params =[{"name":"user_id","value":USER_ID}]
        response =getWithParams(this.state.route,params).then(
          response=> {
          //alert(JSON.stringify(response))
           if (response.message==undefined){
           this.setState({
              userProfile:response,
              isLoading:false,   
    
            })
            
            }
          }
        )  
        this.loadAreas()  
      }

      change_area(_area){
        //alert(_area)
        id =-1
        nArea = {}
        for (i=0;i<this.state.areas.length;i++){
            if (this.state.areas[i].name==_area){
                id = this.state.areas[i].id
                nArea = this.state.areas[i]
                //alert("New "+JSON.stringify(nArea))
                this.setState({area: _area})
                break
            }
        }
        

        if (id!=-1)
        this.loadCities(id)  


      }

      change_city(_city){
        //alert('City '+_city)
        id =-1
        
        for (i=0;i<this.state.cities.length;i++){
            if (this.state.cities[i].name==_city){
                id = this.state.cities[i].id
                this.setState({c_address:{...this.state.c_address,city_id : id}})
                
                this.setState({city: _city})
                break
            }
        }
      }

  render() {
    // let areaItems = this.state.areas.map( (s, i) => {
    //     return <Picker.Item key={i} value={s} label={s} />
    // });

    if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        )
      }

      return (
        <View style={styles.container}>  
      <Container>        
      <Content>
        {/* <Item disabled>
          <Text>Логин</Text>
          <Input disabled placeholder='Login' value={this.state.userProfile.login}/>
          <MCIcon name='login' size={this.iconSize} />
        </Item> */}

          <Card>
              <CardItem>
                  <Left>
                      <Text>Имя организации</Text>
                  </Left>
                  <Body>
                      <Input disabled placeholder='Имя организации' value={this.state.userProfile.user_data.client_data.name}/>
                  </Body>
                  
              </CardItem>
              <CardItem>
                  <Left>
                      <Text>Регистрационный номер</Text>
                  </Left>
                  <Body>
                      <Input  value={this.state.userProfile.user_data.client_data.registration_number}/>
                  </Body>
                  
              </CardItem>
              
              <CardItem>
                  <Left>
                      <Text>Email</Text>
                  </Left>
                  <Body>
                      <Input  value={this.state.userProfile.user_data.client_data.client_info.email}/>
                  </Body>
                  
              </CardItem>

              <CardItem>
                  <Left>
                      <Text>Телефон</Text>
                  </Left>
                  <Body>
                      <Input  value={this.state.userProfile.user_data.client_data.client_info.phone_number}/>
                  </Body>
                  
              </CardItem>
          </Card>
          <Button block success>
          <Text>СОХРАНИТЬ</Text>
        </Button>
        <Card>
        <Label>Адреса</Label>
            <List dataArray={this.state.userProfile.user_data.client_data.client_addresses}
            renderRow={(item) =>
              <ListItem>
                <Text>{item.address}</Text>
                <Text>{item.name}</Text>
                {/* <Text>{item.city_data.name}</Text>
                <Text>{item.city_data.area_data.name}</Text>
                 */}
              </ListItem>
            }>
          </List>
          </Card>
          <Button block primary onPress={this._toggleModal} style={{marginTop:40}}>
          <Text>ДОБАВИТЬ АДРЕС</Text>
        </Button>
      </Content>

     
    </Container>
    
    <Modal isVisible={this.state.isModalVisible}>
    {/* <KeyboardAwareScrollView> */}
        <View style={{ flex: 1,backgroundColor:"#ffffff" }}>
        <Container>
        <Header style={styles.modalHeaderStyle}>
            <Text>НОВЫЙ АДРЕС</Text>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Имя</Label>
              <Input underlineColorAndroid='rgba(0,0,0,0)' 
            //   placeholder="Магазин 'Ромашка'"
              placeholderTextColor = "rgba(255,255,255,0.7)"
              selectionColor="#fff"
              keyboardType="numeric"
              onChangeText = {(text) => this.setState({c_address:{...this.state.c_address,name : text}})}
              value ={this.state.c_address.name}
              maxLength = {16}
            //   onSubmitEditing={()=> this.state.с_address_address_input.focus()}
              />
            </Item>
            <Item floatingLabel>
              <Label>Адрес</Label>
              <Input  underlineColorAndroid='rgba(0,0,0,0)' 
            //   placeholder="Набережная 16"
              placeholderTextColor = "rgba(255,255,255,0.7)"
              selectionColor="#fff"
              keyboardType="default"
              value ={this.state.c_address.address}
              onChangeText = {(text) => this.setState({c_address:{...this.state.c_address,address : text}})}
              maxLength = {50}
            //   ref={(input) => this.state.с_address_address_input = input}
            //   onSubmitEditing={()=> this.state.client_code_input.focus()}
              />
            </Item>

            <Item floatingLabel>
              <Label>Код</Label>
              <Input  underlineColorAndroid='rgba(0,0,0,0)' 
            //   placeholder="Набережная 16"
              placeholderTextColor = "rgba(255,255,255,0.7)"
              selectionColor="#fff"
              keyboardType="default"
              value ={this.state.c_address.code}
              onChangeText = {(text) => this.setState({c_address:{...this.state.c_address,code : text}})}
              maxLength = {50}
            //   ref={(input) => this.state.с_address_address_input = input}
            //   onSubmitEditing={()=> this.state.client_code_input.focus()}
              />
            </Item>

            {/* <Item floatingLabel> */}
              <Label>Лицензия на алкоголь и табачную продукцию</Label>
              <Switch 
              onValueChange ={(value)=>this.setState({c_address:{...this.state.c_address,tobacco_alcohol_license : value}})}
              value = {this.state.c_address.tobacco_alcohol_license}

              />

              <Label>Адрес по умолчанию</Label>
              <Switch 
              onValueChange ={(value)=>this.setState({c_address:{...this.state.c_address,is_default : value}})}
              value = {this.state.c_address.is_default}

              />
            {/* </Item> */}

            
            {/* <Item> */}
            <Label>Область</Label>
            <Picker
            selectedValue={this.state.area}
 
            onValueChange={(itemValue, itemIndex) => this.change_area(itemValue)} >
 
            { this.state.areas.map((item, key)=>(
                <Picker.Item label={item.name} value={item.name} key={key} />)
            )}
    
          </Picker>
          {/* </Item> */}
          {/* <Item> */}
          <Label>Город/Район/Административная единица</Label>

          <Picker
            selectedValue={this.state.city}
 
            onValueChange={(itemValue, itemIndex) => this.change_city(itemValue)} >
 
            { this.state.cities.map((item, key)=>(
                <Picker.Item label={item.name} value={item.name} key={key} />)
            )}
    
          </Picker>
          {/* </Item> */}
          </Form>
        </Content>
        
          <Button block success onPress={this._toggleModal}>
            <Text>ДОБАВИТЬ</Text>
          </Button>
          <Button block danger onPress={this._toggleModal}>
            <Text>ОТМЕНА</Text>
          </Button>
      </Container>
         
        </View>
        {/* </KeyboardAwareScrollView> */}
      </Modal>
      
      </View>
    
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center"
  },
  modalHeaderStyle:{
      color:"#074c99",
      height :50
  }

});
