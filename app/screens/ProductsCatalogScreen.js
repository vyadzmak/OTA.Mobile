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
  Right
} from "native-base";
import StarRating from "react-native-star-rating";
import { getWithParams, getWithSlashParams } from "./../modules/Http";
import API_URL from "./../modules/Settings";
import {
  ProductStockIcon,
  ProductDiscountIcon,
  ProductAmountText,
  ProductAmountDiscountText,
  ProductDiscountText
} from "../components/ProductListCardElements";
//import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { USER_DATA, USER_ID, CART_ID } from "./../modules/VarContainer";
import ProductsList from "./../components/ProductsListComponent";
import HeaderCartComponent from "./../components/HeaderCartComponent";
import SearchBarComponent from "./../components/SearchBarComponent";

export default class ProductsCatalogScreen extends React.Component {
  constructor(props) {
    super(props);

    //alert('-------')
    this.state = {
      isLoading: true,
      productsCatalog: [],
      current_category_id: -1,
      parent_category_id: -1,
      parent_category_name: "",
      user_id: USER_ID,
      route: "/productsByProductCategory",
      category_name: "NONE",
      showBar: false,
      self: this
    };
    //navigation.setParam({ title:'Allog' })
  }
  clickItem(id) {
    alert(id);
  }

  check_favorites(response) {
    _products = response;
    try {
      favorites_products = [];

      favorites_products = USER_DATA.user_favorites_products.products_ids;

      //alert('2')
      if (
        favorites_products.length != null ||
        favorites_products.length != undefined
      )
        for (var i = 0; i < favorites_products.length; i++) {
          value = favorites_products[i];
          //alert(this.state.products.length)

          for (var j = 0; j < _products.length; j++) {
            product = _products[j];
            if (product.is_favorite) {
              continue;
            }
            product.is_favorite = false;

            if (product.id == value) {
              //alert("YA"+value)
              product.is_favorite = true;
            }
          }
        }
    } catch (err) {
      //alert(err)
    } finally {
      //alert("OK");
      r_products = [];

      for (i = 0; i < _products.length; i++) {
        prod = _products[i];

        if (prod.not_show_in_catalog == false) {
          r_products.push(prod);
        }
      }

      this.setState({
        productsCatalog: r_products
        //isLoading:false
      });
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", "Категория"),
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          <HeaderCartComponent navigation={navigation} />
          {/* <MCIcon name="cart" style={{color:'#ffffff',fontSize:32,marginRight:10}}  onPress={()=>navigation.navigate('Cart')}/> */}
          <MaterialIcon
            name="search"
            style={{ color: "#ffffff", fontSize: 32, marginRight: 10 }}
            onPress={navigation.getParam("manageBar")}
          />
        </View>
      )
    };
  };
  componentDidMount() {
    this.props.navigation.setParams({ manageBar: this._manageBar });

    if (this.state.current_category_id != -1) {
      //params =[{"name":"user_id","value":this.state.user_id},{"name":"category_id","value":this.state.current_category_id}]
      _route = "/productCategories/" + this.state.current_category_id;

      _response = getWithSlashParams(_route).then(_response => {
        //formatProductCategoriesToData(response)
        //alert(JSON.stringify(_response.name))
        this.props.navigation.setParams({ title: _response.name });
        this.setState({
          category_name: _response.name
        });
      });
    }

    params = [
      { name: "user_id", value: this.state.user_id },
      { name: "category_id", value: this.state.current_category_id },
      { name: "user_cart_id", value: CART_ID }
    ];

    response = getWithParams(this.state.route, params)
      .then(response => {
        //formatProductsCatalogToData(response)
        //console.log(JSON.stringify(response))
        this.check_favorites(response);
      })
      .then(x => {
        this.setState({
          //productsCatalog:response,
          isLoading: false
        });
      });
  }

  _manageBar = () => {
    if (this.state.showBar == false) {
      this.child.showBar();
    } else {
      this.child.hideBar();
    }
  };
  clickItem(id, name) {
    try {
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
    const { navigation } = this.props;
    const _current_category_id = navigation.getParam("current_category_id", -1);
    const _parent_category_id = navigation.getParam("parent_category_id", -1);
    //const otherParam = navigation.getParam('otherParam', 'some default value');
    this.state.current_category_id = _current_category_id;
    this.state.parent_category_id = _parent_category_id;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <Container style={styles.container}>
        <SearchBarComponent
          navigation={this.props.navigation}
          ref={ref => (this.child = ref)}
        />

        <ProductsList
          navigation={this.props.navigation}
          products={this.state.productsCatalog}
          categoryName={this.state.category_name}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginVertical: 20,
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
  }
});
