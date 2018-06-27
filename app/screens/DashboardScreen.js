//import system components
import React from "react";
import {
  View,  Text,  Button,  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Container, Content, Icon, Header, Body, Left } from 'native-base'
import {DrawerNavigator, withNavigation} from 'react-navigation'

//import custom components

import ProductsCategoryList from './../components/ProductsCategoryListComponent'
import SearchBarComponent from './../components/SearchBarComponent'
//import another
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
var self
class DashboardScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showBar:false,
      self:this
    }
    }

    componentDidMount() {
      this.props.navigation.setParams({ increaseCount: this._increaseCount });
    }

    _increaseCount = () => {
      if (this.state.showBar==false){
        this.child.showBar()
      // this.setState({
      //   showBar:true
      // })
      //this.child.showBar()
    } else{
        // this.setState({
        //   showBar:false
        // })

        this.child.hideBar()
      }
      //this.setState({ count: this.state.count + 1 });
    };

    static navigationOptions =  ({ navigation }) => {
      return {
        
        headerRight: <MaterialIcon name="search" style={{color:'#ffffff',fontSize:32}}  onPress={navigation.getParam('increaseCount')}/>
        
      };

      
  };

  render() {
    return (
      //
      <Container style ={styles.container}>
      
        <SearchBarComponent navigation={this.props.navigation}  ref={ref => (this.child = ref)} />
        {/* <Text>Категории</Text> */}
        <ProductsCategoryList navigation={this.props.navigation}/>

      
      </Container>
      
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    //alignItems: "center",
    //justifyContent: "center",
    //borderColor: "#ff0000",
    //borderWidth: 3,
  }
});

export default withNavigation(DashboardScreen)