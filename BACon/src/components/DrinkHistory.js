import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

import DrinkHistoryStyles from './styles/DrinkHistoryStyles';

import Drink from './Drink';

class DrinkHistory extends React.Component {
  render() {
    const { drinks } = this.props;
    return (
      <View style={DrinkHistoryStyles.container}>
        <ScrollView>
          {
            drinks.map(drink =>
              <Drink drink={drink} key={drink.time} />)
          }
        </ScrollView>
      </View>
    )
  }
}

export default DrinkHistory;
