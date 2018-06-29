import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View,AsyncStorage,Alert} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
const iconSize =24
class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  redirect(){
    AsyncStorage.clear()
    AsyncStorage.setItem('userToken', 'Auth').then(
        this.navigateToScreen('AuthLoading')
    )
  }
  logout(){


    Alert.alert(
        'Выход',
        'Вы действительно хотите выйти?',
        [
          {text: 'Отмена', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Да', onPress: () => {this.redirect() }},
        ],
        { cancelable: false }
      )
        
    //this.props.navigation.navigate('AuthLoading')
    //this.navigateToScreen('AuthLoading')
  }  
  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Section 1
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page1')}>
              Page1
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Section 2
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page2')}>
                Page2
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page3')}>
                Page3
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
        <MCIcon name="exit-to-app" size={iconSize} style={styles.exitIcons}></MCIcon>
          <Text onPress={()=>this.logout()}>Выход </Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;