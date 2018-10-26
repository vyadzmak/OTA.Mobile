import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Container, Header, Content, Button, Icon, Text } from "native-base";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import call from "react-native-phone-call";

const iconSize = 24;

const args_phone_1 = {
  number: "+77472163535", // String value with the number to call
  prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
};

const args_phone_2 = {
  number: "+77712163535", // String value with the number to call
  prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
};

const args_phone_3 = {
  number: "+77012163535", // String value with the number to call
  prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
};

const args_phone_4 = {
  number: "+77252301236", // String value with the number to call
  prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
};
export default class ContactsScreen extends React.Component {
  static navigationOptions = {
    title: "Контакты"
  };

  constructor(props) {
    super(props);
    this.state = {
      agreement_text: "Useless Multiline Placeholder",
      isLoading: true,
      user_id: 1,
      route: "/adminSettings"
    };
  }

  call_phone_1() {
    try {
      // alert("YA");
      call(args_phone_1);
    } catch (e) {}
  }

  call_phone_2() {
    try {
      // alert("YA");
      call(args_phone_2);
    } catch (e) {}
  }

  call_phone_3() {
    try {
      // alert("YA");
      call(args_phone_3);
    } catch (e) {}
  }

  call_phone_4() {
    try {
      // alert("YA");
      call(args_phone_4);
    } catch (e) {}
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        {/* <Container style={styles.contentStyle}> */}
        {/* <Content> */}
        <Text style={styles.textStyle}> Служба поддержки работает 24/7</Text>

        <Text style={styles.textStyle}> Наши телефоны:</Text>
        <Text
          style={styles.textStyle_phone}
          onPress={() => this.call_phone_1()}>
          {" "}
          +7 (747) 216 35 35
        </Text>
        <Text
          style={styles.textStyle_phone}
          onPress={() => this.call_phone_2()}>
          {" "}
          +7 (771) 216 35 35
        </Text>
        <Text
          style={styles.textStyle_phone}
          onPress={() => this.call_phone_3()}>
          {" "}
          +7 (701) 216 35 35
        </Text>
        <Text
          style={styles.textStyle_phone}
          onPress={() => this.call_phone_4()}>
          {" "}
          +7 (7252) 30 12 36
        </Text>

        <Text style={styles.textStyle2}> Наш адрес:</Text>

        <Text style={styles.textStyle2}> Город Шымкент ул. Байтурсынова 9</Text>
        {/* </Content> */}
        {/* </Container> */}
        {/* <Button full iconLeft>
          <MaterialIcon
            name="share"
            size={iconSize}
            style={styles.drawerIcons}
          />
          <Text>Поделиться</Text>
        </Button> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  contentStyle: {
    flex: 1
    // justifyContent: "center",
    // alignItems: "center"
  },
  textStyle: {
    fontSize: 24,
    paddingBottom: 30
  },
  textStyle_phone: {
    fontSize: 24,
    paddingBottom: 30,
    color: "#074c99",
    fontWeight: "bold"
  },
  textStyle: {
    fontSize: 18,
    paddingBottom: 20
  },
  drawerIcons: {
    color: "#ffffff"
  }
});
