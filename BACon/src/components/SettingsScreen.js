import React, { Component } from 'react';
import { Text, View, Picker, TextInput, Button } from 'react-native';
import {
  M_GENDER_CONSTANT,
  F_GENDER_CONSTANT }
  from '../constants';

import SettingsScreenStyles from './styles/SettingsScreenStyles';
// const { bodyWeightKg, genderConstant, updateProfile } = this.props;

class SettingsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedGender: M_GENDER_CONSTANT,
      selectedWeight: 0,
      selectedLimit: 0
    }
  }

  componentDidMount() {
    this.setState({
      selectedGender: this.props.navigation.state.params.genderConstant,
      selectedWeight: this.props.navigation.state.params.bodyWeightKg,
      selectedLimit: this.props.navigation.state.params.limit
    })
  }

  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    const { selectedGender, selectedWeight, selectedLimit } = this.state;
    const { genderConstant, bodyWeightKg, limit, updateProfile } = this.props.navigation.state.params;
    return (

      <View style={SettingsScreenStyles.container}>
        <View style={SettingsScreenStyles.chooseSex}>
          <Text style={SettingsScreenStyles.chooseSexText}>
            Select your biological sex
          </Text>
          <Picker
          style={SettingsScreenStyles.chooseSexPicker}
          selectedValue={selectedGender}
          onValueChange={(itemValue) => this.setState({selectedGender: itemValue})}>
          <Picker.Item label="Male" value={M_GENDER_CONSTANT} />
          <Picker.Item label="Female" value={F_GENDER_CONSTANT} />
          </Picker>
        </View>
        <View style={SettingsScreenStyles.chooseBodyWeight}>
          <Text style={SettingsScreenStyles.chooseBodyWeightText}>
            Enter your body weight in kilograms
          </Text>
          <TextInput
          onChangeText={(text) => this.setState({selectedWeight: text})}
          defaultValue={bodyWeightKg.toString()}
          style={SettingsScreenStyles.chooseBodyWeightInput}
          keyboardType = 'numeric'
          />
        </View>
        <View style={SettingsScreenStyles.chooseLimit}>
          <Text style={SettingsScreenStyles.chooseLimitText}>
            Enter your BAC limit (eg 0.05)
          </Text>
          <TextInput
          onChangeText={(text) => this.setState({selectedLimit: text})}
          defaultValue={limit.toString()}
          style={SettingsScreenStyles.chooseLimitInput}
          keyboardType = 'numeric'
          />
        </View>
        <View style={SettingsScreenStyles.updateButton}>
          <Button
            onPress={()=>{updateProfile(parseFloat(selectedWeight), selectedGender, parseFloat(selectedLimit))}}
            title="Update Settings"
            color="#841584"
            accessibilityLabel="Learn more about this purple button" />
          <Text style={SettingsScreenStyles.updateButtonText}>
            Updating your settings will reset your session
          </Text>
        </View>

      </View>
    )
  }
}

export default SettingsScreen;
