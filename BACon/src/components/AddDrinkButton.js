import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import AddDrinkButtonStyles from './styles/AddDrinkButtonStyles';

import { STD_DRINK_GRMS } from '../constants';



class AddDrinkButton extends React.Component {
  render() {
    const { addDrink, stdDrinks } = this.props;
    return (
      <View style={AddDrinkButtonStyles.container}>
        <Button
          onPress={()=>addDrink(STD_DRINK_GRMS*stdDrinks)}
          title={` +${stdDrinks} std drinks `}
          color="#841584"
          accessibilityLabel={`+${stdDrinks} std drinks`}
          />
      </View>
    )
  }
}

export default AddDrinkButton;
