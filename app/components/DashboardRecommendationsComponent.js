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
import API_URL from "./../modules/Settings";
import StarRating from "react-native-star-rating";
import { NO_IMAGE_URL } from "./../modules/VarContainer";
import { RecommendationProductComponent } from "./RecommendationProductComponent";
import {
  ProductStockIcon,
  ProductDiscountIcon,
  ProductAmountText,
  ProductAmountDiscountText,
  ProductDiscountText
} from "./ProductListCardElements";

export class DashboardRecommendationsComponent extends React.Component {
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
  }
  render() {
    if (this.props.show_recommendations) {
      if (
        this.props.images_data != null &&
        this.props.images_data != undefined
      ) {
        return (
          <Container style={styles.container}>
            <Text>Рекомендованные товары</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.scrollBarStyle}>
              {this.state.items.map((item, key) => {
                return (
                  <RecommendationProductComponent
                    navigation={this.props.navigation}
                    id={item.id}
                    image_path={item.default_image_data.thumb_file_path}
                    name={item.name}
                    currency_display_value={
                      item.product_currency_data.display_value
                    }
                    amount={item.amount}
                    discount_amount={item.discount_amount}
                    rate={item.rate}
                    comments_count={item.rate}
                  />
                );
              })}
            </ScrollView>
          </Container>
        );
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
    height: "100%"
  },
  scrollBarStyle: {
    height: "100%"
  }
});
