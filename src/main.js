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
import calcReadableSoberTime from './calcReadableSoberTime'
import calcSoberIn from './calcSoberIn'

const STD_DRINK_GRMS = 10;  // grams of alcohol in a standard drink
const SEC_TO_HR = 1/3600;

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      bac: 0,
      displayBac: 0,
      drinks: [],
      limit: 0.05,
      soberIn: "00:00:00",
      soberAt: "Now",
      limitIn: "00:00:00",
      limitAt: "Below target",
      bodyWeightKg: 70,
      genderConstant: 0.68,    // male: 0.68, female: 0.55
      lastDrinkTime: "Never"
    }
  }

  componentDidMount () {
    setInterval(()=>{this.updateBac(this.state.drinks)}, 1000);
  }

  updateBac () {
    bac = this.state.bac;
    limit = this.state.limit;
    if (bac > 0) {
      bac -= SEC_TO_HR * 0.015;
      displayBac = bac.toFixed(3);  // display bac to 3 decimal places
      soberInMs = calcSoberIn(bac, 0);      // ms from now user will be sober
      soberIn = msToReadableTime(soberInMs);
    } else {
      bac = 0;
      displayBac = bac.toFixed(3);
      soberAt = "Now";
      soberIn = "00:00:00";
      this.setState({soberAt});
    }

    if (bac >= this.state.limit) {
      atLimitInMs = calcSoberIn(bac, this.state.limit);
      console.log(atLimitInMs);
      limitIn = msToReadableTime(atLimitInMs);
    } else {
      limitIn = "00:00:00";
      limitAt = "Below target";
      this.setState({limitAt});
    }
    this.setState({
      bac,
      displayBac,
      soberIn,
      limitIn
    });

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
    soberInMs = calcSoberIn(bac, 0);             // ms from add user will be sober
    soberIn = msToReadableTime(soberInMs);
    soberAt = calcReadableSoberTime(soberInMs); // day and time user will be sober
    atLimitInMs = calcSoberIn(bac, this.state.limit);
    lastDrinkTime = new Date().toTimeString().slice(0, 8);
    if (bac > this.state.limit) {
      limitIn = msToReadableTime(atLimitInMs);
      limitAt = calcReadableSoberTime(atLimitInMs);
      this.setState({
        limitIn,
        limitAt
      })
    }
    this.setState({
      bac,
      displayBac,
      drinks,
      soberIn,
      soberAt,
      lastDrinkTime
    });
  }

  render () {
    return (
      <View style={styles.container}>

        <Text style={styles.header}>
          Your BAC:
        </Text>
        <Text style={{paddingBottom: 3, fontSize: 25}}>
          {this.state.displayBac}
        </Text>

        <Text style={styles.header}>
          Sober in
        </Text>
        <Text style={{paddingBottom: 0, fontSize: 25}}>
          {this.state.soberIn}
        </Text>

        <Text style={styles.subHeader}>
          at
        </Text>
        <Text style={{paddingBottom: 20, fontSize: 20}}>
          {this.state.soberAt}
        </Text>

        <Text style={styles.header}>
          Target BAC (0.05) in
        </Text>
        <Text style={{paddingBottom: 0, fontSize: 25}}>
          {this.state.limitIn}
        </Text>

        <Text style={styles.subHeader}>
          at
        </Text>
        <Text style={{paddingBottom: 20, fontSize: 25}}>
          {this.state.limitAt}
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
