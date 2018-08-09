import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import renderIf from "./../modules/RenderIf";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { getWithParams, getWithSlashParams } from "./../modules/Http";
import {
  Container,
  Content,
  Icon,
  Header,
  Body,
  Left,
  Footer
} from "native-base";
import API_URL from "./../modules/Settings";
import { USER_DATA, USER_ID } from "./../modules/VarContainer";
import {
  ImageComponent,
  ThumbComponent,
  CatImageComponent
} from "./../components/ImagesComponents";
const data = [
  // { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  // { key: 'K' },
  // { key: 'L' },
];

// import Icon from 'react-native-vector-icons/FontAwesome';
const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  //alert('JJ'+JSON.stringify(data))
  return data;
};
const numColumns = 2;
const formatProductCategoriesToData = productCategories => {
  data = [];
  productCategories.forEach(element => {
    item_element = {
      key: element.name,
      id: element.id,
      internal_categories_count: element.internal_categories_count,
      internal_products_count: element.internal_products_count,
      image: element.default_image_data.thumb_file_path
    };
    data.push(item_element);
  });

  //alert(JSON.stringify(data))
};

export default class ProductCategoriesComponent extends React.Component {
  constructor(props) {
    super(props);
    //alert('IN')
    this.state = {
      isLoading: true,
      productCategories: [],
      current_category_id: -1,
      parent_category_id: -1,
      parent_category_name: "",
      user_id: USER_ID,
      route: "/productsCategoriesByProductCategory",
      category_name: "NONE"
    };
    //navigation.setParam({ title:'Allog' })
  }
  clickItem(id, internal_categories_count, internal_products_count) {
    try {
      //alert('TTTTT')
      //alert(id);
      if (
        internal_categories_count > 0 ||
        (internal_categories_count == 0 && internal_products_count == 0)
      ) {
        this.props.navigation.push("ProductCategories", {
          current_category_id: id
        });
      } else if (internal_products_count > 0) {
        //alert('!!!')
        this.props.navigation.navigate("ProductsCatalog", {
          current_category_id: id
        });
      }
    } catch (err) {
      alert(err);
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", "Категория")
    };
  };
  componentDidMount() {
    data = [];
    //alert(this.props.current_category_id)
    this.setState({
      current_category_id: this.props.current_category_id,
      isLoading: true
    });

    if (this.state.current_category_id != -1) {
      //alert('GO')
      //params =[{"name":"user_id","value":this.state.user_id},{"name":"category_id","value":this.state.current_category_id}]
      _route = "/productCategories/" + this.state.current_category_id;

      _response = getWithSlashParams(_route).then(_response => {
        //formatProductCategoriesToData(response)
        //alert(JSON.stringify(_response.name))
        this.props.navigation.setParams({ title: _response.name });
      });
    }

    params = [
      { name: "user_id", value: this.state.user_id },
      { name: "category_id", value: this.state.current_category_id }
    ];

    response = getWithParams(this.state.route, params).then(response => {
      //alert(JSON.stringify(response));

      if (response.message != undefined) {
        // this.props.navigation.navigate("ProductsCatalog", {
        //   current_category_id: this.state.current_category_id
        // });
        this.setState({
          isLoading: false
        });
      } else {
        formatProductCategoriesToData(response);
        //alert(JSON.stringify(data))
        this.setState({
          isLoading: false,
          productCategories: response
        });
      }
    });
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() =>
          this.clickItem(
            item.id,
            item.internal_categories_count,
            item.internal_products_count
          )
        }>
        <View style={styles.item}>
          <CatImageComponent image_url={item.image} />
          <View style={styles.paragraph}>
            <Text style={styles.pTextStyle}>{item.key}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { navigation } = this.props;
    const _current_category_id = this.props.current_category_id;
    const _parent_category_id = -1;
    this.state.current_category_id = _current_category_id;
    this.state.parent_category_id = _parent_category_id;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 30 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    if (data.length == 0) {
      return (
        <View style={styles.container}>
          <Text>Данные не найдены</Text>
        </View>
      );
    } else {
      return (
        <Container>
          <Content>
            <FlatList
              data={formatData(data, numColumns)}
              style={styles.container}
              renderItem={this.renderItem}
              numColumns={numColumns}
            />
          </Content>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginVertical: 20,
    backgroundColor: "#edebee"
    //alignItems: 'center',
    //justifyContent: 'stretch',
  },
  item: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    //padding: 5,
    //paddingTop: 20,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    height: Dimensions.get("window").width / numColumns + 20 // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "transparent"
  },
  itemText: {
    color: "#696969",
    flex: 1,
    fontSize: 16,
    marginTop: 10,
    alignSelf: "stretch",
    backgroundColor: "rgba(0,0,0,0)"
  },
  image: {
    //height: Dimensions.get("window").width / numColumns - 20,
    //width: Dimensions.get("window").width / numColumns - 20,
    width: "100%",
    height: "100%"

    //padding: 20
  },
  touchableOpacity: {
    flex: 1,
    flexDirection: "column",
    paddingBottom: 3,
    paddingRight: 3
  },
  icon: {
    width: 24,
    height: 24
  },
  testStyle: {
    //marginTop:10
  },

  paragraph: {
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    height: "35%",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  pTextStyle: {
    textAlign: "center",
    color: "white",
    fontSize: 14
  }
});
