import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image 
} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FIcon from 'react-native-vector-icons/FontAwesome'

export class ProductStockIcon extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
		//alert(this.props.is_stock_product)
  }

	render(){
		
		if (this.props.is_stock_product){
				return(
					<View >
						<MCIcon name="tag" size={24} style={styles.drawerIconsStock}></MCIcon>
						{/* <FontAwesome>{Icons.dollarSign}</FontAwesome> */}
					</View>
					)
			}
		else {
			return (null)
		}
	}
}


export class ProductDiscountIcon extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
		//alert(this.props.is_stock_product)
  }

	render(){
		
		if (this.props.is_discount_product){
				return(
					<View >
						<MCIcon name="sale" size={24} style={styles.drawerIconsDiscount}></MCIcon>
					</View>
					)
			}
		else {
			return (null)
		}
	}
}

export class ProductAmountText extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
		
  }

	render(){
		
		if (this.props.discount_amount==0){
				return(
					<View >
						<Text style={styles.productAmount}>{this.props.amount} {this.props.currency_display_value}</Text>
					</View>
					)
			}
		else {
			return(
				<View >
					<Text style={styles.productAmountWithDiscount}>{this.props.amount} {this.props.currency_display_value}</Text>
				</View>
				)
		}
	}
}

export class ProductAmountDiscountText extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
		
  }

	render(){
		
		if (this.props.discount_amount!=0){
				return(
					<View >
						<Text style={styles.productAmountDiscount}>{this.props.discount_amount} {this.props.currency_display_value}</Text>
					</View>
					)
			}
		else {
			return(null
				)
		}
	}
}
export class ProductDiscountText extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
		
  }

	render(){
		
		if (this.props.stock_text!=''){
				return(
					<View >
						<Text style={styles.productDiscountText}>{this.props.stock_text}</Text>
					</View>
					)
			}
		else {
			return(null
				)
		}
	}
}
const styles = StyleSheet.create({
	drawerIconsDiscount: {
		 color :"#ff0066",
		 paddingRight: 5 
	 },
	 drawerIconsStock: {
		color :"#0066cc",
		paddingRight:5		 
	},
	productAmount:{
		fontSize: 20,
		color:"#000",
		fontStyle: 'normal',
		fontWeight : 'normal',
		paddingRight:5		 

	},
	productAmountWithDiscount:{
		fontSize: 20,
		color:"#000",
		fontStyle: 'normal',
		textDecorationLine: 'line-through',
		paddingRight:5		 

	},
	
	productAmountDiscount:{
		fontSize: 20,
		color:"red",
		fontStyle: 'normal',
		fontWeight : 'bold',
		paddingRight:5		 

	},
	productDiscountText:{
		fontSize: 12,
		color:"red",
		fontStyle: 'italic',
		paddingRight:5		 

	}
 });