import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions,Image,ActivityIndicator, TouchableOpacity } from 'react-native';
import renderIf from './../modules/RenderIf'
import {getWithParams} from './../modules/Http'
import API_URL from './../modules/Settings'
import { Container, Content, Icon, Header, Body, Left,Footer } from 'native-base'

const data = [];
import {USER_DATA,USER_ID} from './../modules/VarContainer'
import {ImageComponent, ThumbComponent} from './../components/ImagesComponents'

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
      image: element.default_image_data.thumb_file_path
    }
    data.push(item_element)
  });

}

const numColumns = 3;
export default class ProductsCategoryList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading :true, 
      productCategories:[], 
      current_category_id:-1,
      parent_category_id:-1,
      parent_category_name:"",
      user_id : USER_ID,
      route:'/productsCategoriesByProductCategory'
    }

  }
    clickItem(id){
      //alert(id)
      

      this.props.navigation.push('ProductCategories', {
        current_category_id: id,
        navigation :this.props.navigation
      });
    }

    static navigationOptions = {
      title: 'Категории'      
      };

      componentDidMount(){
        data = []
        params =[{"name":"user_id","value":this.state.user_id},{"name":"category_id","value":this.state.current_category_id}]
        response =getWithParams(this.state.route,params).then(
          response=> {

            if (response!=null){
            formatProductCategoriesToData(response)
            this.setState({
              isLoading:false,
              productCategories:response
            })
          }else {
            alert("Connection error")
            this.setState({
              isLoading:false,
                        
            })
          }
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
            <ImageComponent image_url={item.image}/>
              <View style={styles.paragraph}>
                <Text style={styles.pTextStyle}>{item.key}</Text>
              </View>
            </View>
        </TouchableOpacity>
    );
  };

  render() {
    const { navigation } = this.props;
    const _current_category_id = -1;
    const _parent_category_id = -1;
    //const otherParam = navigation.getParam('otherParam', 'some default value');
    this.state.current_category_id=_current_category_id
    this.state.parent_category_id=_parent_category_id
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }

    if ( data.length==0){
      return(
        <View style={styles.container}>
          <Text>
            Данные не найдены
          </Text>
        </View>
      )
    } 
    else{
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
    marginVertical: 20,
    backgroundColor:"#ffffff",
    //borderColor: "#00ffff",
    //borderWidth: 3
  },
  item: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    //padding: 5,
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
  },icon: {
    width: 24,
    height: 24,
  },
    
  paragraph: {     
    backgroundColor: 'rgba(0,0,0,0.6)',
     width:'100%',
     height:'35%',
     position: 'absolute',
     bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    
  }, 
  pTextStyle :{
    textAlign: 'center',
    color: 'white',
    fontSize:14,
  }
});