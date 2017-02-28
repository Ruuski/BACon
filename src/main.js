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
import msToReadableTime from './msToReadableTime'

const STD_DRINK_GRMS = 10;  // grams of alcohol in a standard drink
const HR_TO_MS = 3600000;
const SEC_TO_HR = 1/3600;

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      bac: 0,
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
    setInterval(()=>{this.updateBac(this.state.drinks)}, 1000);
  }

  updateBac () {
    //calculate and return bac given from each drink
    bac = this.state.bac;
    if (bac > 0) {
      bac -= SEC_TO_HR * 0.015;
      displayBac = bac.toFixed(3);  // display bac to 3 decimal places
      soberInMs = this.calcSoberIn(bac);      // ms from now user will be sober
      soberIn = msToReadableTime(soberInMs);
      this.setState({
        bac,
        displayBac,
        soberIn
      });
    } else {
      bac = 0;
      displayBac = bac.toFixed(3);
      this.setState({
        bac,
        displayBac
      });
    }
    console.log(soberIn);
  }

  addDrink (gramsAlc) {
    // add new drink
    drinks = this.state.drinks.concat({
      time: new Date().getTime(),
      grams: gramsAlc
    });
    bac = this.state.bac;
    bac += calcBac(STD_DRINK_GRMS, this.state.bodyWeightKg, this.state.genderConstant);
    displayBac = bac.toFixed(3);
    soberInMs = this.calcSoberIn(bac);      // ms from now user will be sober
    soberIn = msToReadableTime(soberInMs);
    console.log(soberIn);
    soberAt = this.calcSoberAt(soberInMs);  // day and time user will be sober
    lastDrinkTime = new Date().toTimeString().slice(0, 8);
    this.setState({
      bac,
      displayBac,
      drinks,
      soberIn,
      soberAt,
      lastDrinkTime
    });
  }

  calcSoberIn (bac) {
    return (bac/0.015)*HR_TO_MS;
  }

  calcSoberAt (soberInMs) {
    soberAtMs = new Date().getTime() + soberInMs;
    soberTime = new Date(soberAtMs)
    return dayOfWeekName(soberTime.getDay()) + ' ' + soberTime.toTimeString().slice(0, 8);
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
