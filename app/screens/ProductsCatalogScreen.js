import React from 'react';
import { StyleSheet, View, FlatList, Dimensions,Image,ActivityIndicator, TouchableOpacity } from 'react-native';
import renderIf from './../modules/RenderIf'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Container, Header, Content, List, ListItem, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import StarRating from 'react-native-star-rating';
import {getWithParams,getWithSlashParams} from './../modules/Http'
import API_URL from './../modules/Settings'
//import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export default class ProductsCatalogScreen extends React.Component {
  constructor(props){
    super(props)

    //alert('-------')
    this.state = {
      isLoading :true, 
      productsCatalog:[], 
      current_category_id:-1,
      parent_category_id:-1,
      parent_category_name:"",
      user_id : 1,
      route:'/productsByProductCategory',
      category_name: 'NONE'
    }
    //navigation.setParam({ title:'Allog' })
  }
    clickItem(id){
      alert(id)
    //   if (internal_categories_count>0 || (internal_categories_count==0 && internal_products_count==0)){
    //     this.props.navigation.push('ProductCategories', {
    //       current_category_id: id
    //     });
    //   }

    //   if (internal_products_count>0){
    //     this.props.navigation.push('ProductsCatatalog', {
    //       current_category_id: id
    //     });
    //   }

      
    }

    

    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('title', 'Категория'),
      };
    };
      componentDidMount(){
        
        
        
        if (this.state.current_category_id!=-1){
          //params =[{"name":"user_id","value":this.state.user_id},{"name":"category_id","value":this.state.current_category_id}]
          _route = "/productCategories/"+this.state.current_category_id

          _response =getWithSlashParams(_route).then(
            _response=> {
              //formatProductCategoriesToData(response)
              //alert(JSON.stringify(_response.name))
              this.props.navigation.setParams({title: _response.name})
            }
          )
        }

        params =[{"name":"user_id","value":this.state.user_id},{"name":"category_id","value":this.state.current_category_id}]
        
        response =getWithParams(this.state.route,params).then(
          response=> {
            //formatProductsCatalogToData(response)
            console.log(JSON.stringify(response))
            this.setState({
              isLoading:false,
              productsCatalog:response
            })
          }
        )
        
      }

  renderItem = ({ item, index }) => {
            
    return (
        <TouchableOpacity style ={styles.touchableOpacity} onPress={()=>this.clickItem(item.id)}>
          <View style={styles.item}>
              {/* <Image source={{uri:item.image}} style={styles.image} /> */}
              <Text style={styles.itemText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
    );
  };

  render() {
    const { navigation } = this.props;
    const _current_category_id = navigation.getParam('current_category_id', -1);
    const _parent_category_id = navigation.getParam('parent_category_id', -1);
    //const otherParam = navigation.getParam('otherParam', 'some default value');
    this.state.current_category_id=_current_category_id
    this.state.parent_category_id=_parent_category_id
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    var items = ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can'];
    return (
      
          <List dataArray={ this.state.productsCatalog}
            renderRow={(item) =>
            //   <ListItem>
                <Card style={{flex: 1,padding:0}}>
                    <CardItem>
                    {/* <Left style={{alignItems: 'center'}} > */}
                        
                        <Thumbnail source={{uri: API_URL+item.default_image_data.thumb_file_path}} style={styles.image} />
                        
                    {/* </Left> */}
                    <Body style={{paddingLeft:20}}>
                        <Text>{item.name}</Text>
                        <Text note>{item.short_description}</Text>
                        <Text>{item.amount}</Text>
                        <View style={{flexDirection:'row'}}>
                        <StarRating
                                disabled={false}
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                maxStars={5}
                                rating={item.rate}
                                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                fullStarColor={'orange'}
                                starSize ={20}
                            />
                            <Text style={{color:'orange',fontSize:16}}> ({item.comments_count})</Text>
                        </View>
                        </Body>
                    {/* <Right><MaterialIcon name="shopping-cart" style={{color:'red',fontSize:48}} /></Right> */}
                    </CardItem>
                  
                </Card>
            //   </ListItem>
            }>
          </List>
          
        
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
   // height: Dimensions.get('window').width / numColumns+40, // approximate a square
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
    height: 96,
    width: 96,
    
    paddingHorizontal:20
  },
  touchableOpacity:{
    flex:1,
    flexDirection: 'column',
  },icon: {
    width: 24,
    height: 24,
  }
});