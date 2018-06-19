import React from "react";
import {
  View,  Text,  Button,  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";

import { Container, Content, Icon, Header, Body, Left } from 'native-base'
import {DrawerNavigator} from 'react-navigation'
import FlatListGridScreen from './FlatListGridScreen'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export default class DashboardScreen extends React.Component {
  // static navigationOptions = {
  //   title: "Главная"
  // };

  render() {
    return (
      <Text>DashboardScreen</Text>
      // <Container>
      //   <Header>
      //     <Left>
      //       <MaterialIcon name="menu" onPress={()=>this.props.navigation.navigate('DrawerOpen')}></MaterialIcon>
      //     </Left>  
      //   </Header>
      //   <Content>
      //     <Text>DashboardScreen</Text>
      //   </Content>
      // </Container>
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
