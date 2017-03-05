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
      profile: {
        bodyWeightKg: 70,
        genderConstant: 0.68    // male: 0.68, female: 0.55}
      },
      lastDrinkTime: "Never"
    }
  }

  componentDidMount () {
    setInterval(()=>{this.updateState()}, 1000);
  }

  updateTimers() {
    if (this.state.soberAt != "Now") {
      let soberInMs = this.state.soberAtMs - new Date().getTime();
      let soberIn = msToReadableTime(soberInMs);
      this.setState({soberIn});
    }
  }

  updateState() {
    if (this.state.soberAtMs > new Date().getTime()) {
      let bac = this.calcBacFromSoberAt(this.state.soberAtMs);
      let displayBac = bac.toFixed(3);

      let curTimeMs = new Date().getTime();
      let soberInMs = this.state.soberAtMs - curTimeMs;
      let soberIn = msToReadableTime(soberInMs);
      let soberAt = calcReadableTime(this.state.soberAtMs);

      this.setState({
        bac,
        displayBac,
        soberIn,
        soberAt,
      });
    } else {
      this.setState({soberAt: "Now"});
    }

    if (this.state.limitAtMs > new Date().getTime()) {
      let curTimeMs = new Date().getTime();
      let limitInMs = this.state.limitAtMs - curTimeMs;
      let limitIn = msToReadableTime(limitInMs);
      let limitAt = calcReadableTime(this.state.limitAtMs);
      this.setState({
        limitIn,
        limitAt
      });
    } else {
      this.setState({limitAt: "Below limit"});
    }

  }


  calcTimeTillBacAfterMoreAlc(gramsAlc, Bac, initialTimeMs) {
    let extraBac = calcBac(gramsAlc, this.state.profile.bodyWeightKg, this.state.profile.genderConstant);
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
      // update soberAtMs and limitAtMs to appropriate value, depending on if user currently
      // is sober or now
      //console.log(this.state.soberAtMs, this.state.limitAtMs);
      if (this.state.soberAtMs < new Date().getTime()) {
        curSoberAtMs = new Date().getTime();
      } else {
        curSoberAtMs = this.state.soberAtMs;
      }
      if (this.state.limitAtMs < new Date().getTime()) {
        curLimitAtMs = new Date().getTime();
      } else {
        curLimitAtMs = this.state.limitAtMs;
      }
      //console.log(msToReadableTime(curLimitAtMs), msToReadableTime(curSoberAtMs));
      let soberAtMs = this.calcTimeTillBacAfterMoreAlc(gramsAlc, 0, curSoberAtMs);
      let limitAtMs = this.calcTimeTillBacAfterMoreAlc(gramsAlc, this.state.limit, curLimitAtMs);
      console.log(msToReadableTime(limitAtMs), msToReadableTime(soberAtMs));
      // set times limit and sober will be reached. can now calc everything else.
      this.setState({
        soberAtMs,
        limitAtMs
      }, ()=> {this.updateState()});
    }

    // updateBac () {
    //   bac = this.state.bac;
    //   limit = this.state.limit;
    //   if (bac > 0) {
    //     bac -= SEC_TO_HR * 0.015;
    //     displayBac = bac.toFixed(3);  // display bac to 3 decimal places
    //     soberInMs = calcSoberIn(bac, 0);      // ms from now user will be sober
    //     soberIn = msToReadableTime(soberInMs);
    //   } else {
    //     bac = 0;
    //     displayBac = bac.toFixed(3);
    //     soberAt = "Now";
    //     soberIn = "00:00:00";
    //     this.setState({soberAt});
    //   }
    //
    //   if (bac >= this.state.limit) {
    //     atLimitInMs = calcSoberIn(bac, this.state.limit);
    //     limitIn = msToReadableTime(atLimitInMs);
    //   } else {
    //     limitIn = "00:00:00";
    //     limitAt = "Below target";
    //     this.setState({limitAt});
    //   }
    //   this.setState({
    //     bac,
    //     displayBac,
    //     soberIn,
    //     limitIn
    //   });
    // }


  // addDrink (gramsAlc) {
  //   // add new drink
  //   drinks = this.state.drinks.concat({
  //     time: new Date().getTime(),
  //     grams: gramsAlc
  //   });
  //   bac = this.state.bac;
  //   bac += calcBac(STD_DRINK_GRMS, this.state.profile.bodyWeightKg, this.state.profile.genderConstant);
  //   displayBac = bac.toFixed(3);
  //   soberInMs = calcSoberIn(bac, 0);             // ms from add user will be sober
  //   soberIn = msToReadableTime(soberInMs);
  //   soberAt = calcReadableSoberTime(soberInMs); // day and time user will be sober
  //   atLimitInMs = calcSoberIn(bac, this.state.limit);
  //   lastDrinkTime = new Date().toTimeString().slice(0, 8);
  //   if (bac > this.state.limit) {
  //     limitIn = msToReadableTime(atLimitInMs);
  //     limitAt = calcReadableSoberTime(atLimitInMs);
  //     this.setState({
  //       limitIn,
  //       limitAt
  //     })
  //   }
  //   this.setState({
  //     bac,
  //     displayBac,
  //     drinks,
  //     soberIn,
  //     soberAt,
  //     lastDrinkTime
  //   });
  // }

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
