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
    fontSize: 20,
    textAlign: 'center'
  },
  chooseBodyWeight: {
    flex: 0.25,
    fontSize: 20,
    textAlign: 'center'
  }
})

export default SettingsScreenStyles;
