import React from 'react';
import { View, Text, Button} from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: 'transparent',
          },
      };
  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Screen</Text>
        
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        
      </View>
    );
  }  
}

