import React, { Component } from "react";
import { AsyncStorage } from "react-native";

export var USER_ID = -1;
export var CART_ID = -1;
export var CART_PRODUCTS_COUNT = 0;
export var CART_PRODUCTS_AMOUNT = 0;
export var CLIENT_ID = -1;
export var USER_DATA = {};
export var CART_DATA = {};
export var NO_IMAGE_URL = "";
export var IS_CONFIRMED = false;
get_user_data = () => {
  try {
    AsyncStorage.getItem("user_data")
      .then(value => {
        if (value != null) {
          //alert(JSON.parse(value).id)
          USER_DATA = JSON.parse(value);
          USER_ID = USER_DATA.user_data.id;
          NO_IMAGE_URL = USER_DATA.no_image_url;
          CLIENT_ID = USER_DATA.user_data.client_data.id;
          //alert(USER_DATA.is_confirmed);
          IS_CONFIRMED = USER_DATA.is_confirmed;
          //alert('USER ID '+USER_ID+' CLIENT_ID '+CLIENT_ID)
        }
      })
      .then(res => {});
  } catch (err) {}
};

get_cart_id = () => {
  try {
    AsyncStorage.getItem("cart_id")
      .then(value => {
        if (value != null) {
          CART_ID = value;
          //alert(CART_ID)
        }
      })
      .then(res => {});
  } catch (err) {}
};

get_cart_products_count = () => {
  try {
    AsyncStorage.getItem("cart_products_count")
      .then(value => {
        if (value != null) {
          CART_PRODUCTS_COUNT = value;
          //alert(CART_ID)
        }
      })
      .then(res => {});
  } catch (err) {}
};

get_cart_products_amount = () => {
  try {
    let t = AsyncStorage.getItem("cart_products_amount")
      .then(value => {
        //alert(value);
        if (value != null) {
          CART_PRODUCTS_AMOUNT = value;
          //alert(CART_PRODUCTS_AMOUNT);
          return value;
        } else {
          // alert("null");
        }
      })
      .then(res => {});

    //alert("T = " + JSON.stringify(t));
  } catch (err) {}
};
get_cart_data = () => {
  try {
    AsyncStorage.getItem("cart_data")
      .then(value => {
        if (value != null) {
          CART_DATA = value;
          //alert(CART_ID)
        }
      })
      .then(res => {});
  } catch (err) {
    alert(err);
  }
};

export const InitVars = () => {
  try {
    get_user_data();
    get_cart_id();
    get_cart_data();
    get_cart_products_count();

    get_cart_products_amount();
  } catch (e) {
    alert(e);
  }
};

export const InitProductsAmount = () => {
  return get_cart_products_amount();
};
export const DropVars = () => {
  USER_DATA = {};
  CART_DATA = {};
  USER_ID = -1;
  CART_ID = -1;
  CART_PRODUCTS_COUNT = 0;
  CART_PRODUCTS_AMOUNT = 0;
  IS_CONFIRMED = false;
  AsyncStorage.setItem("cart_products_amount", "0");
  //alert("Drop");
};

export const DropCartAmount = () => {
  CART_PRODUCTS_AMOUNT = 0;
  AsyncStorage.setItem("cart_products_amount", CART_PRODUCTS_AMOUNT.toString());
};

export const SetUserCartId = id => {
  CART_ID = id;
  //SetUserCartAmount(0);
  //CART_PRODUCTS_AMOUNT = 0;
  //alert(CART_ID)
  //alert("SetUID");
  if (id == -1) {
    CART_PRODUCTS_AMOUNT = 0;
  }
  AsyncStorage.setItem("cart_products_amount", CART_PRODUCTS_AMOUNT.toString());
  AsyncStorage.setItem("cart_id", id.toString());
};

export const SetUserCartProductsCount = count => {
  CART_PRODUCTS_COUNT = count;

  //alert(CART_ID)
  AsyncStorage.setItem("cart_products_count", count.toString());
};

export const SetUserCartAmount = amount => {
  try {
    if (amount == undefined) {
      amount = 0;
    }
    CART_PRODUCTS_AMOUNT = amount;
    //alert("SETUCA");

    //alert(CART_ID)
    AsyncStorage.setItem("cart_products_amount", amount.toString());
  } catch (e) {
    alert(e);
  }
};

export const SetUserCartData = cart_data => {
  CART_DATA = cart_data;
  //alert(JSON.stringify(CART_DATA));
  AsyncStorage.setItem("cart_data", JSON.stringify(cart_data));
};

export const SetUserData = data => {
  USER_DATA = data;
  //alert(CART_ID)
  AsyncStorage.setItem("user_data", JSON.stringify(data));
};
