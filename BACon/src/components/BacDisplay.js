import React, { Component } from 'react';
import { Text, View } from 'react-native';

import BacDisplayStyles from './styles/BacDisplayStyles';

class BacDisplay extends React.Component {
  render() {
    const { displayBac, title } = this.props;
    return (
      <View style={BacDisplayStyles.container}>
        <Text style={BacDisplayStyles.title}>
          {title}
        </Text>
        <Text style={{paddingBottom: 10, fontSize: 40}}>
          {displayBac}
        </Text>
      </View>
    )
  }
}

export default BacDisplay;
