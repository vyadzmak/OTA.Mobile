import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput} from 'react-native';



import RegistrationForm from '../components/RegistrationFormComponent';



export default class RegistrationScreen extends React.Component {

    signup(){
      alert("SignUp")
    }

    static navigationOptions = {
        title: "Регистрация"
      };
      render() {
        return(
          <View style={styles.container}>
            
            <RegistrationForm type="ДАЛЕЕ"/>
            {/* <View style={styles.signupTextCont}>
              <Text style={styles.signupText}>Не зарегистрированы?</Text>
              <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}> Регистрация</Text></TouchableOpacity>
            </View> */}
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

