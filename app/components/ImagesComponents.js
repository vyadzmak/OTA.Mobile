import React from "react";
import { StyleSheet, AsyncStorage, Image } from "react-native";
import {
  View,
  Text,
  Container,
  Content,
  Icon,
  Header,
  Body,
  Left,
  Item,
  Input
} from "native-base";
import API_URL from "./../modules/Settings";
import { Thumbnail } from "native-base";
import { NO_IMAGE_URL } from "./../modules/VarContainer";
export class ThumbComponent extends React.Component {
  render() {
    if (this.props.image_url != null && this.props.image_url != undefined) {
      return (
        <Thumbnail
          source={{ uri: API_URL + this.props.image_url }}
          style={styles.thumbImage}
          resizeMode="contain"
        />
      );
    } else {
      return (
        <Thumbnail
          source={{ uri: API_URL + NO_IMAGE_URL }}
          style={styles.thumbImage}
          resizeMode="contain"
        />
      );
    }
  }
}
export class AvatarComponent extends React.Component {
  render() {
    if (this.props.image_url != null && this.props.image_url != undefined) {
      return (
        <Thumbnail
          source={{ uri: API_URL + this.props.image_url }}
          style={styles.avatarImage}
          resizeMode="contain"
        />
      );
    } else {
      return (
        <Thumbnail
          source={{ uri: API_URL + NO_IMAGE_URL }}
          style={styles.avatarImage}
          resizeMode="contain"
        />
      );
    }
  }
}
export class ImageComponent extends React.Component {
  render() {
    //
    if (this.props.image_url != null) {
      return (
        <Image
          resizeMode="contain"
          source={{ uri: API_URL + this.props.image_url }}
          style={styles.imgStyle}
        />
      );
    } else {
      return (
        <Image
          source={{ uri: API_URL + NO_IMAGE_URL }}
          resizeMode="contain"
          style={styles.imgStyle}
        />
      );
    }
  }
}

export class CatImageComponent extends React.Component {
  render() {
    //
    if (this.props.image_url != null) {
      return (
        <Image
          resizeMode="stretch"
          source={{ uri: API_URL + this.props.image_url }}
          style={styles.catImgStyle}
        />
      );
    } else {
      return (
        <Image
          source={{ uri: API_URL + NO_IMAGE_URL }}
          resizeMode="stretch"
          style={styles.catImgStyle}
        />
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logoText: {
    marginVertical: 5,
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)"
  },

  clientText: {
    paddingBottom: 10,
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)"
  },
  testStyle: {
    //flex:1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "90%"
    //borderWidth: 3,
    //borderColor: "red",
  },
  imgStyle: {
    position: "absolute",
    top: 5,
    left: 5,
    bottom: 5,
    right: 5
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  catImgStyle: {
    position: "absolute",
    width: "100%",
    height: "100%"
    // top: 5,
    // left: 5,
    // bottom: 5,
    // right: 5
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  thumbImage: {
    height: 160,
    width: 160,

    paddingHorizontal: 20
  },
  avatarImage: {
    height: 64,
    width: 64,
    padding: 20
    //paddingHorizontal: 20
  }
});
