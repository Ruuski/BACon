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
  chooseSex: {
    flex: 0.25,
  },
  chooseSexText: {
    fontSize: 16,
  },
  chooseBodyWeight: {
    flex: 0.25,
  },
  chooseBodyWeightText: {
    fontSize: 16,
  },
  chooseBodyWeightInput: {
    fontSize: 16,
    textAlign: 'center',
    width: 75,
  },
  chooseLimit: {
    flex: 0.25,
  },
  chooseLimitText: {
    fontSize: 16,
  },
  chooseLimitInput: {
    fontSize: 16,
    textAlign: 'center',
    width: 75,
  },
  updateButtonText: {
    marginTop: 10,
    textAlign: 'center'
  }
})

export default SettingsScreenStyles;
