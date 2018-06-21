import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {postRequest} from './../modules/Http'

export default class RegistrationForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading:false,
      user_data :{
        //...this.state.user_data,
        client_name :'Нетвикс',
        user_name:'Хведькович Александр',
        phone_number :'375298653856',
        password :'12345',
        confirm_password :'12345',
      }
    }
    
  }
    user_registration=()=>{
      
      //alert(JSON.stringify(this.state.user_data))
      if (this.state.user_data.phone_number=='' || this.state.user_data.user_name=='' || this.state.client_name=='' || this.state.password==''|| this.state.confirm_password==''){
        Alert.alert('Ошибка регистрации', 'Все поля должны быть заполнены!')
        return
      }

      if (this.state.user_data.phone_number.length<8)
      {
        Alert.alert('Ошибка регистрации', 'Номер телефона слишком короткий! Введите номер телефона с кодом!')
        return
      }

      if (this.state.user_data.user_name.length<3)
        {
          Alert.alert('Ошибка регистрации', 'Имя пользователя слишком короткое!')
          return
        }

      if (this.state.user_data.client_name.length<3)
          {
            Alert.alert('Ошибка регистрации', 'Имя имя организацц слишком короткое!')
            return
          }
  
      if (this.state.user_data.password.length<5)
            {
              Alert.alert('Ошибка регистрации', 'Пароль должен быть не менее 5 символов!')
              return
            }
      
      if (this.state.user_data.password!=this.state.user_data.confirm_password)
              {
                Alert.alert('Ошибка регистрации', 'Пароль не совпадает с подтверждением!')
                return
              }

              this.setState({isLoading:true})
              response =postRequest('/quickUserRegistration', this.state.user_data).then(
                response=> {
                  //txt = JSON.stringify(response)
                  Alert.alert(JSON.stringify(response))
                  this.setState({isLoading:false})
                  //this.setState({user_data:{...this.state.user_data,user_name : txt}})
                }
              )
              
    }

	render(){

    if(this.state.isLoading){
      return(
        <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#ffffff" />
        
      </View>
      )
    }

		return(

      
  

      <KeyboardAwareScrollView>
        <View>
            <Text style={styles.signupText}>Номер телефона</Text>
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="7123456789"
              placeholderTextColor = "rgba(255,255,255,0.7)"
              selectionColor="#fff"
              keyboardType="numeric"
              onChangeText = {(text) => this.setState({user_data:{...this.state.user_data,phone_number : text}})}
              value ={this.state.user_data.phone_number}
              maxLength = {16}
              onSubmitEditing={()=> this.state.user_name_input.focus()}
              />
            <Text style={styles.signupText}>Ваше имя</Text>

            <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Андрей Иванов"
              placeholderTextColor = "rgba(255,255,255,0.7)"
              selectionColor="#fff"
              keyboardType="default"
              value ={this.state.user_data.user_name}
              onChangeText = {(text) => this.setState({user_data:{...this.state.user_data,user_name : text}})}
              maxLength = {50}
              ref={(input) => this.state.user_name_input = input}
              onSubmitEditing={()=> this.state.client_name_input.focus()}
              />
            <Text style={styles.signupText}>Наименование организации</Text>

              <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="ТОО Альфа"
              placeholderTextColor = "rgba(255,255,255,0.7)"
              selectionColor="#fff"
              keyboardType="default"
              value ={this.state.user_data.client_name}
              onChangeText = {(text) => this.setState({user_data:{...this.state.user_data,client_name : text}})}
              maxLength = {64}
              ref={(input) => this.state.client_name_input = input}
              onSubmitEditing={()=> this.state.password_input.focus()}
              />

           <Text style={styles.signupText}>Пароль</Text>
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Пароль"
              secureTextEntry={true}
              placeholderTextColor = "rgba(255,255,255,0.7)"
              value ={this.state.user_data.password}
              //ref={(input) => this.state.user_data.password = input}
              onChangeText = {(text) => this.setState({user_data:{...this.state.user_data,password : text}})}
              maxLength = {16}
              ref={(input) => this.state.password_input = input}
              onSubmitEditing={()=> this.state.confirm_password_input.focus()}
              />  

           <Text style={styles.signupText}>Повторите пароль</Text>

            <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Повторите пароль"
              secureTextEntry={true}
              placeholderTextColor = "rgba(255,255,255,0.7)"
              maxLength = {16}
              value ={this.state.user_data.confirm_password}

              ref={(input) => this.state.confirm_password_input = input}
              onChangeText = {(text) => this.setState({user_data:{...this.state.user_data,confirm_password : text}})}
              
              //onSubmitEditing={()=> this.state.confirm_password_input.focus()}
              />

           <TouchableOpacity style={styles.button} onPress={this.user_registration}>
             <Text style={styles.buttonText} >{this.props.type}</Text>
           </TouchableOpacity>     
           </View>
  	
           </KeyboardAwareScrollView>
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
},horizontal: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: 10
}
  
});