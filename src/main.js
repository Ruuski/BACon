import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'
import styles from './styles'

//  of alcohol in a standard drink
const STD_DRINK_GRMS = 10;
const KG_TO_GRMS = 1000;
const MS_TO_HR = 1/3600000;

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      bac: 0,
      drinks: [
        {
          time: new Date().getTime() - 3600000*2,
          grams: STD_DRINK_GRMS,
          old: true

        }],
      soberIn: 0,
      drinksHad: 0,
      bodyWeightKg: 76,
      genderConstant: 0.68    // male: 0.68, female: 0.55
    }
  }

  componentDidMount () {

  }

  updateBac () {
    bac = this.state.bac;
    for (i=0; i < this.state.drinks.length; i++) {
      bac += calcBac(this.state.drinks[i].grams, this.state.bodyWeightKg,
                     this.state.genderConstant, this.state.drinks[i].time);
    }
    console.log('bac:', bac);
  }

  addDrink (gramsAlc) {
    // remove drinks giving -ive effect to bac
    drinks = this.removeNegDrinks(this.state.drinks);
    // add new drink
    drinks = drinks.concat({
      time: new Date().getTime(),
      grams: gramsAlc
    });
    console.log(drinks);
    this.setState(
      {drinks},
      ()=>this.updateBac()
    );
  }

  // returns array of drinks without drinks which are giving negative bac
  removeNegDrinks (drinks) {
    //console.log(drinks);
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
        <Text style={{padding: 0}}>
          Last drink at: {this.state.lastDrinkTime}
        </Text>
        <View style={styles.addDrinkBtn}>
          <Button
            onPress={()=>this.addDrink(STD_DRINK_GRMS)}
            title="+1 Std Drink"
            color="#841584"
            accessibilityLabel="+1 Std Drink"
          />
        </View>
      </View>
    )
  }
}

calcBac = (gramsAlc, bodyWeightKg, genderConstant, timeIngested) => {
  curDate = new Date().getTime();
  hrsElapsed = (curDate - timeIngested) * MS_TO_HR;
  bodyWeightGrams = bodyWeightKg * KG_TO_GRMS;
  return (gramsAlc / (bodyWeightGrams * genderConstant)) * 100 - (hrsElapsed * 0.015);
}

export default Main
