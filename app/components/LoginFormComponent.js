import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity 
} from 'react-native';
import {getWithParams,getWithSlashParams} from './../modules/Http'
export default class LoginForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading:false,
      login_data :{
        //...this.state.user_data,
        login :'375298653856',
        password:'12345',
      },
      authData:{}, 
      route:'/mobileUserAuth'
    }
    
  }  
  
  
  login(){
      try{

        params =[{"name":"login","value":this.state.state.login},{"name":"password","value":this.state.product_id}]
        
              response =getWithParams(this.state.route,params).then(
                response=> {
                  console.log(JSON.stringify(response))
                  this.setState({
                    isLoading:false,
                    productDetails:response
                  })
                }
              )

      } catch(err){

      }

        //alert("Login!"+this.state.login_data.login+" "+this.state.login_data.password)
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
              value ={this.state.login_data.login}
              onSubmitEditing={()=> this.password.focus()}
              />

               <Text style={styles.signupText}>Пароль</Text>
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="******"
              secureTextEntry={true}
              value ={this.state.login_data.password}
              placeholderTextColor = "rgba(255,255,255,0.7)"
              ref={(input) => this.password = input}
              />  
              {/* this.props.navigation.navigate('Home') */}
           <TouchableOpacity style={styles.button} onPress={() => this.login()}>
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