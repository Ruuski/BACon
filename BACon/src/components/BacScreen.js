import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
// import style
import BacScreenStyles from './styles/BacScreenStyles';
// import helpers
import bacFromAlc from '../helpers/bacFromAlc';
import bacFromSoberAt from '../helpers/bacFromSoberAt';
import formatCountdown from '../helpers/formatCountdown';
import timeTillBac from '../helpers/timeTillBac';
import addToBac from '../helpers/addToBac';
import formatAMPM from '../helpers/formatAMPM';
// import components
import BacDisplay from './BacDisplay';
import SoberInfo from './SoberInfo';
import TargetInfo from './TargetInfo';
import AddDrinkButton from './AddDrinkButton';
import DrinkHistory from './DrinkHistory';
import StdDrinkSlider from './StdDrinkSlider';
import ConfigBar from './ConfigBar';

import { STD_DRINK_GRMS,
  SEC_TO_HR, HR_TO_MS,
  M_GENDER_CONSTANT,
  F_GENDER_CONSTANT }
  from '../constants';

class BacScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      bac: 0,
      displayBac: "0.000",
      drinks: [],
      limit: "0.050",
      soberIn: "00:00:00",
      soberAt: "You're sober",
      soberAtMs: 0,
      limitIn: "00:00:00",
      limitAt: "You're below the limit",
      limitAtMs: 0,
      bodyWeightKg: 70,
      genderConstant: M_GENDER_CONSTANT,
      lastDrinkTime: "Never",
      sliderValue: "1.0",
      projectedBac: 0,
      sliderMessage: " "
    }
    this.addDrink = this.addDrink.bind(this);
    this.updateSliderValue = this.updateSliderValue.bind(this);
  }

  static navigationOptions = {
    title: 'Your BAC Overview',
  };

  componentDidMount() {
    this.timerInterval = setInterval(()=>{this.updateTimers()}, 1000);
    this.stateInterval = setInterval(()=>{this.updateStats()}, 100000);
    // update projeced BAC on mount
    this.updateSliderValue(this.state.sliderValue);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
    clearInterval(this.stateInterval);
  }

  updateTimers() {
    const curTimeMs = new Date().getTime();
    const { soberAtMs, limitAtMs } = this.state;
    // update time until sober unless sober
    if (soberAtMs > curTimeMs) {
      const soberInMs = soberAtMs - curTimeMs;
      const soberAt = formatAMPM(new Date(soberAtMs));
      const soberIn = formatCountdown(soberInMs);
      this.setState({ soberIn, soberAt });
    // no alcohol in system, set clocks to 0
    } else {
      const soberIn = "00:00:00";
      const soberAt = "You're sober";
      this.setState({ soberIn, soberAt });
    }

    // update time until at limit unless at limit
    if (limitAtMs > curTimeMs) {
      const limitInMs = limitAtMs - curTimeMs;
      const limitAt = formatAMPM(new Date(limitAtMs));
      const limitIn = formatCountdown(limitInMs);
      this.setState({ limitIn, limitAt });
    // below limit, set clocks to 0
    } else {
      const limitIn = "00:00:00";
      const limitAt = "You're below the limit";
      this.setState({ limitIn, limitAt });
    }
  }

  // update related statistics ie the BAC, time till sober
  updateStats() {
    const { soberAtMs, limitAtMs } = this.state;
    const curTimeMs = new Date().getTime();

    // update stats unless no alcohol in system
    if (soberAtMs > curTimeMs) {
      const bac = bacFromSoberAt(soberAtMs);
      const displayBac = bac.toFixed(3);
      const soberAt = formatAMPM(new Date(soberAtMs));
      this.setState({ bac, displayBac, soberAt });
    } else {
      const bac = 0;
      const displayBac = 0;
      const soberAt = "Now";
      this.setState({ bac, displayBac, soberAt });
    }

    // update limit state if above limit
    if (limitAtMs > curTimeMs) {
      const limitAt = formatAMPM(new Date(limitAtMs));
      this.setState({ limitAt });
    } else {
      const limitAt = "You're below the limit";
      this.setState({ limitAt });
    }

    // updatetimers so interface seemingly updates together
    this.updateTimers();
  }

  addDrink(gramsAlc) {
    const { limit, genderConstant, bodyWeightKg, sliderValue } = this.state;
    const curTimeMs = new Date().getTime();
    // add new drink to drinks history
    const drinks = this.state.drinks.concat({
      time: curTimeMs,
      grams: gramsAlc
    });

    // if we're already past sober time, set so that we're sober now
    // otherwise it will be calculated that we were sober in the past and be
    // incorrect
    const curSoberAtMs =
      this.state.soberAtMs < curTimeMs ? curTimeMs : this.state.soberAtMs;

    const soberAtMs = addToBac(gramsAlc, 0, curSoberAtMs, bodyWeightKg, genderConstant);
    const limitAtMs = addToBac(gramsAlc, limit, curSoberAtMs, bodyWeightKg, genderConstant);
    this.setState({drinks, soberAtMs, limitAtMs}, ()=> {
      // after new times are set, update the stats and the slider value
      this.updateStats();
      this.updateSliderValue(sliderValue);
    });
  }

  updateSliderValue(sliderValue) {
    const curTimeMs = new Date().getTime();
    const { bodyWeightKg, genderConstant, limit } = this.state;
    // if we're already past sober time, set so that we're sober now
    // otherwise it will be calculated that we were sober in the past and be
    // incorrect
    const curSoberAtMs =
      this.state.soberAtMs < curTimeMs ? curTimeMs : this.state.soberAtMs;
    const gramsAlc = sliderValue*10;
    const soberAtMs = addToBac(gramsAlc, 0, curSoberAtMs, bodyWeightKg, genderConstant);
    const projectedLimitAt = addToBac(gramsAlc, limit, curSoberAtMs, bodyWeightKg, genderConstant);
    const bac = bacFromSoberAt(soberAtMs);
    const projectedBac = bac.toFixed(3);
    if (projectedLimitAt > curTimeMs) {
      const sliderMessage = `You would reach your limit at ${formatAMPM(new Date(projectedLimitAt))}`;
      this.setState({sliderValue, projectedBac, sliderMessage});
    } else {
      const sliderMessage = " ";
      this.setState({sliderValue, projectedBac, sliderMessage});
    }
  }

  updateProfile(bodyWeightKg, genderConstant) {
    this.setState({bodyWeightKg, genderConstant})
  }

  render () {
    const { navigate } = this.props.navigation;
    const {
      displayBac,
      soberAt,
      soberIn,
      limitAt,
      limitIn,
      limit,
      drinks,
      sliderValue,
      projectedBac,
      sliderMessage
    } = this.state;
    return (
      <View style={BacScreenStyles.container}>
        <ScrollView>
          <View style={BacScreenStyles.displayBacs}>
            <BacDisplay displayBac={displayBac} title={"Your BAC"} />
            <BacDisplay displayBac={limit} title={"Your Limit"} />
          </View>
          <View style={BacScreenStyles.displayInfo}>
            <SoberInfo soberAt={soberAt} soberIn={soberIn} />
            <TargetInfo limitAt={limitAt} limitIn={limitIn} />
          </View>
          <View style={BacScreenStyles.addDrinkButton}>
            <AddDrinkButton addDrink={this.addDrink} stdDrinks={sliderValue} />
          </View>
          <View style={BacScreenStyles.stdDrinkSlider}>
            <StdDrinkSlider
            updateSliderValue={this.updateSliderValue}
            projectedBac={projectedBac}
            sliderMessage={sliderMessage}
            />
          </View>
          <View style={BacScreenStyles.drinkHistory}>
            <DrinkHistory drinks={drinks}/>
          </View>
        </ScrollView>
        <TouchableOpacity style={BacScreenStyles.configBar} onPress={() => navigate('SettingsScreen')}>
          <ConfigBar />
        </TouchableOpacity>
      </View>
    )
  }
}


export default BacScreen;
