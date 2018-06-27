import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image, Button
} from "react-native";

//library imports 
import { Container, Content, Icon, Header, Body, Left } from 'native-base'
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView,createDrawerNavigator, createStackNavigator } from 'react-navigation'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

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
  return (
      <Container>
        <Header style={{height:150,backgroundColor:'#074c99'}}>
          <DrawerLogo/>
        </Header>
        <Content>
          <DrawerItems {...props}/>
        </Content>
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
  }, {
    contentComponent: LogoMenuItemComponent,
  })

  export default class RootScreen extends Component {
    static navigationOptions = {
        headerMode: 'none',
        header: null
      };
    render() {
      return (        
        <Root />
      )
    }
  }

  const styles = StyleSheet.create({
    drawerIcons: {
       color :"#1c313a",
       
     }
   });