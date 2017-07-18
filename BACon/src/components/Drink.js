import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { STD_DRINK_GRMS } from '../constants'
import DrinkStyles from './styles/DrinkStyles';
import formatAMPM from '../helpers/formatAMPM';

class Drink extends React.Component {
  render() {
    const drink = this.props.drink;
    const stdDrinks = drink.grams/STD_DRINK_GRMS;
    return (
      <View style={DrinkStyles.container}>
        <View style={DrinkStyles.info}>
          <Text>
            Standard Drinks: {stdDrinks}
          </Text>
          <Text>
            Consumed at: {formatAMPM(new Date(drink.time))}
          </Text>
        </View>
        <View style={DrinkStyles.removeButton}>

        </View>
      </View>
    )
  }
}

export default Drink;
