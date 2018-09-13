import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Image } from "react-native";

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
  Switch
} from "native-base";
import { BrandComponent } from "./BrandComponent";
import API_URL from "./../modules/Settings";
import StarRating from "react-native-star-rating";
import { NO_IMAGE_URL } from "./../modules/VarContainer";
import {
  ProductStockIcon,
  ProductDiscountIcon,
  ProductAmountText,
  ProductAmountDiscountText,
  ProductDiscountText
} from "./ProductListCardElements";

export class DashboardBrandsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    if (this.props.images_data != null)
      this.setState({
        items: this.props.images_data
      });

    //alert(JSON.stringify(this.props.images_data))
  }
  render() {
    if (this.props.show_brands) {
      if (
        this.props.images_data != null &&
        this.props.images_data != undefined
      ) {
        if (this.props.images_data.length > 0) {
          return (
            <Container style={styles.container}>
              <Text>Бренды</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews={true}
                style={styles.scrollBarStyle}>
                {this.state.items.map((item, key) => {
                  return (
                    <BrandComponent
                      navigation={this.props.navigation}
                      id={item.id}
                      image_path={
                        item.default_image_data_brands.thumb_file_path
                      }
                      name={item.name}
                    />
                  );
                })}
              </ScrollView>
            </Container>
          );
        } else return null;
      } else {
        return null;
      }
    } else {
      return <View />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    //marginVertical:50,
    height: "100%"
  },
  scrollBarStyle: {
    height: "100%"
  }
});
