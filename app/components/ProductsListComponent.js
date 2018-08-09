import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import renderIf from "./../modules/RenderIf";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
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
  Item
} from "native-base";
import StarRating from "react-native-star-rating";
import { getWithParams, getWithSlashParams } from "./../modules/Http";
import API_URL from "./../modules/Settings";
import {
  ProductStockIcon,
  ProductDiscountIcon,
  ProductAmountText,
  ProductAmountDiscountText,
  ProductDiscountText,
  //ProductFastCart,
  //ProductFavorite,
  ProductBonus
  //MultiFastCart
} from "../components/ProductListCardElements";

import { MultiFastCart } from "../components/MultiFastCartComponent";
import {
  ImageComponent,
  ThumbComponent
} from "./../components/ImagesComponents";
//import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default class ProductsList extends React.Component {
  constructor(props) {
    super(props);

    //alert('-------')
    this.state = {
      isLoading: true,
      products: [],
      current_category_id: -1,
      parent_category_id: -1,
      parent_category_name: "",
      user_id: 1,
      route: "/productsByProductCategory",
      category_name: "NONE"
    };
    //navigation.setParam({ title:'Allog' })
  }
  clickItem(id) {
    alert(id);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", "Категория")
    };
  };
  componentDidMount() {
    this.props.navigation.setParams({ title: this.props.categoryName });
    this.setState({
      products: this.props.products
    }),
      () => {
        //this.check_favorites()
      };
  }

  clickItem(id, name) {
    try {
      //alert(id + " " + name);
      this.props.navigation.push("ProductCard", {
        product_id: id,
        product_name: name,
        navigation: this.props.navigation
      });

      console.log(name);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.products == undefined || this.state.products == null) {
      return (
        <View>
          <Text>Ничего не найдено</Text>
        </View>
      );
    }
    if (this.state.products.length == 0) {
      return (
        <View>
          <Text>Ничего не найдено</Text>
        </View>
      );
    }
    //this.check_favorites()
    return (
      <List
        dataArray={this.state.products}
        renderRow={
          item => (
            <View style={{ flex: 1, padding: 0 }}>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => this.clickItem(item.id, item.name)}>
                <View>
                  <CardItem>
                    <ThumbComponent
                      image_url={
                        item.default_image_data.optimized_size_file_path
                      }
                    />

                    <Body style={{ paddingLeft: 20 }}>
                      <Text>{item.name}</Text>
                      <Text note>{item.short_description}</Text>
                      <View style={{ flexDirection: "row" }}>
                        <ProductAmountText
                          amount={item.amount}
                          alt_amount={item.alt_amount}
                          currency_display_value={
                            item.product_currency_data.display_value
                          }
                          discount_amount={item.discount_amount}
                        />
                        <ProductAmountDiscountText
                          currency_display_value={
                            item.product_currency_data.display_value
                          }
                          discount_amount={item.discount_amount}
                        />
                      </View>
                      <View>
                        <ProductBonus bonus={item.bonus_percent} />
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <ProductStockIcon
                          is_stock_product={item.is_stock_product}
                          style={styles.icons}
                        />
                        <ProductDiscountIcon
                          is_discount_product={item.is_discount_product}
                          style={styles.icons}
                        />
                      </View>
                      <ProductDiscountText stock_text={item.stock_text} />
                    </Body>
                  </CardItem>
                </View>
              </TouchableOpacity>
              <MultiFastCart item={item} />
            </View>

            // </Container>
          )
          //   </ListItem>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: "#ffffff"
  },
  item: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: "#C0C0C0"
    // height: Dimensions.get('window').width / numColumns+40, // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "transparent"
  },
  itemText: {
    color: "#696969",
    fontSize: 16,
    marginTop: 10
  },
  image: {
    height: 96,
    width: 96,

    paddingHorizontal: 20
  },
  touchableOpacity: {
    flex: 1,
    flexDirection: "column"
  },
  icon: {
    width: 24,
    height: 24
  },
  icons: {
    padding: 10,
    paddingHorizontal: 50
  },
  favoriteElementStyle: {
    marginLeft: -50
  }
});
