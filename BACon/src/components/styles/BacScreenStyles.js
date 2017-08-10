import { StyleSheet } from 'react-native';

const BacScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  displayBacs: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth: 1,
  },
  displayInfo: {
    justifyContent: 'center',
    flexDirection: 'row',
    // borderWidth: 1
  },
  slider: {
    padding: 15,
    // borderWidth: 1
  },
  addDrinkButton: {
    // borderWidth: 1
  },
  stdDrinkSlider: {
    padding: 15,
    // borderWidth: 1
  },
  drinkHistory: {
    padding: 20,
    // borderWidth: 1
  },
  configBar: {
    // flex: 10,
    padding: 5,
    backgroundColor: 'grey',
    // borderWidth: 1
  }
})

export default BacScreenStyles;
