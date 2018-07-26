import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";

import {
  Container,
  Content,
  Icon,
  Header,
  Body,
  List,
  ListItem,
  Left,
  Right,
  Thumbnail
} from "native-base";
import { DrawerNavigator } from "react-navigation";
import { getWithParams, getWithSlashParams } from "./../modules/Http";
import API_URL from "./../modules/Settings";
import {
  ImageComponent,
  ThumbComponent
} from "./../components/ImagesComponents";
export default class BarandsCatalogScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      brandssCatalog: [],
      route: "/brandsCatalog"
    };
  }

  static navigationOptions = {
    title: "Бренды"
  };

  componentDidMount() {
    response = getWithSlashParams(this.state.route).then(response => {
      if (response != null) {
        console.log(JSON.stringify(response));
        this.setState({
          isLoading: false,
          brandsCatalog: response
        });
      } else {
        alert("Connection error");
        this.setState({
          isLoading: false
        });
      }
    });
  }

  clickItem(id) {
    try {
      this.props.navigation.push("FilterProducts", {
        filter_parameter: 1,
        filter_value: id
      });
    } catch (err) {
      console.log(err);
    }
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
      <List
        dataArray={this.state.brandsCatalog}
        renderRow={
          item => (
            // <TouchableOpacity  >
            <ListItem button onPress={() => this.clickItem(item.id)}>
              <ThumbComponent
                image_url={item.default_image_data_brands.thumb_file_path}
              />
              <Body style={{ marginLeft: 15 }}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text>Количество товаров: {item.products_count}</Text>
              </Body>
            </ListItem>
          )
          // </ TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  nameText: {
    color: "#000",
    fontSize: 16
    // marginLeft: 30,
    // marginTop: 10,
  },
  icons: {
    // padding:10,
    paddingHorizontal: 50,
    width: 96,
    height: 96
  }
});
