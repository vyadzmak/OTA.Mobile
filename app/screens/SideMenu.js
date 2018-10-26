import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./SideMenu.style";
import { NavigationActions } from "react-navigation";
import {
  ScrollView,
  Text,
  View,
  AsyncStorage,
  Alert,
  Share
} from "react-native";
import {
  Container,
  Content,
  Icon,
  Header,
  Body,
  Left,
  Footer,
  Item,
  Separator,
  CardItem,
  List,
  Button,
  ListItem,
  Right
} from "native-base";

import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

import DrawerLogo from "../components/DrawerLogoComponent";
import { DropVars } from "../modules/VarContainer";

const iconSize = 24;
class SideMenu extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  constructor(props) {
    super(props);
    this.state = {
      result: ""
    };
  }

  redirect() {
    DropVars();
    AsyncStorage.clear();
    AsyncStorage.setItem("userToken", "Auth").then(
      this.navigateToScreen("AuthLoading")
    );
  }

  logout() {
    Alert.alert(
      "Выход",
      "Вы действительно хотите выйти?",
      [
        {
          text: "Отмена",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Да",
          onPress: () => {
            this.redirect();
          }
        }
      ],
      { cancelable: false }
    );

    //this.props.navigation.navigate('AuthLoading')
    //this.navigateToScreen('AuthLoading')
  }

  showResult(result) {
    this.setState({ result });
    // alert("show result");
  }

  share() {
    try {
      _message =
        "Online Trade Assistant заходи и скачивай на Play Market " + "\n";
      _message += "https://play.google.com/store/apps/details?id=com.otamobile";
      //_url = "";

      Share.share({ message: _message }).then(this.showResult());
    } catch (e) {}
  }
  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.logoStyle}>
          <DrawerLogo />
        </Header>
        <ScrollView>
          <Item
            style={styles.navItemElementStyle}
            onPress={this.navigateToScreen("Dashboard")}>
            <MaterialIcon
              name="home"
              size={iconSize}
              style={styles.drawerIcons}
            />
            <Text style={styles.navItemStyle}>Главная</Text>
          </Item>

          <Item
            style={styles.navItemElementStyle}
            onPress={this.navigateToScreen("OrdersHistory")}>
            <MaterialIcon
              name="history"
              size={iconSize}
              style={styles.drawerIcons}
            />
            <Text style={styles.navItemStyle}>История заказов</Text>
          </Item>

          <Item
            style={styles.navItemElementStyle}
            onPress={this.navigateToScreen("UserAgreement")}>
            <MaterialIcon
              name="check"
              size={iconSize}
              style={styles.drawerIcons}
            />
            <Text style={styles.navItemStyle}>Соглашение</Text>
          </Item>

          <Item
            style={styles.navItemElementStyle}
            onPress={this.navigateToScreen("Account")}>
            <MaterialIcon
              name="face"
              size={iconSize}
              style={styles.drawerIcons}
            />
            <Text style={styles.navItemStyle}>Профиль</Text>
          </Item>

          <Item
            style={styles.navItemElementStyle}
            onPress={this.navigateToScreen("BrandsCatalog")}>
            <MaterialIcon
              name="label"
              size={iconSize}
              style={styles.drawerIcons}
            />
            <Text style={styles.navItemStyle}>Бренды</Text>
          </Item>

          <Item
            style={styles.navItemElementStyle}
            onPress={this.navigateToScreen("PartnersCatalog")}>
            <MaterialIcon
              name="loyalty"
              size={iconSize}
              style={styles.drawerIcons}
            />
            <Text style={styles.navItemStyle}>Партнеры</Text>
          </Item>

          <Item
            style={styles.navItemElementStyle}
            onPress={this.navigateToScreen("RecommendationsCatalog")}>
            <MaterialIcon
              name="redeem"
              size={iconSize}
              style={styles.drawerIcons}
            />
            <Text style={styles.navItemStyle}>Рекомендации</Text>
          </Item>

          <Item
            style={styles.navItemElementStyle}
            onPress={this.navigateToScreen("Cart")}>
            <MaterialIcon
              name="shopping-cart"
              size={iconSize}
              style={styles.drawerIcons}
            />
            <Text style={styles.navItemStyle}>Корзина</Text>
          </Item>

          <Item
            style={styles.navItemElementStyle}
            onPress={this.navigateToScreen("Favorites")}>
            <MaterialIcon
              name="favorite"
              size={iconSize}
              style={styles.drawerIcons}
            />
            <Text style={styles.navItemStyle}>Избранное</Text>
          </Item>

          <Item
            style={styles.navItemElementStyle}
            onPress={this.navigateToScreen("Contacts")}>
            <MaterialIcon
              name="phone"
              size={iconSize}
              style={styles.drawerIcons}
            />
            <Text style={styles.navItemStyle}>Контакты</Text>
          </Item>
          <Item style={styles.navItemElementStyle} onPress={() => this.share()}>
            <MaterialIcon
              name="share"
              size={iconSize}
              style={styles.drawerIcons}
            />
            <Text style={styles.navItemStyle}>Поделиться</Text>
          </Item>

          <Item
            style={styles.navItemElementStyle}
            onPress={() => this.logout()}>
            <MCIcon
              name="exit-to-app"
              size={iconSize}
              style={styles.drawerIcons}
            />
            <Text style={styles.navItemStyle}>Выход</Text>
          </Item>
        </ScrollView>

        {/* <Item style={styles.footerContainer} onPress={()=>this.logout()}>
        <MCIcon name="exit-to-app" size={iconSize} style={styles.drawerIcons}></MCIcon>
            <Text style={styles.navItemStyle} >
                Выход
              </Text>
        </Item> */}
        {/* <View style={styles.footerContainer}>
        <MCIcon name="exit-to-app" size={iconSize} style={styles.exitIcons}></MCIcon>
          <Text onPress={()=>this.logout()}>Выход </Text>
        </View> */}
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
