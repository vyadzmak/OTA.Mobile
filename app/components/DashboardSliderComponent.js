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
import Swiper from "react-native-swiper";

import { NO_IMAGE_URL } from "./../modules/VarContainer";
export default class DashboardSliderComponent extends React.Component {
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
    if (this.props.show_slider) {
      if (
        this.props.images_data != null &&
        this.props.images_data != undefined
      ) {
        return (
          // <View style={styles.container}>
          <Swiper
            showsButtons={true}
            showsPagination={true}
            autoplay={true}
            autoplayTimeout={4}
            loop={true}
            bounces={true}
            height={150}
            style={styles.swiperStyle}>
            {this.state.items.map((item, key) => {
              return (
                <View key={key} style={styles.slide}>
                  <Image
                    resizeMode="stretch"
                    source={{ uri: API_URL + item.file_path }}
                    style={styles.slideImage}
                  />
                </View>
              );
            })}
          </Swiper>
          // </View>
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
    marginTop: 10,
    height: "100%",
    width: "100%"
  },
  swiperStyle: {
    backgroundColor: "#ffffff",
    padding: 0
  },
  slide: {
    //flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    height: "100%",
    width: "100%"
  },
  slideImage: {
    width: "100%",
    height: "100%"
  }
});
