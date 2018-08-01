import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
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
      return (
        <View>
          <Text style={styles.productAmount}>
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

export class ProductFastCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: this.props.product_id,
      count: this.props.count,
      alt_count: this.props.alt_count,
      unit_name: this.props.unit_name,
      alt_unit_name: this.props.alt_unit_name,
      amount: this.props.amount,
      alt_amount: this.props.alt_amount,

      route: "/addCartPositionToCart",
      show_alt: false
    };
  }
  componentDidMount() {
    if (
      this.props.unit_name == undefined ||
      this.props.unit_name == null ||
      this.props.unit_name == "null"
    ) {
      this.setState({
        unit_name: "НЕТ"
      });
    }

    if (
      this.props.alt_unit_name != undefined &&
      this.props.alt_unit_name != null &&
      this.props.alt_unit_name != "null"
    ) {
      this.setState({
        show_alt: true
        //alt_count: 0
      });
    } else {
      this.setState({
        show_alt: false,
        alt_count: 0
      });
    }
  }
  add_to_cart() {
    user_id = USER_ID;
    count = this.state.count;
    alt_count = this.state.alt_count;
    cart_id = CART_ID;
    product_id = this.props.product_id;

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

  plus_count() {
    _count = this.state.count;
    _count += 1;
    //alert(_count);

    this.setState({
      count: _count
    });
  }

  minus_count() {
    _count = this.state.count;
    if (_count == 1) return;
    _count -= 1;
    //alert(_count);
    this.setState({
      count: _count
    });
  }

  plus_alt_count() {
    _count = this.state.alt_count;
    _count += 1;
    //alert(_count);

    this.setState({
      alt_count: _count
    });
  }

  minus_alt_count() {
    _count = this.state.alt_count;
    if (_count == 0) return;
    _count -= 1;
    //alert(_count);
    this.setState({
      alt_count: _count
    });
  }
  render() {
    if (this.state.show_alt) {
      return (
        <View style={{ flexDirection: "row" }}>
          <Left style={{ flexDirection: "column" }}>
            <Text style={styles.countStyle}>
              {this.state.alt_unit_name + "/" + this.state.alt_amount + " ₸"}
            </Text>

            <View
              style={{
                flexDirection: "row"
                // alignItems: "center",
                // justifyContent: "center"
              }}>
              <Button
                danger
                style={styles.buttonsStyle}
                onPress={() => this.minus_alt_count()}>
                <Text style={styles.buttonText}>-</Text>
              </Button>

              <Text style={styles.countStyle}>{this.state.alt_count}</Text>

              <Button
                success
                style={styles.buttonsStyle}
                onPress={() => this.plus_alt_count()}>
                <Text style={styles.buttonText}>+</Text>
              </Button>
            </View>
          </Left>
          <Body />
          <Right style={{ flexDirection: "column" }}>
            <View style={{ marginRight: 30 }}>
              <Text style={styles.countStyle}>
                {this.state.unit_name + "/" + this.state.amount + " ₸"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row"
                // alignItems: "center",
                // justifyContent: "center"
              }}>
              <Button
                danger
                style={styles.buttonsStyle}
                onPress={() => this.minus_count()}>
                <Text style={styles.buttonText}>-</Text>
              </Button>

              <Text style={styles.countStyle}>{this.state.count}</Text>

              <Button
                success
                style={styles.buttonsStyle}
                onPress={() => this.plus_count()}>
                <Text style={styles.buttonText}>+</Text>
              </Button>
              <MCIcon
                name="cart"
                size={32}
                style={styles.cartIconStyle}
                onPress={() => this.add_to_cart()}
              />
            </View>
          </Right>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: "row",
            //backgroundColor: "red",
            width: "100%"
          }}>
          <Left />
          <Right style={{ flexDirection: "column" }}>
            <View style={{ marginRight: 40 }}>
              <Text style={styles.countStyle}>
                {this.state.unit_name + "/" + this.state.amount + " ₸"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row"
                // alignItems: "center",
                // justifyContent: "center"
              }}>
              <Button
                danger
                style={styles.buttonsStyle}
                onPress={() => this.minus_count()}>
                <Text style={styles.buttonText}>-</Text>
              </Button>

              <Text style={styles.countStyle}>{this.state.count}</Text>

              <Button
                success
                style={styles.buttonsStyle}
                onPress={() => this.plus_count()}>
                <Text style={styles.buttonText}>+</Text>
              </Button>
              <MCIcon
                name="cart"
                size={32}
                style={styles.cartIconStyle}
                onPress={() => this.add_to_cart()}
              />
            </View>
          </Right>
        </View>
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
  cartIconStyle: {
    color: "#ff9900",
    marginLeft: 10
  },
  favoriteIconStyle: {
    color: "#993399"
  },
  buttonsStyle: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
    //paddingHorizontal: 2,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14
  },
  countStyle: {
    padding: 5,
    fontSize: 14,
    fontWeight: "bold"
  }
});
