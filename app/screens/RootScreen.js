import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image, Button, TouchableOpacity,Alert, AsyncStorage
} from "react-native";

//library imports 
import { Container, Content, Icon, Header, Body, Left, Footer, Item,Separator, CardItem,List, ListItem } from 'native-base'
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView,createDrawerNavigator, createStackNavigator } from 'react-navigation'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationActions } from 'react-navigation';
//import stack elements 
import {
  DashboardStack,
  AccountsStack,
  UserAgreementStack,
  ProductCategoriesStack,
  OrdersHistoryStack,
  BrandsCatalogStack,
  PartnersCatalogStack,
  RecommendationsCatalogStack,
  CartStack,
  FavoritesStack

} from './StackContainer'
import DrawerLogo from "../components/DrawerLogoComponent";
const LogoMenuItemComponent = (props)=>{

  logout=()=>{
    AsyncStorage.clear()
    props.navigation.navigate('Login');


  //   const resetAction = NavigationActions.reset({
  //     index: 0,
  //     actions: [NavigationActions.navigate({routeName: 'Home'})]
  // });
  //  props.navigation.dispatch(resetAction);
    //const { navigation } = this.props;
    //alert(JSON.stringify(props.navigation))
    // props.navigation.navigate('Login')
   // navigate('ScreenOne', {}, NavigationActions.navigate({ 'ScreenOneSettings' }));
  //   const resetAction = NavigationActions.reset({
  //     index: 0,
  //     actions: [
  //         NavigationActions.navigate({ routeName: 'Home' })
  //     ]
  // });
  // props.navigation.dispatch(resetAction);
  // props.navigation.goBack(null);
    
  }
  //const { navigation } = this;

  //t = this.navigation
  return (
    
      <Container>
        <Header style={{height:150,backgroundColor:'#074c99'}}>
          <DrawerLogo/>
        </Header>
        <Content>
          <DrawerItems {...props}/>
          <List>
          {/* <TouchableOpacity  > */}
        <ListItem icon onPress={()=>{Alert.alert(
                'Выход',
                'Вы действительно хотите выйти?',
                [
                  {text: 'Отмена', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'Да', onPress: () => {this.logout() }},
                ],
                { cancelable: false }
              )}}>
            <Left>
            <MCIcon name="exit-to-app" size={iconSize} style={styles.exitIcons}></MCIcon>
            </Left>
            <Body>
              
              <Text style={styles.exitButton}>Выход</Text>
            </Body>
          </ListItem>
          {/* </TouchableOpacity> */}
        
        </List>
        </Content>
        {/* .<Footer> */}
        {/* <Content> */}
        
        {/* </Content> */}
      </Container>
  )
}
const iconSize =24
const Root = DrawerNavigator({

  
    Dashboard: {
      screen: DashboardStack,
      navigationOptions: {
        title: 'Главная',
        //drawerLabel: 'Home',
          drawerIcon: () => (
          <MaterialIcon name="home" size={iconSize} style={styles.drawerIcons}></MaterialIcon>
          )
      }
    },
    // ProductCategories: {
    //   screen: ProductCategoriesStack,
    //   navigationOptions: {
    //     title: 'Категории товаров', 
    //     drawerIcon: () => (
    //       <MaterialIcon name="view-module" size={iconSize} style={styles.drawerIcons}></MaterialIcon>
    //       )
    //   }
    // },
    
    OrdersHistory: {
      screen: OrdersHistoryStack,
      navigationOptions: {
        title: 'История заказов', 
        drawerIcon: () => (
          <MaterialIcon name="history" size={iconSize} style={styles.drawerIcons}></MaterialIcon>
          )
      }
    },
    UserAgreement: {
      screen: UserAgreementStack,
      navigationOptions: {
        title: 'Cоглашение',
        drawerIcon: () => (
          <MaterialIcon name="check" size={iconSize} style={styles.drawerIcons}></MaterialIcon>
          )
      }
    },
    Account: {
      screen: AccountsStack,
      navigationOptions: {
        title: 'Профиль', 
        drawerIcon: () => (
          <MaterialIcon name="face" size={iconSize} style={styles.drawerIcons}></MaterialIcon>
          )
      }
    },
    BrandsCatalog: {
      screen: BrandsCatalogStack,
      navigationOptions: {
        title: 'Бренды', 
        drawerIcon: () => (
          <MaterialIcon name="label" size={iconSize} style={styles.drawerIcons}></MaterialIcon>
          )
      }
    }  ,
    PartnersCatalog: {
      screen: PartnersCatalogStack,
      navigationOptions: {
        title: 'Партнеры', 
        drawerIcon: () => (
          <MaterialIcon name="loyalty" size={iconSize} style={styles.drawerIcons}></MaterialIcon>
          )
      }
    },
    RecommendationsCatalog: {
      screen: RecommendationsCatalogStack,
      navigationOptions: {
        title: 'Рекомендации', 
        drawerIcon: () => (
          <MaterialIcon name="redeem" size={iconSize} style={styles.drawerIcons}></MaterialIcon>
          )
      }
    },
    Cart: {
      screen: CartStack,
      navigationOptions: {
        title: 'Корзина', 
        drawerIcon: () => (
          <MaterialIcon name="shopping-cart" size={iconSize} style={styles.drawerIcons}></MaterialIcon>
          )
      }
    }  ,
    Favorites: {
      screen: FavoritesStack,
      navigationOptions: {
        title: 'Избранное', 
        drawerIcon: () => (
          <MaterialIcon name="favorite" size={iconSize} style={styles.drawerIcons}></MaterialIcon>
          )
      }
    } 
    ,
    // Exit: {
    //   screen: {},
    //   navigationOptions: {
    //     title: 'Выход', 
    //     drawerIcon: () => (
    //       <MaterialIcon name="favorite" size={iconSize} style={styles.drawerIcons}></MaterialIcon>
    //       )
    //   }
    // }        
  }, {
    // contentComponent: () => (
    //   <LogoMenuItemComponent navigation={this.navigation} />
    // )
    contentComponent:LogoMenuItemComponent
  })

  export default class RootScreen extends Component {
    static navigationOptions = {
        headerMode: 'none',
        header: null
      };
    render() {
      return (        
        <Root navigation={this.navigation}/>
      )
    }
  }

  const styles = StyleSheet.create({
    drawerIcons: {
       color :"#1c313a",
       
     },
     exitIcons: {
      color :"#074c99",
      
    },
     exitButton:{
       marginLeft: 12,
       color: "#074c99",
       fontWeight: 'bold'
     }
   });