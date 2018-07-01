import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions,Image,ActivityIndicator, TouchableOpacity } from 'react-native';
import renderIf from './../modules/RenderIf'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import {getWithParams,getWithSlashParams} from './../modules/Http'
import { Container, Content, Icon, Header, Body, Left } from 'native-base'
import API_URL from './../modules/Settings'
import {USER_DATA,USER_ID} from './../modules/VarContainer'

const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  // { key: 'K' },
  // { key: 'L' },
];

// import Icon from 'react-native-vector-icons/FontAwesome';
const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  //alert('JJ'+JSON.stringify(data))
  return data;
};

const formatProductCategoriesToData = (productCategories)=>{
  data = []
  productCategories.forEach(element => {
    item_element = {
      key: element.name,
      id: element.id,
      internal_categories_count:element.internal_categories_count,
      internal_products_count:element.internal_products_count,
      image: API_URL+ element.default_image_data.thumb_file_path
    }
    data.push(item_element)
  });

  //alert(JSON.stringify(data))
}

const numColumns = 3;

export default class ProductCategoriesComponent extends React.Component {
    constructor(props){
      super(props)
      //alert('IN')
      this.state = {
        isLoading :true, 
        productCategories:[], 
        current_category_id:-1,
        parent_category_id:-1,
        parent_category_name:"",
        user_id : USER_ID,
        route:'/productsCategoriesByProductCategory',
        category_name: 'NONE'
      }
      //navigation.setParam({ title:'Allog' })
    }
      clickItem(id,internal_categories_count,internal_products_count){
        try{
            //alert('TTTTT')
          //alert(id)
          if (internal_categories_count>0 || (internal_categories_count==0 && internal_products_count==0)){
            this.props.navigation.push('ProductCategories', {
              current_category_id: id
            });
          }
  
          if (internal_products_count>0){
            //alert('!!!')
            this.props.navigation.navigate('ProductsCatalog', {
              current_category_id: id
            });
          }
        }
        catch (err){
          alert(err)
        }
  
        
      }
  
      
  
      static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('title', 'Категория'),
        };
      };
        componentDidMount(){
          //alert(this.props.current_category_id)
          this.setState({
              current_category_id:this.props.current_category_id,
              isLoading:true
          })
          
          if (this.state.current_category_id!=-1){
              //alert('GO')
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
                    //alert(JSON.stringify(response))
  
                    if (response.message!=undefined){
                      //  alert('T')
                      this.setState({
                        isLoading:false,
                      })  
                    }
  
                    formatProductCategoriesToData(response)
                    //alert(JSON.stringify(data))
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
      //alert('TOP')
      
      return (
          <TouchableOpacity style ={styles.touchableOpacity} onPress={()=>this.clickItem(item.id,item.internal_categories_count,item.internal_products_count)}>
            <View style={styles.item}>
            {/* <Text>3</Text> */}
                <Image source={{uri:item.image}} style={styles.image} />
                <Text style={styles.itemText}>{item.key}</Text>
            </View>
          </TouchableOpacity>
      );
    };
  
    render() {
      const { navigation } = this.props;
      const _current_category_id = this.props.current_category_id;
      const _parent_category_id = -1;
      //alert('PNAV'+this.props.navigation)
      //alert('NAV'+this.navigation)

      //alert('PR'+_current_category_id)
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
        // <View style={styles.container}>
        // <Text>TRASH</Text>
        
        // </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      //marginVertical: 20,
      backgroundColor:"#ffffff",
      //alignItems: 'center',
      //justifyContent: 'center',
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
    },icon: {
      width: 24,
      height: 24,
    }
  });