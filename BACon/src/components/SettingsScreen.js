import React, { Component } from 'react';
import { Text, View, Picker, TextInput } from 'react-native';

import SettingsScreenStyles from './styles/SettingsScreenStyles';
// const { bodyWeightKg, genderConstant, updateProfile } = this.props;

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };
  render() {
    return (

      <View style={SettingsScreenStyles.container}>
        <View style={SettingsScreenStyles.header}>
          <Text style={SettingsScreenStyles.title}>
            BACon Setup
          </Text>
        </View>
        <View style={SettingsScreenStyles.chooseSex}>
          <Text style={SettingsScreenStyles.chooseSexText}>
            Select your biological sex
          </Text>
          <Picker
          style={SettingsScreenStyles.chooseSexPicker}
          selectedValue={"m"}>
          <Picker.Item label="Male" value="m" />
          <Picker.Item label="Female" value="f" />
          </Picker>
        </View>
        <View style={SettingsScreenStyles.chooseBodyWeight}>
          <Text style={SettingsScreenStyles.chooseBodyWeightText}>
            Enter your body weight in kilograms
          </Text>
          <TextInput
          style={SettingsScreenStyles.chooseBodyWeightInput}
          keyboardType = 'numeric'
          />
        </View>
      </View>
    )
  }
}

export default SettingsScreen;
