import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import PasswordInputText from "react-native-hide-show-password-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getWithParams, getWithSlashParams } from "./../modules/Http";
import {
  USER_ID,
  USER_NAME,
  CLIENT_ID,
  CLIENT_NAME
} from "./../modules/StorageVars";
import {
  GetStorageValue,
  SetStorageValue
} from "../modules/AsyncStorageModule";

export default class ConfirmationCodeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      code: "",
      cc: -1,
      temp_user_id: -1,
      temp_code: "",
      route: "/userConfirmationCodeCheck"
    };
  }

  get_confirmation_code = () => {
    AsyncStorage.getItem("confirmation_code")
      .then(value => {
        this.setState({ temp_code: value });
      })
      .then(res => {
        Alert.alert(
          "Код подтверждения",
          "На указанный Вами номер была отправлена СМС с кодом."
        );
      });
  };

  get_user_id = () => {
    AsyncStorage.getItem("user_id")
      .then(value => {
        this.setState({ temp_user_id: value });
      })
      .then(res => {
        //Alert.alert('ID', 'Пользователь: '+res)
        //Alert.alert('ID', 'Пользователь: '+this.state.temp_user_id)
      });
  };

  redirect_to_login = () => {
    AsyncStorage.clear();
    this.props.navigation.navigate("Login");
  };

  componentDidMount() {
    this.get_confirmation_code();
    this.get_user_id();
  }

  code_confirmation() {
    //alert(JSON.stringify(this.state.user_data))
    if (this.state.code == "") {
      Alert.alert("Ошибка регистрации", "Заполните код подтверждения!");
      return;
    }

    params = [
      { name: "user_id", value: this.state.temp_user_id },
      { name: "code", value: this.state.code }
    ];
    //alert(JSON.stringify(params))
    this.setState({
      isLoading: true
    });
    response = getWithParams(this.state.route, params).then(response => {
      //formatProductsCatalogToData(response)
      //alert(JSON.stringify(response))

      this.setState({
        isLoading: false
        //productsCatalog:response
      });

      if (response.message != undefined) {
        if (response.message == "Error") {
          Alert.alert("Ошибка подтверждения кода", "Повторите код еще раз!");
        }
      }

      if (response.status_code != undefined) {
        if (response.status_code == 200) {
          Alert.alert(
            "Успех подтверждения кода",
            "Код успешно подтвержден! Войдите в систему со своим логином и паролем. Приятной работы!",
            [
              {
                text: "ОК",
                onPress: () => {
                  this.redirect_to_login();
                }
              }
            ],
            { cancelable: false }
          );
        }
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View>
            <Text style={styles.signupText}>Код подтверждения</Text>
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Код подтверждения"
              placeholderTextColor="rgba(255,255,255,0.7)"
              selectionColor="#fff"
              keyboardType="numeric"
              value={this.state.code}
              onChangeText={text => {
                this.setState({ code: text });
                //alert(this.state.code)
              }}
              maxLength={4}
              //onSubmitEditing={()=> this.state.user_name_input.focus()}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.code_confirmation()}>
              <Text style={styles.buttonText}>{this.props.type}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
