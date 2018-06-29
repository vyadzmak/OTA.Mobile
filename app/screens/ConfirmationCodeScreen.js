import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import ConfirmationCodeForm from '../components/ConfiramtionCodeComponent';

export default class ConfirmationCodeScreen extends React.Component {
    static navigationOptions = {
        title: "Потверждение кода"
      };
      render() {
        return(
          <View style={styles.container}>
            <ConfirmationCodeForm type="ДАЛЕЕ" navigation={this.props.navigation}/>
          </View>	
          )
      }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#074c99',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  }
});

