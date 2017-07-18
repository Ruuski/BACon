import React, { Component } from 'react';
import { Text, View } from 'react-native';

import SoberInfoStyles from './styles/SoberInfoStyles';

import Countdown from './Countdown';

class SoberInfo extends React.Component {
  render() {
    const { soberIn, soberAt } = this.props;
    return (
      <View style={SoberInfoStyles.container}>
        <Text style={SoberInfoStyles.header}>
          Sober in
        </Text>
        <Countdown time={soberIn} />
        <Text style={SoberInfoStyles.subHeader}>
          at
        </Text>
        <Text style={{paddingBottom: 10, fontSize: 20}}>
          {soberAt}
        </Text>
      </View>
    )
  }
}

export default SoberInfo;
