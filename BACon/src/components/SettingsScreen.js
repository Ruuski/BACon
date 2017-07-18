import React, { Component } from 'react';
import { Text, View } from 'react-native';

import SettingsScreenStyles from './styles/SettingsScreenStyles';

class SettingsScreen extends React.Component {
  render() {
    // const { bodyWeightKg, genderConstant, updateProfile } = this.props;
    return (

      <View style={SettingsScreenStyles.container}>
        <View style={SettingsScreenStyles.chooseSex}>
          <Text>
            Select your biological sex
          </Text>
        </View>
        <View style={SettingsScreenStyles.chooseBodyWeight}>
          <Text>
            Enter your current body weight in kilograms
          </Text>
        </View>
      </View>
    )
  }
}

export default SettingsScreen;
