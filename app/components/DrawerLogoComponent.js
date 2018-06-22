import React from 'react';
import { Image,StyleSheet,} from 'react-native';
import { View, Text } from 'native-base';

import {  Thumbnail } from 'native-base';

export default class DrawerLogo extends React.Component {
    render() {
      return (
          <View style={styles.container}>
               <Thumbnail
                    source={{uri:'http://sharik.ua/images/elements_big/3207-1220_m1.jpg'}}
                    style={{ width: 96, height: 96 }}
                    />
              <Text style={styles.logoText}>Хведькович Александр</Text>
          </View>
        
      );
    }
  }


  const styles = StyleSheet.create({
    container : {
      flexGrow: 1,
      justifyContent:'flex-end',
      alignItems: 'center'
    },
    logoText : {
        marginVertical: 15,
        fontSize:18,
        color:'rgba(255, 255, 255, 0.7)'
    }
  });