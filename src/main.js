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
import calcReadableTime from './calcReadableTime'
import calcTimeTillBacInMs from './calcTimeTillBacInMs'

const STD_DRINK_GRMS = 10;  // grams of alcohol in a standard drink
const SEC_TO_HR = 1/3600;
const HR_TO_MS = 3600000;

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      bac: 0,
      displayBac: 0,
      drinks: [],
      limit: 0.05,
      soberIn: "00:00:00",
      soberAt: "You're sober",
      soberAtMs: 0,
      limitIn: "00:00:00",
      limitAt: "You're below the limit",
      limitAtMs: 0,
      bodyWeightKg: 70,
      genderConstant: 0.68,   // male: 0.68, female: 0.55}
      lastDrinkTime: "Never"
    }
  }

  componentDidMount () {
    setInterval(()=>{this.updateTimers()}, 1000);
    setInterval(()=>{this.updateState()}, 100000);
  }

  updateTimers() {
    var curTimeMs = new Date().getTime();
    // update sober in if has alc
    if (this.state.soberAtMs > curTimeMs) {
      let soberInMs = this.state.soberAtMs - curTimeMs;
      var soberIn = msToReadableTime(soberInMs);
      var soberAt = this.state.soberAt;
    } else {
      var soberAt = "You're sober";
      var soberIn = "00:00:00";
    }

    // update limit in
    if (this.state.limitAtMs > curTimeMs) {
      let limitInMs = this.state.limitAtMs - curTimeMs;
      var limitIn = msToReadableTime(limitInMs);
      var limitAt = this.state.limitAt;
    } else {
      var limitAt = "You're below the limit";
      var limitIn = "00:00:00";
    }
    this.setState({
      soberIn,
      soberAt,
      limitIn,
      limitAt
    });
  }

  updateState() {
    var curTimeMs = new Date().getTime();
    if (this.state.soberAtMs > curTimeMs) {
      var bac = this.bacFromSoberAt(this.state.soberAtMs);
      var displayBac = bac.toFixed(3);
      var soberAt = calcReadableTime(this.state.soberAtMs);
      } else {
        var soberAt = "Now";
        var bac = 0;
        var displayBac = 0;
      }

    // update limit state if above limit
    if (this.state.limitAtMs > curTimeMs) {
      var limitAt = calcReadableTime(this.state.limitAtMs);
    } else {
      var limitAt = "You're below the limit";
    }
    this.setState({
      bac,
      displayBac,
      soberAt,
      limitAt
    }, ()=> {this.updateTimers()});
  }

  bacFromSoberAt(soberAtMs) {
    let curTimeMs = new Date().getTime();
    let soberInMs = soberAtMs - curTimeMs;
    let bac = (soberInMs/HR_TO_MS)*0.016;
    return bac;
  }

  addDrink (gramsAlc) {
    // add new drink to drinks history
    let drinks = this.state.drinks.concat({
      time: new Date().getTime(),
      grams: gramsAlc
    });

    // update everything...
    if (this.state.soberAtMs < new Date().getTime()) {
      curSoberAtMs = new Date().getTime();
    } else {
      curSoberAtMs = this.state.soberAtMs;
    }
    let soberAtMs = this.timeTillBacAfterMoreAlc(gramsAlc, 0, curSoberAtMs);
    let limitAtMs = this.timeTillBacAfterMoreAlc(gramsAlc, this.state.limit, curSoberAtMs);
    this.setState({soberAtMs, limitAtMs}, ()=> {this.updateState()});
  }

  timeTillBacAfterMoreAlc(gramsAlc, Bac, initialTimeMs) {
      let extraBac = calcBac(gramsAlc, this.state.bodyWeightKg, this.state.genderConstant);
      let extraTimeMs = calcTimeTillBacInMs(extraBac, Bac);
      //console.log(msToReadableTime(extraTimeMs));
      let newTimeAtMs = initialTimeMs + extraTimeMs;
      return newTimeAtMs;
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Your BAC:
        </Text>
        <Text style={{paddingBottom: 10, fontSize: 40}}>
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
        <Text style={{paddingBottom: 10, fontSize: 20}}>
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
        <Text style={{paddingBottom: 20, fontSize: 20}}>
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
