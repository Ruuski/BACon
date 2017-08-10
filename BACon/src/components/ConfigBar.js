import React, { Component } from 'react';
import { Text, View } from 'react-native';

import ConfigBarStyles from './styles/ConfigBarStyles';
import SoberInfoStyles from './styles/SoberInfoStyles';

import Countdown from './Countdown';

class ConfigBar extends React.Component {
  render() {
    const { soberIn, soberAt } = this.props;
    return (
      <View style={ConfigBarStyles.container}>
        <Text style={ConfigBarStyles.settingsText}>
          Settings
        </Text>
      </View>
    )
  }
}

export default ConfigBar;
