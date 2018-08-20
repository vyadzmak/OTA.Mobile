import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Alert
} from "react-native";
import TextInputMask from "react-native-text-input-mask";
import { NavigationActions } from "react-navigation";
import { getWithParams, getWithSlashParams } from "./../modules/Http";
import { _storeData, _retrieveData } from "./../modules/AsyncStorageModule";
import CustomSpinner from "./CustomSpinnerComponent";
export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      login_data: {
        //...this.state.user_data,
        login: "",
        password: ""
      },
      authData: {},
      route: "/mobileUserAuth"
    };
  }
  _storeData = async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
      //alert("OK")
    } catch (error) {
      // Error saving data
    }
  };

  login() {
    if (
      this.state.login_data.login == "" ||
      this.state.login_data.password == ""
    ) {
      Alert.alert(
        "Ошибка авторизации",
        " Авторизация невозможна. Заполните поля Логин и Пароль"
      );

      return;
    }

    if (
      this.state.login_data.login.length < 5 ||
      this.state.login_data.password.length < 5
    ) {
      Alert.alert(
        "Ошибка авторизации",
        " Авторизация невозможна. Заполните поля Логин и Пароль"
      );

      return;
    }

    try {
      this.setState({
        isLoading: true
      });
      params = [
        { name: "login", value: this.state.login_data.login },
        { name: "password", value: this.state.login_data.password }
      ];

      response = getWithParams(this.state.route, params).then(response => {
        //alert(JSON.stringify(response))

        if (response.message != undefined) {
          Alert.alert("Ошибка авторизации", response.message);
          this.setState({
            isLoading: false
          });
          return;
        }

        this.setState({
          isLoading: false,
          authData: response
        });

        _storeData("user_data", JSON.stringify(response)).then(() => {
          AsyncStorage.setItem("userToken", "App");
          this.props.navigation.navigate("App");
        });
      });
    } catch (err) {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.signupText}>Номер телефона</Text>
        {/* <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Логин"
          placeholderTextColor="rgba(255,255,255,0.7)"
          selectionColor="#fff"
          keyboardType="numeric"
          value={this.state.login_data.login}
          onChangeText={text =>
            this.setState({
              login_data: { ...this.state.login_data, login: text }
            })
          }
          onSubmitEditing={() => this.password.focus()}
        /> */}

        <TextInputMask
          refInput={ref => {
            this.input = ref;
          }}
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="+7 (123) 456 78 90"
          placeholderTextColor="rgba(255,255,255,0.7)"
          selectionColor="#fff"
          keyboardType="numeric"
          onChangeText={(formatted, extracted) => {
            this.setState({
              login_data: { ...this.state.login_data, login: extracted }
            });
            // console.log(formatted); // +1 (123) 456-78-90
            // console.log(extracted); // 1234567890
          }}
          value={this.state.login_data.login}
          maxLength={25}
          onSubmitEditing={() => this.password.focus()}
          mask={"+[0] ([000]) [000] [00] [00]"}
        />

        <Text style={styles.signupText}>Пароль</Text>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Пароль"
          secureTextEntry={true}
          onChangeText={text =>
            this.setState({
              login_data: { ...this.state.login_data, password: text }
            })
          }
          value={this.state.login_data.password}
          placeholderTextColor="rgba(255,255,255,0.7)"
          ref={input => (this.password = input)}
        />
        {/* this.props.navigation.navigate('Home') */}
        <TouchableOpacity style={styles.button} onPress={() => this.login()}>
          <Text style={styles.buttonText}>{this.props.type}</Text>
        </TouchableOpacity>
        <CustomSpinner isLoading={this.state.isLoading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  inputBox: {
    width: 300,
    backgroundColor: "rgba(255, 255,255,0.2)",
    borderRadius: 5,
    paddingHorizontal: 8,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 10,
    textAlign: "center"
  },
  button: {
    width: 300,
    backgroundColor: "#1c313a",
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center"
  },
  signupText: {
    paddingHorizontal: 8,
    color: "rgba(255,255,255,1)",
    fontSize: 16
  }
});
