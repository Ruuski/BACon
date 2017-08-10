import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import BacScreen from './components/BacScreen';
import SettingsScreen from './components/SettingsScreen';

const App = StackNavigator({
  BacScreen: { screen: BacScreen },
  SettingsScreen: { screen: SettingsScreen },
});


export default class Root extends Component {
  render() {
    return (
      <App />
    )
  }
}
