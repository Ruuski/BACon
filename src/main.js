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
      soberAt: "Now",
      soberAtMs: 0,
      limitIn: "00:00:00",
      limitAt: "Below limit",
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
    if (this.state.soberAt != "Now") {
      let curTimeMs = new Date().getTime();
      let soberInMs = this.state.soberAtMs - curTimeMs;
      let soberIn = msToReadableTime(soberInMs);
      this.setState({soberIn});
    }
  }

  updateState() {
    if (this.state.soberAtMs > new Date().getTime()) {
      bac = this.calcBacFromSoberAt(this.state.soberAtMs);
      let displayBac = bac.toFixed(3);
      let soberAt = calcReadableTime(this.state.soberAtMs);
      this.setState({
        bac,
        displayBac,
        soberAt
      }, ()=> {this.updateTimers()});

      // Update Target BAC if necissary
      if (bac - this.state.limit > 0) {


      }



    } else {
      this.setState({soberAt: "Now"});
    }
  }


  calcTimeTillBacAfterMoreAlc(gramsAlc, Bac, initialTimeMs) {
    let extraBac = calcBac(gramsAlc, this.state.bodyWeightKg, this.state.genderConstant);
    let extraTimeMs = calcTimeTillBacInMs(extraBac, Bac);
    //console.log(msToReadableTime(extraTimeMs));
    let newTimeAtMs = initialTimeMs + extraTimeMs;
    return newTimeAtMs;
  }

  calcBacFromSoberAt(soberAtMs) {
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
      this.updateSoberAtMsAndState(gramsAlc);
      // update soberAtMs and limitAtMs to appropriate value, depending on if user currently
      // is sober or now
      //console.log(this.state.soberAtMs, this.state.limitAtMs);

    }

    updateSoberAtMsAndState(gramsAlc) {
      if (this.state.soberAtMs < new Date().getTime()) {
        curSoberAtMs = new Date().getTime();
      } else {
        curSoberAtMs = this.state.soberAtMs;
      }

      //console.log(msToReadableTime(curLimitAtMs), msToReadableTime(curSoberAtMs));
      let soberAtMs = this.calcTimeTillBacAfterMoreAlc(gramsAlc, 0, curSoberAtMs);
      // set times limit and sober will be reached. can now calc everything else.
      this.setState({soberAtMs}, ()=> {this.updateState()});
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
