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

import AccountScreen from './AccountScreen'
import UserAgreementScreen from "./UserAgreementScreen";
import DashboardScreen from './DashboardScreen'
import ProductCategoriesScreen from './ProductCategoriesScreen'
import ProductsCatalogScreen from './ProductsCatalogScreen'
import OrdersHistoryScreen from './OrdersHistoryScreen'
import BrandsCatalogScreen from './BrandsCatalogScreen'
import PartnersCatalogScreen from './PartnersCatalogScreen'
import RecommendationsCatalogScreen from './RecommendationsCatalogScreen'
import CartScreen from './CartScreen'
import FavoritesScreen from './FavoritesScreen'
import LoginScreen from './LoginScreen'
import AppScreen from './../../App'
import ProductCardScreen from './ProductCardScreen'
import FilterProductsScreen from './FilterProductsScreen'


export const AccountsStack = createStackNavigator({
    Account: {screen:AccountScreen, navigationOptions: ({ navigation }) => ({
            title: 'Аккаунт',  // Title to appear in status bar
            headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
              })},
              
              },
              {
              initialRouteName: 'Account',
              navigationOptions: ({ navigation }) => ({
                          title: 'Аккаунт',  // Title to appear in status bar
                          //headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
                          headerStyle: {
                              backgroundColor: '#074c99',
                          },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                              fontWeight: 'bold',
                          }
                      }),
                      //mode: 'modal',
          
  });


  export const UserAgreementStack = createStackNavigator({
    UserAgreement: {screen:UserAgreementScreen, navigationOptions: ({ navigation }) => ({
            title: 'Пользовательское соглашение',  // Title to appear in status bar
            headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
              })},
              
              },
              {
              initialRouteName: 'UserAgreement',
              navigationOptions: ({ navigation }) => ({
                          title: 'Пользовательское соглашение',  // Title to appear in status bar
                          //headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
                          headerStyle: {
                              backgroundColor: '#074c99',
                          },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                              fontWeight: 'bold',
                          }
                      }),
                      //mode: 'modal',
          
  });

  
export const DashboardStack= createStackNavigator({
  Dashboard: {screen:DashboardScreen, navigationOptions: ({ navigation }) => ({
          title: 'Главная',  // Title to appear in status bar
          headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
            })},
              ProductCategories: {screen:ProductCategoriesScreen},
              ProductsCatalog: {screen:ProductsCatalogScreen},
              ProductCard : {screen:ProductCardScreen},
              FilterProducts : {screen:FilterProductsScreen},
              Login : {screen:LoginScreen},
              //App :{screen: AppScreen}
            },
            {
            initialRouteName: 'Dashboard',
            navigationOptions: ({ navigation }) => ({
                        title: 'Главная',  // Title to appear in status bar
                        //headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
                        headerStyle: {
                            backgroundColor: '#074c99',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }
                    }),
                    //mode: 'modal',
        
});


export const ProductCategoriesStack= createStackNavigator({
    ProductCategories: {screen:ProductCategoriesScreen, navigationOptions: ({ navigation }) => ({
            title: 'Категории товаров',  // Title to appear in status bar
            headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
  })},
  ProductsCatalog: {screen:ProductsCatalogScreen},
  },
  {
    initialRouteName: 'ProductCategories',
    navigationOptions: ({ navigation }) => ({
              title: 'Категории товаров',  // Title to appear in status bar
              //headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
              headerStyle: {
                  backgroundColor: '#074c99',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
            }),
  });


  export const OrdersHistoryStack= createStackNavigator({
    OrdersHistory: {screen:OrdersHistoryScreen, navigationOptions: ({ navigation }) => ({
            title: 'История заказов',  // Title to appear in status bar
            headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
  })},
  //another screens
  },
  {
    initialRouteName: 'OrdersHistory',
    navigationOptions: ({ navigation }) => ({
              title: 'История заказов',  // Title to appear in status bar
              //headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
              headerStyle: {
                  backgroundColor: '#074c99',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
            }),
  });

//-----------------------------------------------------------------------//
export const BrandsCatalogStack= createStackNavigator({
    BrandsCatalog: {screen:BrandsCatalogScreen, navigationOptions: ({ navigation }) => ({
            title: 'Бренды',  // Title to appear in status bar
            headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
  })},
  //another screens
  FilterProducts : {screen:FilterProductsScreen}
  },
  {
    initialRouteName: 'BrandsCatalog',
    navigationOptions: ({ navigation }) => ({
              title: 'Бренды',  // Title to appear in status bar
              //headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
              headerStyle: {
                  backgroundColor: '#074c99',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
            }),
  });

  //-----------------------------------------------------------------------//
export const PartnersCatalogStack= createStackNavigator({
    PartnersCatalog: {screen:PartnersCatalogScreen, navigationOptions: ({ navigation }) => ({
            title: 'Партнеры',  // Title to appear in status bar
            headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
  })},
  //another screens
  FilterProducts : {screen:FilterProductsScreen}

  },
  {
    initialRouteName: 'PartnersCatalog',
    navigationOptions: ({ navigation }) => ({
              title: 'Партнеры',  // Title to appear in status bar
              //headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
              headerStyle: {
                  backgroundColor: '#074c99',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
            }),
  });


 //-----------------------------------------------------------------------//
 export const RecommendationsCatalogStack= createStackNavigator({
    RecommendationsCatalog: {screen:FilterProductsScreen, navigationOptions: ({ navigation }) => ({
            title: 'Рекомендации',  // Title to appear in status bar
            headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
  })},
  //another screens
  },
  {
    initialRouteName: 'RecommendationsCatalog',
    initialRouteParams: {user_id:1, filter_parameter: 4, filter_value:'' },
    navigationOptions: ({ navigation }) => ({
              title: 'Рекомендации',  // Title to appear in status bar
              //headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
              headerStyle: {
                  backgroundColor: '#074c99',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
            }),
  });



//-----------------------------------------------------------------------//
export const CartStack= createStackNavigator({
    Cart: {screen:CartScreen, navigationOptions: ({ navigation }) => ({
            title: 'Корзина',  // Title to appear in status bar
            headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
  })},
  //another screens
  },
  {
    initialRouteName: 'Cart',
    navigationOptions: ({ navigation }) => ({
              title: 'Корзина',  // Title to appear in status bar
              //headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
              headerStyle: {
                  backgroundColor: '#074c99',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
            }),
  });


//-----------------------------------------------------------------------//
export const FavoritesStack= createStackNavigator({
    Favorites: {screen:FilterProductsScreen, navigationOptions: ({ navigation }) => ({
            title: 'Избранное',  // Title to appear in status bar
            headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
  })},
  //another screens
  },
  {
    initialRouteName: 'Favorites',
    initialRouteParams: {user_id:1, filter_parameter: 3, filter_value:1 },
    navigationOptions: ({ navigation }) => ({
              title: 'Избранное',  // Title to appear in status bar
              //headerLeft: <MaterialIcon name="menu" style={{color:'#ffffff',fontSize:32}}  onPress={ () => navigation.toggleDrawer() } />,
              headerStyle: {
                  backgroundColor: '#074c99',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
            }),
  });

const styles = StyleSheet.create({
    drawerIcons: {
       color :"#000",
       //size: 24
     }
   });