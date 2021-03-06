import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {InitVars} from './../modules/VarContainer'
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync =() => {
    //alert('TT')
    AsyncStorage.getItem('userToken').then(
    value => {
      //alert('T'+      value)
      if (value==null){
        value='Auth'
      }

      if (value=='App'){
        InitVars()
      }

      this.props.navigation.navigate(value);
      
    }
    );
    
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
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
  