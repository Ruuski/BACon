import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import CountdownStyles from './styles/CountdownStyles';

import { STD_DRINK_GRMS } from '../constants';



class Countdown extends React.Component {
  render() {
    const { time } = this.props;
    return (
      <View style={CountdownStyles.container}>
        <Text style={CountdownStyles.counter}>
          {time}
        </Text>
        <Text style={CountdownStyles.key}>
          (hh:mm:ss)
        </Text>
      </View>
    )
  }
}

export default Countdown;
