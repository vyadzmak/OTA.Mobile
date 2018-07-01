import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';


export var USER_ID =-1
export var CART_ID =-1
export var CART_PRODUCTS_COUNT =0
export var CLIENT_ID =-1
export var USER_DATA ={}
export var CART_DATA ={}
get_user_data=()=>{
    try{
    AsyncStorage.getItem('user_data').then((value) => {
        
        if (value!=null){
            //alert(JSON.parse(value).id)
            USER_DATA = JSON.parse(value)
            USER_ID =USER_DATA.user_data.id
            CLIENT_ID = USER_DATA.user_data.client_data.id
            //alert('USER ID '+USER_ID+' CLIENT_ID '+CLIENT_ID)
        }
  })
  .then(res => {
    
  });} catch(err){

  }
}

get_cart_id=()=>{
    try{
    AsyncStorage.getItem('cart_id').then((value) => {
        
        if (value!=null){
            CART_ID = value
            //alert(CART_ID)
        }
  })
  .then(res => {
    
  });} catch(err){

  }
}

get_cart_products_count=()=>{
    try{
    AsyncStorage.getItem('cart_products_count').then((value) => {
        
        if (value!=null){
            CART_PRODUCTS_COUNT = value
            //alert(CART_ID)
        }
  })
  .then(res => {
    
  });} catch(err){

  }
}
get_cart_data=()=>{
    try{
    AsyncStorage.getItem('cart_data').then((value) => {
        
        if (value!=null){
            CART_DATA = value
            //alert(CART_ID)
        }
  })
  .then(res => {
    
  });} catch(err){

  }
}



export const InitVars=()=>{
    get_user_data()
    get_cart_id()
    get_cart_data()
    get_cart_products_count()

}

export const DropVars =()=>{
    USER_DATA={}
    CART_DATA = {}
    USER_ID=-1
    CART_ID =-1
    CART_PRODUCTS_COUNT=0
}

export const SetUserCartId=(id)=>{
    CART_ID =id
    //alert(CART_ID)
    AsyncStorage.setItem('cart_id',id.toString())
}

export const SetUserCartProductsCount=(count)=>{
    CART_PRODUCTS_COUNT =count
    //alert(CART_ID)
    AsyncStorage.setItem('cart_products_count',count.toString())
}

export const SetUserCartData=(cart_data)=>{
    CART_DATA =cart_data
    //alert(CART_ID)
    AsyncStorage.setItem('cart_data',JSON.stringify(cart_data))
}

export const SetUserData=(data)=>{
    USER_DATA =data
    //alert(CART_ID)
    AsyncStorage.setItem('user_data',JSON.stringify(data))
}