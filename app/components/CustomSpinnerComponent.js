import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,

} from 'react-native';

export default class CustomSpinner extends React.Component {
  constructor(props) {
    super(props);
  }

 
  // Render any loading content that you like here
  render() {
    if (this.props.isLoading==true)
{
    return (

        
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  } else return(null)
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
  