import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
   Image 
} from 'react-native';
import { Container, Header, Content, List, ListItem, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
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
        //   <Swiper showsButtons={false} showsPagination={false} loop={false} bounces={true} height={250}
        //   >
        //     {this.state.items.map((item, key) => {
        //       return (
        //         <Container key={key} style={styles.slide}>
        //             <Content>
        //                 <Card style={{flex: 1,padding:0, alignContent:"center", justifyContent:"center"}}>
        //                     <CardItem>
        //                         <Text>{item.name}</Text>
        //                     </CardItem>   
        //                     <CardItem style={{flex: 1,padding:0, alignContent:"center", justifyContent:"center"}}> 
        //                         <Image source={{uri: API_URL+item.default_image_data.thumb_file_path}} style={{height: 128, width: 128}}/>
        //                     </CardItem>   
                            
        //                 </Card>
        //             </Content>
        //         </Container>
        //       )
        //     })}
        //   </Swiper>

        <ScrollView horizontal={true}>
                  {this.state.items.map((item, key) => {
              return (
                <View style={{width:150}}>
                    <Card>
                            <CardItem style={{flex: 1,padding:0, alignContent:"center", justifyContent:"center"}}> 
                                <Image source={{uri: API_URL+item.default_image_data.thumb_file_path}} style={{height: 96, width: 96}}/>
                            </CardItem>   
                            <CardItem>
                                <Text style={{fontSize:12}}>{item.name}</Text>
                            </CardItem>

                            <CardItem>
                                <View style={{flexDirection:'row'}}>
                                    <ProductAmountText amount ={item.amount} currency_display_value ={item.product_currency_data.display_value} discount_amount={item.discount_amount} style={{fontSize:12}}></ProductAmountText>
                                    <ProductAmountDiscountText currency_display_value ={item.product_currency_data.display_value} discount_amount={item.discount_amount} style={{fontSize:12}}></ProductAmountDiscountText>
                                </View>
                            </CardItem>
                            <CardItem>
                               
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
                                
                            </CardItem>
                            
                    </Card>
                </View>

                // <Container key={key} style={styles.slide}>
                //     <Content style={styles.cardContent}>
                        
                //     </Content>
                // </Container>
              )
            })}
        </ScrollView>
        )
      }
}

const styles = {
    slide: {
      flex: 1,
      //width:'30%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
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