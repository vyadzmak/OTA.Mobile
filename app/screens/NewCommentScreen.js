import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert
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
  ThumbComponent
} from "./../components/ImagesComponents";
import { postRequest } from "./../modules/Http";

import { USER_DATA, USER_ID } from "./../modules/VarContainer";
import { ProductCommentComponent } from "./../components/ProductCommentComponent";
export default class NewCommentsScreen extends React.Component {
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
      category_name: "Новый комментарий",
      text: "",
      rate: 0
    };
    //navigation.setParam({ title:'Allog' })
  }
  clickItem(id) {
    alert(id);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", "Новый комментарий")
    };
  };
  componentDidMount() {
    this.setState({ isLoading: false });
  }

  complete_send_comment() {
    this.props.navigation.navigate("Dashboard", {});
  }

  sendCommentClick() {
    try {
      update_route = "/productComments";
      if (this.state.text == "") {
        alert("Заполните комментарий!");
        return;
      }
      data = {
        user_id: this.state.user_id,
        product_id: this.state.product_id,
        rate: this.state.rate,
        comment_text: this.state.text
      };

      //alert(JSON.stringify(data))
      response = postRequest(update_route, data).then(response => {
        txt = JSON.stringify(response);
        //alert("Answer " + txt);
        status = response.code;
        //alert(status);
        if (response.message != undefined) {
          Alert.alert(JSON.stringify(response.message));
          this.setState({ isLoading: false });
        } else {
          Alert.alert(
            "Успех",
            "Ваш отзыв был успешно отправлен",
            [
              {
                text: "Да",
                onPress: () => {
                  this.complete_send_comment();
                }
              }
            ],
            { cancelable: false }
          );
        }

        //this.setState({user_data:{...this.state.user_data,user_name : txt}})
      });
    } catch (err) {
      alert(err);
    }
  }

  clickOnStar(_rate) {
    // alert(_rate);
    this.setState({ rate: _rate });
  }

  render() {
    const { navigation } = this.props;
    const _product_id = navigation.getParam("product_id", -1);
    this.state.product_id = _product_id;
    //alert("P_ID" + _product_id);
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <Container style={styles.container}>
        <Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <StarRating
              disabled={false}
              emptyStar={"ios-star-outline"}
              fullStar={"ios-star"}
              halfStar={"ios-star-half"}
              iconSet={"Ionicons"}
              maxStars={5}
              rating={this.state.rate}
              selectedStar={rating => this.clickOnStar(rating)}
              fullStarColor={"orange"}
              starSize={60}
            />
          </View>
          <View>
            <TextInput
              multiline={true}
              numberOfLines={10}
              onChangeText={text => this.setState({ text: text })}
              value={this.state.text}
              style={styles.commentStyle}
              placeholder="Ваш комментарий ..."
            />
          </View>

          <Button block warning onPress={() => this.sendCommentClick()}>
            <Text>Отправить отзыв</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    //height: 150
    width: "100%"
  },

  commentStyle: {
    fontSize: 12,
    borderWidth: 1,
    borderColor: "#1c1c1c"
  }
});
