import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'
import styles from './styles'
import dayOfWeekName from './dayOfWeekName'
import calcBac from './calcBac'

const STD_DRINK_GRMS = 10;  // grams of alcohol in a standard drink
const HR_TO_MS = 3600000;

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      displayBac: 0,
      drinks: [],
      soberIn: 0,
      soberAt: "Now",
      bodyWeightKg: 70,
      genderConstant: 0.68,    // male: 0.68, female: 0.55
      lastDrinkTime: "Never"
    }
  }

  componentDidMount () {

  }

  calcBac (drinks) {
    //calculate and return bac given from each drink
    bac = 0;
    for (i=0; i < drinks.length; i++) {
      bac += calcBac(drinks[i].grams, this.state.bodyWeightKg,
                     this.state.genderConstant, drinks[i].time);
    }
    return bac;
  }

  addDrink (gramsAlc) {
    // remove drinks giving -ive effect to bac, return new array
    drinks = this.removeNegDrinks(this.state.drinks);
    // add new drink
    drinks = drinks.concat({
      time: new Date().getTime(),
      grams: gramsAlc
    });
    bac = this.calcBac(drinks);
    soberIn = this.calcSoberIn(bac);      // ms from now user will be sober
    soberAt = this.calcSoberAt(soberIn);  // day and time user will be sober
    lastDrinkTime = new Date().toTimeString().slice(0, 8);
    displayBac = bac.toFixed(3);          // display bac to 3 decimal places
    this.setState({
      drinks,
      displayBac,
      soberIn,
      soberAt,
      lastDrinkTime
    });
  }

  calcSoberIn (bac) {
    return (bac/0.015)*HR_TO_MS;
  }

  calcSoberAt (soberIn) {
    soberAtMs = new Date().getTime() + soberIn;
    soberTime = new Date(soberAtMs)
    return dayOfWeekName(soberTime.getDay()) + ' ' + soberTime.toTimeString().slice(0, 8);
  }

  // returns array of drinks without drinks which are giving negative bac
  removeNegDrinks (drinks) {
    for (i=0; i < drinks.length; i++) {
      if (calcBac(drinks[i].grams, this.state.bodyWeightKg,
                  this.state.genderConstant, drinks[i].time) <= 0) {
        drinks.splice(i, 1);
      }
    }
    return drinks;
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Sober:
        </Text>
        <Text style={{paddingBottom: 10, fontSize: 25}}>
          {this.state.soberAt}
        </Text>
        <Text style={styles.header}>
          BAC:
        </Text>
        <Text style={{paddingBottom: 10, fontSize: 25}}>
          {this.state.displayBac}
        </Text>
        <Text style={styles.header}>
          Last drink at:
        </Text>
        <Text style={{fontSize: 25}}>
          {this.state.lastDrinkTime}
        </Text>
        <View style={styles.addDrinkBtn}>
          <Button
            onPress={()=>this.addDrink(STD_DRINK_GRMS)}
            title=" +1 Standard Drink "
            color="#841584"
            accessibilityLabel="+1 Std Drink"
          />
        </View>
      </View>
    )
  }
}

export default Main
