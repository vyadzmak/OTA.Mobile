import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
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
  Right
} from "native-base";
import API_URL from "./../modules/Settings";
import Gallery from "react-native-image-gallery";
export default class FilterProductsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      isLoading: true
    };
  }

  static navigationOptions = {
    headerMode: "none",
    header: null
  };

  componentDidMount() {
    const { navigation } = this.props;
    const images = navigation.getParam("images", []);
    p_images = [];

    if (images != undefined) {
      for (i = 0; i < images.length; i++) {
        uri = API_URL + images[i].optimized_size_file_path;

        p_img = {};
        p_img.source = {};
        p_img.source.uri = {};
        p_img.source.uri = uri;
        //alert(JSON.stringify(p_img));
        p_images.push(p_img);
      }
    }

    //alert(JSON.stringify(p_images));
    //this.state.images = p_images;
    this.setState({
      images: p_images,
      isLoading: false
    });
    // this.setState({
    //   images: this.props.images
    // });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <Gallery
        style={{ flex: 1, backgroundColor: "white" }}
        images={this.state.images}
      />
    );
  }
}
