import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Left, Body, Right, Button, Item } from "native-base";

export class MultiFastCartAltCounter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {},
      isLoading: true,
      //product_id: this.props.item.product_id,
      //count: this.props.item.count,
      alt_count: this.props.item.alt_count,
      unit_name: "",
      //alt_unit_name: this.props.item.alt_unit_name,
      //amount: this.props.item.amount,
      alt_amount: this.props.item.alt_amount,
      route: "/addCartPositionToCart",
      show_alt: false
    };
  }
  componentDidMount() {
    if (
      this.props.item.product_alt_unit_data.name != undefined &&
      this.props.item.product_alt_unit_data.name != null &&
      this.props.item.product_alt_unit_data.name != "null"
    ) {
      this.setState({
        unit_name: this.props.item.product_alt_unit_data.display_value,
        show_alt: true,
        isLoading: false
      });
    } else {
      this.setState({
        unit_name: "НЕТ",
        show_alt: false,
        alt_count: 0,
        isLoading: false
      });
    }
  }

  plus_count() {
    _count = this.state.alt_count;
    _count += 1;
    this.props.fn(_count);
    this.setState({
      alt_count: _count
    });
  }

  minus_count() {
    _count = this.state.alt_count;
    if (_count == 1) return;
    _count -= 1;
    this.props.fn(_count);
    this.setState({
      alt_count: _count
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    if (!this.state.show_alt) {
      return <Item style={styles.mainItemStyle} />;
    }

    return (
      <Item style={styles.mainItemStyle}>
        <View style={styles.amountUnitValueViewStyle}>
          <Text style={styles.amountUnitValueTextStyle}>
            {this.state.alt_amount + " ₸/" + this.state.unit_name}
          </Text>
        </View>
        <View style={styles.controlsViewStyle}>
          <Item style={styles.controlsItemStyle}>
            <Left style={styles.leftComponentStyle}>
              <View style={styles.leftViewStyle}>
                <Button
                  danger
                  style={styles.buttonsStyle}
                  onPress={() => this.minus_count()}>
                  <Text style={styles.buttonText}>-</Text>
                </Button>
              </View>
            </Left>

            <Body style={styles.bodyStyle}>
              <Text style={styles.countTextStyle}>{this.state.alt_count}</Text>
            </Body>

            <Right style={styles.rightComponentStyle}>
              <View style={styles.rightViewStyle}>
                <Button
                  success
                  style={styles.buttonsStyle}
                  onPress={() => this.plus_count()}>
                  <Text style={styles.buttonText}>+</Text>
                </Button>
              </View>
            </Right>
          </Item>
        </View>
      </Item>
    );
  }
}

const styles = StyleSheet.create({
  cartIconStyle: {
    color: "#ff9900",
    marginLeft: 10
  },
  favoriteIconStyle: {
    color: "#993399"
  },
  buttonsStyle: {
    width: "70%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center"
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 28
  },
  countStyle: {
    padding: 5,
    fontSize: 14,
    fontWeight: "bold"
  },
  favoriteElementStyle: {
    marginLeft: -50
  },
  mainItemStyle: {
    width: "100%",
    height: "70%",
    maxHeight: "70%",
    borderColor: "transparent",
    flexDirection: "column"
  },
  amountUnitValueViewStyle: {
    width: "100%",
    height: "30%",
    maxHeight: "30%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  amountUnitValueTextStyle: {
    fontSize: 20
  },
  controlsViewStyle: {
    width: "100%",
    height: "70%",
    maxHeight: "70%",
    backgroundColor: "transparent"
  },
  controlsItemStyle: {
    width: "100%",
    height: "100%",
    maxHeight: "100%",
    backgroundColor: "transparent",
    padding: 5
  },
  leftComponentStyle: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  leftViewStyle: {
    width: "100%",
    height: "100%",
    maxHeight: "100%",
    backgroundColor: "transparent",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  rightComponentStyle: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  rightViewStyle: {
    width: "100%",
    height: "100%",
    maxHeight: "100%",
    backgroundColor: "transparent",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  bodyStyle: {
    // maxWidth: "30%"
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  countTextStyle: {
    fontSize: 28
  }
});
