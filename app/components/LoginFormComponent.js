import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity 
} from 'react-native';

export default class LoginForm extends React.Component {
    login(){
        alert("Login!"+this.login+" "+this.password)
    }

	render(){
		return(
			<View style={styles.container}>
             <Text style={styles.signupText}>Номер телефона</Text>
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="7123456789"
              placeholderTextColor = "rgba(255,255,255,0.7)"
              selectionColor="#fff"
              keyboardType="numeric"
              onSubmitEditing={()=> this.password.focus()}
              />

               <Text style={styles.signupText}>Пароль</Text>
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="******"
              secureTextEntry={true}
              placeholderTextColor = "rgba(255,255,255,0.7)"
              ref={(input) => this.password = input}
              />  
           <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.push('Home')}>
             <Text style={styles.buttonText} >{this.props.type}</Text>
           
           </TouchableOpacity> 
  		</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },

  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 5,
    paddingHorizontal:8,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10,
    textAlign: 'center'
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 5,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  signupText: {
    paddingHorizontal:8,
    color:'rgba(255,255,255,1)',
    fontSize:16
}
  
});