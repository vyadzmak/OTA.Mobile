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

export class BrandComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      image_path: "",
      name: ""
    };
  }

  componentDidMount() {
    //if (this.props.images_data != null)
    this.setState({
      id: this.props.id,
      image_path: this.props.image_path,
      name: this.props.name
    });
  }

  clickItem(id) {
    try {
      this.props.navigation.push("FilterProducts", {
        filter_parameter: 1,
        filter_value: id
      });

      //console.log(name);
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
    alignContent: "center"
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
    height: "80%",
    width: "100%",

    justifyContent: "flex-start",
    alignContent: "center",
    borderWidth: 0,
    borderColor: "transparent"
  },
  nameItemStyle: {
    height: "20%",
    padding: 5,
    //justifyContent: "center",
    alignContent: "center",
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
