import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Item
} from "native-base";
import API_URL from "./../modules/Settings";
import Swiper from "react-native-swiper";
import {
  ProductStockIcon,
  ProductDiscountIcon,
  ProductAmountText,
  ProductAmountDiscountText,
  ProductDiscountText
} from "./../components/ProductListCardElements";
import StarRating from "react-native-star-rating";

export class ProductCardProductRemmendationsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    this.setState({
      items: this.props.product_recomendations_data
    });
  }

  render() {
    if (this.state.items != null && this.state.items > 0) {
      return (
        <Card
          style={{
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0
          }}>
          <Content>
            <CardItem header bordered>
              <Text>Рекомендуемые</Text>
            </CardItem>
            <CardItem header bordered>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {this.state.items.map((item, key) => {
                  return (
                    <CardItem style={{ width: 150 }}>
                      <View>
                        <Image
                          source={{
                            uri:
                              API_URL + item.default_image_data.thumb_file_path
                          }}
                          style={{ height: 96, width: 96 }}
                        />
                        <Text style={{ fontSize: 12 }}>{item.name}</Text>
                        <View style={{ flexDirection: "row" }}>
                          <ProductAmountText
                            amount={item.amount}
                            currency_display_value={
                              item.product_currency_data.display_value
                            }
                            discount_amount={item.discount_amount}
                            style={{ fontSize: 12 }}
                          />
                          <ProductAmountDiscountText
                            currency_display_value={
                              item.product_currency_data.display_value
                            }
                            discount_amount={item.discount_amount}
                            style={{ fontSize: 12 }}
                          />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <StarRating
                            disabled={false}
                            emptyStar={"ios-star-outline"}
                            fullStar={"ios-star"}
                            halfStar={"ios-star-half"}
                            iconSet={"Ionicons"}
                            maxStars={5}
                            rating={item.rate}
                            // selectedStar={(rating) => this.onStarRatingPress(rating)}
                            fullStarColor={"orange"}
                            starSize={10}
                          />
                          <Text style={{ color: "orange", fontSize: 12 }}>
                            {" "}
                            ({item.comments_count})
                          </Text>
                        </View>
                      </View>
                    </CardItem>
                  );
                })}
              </ScrollView>
            </CardItem>
          </Content>
        </Card>
      );
    } else {
      return null;
    }
  }
}

export class ProductCardMainInfoShortDescriptionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: ""
    };
  }
  componentDidMount() {
    this.setState({
      description: this.props.description
    });
    // alert(this.props.description);
  }

  render() {
    if (this.state.description == "" || this.state.description == undefined) {
      return null;
    } else {
      return (
        <Item style={styles.itemDetailsStyle}>
          <Text style={styles.shortDescriptionStyle}>
            {this.state.description}
          </Text>
        </Item>
      );
    }
  }
}

export class ProductCardMainInfoFullDescriptionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: ""
    };
  }
  componentDidMount() {
    this.setState({
      description: this.props.description
    });
    //alert(this.props.description);
  }

  render() {
    if (this.state.description == "" || this.state.description == undefined) {
      return null;
    } else {
      return (
        <Item style={styles.itemDetailsStyle}>
          <Text style={styles.fullDescriptionStyle}>
            {this.state.description}
          </Text>
        </Item>
      );
    }
  }
}

export class ProductCardMainInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: {},
      currency_data: {},
      unit_data: {},
      partner_data: {},
      brand_data: {},
      isLoading: true
    };
  }
  componentDidMount() {
    this.setState({
      productDetails: this.props.product_details,
      currency_data: this.props.product_details.product_currency_data,
      unit_data: this.props.product_details.product_unit_data,
      partner_data: this.props.product_details.partner_data,
      brand_data: this.props.product_details.brand_data,
      isLoading: false
    });
    //alert("PD:" + JSON.stringify(this.state.productDetails));
  }

  clickOnStar(rating) {
    this.props.navigation.push("ProductComments", {
      product_id: this.state.productDetails.id,
      //product_name: name,
      navigation: this.props.navigation
    });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <Content style={styles.mainInfoStyle}>
        <Item style={styles.itemDetailsStyle}>
          <Text style={styles.productNameStyle}>
            {this.state.productDetails.name}
          </Text>
        </Item>

        <ProductCardMainInfoShortDescriptionComponent
          description={this.state.productDetails.short_description}
        />

        <ProductCardMainInfoFullDescriptionComponent
          description={this.state.productDetails.full_description}
        />

        <Item style={styles.itemDetailsStyle}>
          <View style={{ flexDirection: "row" }}>
            <StarRating
              disabled={false}
              emptyStar={"ios-star-outline"}
              fullStar={"ios-star"}
              halfStar={"ios-star-half"}
              iconSet={"Ionicons"}
              maxStars={5}
              rating={this.state.productDetails.rate}
              selectedStar={rating => this.clickOnStar(rating)}
              fullStarColor={"orange"}
              starSize={25}
            />
            <Text style={{ color: "orange", fontSize: 20 }}>
              {" "}
              ({this.state.productDetails.comments_count})
            </Text>
          </View>
        </Item>
      </Content>
    );
  }
}

export class ProductCardInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: {},
      currency_data: {},
      unit_data: {},
      partner_data: {},
      brand_data: {},
      isLoading: true
    };
  }
  componentDidMount() {
    this.setState({
      productDetails: this.props.product_details,
      currency_data: this.props.product_details.product_currency_data,
      unit_data: this.props.product_details.product_unit_data,
      partner_data: this.props.product_details.partner_data,
      brand_data: this.props.product_details.brand_data,
      isLoading: false
    });
    //alert(JSON.stringify(this.props.product_details.partner_data.name));
    // console.log(JSON.stringify(this.props.product_details))
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <Content>
        <Item header style={styles.itemDetailsStyle}>
          <Text style={styles.itemHeaderTextStyle}>Данные по товару</Text>
        </Item>
        {/* <Item style={styles.itemDetailsStyle}>
          <Left>
            <Text style={styles.itemNameTextStyle}>Наименование</Text>
          </Left>
          <Right>
            <Text style={styles.itemValueTextStyle}>
              {this.state.productDetails.name}
            </Text>
          </Right>
        </Item> */}

        <Item style={styles.itemDetailsStyle}>
          <Left>
            <Text style={styles.itemNameTextStyle}>Артикул</Text>
          </Left>
          <Right>
            <Text style={styles.itemValueTextStyle}>
              {this.state.productDetails.product_code}
            </Text>
          </Right>
        </Item>

        {/* <Item style={styles.itemDetailsStyle}>
          <Left>
            <Text style={styles.itemNameTextStyle}>Краткое описание</Text>
          </Left>
          <Right>
            <Text style={styles.itemValueTextStyle}>
              {this.state.productDetails.short_description}
            </Text>
          </Right>
        </Item>

        <Item style={styles.itemDetailsStyle}>
          <Left>
            <Text style={styles.itemNameTextStyle}>Полное описание</Text>
          </Left>
          <Right>
            <Text style={styles.itemValueTextStyle}>
              {this.state.productDetails.full_description}
            </Text>
          </Right>
        </Item> */}

        <Item style={styles.itemDetailsStyle}>
          <Left>
            <Text style={styles.itemNameTextStyle}>Кол-во/вес</Text>
          </Left>
          <Right>
            <Text style={styles.itemValueTextStyle}>
              {this.state.productDetails.unit_value}{" "}
              {this.state.unit_data.display_value}
            </Text>
          </Right>
        </Item>

        <Item style={styles.itemDetailsStyle}>
          <Left>
            <Text style={styles.itemNameTextStyle}>Цена</Text>
          </Left>
          <Right>
            <Text style={styles.itemValueTextStyle}>
              {this.state.productDetails.amount}{" "}
              {this.state.currency_data.display_value}
            </Text>
          </Right>
        </Item>

        <Item style={styles.itemDetailsStyle}>
          <Left>
            <Text style={styles.itemNameTextStyle}>Цена со скидкой</Text>
          </Left>
          <Right>
            <Text style={styles.itemValueTextStyle}>
              {this.state.productDetails.discount_amount}{" "}
              {this.state.currency_data.display_value}
            </Text>
          </Right>
        </Item>

        <Item style={styles.itemDetailsStyle}>
          <Left>
            <Text style={styles.itemNameTextStyle}>Рекомендуемая цена</Text>
          </Left>
          <Right>
            <Text style={styles.itemValueTextStyle}>
              {this.state.productDetails.recommended_amount}{" "}
              {this.state.currency_data.display_value}
            </Text>
          </Right>
        </Item>

        <Item style={styles.itemDetailsStyle}>
          <Left>
            <Text style={styles.itemNameTextStyle}>Бонусы (% от цены) </Text>
          </Left>
          <Right>
            <Text style={styles.itemValueTextStyle}>
              {this.state.productDetails.bonus_percent}
            </Text>
          </Right>
        </Item>

        <Item style={styles.itemDetailsStyle}>
          <Left>
            <Text style={styles.itemNameTextStyle}>Партнер</Text>
          </Left>
          <Right>
            <Text style={styles.itemValueTextStyle}>
              {this.state.partner_data.name}
            </Text>
          </Right>
        </Item>

        <Item style={styles.itemDetailsStyle}>
          <Left>
            <Text style={styles.itemNameTextStyle}>Бренд </Text>
          </Left>
          <Right>
            <Text style={styles.itemValueTextStyle}>
              {this.state.brand_data.name}
            </Text>
          </Right>
        </Item>
      </Content>
    );
  }
}

export class ProductCardGalleryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: true
    };
  }
  componentDidMount() {
    if (this.props.gallery_images_data != null) {
      this.setState({
        items: this.props.gallery_images_data,
        isLoading: false
      });

      //alert(JSON.stringify(this.props.gallery_images_data));
    } else {
      this.setState({
        isLoading: false
      });
    }
    //alert(JSON.stringify(this.state.items));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    if (this.state.items != null && this.state.items.length > 0) {
      //alert("TT");
      return (
        // <View style={styles.container}>
        <Swiper
          showsButtons={false}
          showsPagination={false}
          // autoplay={true}
          // autoplayTimeout={4}
          // loop={true}
          bounces={true}
          height={150}>
          {this.state.items.map((item, key) => {
            return (
              <View key={key} style={styles.slide}>
                <Image
                  resizeMode="contain"
                  source={{ uri: API_URL + item.thumb_file_path }}
                  style={styles.slideImage}
                />
              </View>
            );
          })}
        </Swiper>
        // </View>
      );
    } else {
      return null;
    }
  }
}
const styles = {
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    width: "100%"
  },
  slideImage: {
    width: "100%",
    height: "100%"
  },
  cardContent: {
    width: "30%"
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  },
  itemDetailsStyle: {
    borderWidth: 0,
    borderColor: "transparent",
    minHeight: 50
  },
  itemHeaderTextStyle: {
    color: "#004c99",
    fontSize: 14,
    fontWeight: "bold"
  },

  itemNameTextStyle: {
    fontSize: 14,
    color: "#707070",
    fontWeight: "bold"
  },

  itemValueTextStyle: {
    fontSize: 14,
    color: "#1c1c1c"
  },

  productNameStyle: {
    fontSize: 16,
    color: "#000000"
  },
  shortDescriptionStyle: {
    fontSize: 14,
    color: "#1c1c1c"
  },
  fullDescriptionStyle: {
    fontSize: 12,
    color: "#1c1c1c"
  },
  mainInfoStyle: {
    marginTop: 15
  }
};
