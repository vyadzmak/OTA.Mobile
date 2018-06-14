import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions,Image,ActivityIndicator, TouchableOpacity } from 'react-native';
import renderIf from './../modules/RenderIf'
import getWithParams from './../modules/Http'
import API_URL from './../modules/Settings'
const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  // { key: 'K' },
  // { key: 'L' },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const formatProductCategoriesToData = (productCategories)=>{
  data = []
  productCategories.forEach(element => {
    item_element = {
      key: element.name,
      id: element.id,
      internal_categories_count:element.internal_categories_count,
      internal_internal_products_count:element.internal_products_count,
      image: API_URL+ element.default_image_data.thumb_file_path
    }
    data.push(item_element)
  });

  //alert(JSON.stringify(data))
}

const numColumns = 3;
export default class FlatListGridScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading :true, 
      productCategories:[], 
      current_category_id:-1,
      user_id : 1,
      route:'/productsCategoriesByProductCategory'
    }

  }
    clickItem(id){
      //alert(id)
      this.props.navigation.push('FlatListGrid', {
        current_category_id: id
        //otherParam: 'anything you want here',
      });
    }

    static navigationOptions = {
      title: 'Категории'
      };

      componentDidMount(){
        ///productsCategoriesByProductCategory
        params =[{"name":"user_id","value":this.state.user_id},{"name":"category_id","value":this.state.current_category_id}]
        // url =  'http://10.0.2.2:5000/productsCategoriesByProductCategory?user_id=1&category_id='+this.state.current_category_id
        
        response =getWithParams(this.state.route,params).then(
          response=> {
            formatProductCategoriesToData(response)
            this.setState({
              isLoading:false,
              productCategories:response
            })
          }
        )
        
        
      }

  renderItem = ({ item, index }) => {
    
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }

    
    return (
        <TouchableOpacity style ={styles.touchableOpacity} onPress={()=>this.clickItem(item.id)}>
          <View style={styles.item}>
              <Image source={{uri:item.image}} style={styles.image} />
              <Text style={styles.itemText}>{item.key}</Text>
          </View>
        </TouchableOpacity>
    );
  };

  render() {
    const { navigation } = this.props;
    const _current_category_id = navigation.getParam('current_category_id', -1);
    //const otherParam = navigation.getParam('otherParam', 'some default value');
    this.state.current_category_id=_current_category_id
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      
        <FlatList
          data={formatData(data, numColumns)}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    backgroundColor:"#ffffff"
  },
  item: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    height: Dimensions.get('window').width / numColumns+40, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent'
  },
  itemText: {
    color: '#696969',
    fontSize: 16,
    marginTop: 10,
  },
  image: {
    height: Dimensions.get('window').width / numColumns-20,
    width: Dimensions.get('window').width / numColumns-20,
    
    padding:20
  },
  touchableOpacity:{
    flex:1,
    flexDirection: 'column',
  }
});