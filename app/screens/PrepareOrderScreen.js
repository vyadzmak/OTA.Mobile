import React from "react";
import {
  View,  Text,    StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";

import { Container, Content, Icon, Header,Button, Body } from 'native-base'
import {DrawerNavigator} from 'react-navigation'

export default class PrepareOrderScreen extends React.Component {
  static navigationOptions = {
    title: "Оформление заказа"
  };
  prepare_order(){
    try{
      this.props.navigation.popToTop()
  }catch(err){alert(err)}}

  render() {
    return (
      <View style={styles.container}>
        <Text>Аккаунт</Text>
        <Button block success onPress={()=>this.prepare_order()}>
            <Text>ОТПРАВИТЬ</Text>
          </Button>
        
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
