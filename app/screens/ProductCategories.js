import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image, Alert, Button, StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import ProductCategoryMenuItem from '../components/ProductCategoryMenuItem'
export default class ProductCategoriesScreen extends React.Component {
constructor(props){
    super(props)
    this.state = {isLoading :true, productCategories:[], current_category_id:1}
}

    static navigationOptions = {
        header: null
      };


      componentDidMount(){

        ///productsCategoriesByProductCategory
        url =  'http://10.0.2.2:5000/productsCategoriesByProductCategory?user_id=1&category_id='+this.state.current_category_id
        return fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            this.setState({
                isLoading: false,
                productCategories: json,
              }, function(){
                // Alert.alert(JSON.stringify(this.state.productCategories))
              });
        })
      }
      GetItem (flower_name) {
  
        // Alert.alert(flower_name);
        
       }
  render() {
    // const { navigation } = this.props;
    // const item_id = navigation.getParam('category_id', '-1');
    // this.setState({current_category_id:item_id})

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }


    return (
        <View style={styles.container}>
        
        <FlatList style={styles.flatlist}
        data={ this.state.productCategories}
         
          renderItem={({item}) => 
            // <ProductCategoryMenuItem imageUri={item.default_image_data.thumb_file_path} content={item.name}/>
               <Image source={{uri:item.default_image_data.thumb_file_path}} style={{width: 128, height: 128}}/>        
            }   
          keyExtractor={(item, index) => index.toString()}
        />
                 
      </View>
    );
  }  
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20
    //flexDirection: 'row',
    // backgroundColor: '#fff',
    //  alignItems: 'center',
    //  justifyContent: 'center',
    // height:"100%"
},
  flatlist:{
    // flex:2,
    //flex: 1, flexDirection: 'row',
    //height:"100%",
    //width:"100%",
    borderColor: "#00ff00",
    borderWidth: 3,
  }
})