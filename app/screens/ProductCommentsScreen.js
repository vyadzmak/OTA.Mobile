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
  ImageComponent,
  ThumbComponent,
  AvatarComponent
} from "./../components/ImagesComponents";

import { USER_DATA, USER_ID } from "./../modules/VarContainer";
import { ProductCommentComponent } from "./../components/ProductCommentComponent";
export default class ProductCommentsScreen extends React.Component {
  constructor(props) {
    super(props);

    //alert('-------')
    this.state = {
      isLoading: true,
      userComments: [],
      product_id: -1,
      parent_category_name: "",
      user_id: USER_ID,
      route: "/productUsersComments",
      category_name: "Комментарии",
      can_comments: false
    };
    //navigation.setParam({ title:'Allog' })
  }
  clickItem(id) {
    alert(id);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", "Комментарии")
    };
  };
  componentDidMount() {
    params = [
      { name: "user_id", value: this.state.user_id },
      { name: "product_id", value: this.state.product_id }
    ];

    response = getWithParams(this.state.route, params).then(response => {
      //alert(JSON.stringify(response));
      if (response == undefined) {
        alert("Connection error!!!");
        this.setState({
          isLoading: false
        });
      }
      if (response.message == undefined) {
        this.setState({
          isLoading: false,
          userComments: response.comments
        });

        //alert(JSON.stringify(response.comments));
      } else {
        this.setState({
          isLoading: false
        });
      }
      //  this.setState({
      //     isLoading:false,
      //     productsCatalog:response
      //   })
    });
  }

  sendCommentClick() {
    if (!this.state.can_comments) {
      alert(
        "Вы не можете оставлять комментарии так как не покупали этот продукт!"
      );
      return;
    }
    this.props.navigation.push("NewComment", {
      product_id: this.state.product_id,
      navigation: this.props.navigation
    });
  }

  render() {
    const { navigation } = this.props;
    const _product_id = navigation.getParam("product_id", -1);
    const _can_comments = navigation.getParam("can_comments", false);

    this.state.product_id = _product_id;
    this.state.can_comments = _can_comments;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    if (
      this.state.userComments == undefined ||
      this.state.userComments == null ||
      this.state.userComments.length == 0
    ) {
      return (
        <View>
          <Button block warning onPress={() => this.sendCommentClick()}>
            <Text>Добавить отзыв</Text>
          </Button>
          <Text>Комментарии к данному товару отсутствуют</Text>
        </View>
      );
    }

    return (
      <Container>
        <Content>
          {/* <Item> */}
          <Button block warning onPress={() => this.sendCommentClick()}>
            <Text>Добавить отзыв</Text>
          </Button>
          {/* </Item> */}
          <List
            dataArray={this.state.userComments}
            renderRow={
              item => (
                <Item>
                  <View styles={styles.imageContainerStyle}>
                    <AvatarComponent
                      image_url={item.comment_user_data.avatar.thumb_file_path}
                      style={styles.imageStyle}
                    />
                  </View>
                  <View style={{ flexDirection: "column", marginLeft: 15 }}>
                    <View>
                      <Text style={styles.userNameStyle}>
                        {item.comment_user_data.name}
                      </Text>
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
                        // selectedStar={rating => this.clickOnStar(rating)}
                        fullStarColor={"orange"}
                        starSize={15}
                      />
                      <Text style={styles.dateStyle}>
                        {" "}
                        {item.creation_date}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.commentStyle}>
                        {item.comment_text}
                      </Text>
                    </View>
                  </View>
                </Item>
                // <TouchableOpacity  >
                // <ListItem>
                // <ProductCommentComponent
                //   image_path={item.comment_user_data.avatar.thumb_file_path}
                //   name={item.comment_user_data.name}
                //   comment_text={item.comment_text}
                //   rate={item.rate}
                //   date={item.creation_date}
                // />
                // </ListItem>
              )
              // </ TouchableOpacity>
            }
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: "#ffffff"
  },
  imageContainerStyle: {
    height: 50,
    width: 50,
    maxHeight: 50,
    maxWidth: 50,
    padding: 30
  },
  imageStyle: {
    width: 50,
    height: 50,
    maxHeight: 50,
    maxWidth: 50
  },
  userNameStyle: {
    fontSize: 12
  },

  dateStyle: {
    fontSize: 10
  },
  commentStyle: {
    fontSize: 12
  }
});
