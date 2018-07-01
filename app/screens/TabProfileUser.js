import React from "react";
import {
  View,     StyleSheet,
  TouchableOpacity,
  TextInput,ActivityIndicator
} from "react-native";

import { Container, Text, Content,Input, Icon, Header, Body, Left, Footer, Item,Separator,Card, CardItem,List,Button, ListItem, Right } from 'native-base'

import {DrawerNavigator} from 'react-navigation'
import {USER_DATA,USER_ID, CART_ID} from './../modules/VarContainer'
import {getWithParams,getWithSlashParams} from './../modules/Http'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
export default class TabProfileUser extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading:true,
      route:'/userProfile',
      userProfile:{}
    }
  }

  static navigationOptions = {
    title: "Профиль пользователя",
  };

  componentDidMount(){
      //alert('AA')
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
  }

  iconSize = 24

  render() {
    if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        )
      }
    
    return (
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
                        <Text>Логин</Text>
                    </Left>
                    <Body>
                        <Input disabled inlineLabel  value={this.state.userProfile.login}/>
                    </Body>
                    
                </CardItem>
                <CardItem>
                    <Left>
                        <Text>Пароль</Text>
                    </Left>
                    <Body>
                        <Input  value={this.state.userProfile.password}/>
                    </Body>
                    
                </CardItem>
                <CardItem>
                    <Left>
                        <Text>Имя</Text>
                    </Left>
                    <Body>
                        <Input value={this.state.userProfile.user_data.name}/>
                    </Body>
                    
                </CardItem>
                <CardItem>
                    <Left>
                        <Text>Email</Text>
                    </Left>
                    <Body>
                        <Input placeholder='Email' value={this.state.userProfile.user_data.user_info.email}/>
                    </Body>
                    
                </CardItem>

                <CardItem>
                    <Left>
                        <Text>Телефон</Text>
                    </Left>
                    <Body>
                        <Input placeholder='Телефон' value={this.state.userProfile.user_data.user_info.phone_number}/>
                    </Body>
                    
                </CardItem>
            </Card>
            <Button block success>
            <Text>СОХРАНИТЬ</Text>
          </Button>
        </Content>
      </Container>
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
