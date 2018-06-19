import React from "react";
import {
  View,  Text,  Button,  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";

import { Container, Content, Icon, Header, Body } from 'native-base'
import {DrawerNavigator} from 'react-navigation'

export default class AccountScreen extends React.Component {
  static navigationOptions = {
    title: "Аккаунт"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Аккаунт</Text>
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
