import React, { Component } from 'react';
import { Text, View } from 'react-native';

import SettingsScreenStyles from './styles/SettingsScreenStyles';
// const { bodyWeightKg, genderConstant, updateProfile } = this.props;

class SettingsScreen extends React.Component {
  render() {
    return (

      <View style={SettingsScreenStyles.container}>
        <View style={SettingsScreenStyles.header}>
          <Text style={SettingsScreenStyles.title}>
            Welcome to BACon
          </Text>
          <Text style={SettingsScreenStyles.subtitle}>
            Blood Alcohol Content: On Demand
          </Text>
        </View>
        <Text style={SettingsScreenStyles.chooseSex}>
          Select your biological sex
        </Text>
        <Text style={SettingsScreenStyles.chooseBodyWeight}>
          Enter your body weight in kilograms
        </Text>
      </View>
    )
  }
}

export default SettingsScreen;
