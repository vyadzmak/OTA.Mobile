import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
   Image 
} from 'react-native';
import { Container, Header, Content, List, ListItem, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,Switch } from 'native-base';
import API_URL from './../modules/Settings'
import Swiper from 'react-native-swiper'
import {ProductStockIcon, ProductDiscountIcon,ProductAmountText, ProductAmountDiscountText,ProductDiscountText} from './../components/ProductListCardElements'
import StarRating from 'react-native-star-rating';

export class ProductCardProductRemmendationsComponent extends React.Component {
	constructor (props) {
        super(props)
        this.state = {
          items: []
        }
      }
      componentDidMount () {
        this.setState({
          items: this.props.product_recomendations_data
        })
      }
  
      render () {
        return (

          <Card style={{ marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
            <Content>
            <CardItem  header bordered>
                <Text>Рекомендуемые</Text>
              </CardItem>
              <CardItem  header bordered>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {this.state.items.map((item, key) => {
              return (

                <CardItem style={{width:150}} >
                    

                    <View>
                    <Image source={{uri: API_URL+item.default_image_data.thumb_file_path}} style={{height: 96, width: 96}}/>
                    <Text style={{fontSize:12}}>{item.name}</Text>
                    <View style={{flexDirection:'row'}}>
                                    <ProductAmountText amount ={item.amount} currency_display_value ={item.product_currency_data.display_value} discount_amount={item.discount_amount} style={{fontSize:12}}></ProductAmountText>
                                    <ProductAmountDiscountText currency_display_value ={item.product_currency_data.display_value} discount_amount={item.discount_amount} style={{fontSize:12}}></ProductAmountDiscountText>
                                </View>
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
                                                starSize ={10}
                                            />
                                            <Text style={{color:'orange',fontSize:12}}> ({item.comments_count})</Text>
                                    </View>
                    </View>
                </CardItem>

              
              )
            })}
        </ScrollView>
        </CardItem>
        </Content>
        </Card>
        )
      }
}


export class ProductCardInfoComponent extends React.Component {
	constructor (props) {
        super(props)
        this.state = {
          productDetails: {}
        }
      }
      componentDidMount () {
        this.setState({
          productDetails: this.props.product_details
        })
        // console.log(JSON.stringify(this.props.product_details))
      }
  
      render () {
        return (
         <Card style={{ marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
           <Content>
           <CardItem  header bordered>
              <Text>Данные по товару</Text>
            </CardItem>
            <CardItem bordered>
            <Left>
                <Text>Наименование</Text>
              </Left>
              <Right>
                <Text>{this.state.productDetails.name}</Text>
              </Right>
            </CardItem>
            <CardItem bordered>
            <Left>
                <Text>Краткое описание</Text>
              </Left>
              <Right>
                <Text>{this.state.productDetails.short_description}</Text>
              </Right>
            </CardItem>

            <CardItem bordered>
              <Left>
                <Text>Стоимость</Text>
              </Left>
              <Right>
                <Text>{this.state.productDetails.amount}</Text>
              </Right>


            </CardItem>

            <CardItem bordered>
              <Left>
                <Text>Скидка</Text>
              </Left>
              <Right>
                <Text>{this.state.productDetails.discount_amount}</Text>
              </Right>
             
            </CardItem>
          </Content>
         </Card>
          
          
        

        )
      }
}

export class ProductCardGalleryComponent extends React.Component {
	constructor (props) {
        super(props)
        this.state = {
          items: []
        }
      }
      componentDidMount () {
        this.setState({
          items: this.props.gallery_images_data
        })
      }
  
      render () {
        return (
            <Card style={{ marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
            <Content>
            <CardItem  header bordered>
                <Text>Галерея</Text>
              </CardItem>
              <CardItem  header bordered>
          <Swiper showsButtons={false} showsPagination={false} loop={false} bounces={true} height={100}
          >
            {this.state.items.map((item, key) => {
              return (
                <CardItem key={key} style={styles.slide}>
                    {/* <Content> */}
                        {/* <Card style={{flex: 1,padding:0, alignContent:"center", justifyContent:"center",borderColor:"#ffffff"}}> */}
                            {/* <CardItem style={{flex: 1,padding:0, alignContent:"center", justifyContent:"center"}}>  */}
                                <Image source={{uri: API_URL+item.thumb_file_path}} style={{height: 96, width: 96}}/>
                            {/* </CardItem>    */}
                        {/* </Card> */}
                    {/* </Content> */}
                </CardItem>
              )
            })}
          </Swiper>
          </CardItem>    
          </Content>
          </Card>
            
        )
      }
}
const styles = {
    slide: {
      flex: 1,
      //width:'30%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff'
    },
  
    cardContent:{
        width:'30%'
    },
    
  
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
  }