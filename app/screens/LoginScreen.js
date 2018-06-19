import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput} from 'react-native';


import Logo from '../components/LogoComponent';
import LoginForm from '../components/LoginFormComponent';



export default class LoginScreen extends React.Component {

    signup(){
      this.props.navigation.navigate('Registration')
    }

    static navigationOptions = {
        headerMode: 'none',
        header: null
      };
      render() {
        return(
          <View style={styles.container}>
            <Logo/>
            <LoginForm type="ВХОД" navigation={this.props.navigation}/>
            {/* <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
             <Text style={styles.buttonText} >ВХОД</Text>           
           </TouchableOpacity>  */}
            <View style={styles.signupTextCont}>
              <Text style={styles.signupText}>Не зарегистрированы?</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Registration')}><Text style={styles.signupButton}> Регистрация</Text></TouchableOpacity>
            </View>
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
  },
  // button: {
  //   width:300,
  //   backgroundColor:'#1c313a',
  //    borderRadius: 5,
  //     marginVertical: 10,
  //     paddingVertical: 13
  // },buttonText: {
  //   fontSize:16,
  //   fontWeight:'500',
  //   color:'#ffffff',
  //   textAlign:'center'
  // },
});

