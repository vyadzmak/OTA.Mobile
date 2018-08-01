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
  Icon,
  Header,
  Body,
  List,
  ListItem,
  Left,
  Right,
  Thumbnail,
  CardItem,
  Item,
  Button
} from "native-base";
import { DrawerNavigator } from "react-navigation";
import { getWithParams, getWithSlashParams } from "./../modules/Http";
import {
  USER_ID,
  CART_ID,
  USER_DATA,
  SetUserCartId,
  SetUserData,
  SetUserCartProductsCount,
  SetUserCartAmount
} from "./../modules/VarContainer";
import Toast from "react-native-simple-toast";
import {
  ProductCardProductRemmendationsComponent,
  ProductCardGalleryComponent,
  ProductCardInfoComponent,
  ProductCardMainInfoComponent
} from "./../components/ProductCardElements";

import { DashboardRecommendationsComponent } from "../components/DashboardRecommendationsComponent";

//import {USER_ID, CART_ID} from './../modules/VarContainer'
export default class ProductCardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      productDetails: null,
      product_gallery: [],
      route: "/productDetails",
      routeAdd: "/addCartPositionToCart",
      product_id: -1,
      product_name: " ",
      user_id: USER_ID,
      count: 1,
      alt_count: 0,
      unit_name: "НЕТ",
      alt_unit_name: "НЕТ",
      show_alt: false,
      recomendation_elements_data: null,
      recommendation_visibility: true,
      show_recommendations: true
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", "ТОВАР")
    };
  };

  _loadProductsCount = async () => {
    try {
      r = "/userCartProductCount";
      params = [
        { name: "user_id", value: this.state.user_id },
        { name: "user_cart_id", value: CART_ID },
        { name: "product_id", value: this.state.product_id }
      ];

      response = getWithParams(r, params).then(response => {
        //alert(JSON.stringify(response))
        if (response == undefined) {
          // alert("Connection error");
          // this.setState({
          //   isLoading: false
          // });
          return;
        } else {
          //alert(JSON.stringify(response));
          _count = response.product_count;
          _alt_count = response.alt_product_count;

          this.setState({
            isLoading: false,
            count: _count,
            alt_count: _alt_count
          });
        }
        //alert(count);
      });
    } catch (err) {}
  };

  _retrieveData = async () => {
    try {
      const value = await this._loadProductsCount();
      params = [
        { name: "user_id", value: this.state.user_id },
        { name: "product_id", value: this.state.product_id }
      ];

      response = getWithParams(this.state.route, params)
        .then(response => {
          //alert(JSON.stringify(response))
          if (response == undefined) {
            alert("Connection error");
            this.setState({
              isLoading: false
            });
            return;
          }

          this.setState(
            {
              productDetails: response,
              unit_name: response.product_unit_data.display_value,
              alt_unit_name: response.product_alt_unit_data.display_value,

              product_gallery: response.gallery_images_data,
              recomendation_elements_data: response.product_recomendations_data
            },
            () => {
              if (
                this.state.alt_unit_name != undefined &&
                this.state.alt_unit_name != null &&
                this.state.alt_unit_name != "null"
              ) {
                this.setState({
                  show_alt: true
                  //alt_count: 0
                });
              } else {
                this.setState({
                  show_alt: false,
                  alt_count: 0
                });
              }
            }
          );
        })
        .then(x => {
          if (
            this.state.recomendation_elements_data == null ||
            this.state.recomendation_elements_data == undefined ||
            this.state.recomendation_elements_data.length == 0
          ) {
            this.setState({
              show_recommendations: false,
              recommendation_visibility: false,
              isLoading: false
              //isLoading: false
            });
          } else {
            this.setState({
              show_recommendations: true,
              recommendation_visibility: true,
              isLoading: false
              //isLoading: false
            });
          }
        });
    } catch (error) {
      // Error retrieving data
    }
  };

  retrive_data = async () => {
    try {
      //const value = await this._retrieveData();
      this._retrieveData().then(x => {
        //        alert(JSON.stringify(this.state.recomendation_elements_data));
        //alert(JSON.stringify(this.state.isLoading));
        //alert(JSON.stringify(this.state.product_recomendations_data));
      });
    } catch (err) {}
  };

  componentDidMount() {
    //alert(this.state.product_id)
    this.props.navigation.setParams({ title: this.state.product_name });

    this.retrive_data().then(x => {
      this.setState({});
    });
  }

  clickItem(id) {
    try {
      console.log(id);
    } catch (err) {
      console.log(err);
    }
  }
  add_to_cart() {
    user_id = USER_ID;
    count = this.state.count;
    alt_count = this.state.alt_count;
    cart_id = CART_ID;
    _product_id = this.state.productDetails.id;

    params = [
      { name: "user_id", value: user_id },
      { name: "user_cart_id", value: cart_id },
      { name: "product_id", value: _product_id },
      { name: "count", value: count },
      { name: "alt_count", value: alt_count }
    ];

    //alert(JSON.stringify(params))
    response = getWithParams(this.state.routeAdd, params).then(response => {
      //if (response.)
      //alert(JSON.stringify(response))
      SetUserCartProductsCount(response.products_count);
      SetUserCartAmount(response.total_amount);
      //alert(response.products_count)
      SetUserCartId(response.id);
      Toast.show("Продукт был добавлен в корзину");
      //alert(CART_ID)
    });
  }

  addCount() {
    c = this.state.count;
    c += 1;
    this.setState({ count: c });
  }

  minusCount() {
    if (this.state.count > 1) {
      c = this.state.count;
      c -= 1;
      this.setState({ count: c });
    }
  }

  addAltCount() {
    c = this.state.alt_count;
    c += 1;
    this.setState({ alt_count: c });
  }

  minusAltCount() {
    if (this.state.alt_count > 0) {
      c = this.state.alt_count;
      c -= 1;
      this.setState({ alt_count: c });
    }
  }

  clickImage() {
    //alert("CLicker");

    this.props.navigation.push("Gallery", {
      images: this.state.product_gallery,
      //product_name: name,
      navigation: this.props.navigation
    });
  }

  render() {
    const { navigation } = this.props;
    const product_id = navigation.getParam("product_id", -1);
    const product_name = navigation.getParam("product_name", " ");
    this.state.product_id = product_id;
    this.state.product_name = product_name;

    if (
      this.state.isLoading ||
      this.state.productDetails == null ||
      this.state.productDetails == undefined ||
      this.state.recomendation_elements_data == null ||
      this.state.recomendation_elements_data == undefined
    ) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      // <View style={styles.container}>
      <Container style={styles.container}>
        <Content padder style={{ padding: 0 }}>
          <Item style={{ padding: 0 }} onPress={() => this.clickImage()}>
            <ProductCardGalleryComponent
              gallery_images_data={this.state.product_gallery}
            />
          </Item>

          <Item>
            <ProductCardMainInfoComponent
              product_details={this.state.productDetails}
              navigation={this.props.navigation}
            />
          </Item>

          <Item style={{ marginTop: 15 }}>
            {/* <Text>{this.state.unit_name}</Text> */}
            {/* <View style={{flexDirection:'row',alignItems: "center" ,justifyContent: "center"}}> */}
            <Left>
              <Button block danger onPress={() => this.minusCount()}>
                <Text>-</Text>
              </Button>
            </Left>
            <Body>
              <Button block primary onPress={() => this.add_to_cart()}>
                <Text>
                  Добавить ({this.state.unit_name}) ({this.state.count})
                </Text>
              </Button>
            </Body>
            <Right>
              <Button block success onPress={() => this.addCount()}>
                <Text>+</Text>
              </Button>
            </Right>
            {/* </View> */}
          </Item>

          {this.state.show_alt && (
            //  <Text>{this.state.alt_unit_name}</Text>
            <Item style={{ marginTop: 15 }}>
              {/* <View style={{flexDirection:'row',alignItems: "center" ,justifyContent: "center"}}> */}
              <Left>
                <Button block danger onPress={() => this.minusAltCount()}>
                  <Text>-</Text>
                </Button>
              </Left>
              <Body>
                <Button block primary onPress={() => this.add_to_cart()}>
                  <Text>
                    Добавить ({this.state.alt_unit_name}) ({
                      this.state.alt_count
                    })
                  </Text>
                </Button>
              </Body>
              <Right>
                <Button block success onPress={() => this.addAltCount()}>
                  <Text>+</Text>
                </Button>
              </Right>
              {/* </View> */}
            </Item>
          )}

          <Item>
            <ProductCardInfoComponent
              product_details={this.state.productDetails}
            />
          </Item>
          <Item>
            <ProductCardProductRemmendationsComponent
              product_recomendations_data={
                this.state.productDetails.product_recomendations_data
              }
            />
          </Item>

          {this.state.recommendation_visibility && (
            <Item style={styles.recommendedItemStyle}>
              <DashboardRecommendationsComponent
                navigation={this.props.navigation}
                images_data={this.state.recomendation_elements_data}
                show_recommendations={this.state.show_recommendations}
              />
            </Item>
          )}
        </Content>
      </Container>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    //flex: 1,
    //alignItems: "center",
    //justifyContent: "center",
    marginVertical: 5
  },
  nameText: {
    color: "#000",
    fontSize: 16
    // marginLeft: 30,
    // marginTop: 10,
  },
  icons: {
    // padding:10,
    paddingHorizontal: 50,
    width: 96,
    height: 96
  },
  recommendedItemStyle: {
    padding: 5,
    height: 300,

    justifyContent: "flex-start"
  }
});
