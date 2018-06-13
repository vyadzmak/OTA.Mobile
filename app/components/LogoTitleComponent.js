import React from 'react';
import { Image} from 'react-native';


export default class LogoTitle extends React.Component {
    render() {
      return (
        <Image
          source={require('./../../logo.png')}
          style={{ width: 30, height: 30 }}
        />
      );
    }
  }