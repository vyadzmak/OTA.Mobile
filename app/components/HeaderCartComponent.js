import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IconBadge from "react-native-icon-badge";

import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";

import { Container, Content, Icon, Header, Body } from "native-base";
import { DrawerNavigator } from "react-navigation";
import {
  CART_PRODUCTS_COUNT,
  CART_PRODUCTS_AMOUNT,
  InitProductsAmount
} from "./../modules/VarContainer";
export default class HeaderCartComponent extends React.Component {
  constructor(props) {
    super(props);
    InitProductsAmount();
    this.state = {
      BadgeCount: CART_PRODUCTS_AMOUNT
    };
    //alert("AMOUNT=" + CART_PRODUCTS_AMOUNT);
    //navigation.setParam({ title:'Allog' })
  }

  componentDidMount() {
    InitProductsAmount();
    this.setState({
      BadgeCount: CART_PRODUCTS_AMOUNT
    });
  }

  clickOnBadge() {
    alert("Click on badge");
  }
  render() {
    let that = this;
    setTimeout(function() {
      that.setState({ BadgeCount: CART_PRODUCTS_AMOUNT });
    }, 1000);
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}>
        <IconBadge
          MainElement={
            <MCIcon
              name="cart"
              style={{ color: "#ffffff", fontSize: 32, marginRight: 10 }}
              onPress={() => this.props.navigation.navigate("Cart")}
            />
          }
          BadgeElement={
            <Text
              style={{ color: "#FFFFFF", fontSize: 10 }}
              onPress={() => this.props.navigation.navigate("Cart")}>
              {this.state.BadgeCount + "₸"}
            </Text>
          }
          IconBadgeStyle={{
            width: 40,
            height: 30,
            backgroundColor: "orange",
            top: 10,
            bottom: 1,
            fontSize: 10
          }}
          Hidden={this.state.BadgeCount == 0}
          onPress={() => this.props.navigation.navigate("Cart")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
