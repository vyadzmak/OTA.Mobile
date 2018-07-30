import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity
} from "react-native";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Item
} from "native-base";
import API_URL from "./../modules/Settings";
import StarRating from "react-native-star-rating";

import { ImageComponent, ThumbComponent } from "./ImagesComponents";

import {
  ProductStockIcon,
  ProductDiscountIcon,
  ProductAmountText,
  ProductAmountDiscountText,
  ProductDiscountText
} from "./ProductListCardElements";

export class RecommendationProductComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_path: "",
      name: "",
      currency_display_value: "",
      amount: 0,
      discount_amount: 0,
      rate: 0,
      comments_count: 0
    };
  }

  componentDidMount() {
    //alert(JSON.stringify(this.props));
    //if (this.props.images_data != null)
    this.setState({
      id: this.props.id,
      image_path: this.props.image_path,
      name: this.props.name,
      currency_display_value: this.props.currency_display_value,
      amount: this.props.amount,
      discount_amount: this.props.discount_amount,
      rate: this.props.rate,
      comments_count: this.props.comments_count
    });
  }

  clickItem(id, name) {
    try {
      //alert(name);
      this.props.navigation.push("ProductCard", {
        product_id: id,
        product_name: name,
        navigation: this.props.navigation
      });

      console.log(name);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => this.clickItem(this.state.id, this.state.name)}>
          <View style={styles.imageItemStyle}>
            <ImageComponent
              image_url={this.state.image_path}
              style={styles.imageStyle}
            />
          </View>

          <View style={styles.nameItemStyle}>
            <Text
              style={styles.productNameStyle}
              numberOfLines={3}
              ellipsizeMode="tail">
              {this.state.name}
            </Text>
          </View>

          <View style={styles.amountItemStyle}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center"
              }}>
              <ProductAmountText
                amount={this.state.amount}
                currency_display_value={this.state.currency_display_value}
                discount_amount={this.state.discount_amount}
                style={styles.productAmountStyle}
              />
              <ProductAmountDiscountText
                currency_display_value={this.state.currency_display_value}
                discount_amount={this.state.discount_amount}
                style={styles.productDiscountTextStyle}
              />
            </View>
          </View>

          <View style={styles.rateItemStyle}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center"
              }}>
              <StarRating
                disabled={false}
                emptyStar={"ios-star-outline"}
                fullStar={"ios-star"}
                halfStar={"ios-star-half"}
                iconSet={"Ionicons"}
                maxStars={5}
                rating={this.state.rate}
                fullStarColor={"orange"}
                starSize={15}
              />
              <Text style={styles.rateTextStyle}>
                {" "}
                ({this.state.comments_count})
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 170,
    height: "100%",
    padding: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    // shadowColor: "#000000",

    // shadowOffset: {
    //   width: 5,

    //   height: 5
    // },

    // shadowRadius: 5,

    // shadowOpacity: 1,
    // shadowRadius: 20,
    // shadowColor: "red",
    marginHorizontal: 1,
    borderWidth: 1,
    borderColor: "#C0C0C0"
  },
  touchableOpacity: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%"
  },
  productNameStyle: {
    fontSize: 14,
    justifyContent: "center",
    alignContent: "center"
  },
  productAmountStyle: {
    fontSize: 12
  },
  productDiscountTextStyle: {
    fontSize: 12
  },
  rateTextStyle: {
    color: "orange",
    fontSize: 12
  },
  imageStyle: {
    width: "100%",
    height: "100%"
  },
  imageItemStyle: {
    height: "55%",
    width: "100%",

    justifyContent: "flex-start",
    alignContent: "center",
    borderWidth: 0,
    borderColor: "transparent"
  },
  nameItemStyle: {
    height: "25%",
    padding: 5,
    //justifyContent: "center",
    //alignContent: "center",
    alignItems: "center",
    borderWidth: 0,
    borderColor: "transparent"
  },
  amountItemStyle: {
    height: "12%",
    padding: 0,
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 0,
    borderColor: "transparent"
  },
  rateItemStyle: {
    height: "7%",
    padding: 0,
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 0,
    borderColor: "transparent"
  }
});
