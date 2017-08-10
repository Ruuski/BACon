import React, { Component } from 'react';
import { Text, View } from 'react-native';

import TargetInfoStyles from './styles/TargetInfoStyles';

import Countdown from './Countdown';

class TargetInfo extends React.Component {
  render() {
    const { limitAt, limitIn } = this.props;
    return (
      <View style={TargetInfoStyles.container}>
        <Text style={TargetInfoStyles.header}>
          You'll be below your limit in
        </Text>
        <Countdown time={limitIn}/>
        <Text style={TargetInfoStyles.subHeader}>
          at
        </Text>
        <Text style={TargetInfoStyles.soberAt}>
          {this.props.limitAt}
        </Text>
      </View>
    )
  }
}

export default TargetInfo;
