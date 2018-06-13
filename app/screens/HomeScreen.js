import React from 'react';
import { View, Text,Alert, Button,  } from 'react-native';
import {Container, Header, Left, Right, Content} from 'native-base'
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import LogoTitle from './../components/LogoTitleComponent'

import Icon from 'react-native-vector-icons/MaterialIcons'
import ProductCategoriesScreen from './ProductCategories'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
     <Container>
       
       <Header style={{backgroundColor:'#3a455c', height:60}}>
          <Left>
            <Icon name="menu" style={{color:'#ffffff',fontSize:32}}/>

          </Left>

         
          <Right>
            <Icon name="shopping-cart" style={{color:'#ffffff',fontSize:32}}/>
          </Right> 
       </Header>
       <DashStack/>
       {/* <Content><DashStack/></Content> */}
     </Container>
     
      
    );
  }  
}

const DashStack = createStackNavigator({
  ProductCategories: ProductCategoriesScreen,
  // Login: LoginScreen
},
{
  initialRouteName: 'ProductCategories',
  
});