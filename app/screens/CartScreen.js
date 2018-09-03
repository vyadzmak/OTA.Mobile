import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert
} from "react-native";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Badge,
  Thumbnail,
  Text,
  Button,
  Separator,
  Switch,
  Item
} from "native-base";
import API_URL from "./../modules/Settings";
import {
  USER_DATA,
  USER_ID,
  CART_ID,
  SetUserCartAmount
} from "./../modules/VarContainer";
import { getWithParams, getWithSlashParams } from "./../modules/Http";
import { postRequest } from "./../modules/Http";
import {
  ImageComponent,
  ThumbComponent,
  AvatarComponent,
  CartImageComponent,
  CatImageComponent
} from "./../components/ImagesComponents";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { MultiFastCartUserCart } from "./../components/MultiFastCartUserCartComponent";
export default class CartScreen extends React.Component {
  constructor(props) {
    super(props);

    //alert('-------')
    this.state = {
      isLoading: true,
      cartPositions: [],
      route: "/userCartDetails",
      lastScrollPos: 0
    };
    //navigation.setParam({ title:'Allog' })
  }
  static navigationOptions = {
    title: "Корзина"
  };

  update_cart() {
    try {
      data = {
        id: this.cart.id,
        cart_positions: this.cart.cart_positions
      };
      update_route = "/manageUserCartDetails";
      //alert(JSON.stringify(data))
      response = postRequest(update_route, data).then(response => {
        //txt = JSON.stringify(response)
        //alert(JSON.stringify(response));
        status = response.code;
        if (status == 400) {
          //Alert.alert(JSON.stringify(response.message));
          this.setState({ isLoading: false });
        } else {
          indexes = [];
          for (i = 0; i < response.cart_positions.length; i++) {
            position = response.cart_positions[i];
            //alert(position.id);
            indexes.push(+position.id);
          }
          indexes.sort();

          //alert(indexes);
          n_positions = [];
          for (i = 0; i < indexes.length; i++) {
            for (j = 0; i < response.cart_positions.length; j++) {
              position = response.cart_positions[j];
              if (indexes[i].toString() == position.id) {
                n_positions.push(position);
                break;
              }
            }
          }

          response.cart_positions = n_positions;
          // alert(JSON.stringify(response));
          this.cart = response;
          // this.state.cartPositions.total_amount

          SetUserCartAmount(this.cart.total_amount);

          this.setState({ cartPositions: {} }, function() {
            this.setState({ cartPositions: this.cart }, function() {});
          });
        }

        //this.setState({user_data:{...this.state.user_data,user_name : txt}})
      });
    } catch (err) {
      alert(err);
    }
  }

  simple_update_cart = () => {
    try {
      params = [
        { name: "user_id", value: USER_ID },
        { name: "user_cart_id", value: CART_ID }
      ];
      if (CART_ID != -1) {
        response = getWithParams("/userCartDetails", params).then(response => {
          if (response == undefined) {
            this.setState({
              isLoading: false
            });
          }
          if (response.message == undefined) {
            //alert("YO-HO-HO");
            this.setState(
              {
                cartPositions: {
                  ...this.state.cartPositions,
                  products_count: response.products_count,
                  total_amount: response.total_amount,
                  total_amount_without_discount:
                    response.total_amount_without_discount,
                  discount_amount: response.discount_amount,
                  economy_delta: response.economy_delta,
                  economy_percent: response.economy_percent,
                  bonuses_amount: response.bonuses_amount
                },
                isLoading: false
                //currency_data:c
              },
              () => {
                //alert(JSON.stringify(this.state.cartPositions));
              }
            );
          }
          // this.cart = response;
        });
      } else {
        // this.setState({
        //   isLoading: false
        // });
      }
    } catch (err) {
      alert(err);
    }
  };

  componentDidMount() {
    params = [
      { name: "user_id", value: USER_ID },
      { name: "user_cart_id", value: CART_ID }
    ];
    //alert(USER_ID +" "+CART_ID)
    if (CART_ID != -1) {
      //alert('1')
      response = getWithParams(this.state.route, params).then(response => {
        //formatProductsCatalogToData(response)
        //console.log(JSON.stringify(response))
        //this.check_favorites(response)
        //alert(JSON.stringify(response))
        if (response == undefined || response.message != undefined) {
          this.setState({
            isLoading: false
          });
        }
        if (response.message == undefined) {
          //alert(JSON.stringify(response.cart_positions));
          indexes = [];
          for (i = 0; i < response.cart_positions.length; i++) {
            position = response.cart_positions[i];
            //alert(position.id);
            indexes.push(+position.id);
          }
          indexes.sort();

          //alert(indexes);
          n_positions = [];
          for (i = 0; i < indexes.length; i++) {
            for (j = 0; i < response.cart_positions.length; j++) {
              position = response.cart_positions[j];
              if (indexes[i].toString() == position.id) {
                n_positions.push(position);
                break;
              }
            }
          }

          response.cart_positions = n_positions;
          this.setState({
            isLoading: false,
            cartPositions: response
            //currency_data:c
          });
        }
        this.cart = response;
      });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  plus_count(id) {
    index = -1;
    for (i = 0; i < this.cart.cart_positions.length; i++) {
      if (this.cart.cart_positions[i].id == id) {
        this.cart.cart_positions[i].count += 1;
        break;
      }
    }
    this.setState({ cartPositions: {} }, function() {
      this.setState({ cartPositions: this.cart }, function() {
        this.update_cart();
      });
    });
  }

  minus_count(id) {
    index = -1;
    update = false;
    for (i = 0; i < this.cart.cart_positions.length; i++) {
      if (this.cart.cart_positions[i].id == id) {
        if (this.cart.cart_positions[i].count > 1) {
          this.cart.cart_positions[i].count -= 1;
          update = true;
        }
        break;
      }
    }
    if (update == true)
      this.setState({ cartPositions: {} }, function() {
        this.setState({ cartPositions: this.cart }, function() {
          this.update_cart();
        });
      });
  }

  plus_alt_count(id) {
    index = -1;
    for (i = 0; i < this.cart.cart_positions.length; i++) {
      if (this.cart.cart_positions[i].id == id) {
        this.cart.cart_positions[i].alt_count += 1;
        break;
      }
    }
    this.setState({ cartPositions: {} }, function() {
      this.setState({ cartPositions: this.cart }, function() {
        this.update_cart();
      });
    });
  }

  minus_alt_count(id) {
    index = -1;
    update = false;
    for (i = 0; i < this.cart.cart_positions.length; i++) {
      if (this.cart.cart_positions[i].id == id) {
        if (this.cart.cart_positions[i].alt_count > 0) {
          this.cart.cart_positions[i].alt_count -= 1;
          update = true;
        }
        break;
      }
    }
    if (update == true)
      this.setState({ cartPositions: {} }, function() {
        this.setState({ cartPositions: this.cart }, function() {
          this.update_cart();
        });
      });
  }
  manage_invoice(id) {
    index = -1;
    update = false;
    for (i = 0; i < this.cart.cart_positions.length; i++) {
      if (this.cart.cart_positions[i].id == id) {
        this.cart.cart_positions[i].need_invoice = !this.cart.cart_positions[i]
          .need_invoice;
        update = true;
        break;
      }
    }

    if (update == true)
      this.setState({ cartPositions: {} }, function() {
        this.setState({ cartPositions: this.cart }, function() {
          this.update_cart();
        });
      });
  }

  remove_item(id) {
    for (i = 0; i < this.cart.cart_positions.length; i++) {
      if (this.cart.cart_positions[i].id == id) {
        this.cart.cart_positions.splice(i, 1);
      }
    }

    this.setState({ cartPositions: {} }, function() {
      this.setState({ cartPositions: this.cart }, function() {
        this.update_cart();
      });
    });
  }
  positionEvent(y) {
    alert(y);
  }

  prepare_order() {
    try {
      params = [
        { name: "user_id", value: USER_ID },
        { name: "user_cart_id", value: CART_ID }
      ];

      if (CART_ID != -1) {
        //alert('1')
        response = getWithParams("/checkMinimumSumCartByPartners", params).then(
          response => {
            //alert(JSON.stringify(response));
            if (response.length > 0) {
              message =
                "Невозможно оформить заказ. Вы не набрали на минимальную сумму от наших партнеров:\n";

              for (i = 0; i < response.length; i++) {
                line = response[i];
                partner_name = line[1];
                need_amount = line[2];
                cart_amount = line[3];
                m_line =
                  "Партнер: " +
                  partner_name +
                  ", мин. сумма: " +
                  need_amount +
                  ", ваша сумма:" +
                  cart_amount;
                message += m_line + "\n";
              }
              alert(message);

              return;
            }
            //this.props.navigation.popToTop()
            this.props.navigation.navigate("PrepareOrder", {
              navigation: this.props.navigation
            });
          }
        );
      } else {
        this.setState({
          isLoading: false
        });
      }
    } catch (err) {
      alert(err);
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    if (
      this.state.cartPositions.cart_positions != undefined &&
      this.state.cartPositions.cart_positions.length > 0
    ) {
      return (
        <Container>
          <Header style={styles.headerStyle}>
            <Text style={styles.headerText}>ТОВАРЫ В КОРЗИНЕ</Text>
          </Header>
          <Content>
            <List
              style={styles.listItemStyle}
              dataArray={this.state.cartPositions.cart_positions}
              renderRow={item => (
                <View style={styles.cartPositionStyle}>
                  <View>
                    <ListItem style={styles.listItemStyle}>
                      <Left>
                        <Left>
                          <CartImageComponent
                            image_url={
                              item.user_cart_position_product_data
                                .default_image_data.file_path
                            }
                          />
                        </Left>

                        <Right>
                          <Text style={styles.nameTextStyle}>
                            {item.user_cart_position_product_data.name}
                          </Text>
                          <Text note>
                            {
                              item.user_cart_position_product_data
                                .short_description
                            }
                          </Text>
                        </Right>
                      </Left>

                      <Right>
                        <Text style={{ fontSize: 12 }}>Цена за ед.</Text>
                        <Text style={{ fontSize: 12 }}>
                          {item.user_cart_position_product_data.amount}
                          {this.state.cartPositions.currency_data.display_value}
                        </Text>
                        <Text style={{ fontSize: 12 }}>Скидка</Text>
                        <Text style={{ fontSize: 12 }}>
                          {item.user_cart_position_product_data.discount_amount}{" "}
                          {this.state.cartPositions.currency_data.display_value}
                        </Text>
                        {/* <Text style={{ fontSize: 14 }}>
                          {" "}
                          Кол-во
                          {item.count}{" "}
                        </Text> */}

                        <Text style={{ fontSize: 12 }}>Бонусы</Text>
                        <Text style={{ fontSize: 12 }}>
                          {item.bonuses}{" "}
                          {this.state.cartPositions.currency_data.display_value}
                        </Text>
                      </Right>
                    </ListItem>
                  </View>
                  <View>
                    <MultiFastCartUserCart
                      item={item}
                      fn={this.simple_update_cart}
                    />

                    <ListItem style={styles.listItemStyle}>
                      <Left>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                          <Text style={styles.nameTextStyle}>Счет-фактура</Text>
                          <Switch
                            value={item.need_invoice}
                            onValueChange={() => this.manage_invoice(item.id)}
                          />
                        </View>
                      </Left>
                      <Right>
                        <MCIcon
                          name="delete"
                          size={35}
                          style={styles.trashIconStyle}
                          onPress={() => {
                            Alert.alert(
                              "Удаление",
                              "Вы действительно хотите удалить данную позицию из заказа?",
                              [
                                {
                                  text: "Отмена",
                                  onPress: () => console.log("Cancel Pressed"),
                                  style: "cancel"
                                },
                                {
                                  text: "Да",
                                  onPress: () => {
                                    this.remove_item(item.id);
                                  }
                                }
                              ],
                              { cancelable: false }
                            );
                          }}
                        />
                      </Right>
                    </ListItem>
                  </View>
                  <Item />
                </View>
              )}>
              }
            </List>
            <List style={styles.listItemStyle}>
              <Separator bordered>
                <Text style={{ fontSize: 14 }}>Общее</Text>
              </Separator>
              <ListItem style={styles.listItemStyle}>
                <Left>
                  <Text>Количество позиций</Text>
                </Left>
                <Right>
                  <Text>{this.state.cartPositions.products_count}</Text>
                </Right>
              </ListItem>
              <ListItem style={styles.listItemStyle}>
                <Left>
                  <Text>Итого</Text>
                </Left>
                <Right>
                  <Text>
                    {this.state.cartPositions.total_amount_without_discount}
                    {this.state.cartPositions.currency_data.display_value}
                  </Text>
                </Right>
              </ListItem>

              <ListItem style={styles.listItemStyle}>
                <Left>
                  <Text>Итого учетом скидки</Text>
                </Left>
                <Right>
                  <Text>
                    {this.state.cartPositions.total_amount}
                    {this.state.cartPositions.currency_data.display_value}
                  </Text>
                </Right>
              </ListItem>

              <ListItem style={styles.listItemStyle}>
                <Left>
                  <Text>Скидка</Text>
                </Left>
                <Right>
                  <Text>
                    {this.state.cartPositions.discount_amount}{" "}
                    {this.state.cartPositions.currency_data.display_value}
                  </Text>
                </Right>
              </ListItem>

              <ListItem style={styles.listItemStyle}>
                <Left>
                  <Text>Итого бонусов</Text>
                </Left>
                <Right>
                  <Text>
                    {this.state.cartPositions.bonuses_amount}{" "}
                    {this.state.cartPositions.currency_data.display_value}
                  </Text>
                </Right>
              </ListItem>
            </List>

            <Button block success onPress={() => this.prepare_order()}>
              <Text>Оформить заказ</Text>
            </Button>
          </Content>
        </Container>
      );
    } else {
      return (
        <View>
          <Text> Ваша корзина пуста</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  trashIconStyle: {
    color: "red"
    //marginLeft: 10,
    //marginRight: 10
  },
  buttonsStyle: {
    width: 40,
    height: 40
    //paddingHorizontal: 2,
  },
  countStyle: {
    padding: 10
  },
  nameTextStyle: {
    fontSize: 12
  },
  headerStyle: {
    backgroundColor: "#d3d3d3",
    alignItems: "center",
    justifyContent: "center",
    height: 40
  },
  headerText: {
    color: "#ffffff"
  },
  cartPositionStyle: {
    padding: 5,
    backgroundColor: "#ffffff"
  },
  listItemStyle: {
    backgroundColor: "#ffffff",
    borderColor: "transparent"
  }
});
