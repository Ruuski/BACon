import { StyleSheet } from 'react-native';

const SettingsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: 'powderblue',
    // alignItems: '',
  },

  header: {
    flex: 0.25,
  },

  title: {
    fontSize: 40,
    color: 'black',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  chooseSex: {
    flex: 0.25,
  },
  chooseSexText: {
    fontSize: 20,
  },
  chooseBodyWeight: {
    flex: 0.25,
  },
  chooseBodyWeightText: {
    fontSize: 20,
  },
  chooseBodyWeightInput: {
    fontSize: 20,
    textAlign: 'center',
    width: 75,
  },
  chooseLimit: {
    flex: 0.25,
  },
  chooseLimitText: {
    fontSize: 20,
  },
  chooseLimitInput: {
    fontSize: 20,
    textAlign: 'center',
    width: 75,
  },
  updateButtonText: {
    marginTop: 10,
    textAlign: 'center'
  }
})

export default SettingsScreenStyles;
