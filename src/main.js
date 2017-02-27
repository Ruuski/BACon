import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'
import styles from './styles'

// grams of alcohol in a standard drink
const STD_DRINK_GRMS = 10;
const KG_TO_GRMS = 1000;

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      Bac: 0,
      drinks: [{
        time: new Date().getTime(),
        grams: 0
      }],
      soberIn: 0,
      drinksHad: 0,
      bodyWeightKg: 60,
      genderConstant: 0.68    // male: 0.68, female: 0.55
    }
  }

  componentDidMount () {


  }

  bacCalc (initBac, gramsAlc, bodyWeightKg, genderConstant) {
    bodyWeightGrams = bodyWeightKg * KG_TO_GRMS;
    return initBac + (gramsAlc / (bodyWeightGrams*genderConstant))*100;
  }


  addDrink (gramsAlc) {
    drinksHad = this.state.drinksHad + 1;
    Bac = this.bacCalc(this.state.Bac, STD_DRINK_GRMS, this.state.bodyWeightKg,
                  this.state.genderConstant);
    lastDrinkTime = new Date().getTime();
    console.log('date:', lastDrinkTime);
    this.setState({
      drinksHad,
      Bac,
      lastDrinkTime

    });
    // console.log('BAC:', this.state.Bac, 'Drinks:', this.state.drinksHad);
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
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    )
  }
}

export default Main
