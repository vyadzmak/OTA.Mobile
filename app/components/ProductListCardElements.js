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
  SetUserCartAmount
} from "./../modules/VarContainer";

export class ProductStockIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    //alert(this.props.is_stock_product)
  }

  render() {
    if (this.props.is_stock_product) {
      return (
        <View>
          <MCIcon name="tag" size={24} style={styles.drawerIconsStock} />
          {/* <FontAwesome>{Icons.dollarSign}</FontAwesome> */}
        </View>
      );
    } else {
      return null;
    }
  }
}

export class ProductDiscountIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    //alert(this.props.is_stock_product)
  }

  render() {
    if (this.props.is_discount_product) {
      return (
        <View>
          <MCIcon name="sale" size={24} style={styles.drawerIconsDiscount} />
        </View>
      );
    } else {
      return null;
    }
  }
}

export class ProductAmountText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.discount_amount == 0) {
      if (this.props.alt_amount != 0) {
        return (
          <View>
            <Text style={styles.productAmount}>
              {this.props.alt_amount} {this.props.currency_display_value}
              {"/"}
              {this.props.amount} {this.props.currency_display_value}
            </Text>
          </View>
        );
      } else {
        return (
          <View>
            <Text style={styles.productAmount}>
              {this.props.amount} {this.props.currency_display_value}
            </Text>
          </View>
        );
      }
    } else {
      if (this.props.alt_amount != 0) {
        return (
          <View>
            <Text style={styles.productAmountWithDiscount}>
              {this.props.alt_amount} {this.props.currency_display_value}
              {"/"}
              {this.props.amount} {this.props.currency_display_value}
            </Text>
          </View>
        );
      } else {
        return (
          <View>
            <Text style={styles.productAmountWithDiscount}>
              {this.props.amount} {this.props.currency_display_value}
            </Text>
          </View>
        );
      }
    }
  }
}

export class ProductAmountDiscountText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.discount_amount != 0) {
      return (
        <View>
          <Text style={styles.productAmountDiscount}>
            {this.props.discount_amount} {this.props.currency_display_value}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  }
}
export class ProductDiscountText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.stock_text != "") {
      return (
        <View>
          <Text style={styles.productDiscountText}>
            {this.props.stock_text}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  }
}

export class ProductBonus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (
      this.props.bonus != "" &&
      this.props.bonus != null &&
      this.props.bonus != undefined
    ) {
      return (
        <View>
          <Text style={styles.productBonusText}>
            {"Бонус " + this.props.bonus + "%"}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  }
}
export class ProductFavorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_favorite: false
    };
  }
  componentDidMount() {
    this.setState({
      is_favorite: this.props.is_favorite,
      product_id: this.props.product_id,
      route: "/manageFavoriteProducts"
    });
  }
  add_to_favorites(value) {
    user_id = USER_ID;
    product_id = this.props.product_id;

    this.setState({
      is_favorite: value
    });

    params = [
      { name: "user_id", value: user_id },
      { name: "product_id", value: product_id },
      { name: "value", value: value }
    ];

    response = getWithParams(this.state.route, params).then(response => {
      //if (response.)
      //alert(JSON.stringify(response.id))
      //alert(JSON.stringify(USER_DATA))

      USER_DATA.user_favorites_products.products_ids = response.products_ids;
      //alert(response.products_ids)

      SetUserData(USER_DATA);

      if (value == true) {
        Toast.show("Продукт был добавлен в избранное");
      } else {
        Toast.show("Продукт был удален из избранного");
      }
    });
  }

  render() {
    if (this.state.is_favorite == true) {
      return (
        <MCIcon
          name="heart"
          size={32}
          style={styles.favoriteIconStyle}
          onPress={() => this.add_to_favorites(!this.state.is_favorite)}
        />
      );
    } else {
      return (
        <MCIcon
          name="heart-outline"
          size={32}
          style={styles.favoriteIconStyle}
          onPress={() => this.add_to_favorites(!this.state.is_favorite)}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  drawerIconsDiscount: {
    color: "#ff0066",
    paddingRight: 5
  },
  drawerIconsStock: {
    color: "#0066cc",
    paddingRight: 5
  },
  productAmount: {
    fontSize: 20,
    color: "#000",
    fontStyle: "normal",
    fontWeight: "normal",
    paddingRight: 5
  },
  productAmountWithDiscount: {
    fontSize: 20,
    color: "#000",
    fontStyle: "normal",
    textDecorationLine: "line-through",
    paddingRight: 5
  },

  productAmountDiscount: {
    fontSize: 20,
    color: "red",
    fontStyle: "normal",
    fontWeight: "bold",
    paddingRight: 5
  },
  productDiscountText: {
    fontSize: 12,
    color: "red",
    fontStyle: "italic",
    paddingRight: 5
  },
  productBonusText: {
    fontSize: 18,
    color: "red",
    //fontStyle: "italic",
    paddingRight: 5
  },
  cartIconStyle: {
    color: "#ff9900",
    marginLeft: 10
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
