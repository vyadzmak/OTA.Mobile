import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image, Button
} from "react-native";

//library imports 
import { Container, Content, Icon, Header, Body, Left } from 'native-base'
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
//custom files 
//import AppStackNavigator from './AppStackNavigator'
import DashboardScreen from './../screens/DashboardScreen'
import AccountScreen from './../screens/AccountScreen'
import UserAgreementScreen from "./../screens/UserAgreementScreen";


export default class DrawerMenu extends Component {
  // navigationOptions: ({ navigation }) => ({
  //   headerLeft: <DrawerButton navigation={navigation} />,
  // }),

  // static navigationOptions = {
  //     title: "Главная",
  //     headerRight: <Button title="Menu" onPress={(navigation)=>{ navigation.navigate('DrawerOpen'); }} />
  //   };

  static navigationOptions = ({ navigation }) => ({
    title: "My Profile!",
    headerLeft: <Button title="Menu" onPress={(navigation)=>{ props.navigation.navigate('DrawerOpen')}} />,
    });
  // navigationOptions: ({ navigation }) => ({
  //   headerLeft: <DrawerButton navigate={navigation.navigate} />,
  // })
  render() {
    return (
      
      <DrawerComponent />
    )
  }
}

const CustomDrawerContentComponent = (props) => (

  
  <Container>
    <Header style={styles.drawerHeader}>
    
      <Body>
      
        <Image
          style={styles.drawerImage}
          source={require('./../../images/logo.png')} />
      </Body>
    </Header>



    <Content>
      <DrawerItems {...props} />
    </Content>

  </Container>

);
// const DrawerButton = (props) => {
// 	return (
//     <View>
//       <TouchableOpacity onPress={() => {props.navigation.navigate('DrawerOpen')}}>
//         <MaterialIcon name="menu" style={{color:'#00ffff',fontSize:32}}/>
//         <Text>TES</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };


const DrawerComponent = DrawerNavigator({

  // For each screen that you can navigate to, create a new entry like this:
  Dashboard: {
    screen: DashboardScreen,
    
  },
  Account: {
    screen: AccountScreen
  },
  UserAgreement: {
    screen: UserAgreementScreen
  }
},
  {
    initialRouteName: 'Dashboard',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  });


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerHeader: {
    height: 200,
    backgroundColor: 'white'
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  }

})