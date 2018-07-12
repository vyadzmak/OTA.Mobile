import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";

import {
  Container,
  Text,
  Content,
  Input,
  Icon,
  Header,
  Body,
  Left,
  Footer,
  Item,
  Separator,
  Card,
  CardItem,
  List,
  Button,
  ListItem,
  Right
} from "native-base";

import { DrawerNavigator } from "react-navigation";
import { USER_DATA, USER_ID, CART_ID } from "./../modules/VarContainer";
import {
  getWithParams,
  getWithSlashParams,
  postRequest
} from "./../modules/Http";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-simple-toast";

export default class TabProfileUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      route: "/userProfile",
      userProfile: {},
      user_data: {
        user_id: -1,
        user_name: "",
        user_login: "",
        user_password: "",
        user_phone_number: "",
        user_email: "",
        total_bonuses_amount: 0,
        start_bonus_date: "",
        end_bonus_date: ""
      }
    };
  }

  static navigationOptions = {
    title: "Профиль пользователя"
  };

  update_user_data() {
    try {
      update_route = "/updateUserProfile";
      data = this.state.user_data;
      //alert(JSON.stringify(data))
      response = postRequest(update_route, data).then(response => {
        //txt = JSON.stringify(response)

        status = response.code;
        if (status == 400) {
          Alert.alert(JSON.stringify(response.message));
          this.setState({ isLoading: false });
        } else {
          Toast.show("Данные были успешно обновлены");
        }
      });
    } catch (err) {}
  }

  componentDidMount() {
    //alert('AA')
    params = [{ name: "user_id", value: USER_ID }];
    response = getWithParams(this.state.route, params).then(response => {
      //alert(JSON.stringify(response))
      if (response.message == undefined) {
        this.setState({
          userProfile: response,
          isLoading: false
        });
        this.setState({
          user_data: {
            ...this.state.user_data,
            user_id: this.state.userProfile.user_data.id,
            user_name: this.state.userProfile.user_data.name,
            user_login: this.state.userProfile.login,
            user_phone_number: this.state.userProfile.user_data.user_info
              .phone_number,
            user_email: this.state.userProfile.user_data.user_info.email,
            total_bonuses_amount: this.state.userProfile.total_bonuses_amount,
            start_bonus_date: this.state.userProfile.start_bonus_date,
            end_bonus_date: this.state.userProfile.end_bonus_date
          }
        });
      }
    });
  }

  iconSize = 24;

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <Container>
        <Content>
          {/* <Item disabled>
            <Text>Логин</Text>
            <Input disabled placeholder='Login' value={this.state.userProfile.login}/>
            <MCIcon name='login' size={this.iconSize} />
          </Item> */}

          <Card>
            <Item>
              <Left>
                <Text>Логин</Text>
              </Left>
              <Body>
                <Input
                  style={styles.inputStyle}
                  disabled
                  inlineLabel
                  value={this.state.user_data.user_login}
                />
              </Body>
            </Item>
            <Item>
              <Left>
                <Text>Пароль</Text>
              </Left>
              <Body>
                <Input
                  style={styles.inputStyle}
                  value={this.state.user_data.user_password}
                  onChangeText={text =>
                    this.setState({
                      user_data: {
                        ...this.state.user_data,
                        user_password: text
                      }
                    })
                  }
                />
              </Body>
            </Item>
            <Item>
              <Left>
                <Text>Имя</Text>
              </Left>
              <Body>
                <Input
                  style={styles.inputStyle}
                  value={this.state.user_data.user_name}
                  onChangeText={text =>
                    this.setState({
                      user_data: { ...this.state.user_data, user_name: text }
                    })
                  }
                />
              </Body>
            </Item>
            <Item>
              <Left>
                <Text>Email</Text>
              </Left>
              <Body>
                <Input
                  style={styles.inputStyle}
                  value={this.state.user_data.user_email}
                  onChangeText={text =>
                    this.setState({
                      user_data: { ...this.state.user_data, user_email: text }
                    })
                  }
                />
              </Body>
            </Item>

            <Item>
              <Left>
                <Text>Телефон</Text>
              </Left>
              <Body>
                <Input
                  style={styles.inputStyle}
                  keyboardType="numeric"
                  value={this.state.user_data.user_phone_number}
                  onChangeText={text =>
                    this.setState({
                      user_data: {
                        ...this.state.user_data,
                        user_phone_number: text
                      }
                    })
                  }
                />
              </Body>
            </Item>

            <Item>
              <Left>
                <Text>Бонусы</Text>
              </Left>
              <Body>
                <Text style={styles.inputStyle}>
                  {this.state.user_data.total_bonuses_amount}
                </Text>
              </Body>
            </Item>

            <Item>
              <Left>
                <Text>Бонусы за период</Text>
              </Left>
              <Right>
                <Text style={styles.inputStyle}>
                  C {this.state.user_data.start_bonus_date} по{" "}
                  {this.state.user_data.end_bonus_date}
                </Text>
              </Right>
            </Item>
          </Card>
          <Button block success onPress={() => this.update_user_data()}>
            <Text>СОХРАНИТЬ</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  inputStyle: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    padding: 3,
    borderRadius: 2
  }
});
