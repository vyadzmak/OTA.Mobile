import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Badge,
  Thumbnail,
  Button,
  Separator,
  Switch,
  Item
} from "native-base";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FIcon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-simple-toast";
import StarRating from "react-native-star-rating";

import { getWithParams, getWithSlashParams } from "./../modules/Http";
import {
  USER_ID,
  CART_ID,
  USER_DATA,
  SetUserCartId,
  SetUserData,
  SetUserCartProductsCount,
  SetUserCartAmount,
  IS_CONFIRMED
} from "./../modules/VarContainer";

import {
  ProductStockIcon,
  ProductDiscountIcon,
  ProductAmountText,
  ProductAmountDiscountText,
  ProductDiscountText,
  ProductFastCart,
  ProductFavorite,
  ProductBonus
  //MultiFastCart
} from "../components/ProductListCardElements";

import { MultiFastCartCounter } from "./MultiFastCartCounterComponent";
import { MultiFastCartAltCounter } from "./MultiFastCartAltCounterComponent";

export class MultiFastCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {},
      isLoading: true,
      // product_id: this.props.item.product_id,
      //count: this.props.item.count,
      //alt_count: this.props.item.alt_count,
      // unit_name: this.props.item.unit_name,
      // alt_unit_name: this.props.item.alt_unit_name,
      //amount: this.props.item.amount,
      //alt_amount: this.props.item.alt_amount,

      route: "/addCartPositionToCart"
      // show_alt: false
    };
  }
  componentDidMount() {
    this.setState({
      item: this.props.item,
      isLoading: false
    });
    //alert(JSON.stringify(this.props.item));
  }

  add_to_cart(item) {
    if (IS_CONFIRMED == false) {
      alert(
        "Невозможно добавить товар в корзину. У ва нет подтвержденных адресов. Свяжитесь с поддержкой."
      );
      return;
    }
    //alert(JSON.stringify(item.alt_count));
    user_id = USER_ID;
    count = item.count;
    alt_count = item.alt_count;
    cart_id = CART_ID;
    product_id = item.id;

    if (alt_count == undefined) {
      alt_count = 0;
    }
    params = [
      { name: "user_id", value: user_id },
      { name: "user_cart_id", value: cart_id },
      { name: "product_id", value: product_id },
      { name: "count", value: count },
      { name: "alt_count", value: alt_count }
    ];
    //alert(JSON.stringify(params))
    response = getWithParams(this.state.route, params).then(response => {
      //if (response.)
      //alert(JSON.stringify(response))
      SetUserCartProductsCount(response.products_count);
      SetUserCartAmount(response.total_amount);
      //alert(response.products_count)
      SetUserCartId(response.id);
      Toast.show("Продукт был добавлен в корзину");
      //alert(CART_ID)
    });
  }

  update_count = _count => {
    this.setState({
      item: { ...this.state.item, count: _count }
    });
  };

  update_alt_count = _count => {
    this.setState({
      item: { ...this.state.item, alt_count: _count }
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <Item style={{ height: 150 }}>
        <Left>
          <View
            style={{
              width: "100%",
              height: "100%"
              //backgroundColor: "purple"
            }}>
            <MultiFastCartAltCounter
              item={this.state.item}
              fn={this.update_alt_count}
            />

            <Item
              style={{
                width: "100%",
                height: "30%",
                maxHeight: "30%",
                backgroundColor: "#ffffff"
              }}>
              <View style={{ flexDirection: "row", marginBottom: 0 }}>
                <Left>
                  <ProductFavorite
                    is_favorite={this.state.item.is_favorite}
                    product_id={this.state.item.id}
                    style={styles.favoriteElementStyle}
                  />
                </Left>
                <Body style={{ flexDirection: "row" }}>
                  <StarRating
                    disabled={false}
                    emptyStar={"ios-star-outline"}
                    fullStar={"ios-star"}
                    halfStar={"ios-star-half"}
                    iconSet={"Ionicons"}
                    maxStars={5}
                    rating={this.state.item.rate}
                    fullStarColor={"orange"}
                    starSize={20}
                  />
                  <Text style={{ color: "orange", fontSize: 16 }}>
                    {" "}
                    ({this.state.item.comments_count})
                  </Text>
                </Body>
                <Right />
              </View>
            </Item>
          </View>
        </Left>
        <Right>
          <View
            style={{
              width: "100%",
              height: "100%"
              //backgroundColor: "red"
            }}>
            <MultiFastCartCounter
              item={this.state.item}
              fn={this.update_count}
            />

            <Item
              style={{
                width: "100%",
                height: "30%",
                maxHeight: "30%",
                backgroundColor: "#ffffff"
                //flexDirection: "column"
              }}>
              <Right>
                <MCIcon
                  name="cart"
                  size={45}
                  style={styles.cartIconStyle}
                  onPress={() => this.add_to_cart(this.state.item)}
                />
              </Right>
            </Item>
          </View>
        </Right>
      </Item>
    );
  }
}

const styles = StyleSheet.create({
  cartIconStyle: {
    color: "#ff9900",
    marginLeft: 10,
    marginRight: 10
  },
  favoriteIconStyle: {
    color: "#993399"
  },
  buttonsStyle: {
    width: "70%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
    //paddingHorizontal: 2,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 28
  },
  countStyle: {
    padding: 5,
    fontSize: 14,
    fontWeight: "bold"
  },
  favoriteElementStyle: {
    marginLeft: -50
  }
});
