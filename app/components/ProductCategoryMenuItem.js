import React from 'react';
import { View, Text, Button, Image, StyleSheet,Alert} from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

export default class ProductCategoryMenuItem extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)
//        Alert.alert(JSON.stringify(props))
        Alert.alert(props.imageUri)
        this.state = {
            content: props.content,
            imageUri: props.imageUri,
        }
    }

    componentWillReceiveProps(nextProps) {
        const { imageUri } = nextProps;
        Alert.alert(JSON.stringify(props))
        this.setState({imageUri: imageUri});
      }

  render() {
    return (
        <View style={styles.menuItem}>
            <Image source={{uri:this.props.imageUri}}
             />       
             {/* <Text >{this.props.content}</Text>  */}
             {/* <Text >{this.props.imageUri}</Text>  */}
        </View>
    );
  }  
}

const styles = StyleSheet.create({
    menuItem :{
        
        width: '50%',
        height: '80%',
        padding: 5,
         borderColor: "#FF0000",
         borderWidth: 3,
    },
    image :{
        width: '50%',
         height: '50%',
         
    }
})

