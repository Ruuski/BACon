import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import BacScreen from './components/BacScreen';

// import SetupScreen from './SetupScreen';

const App = StackNavigator({
  BacScreen: { screen: BacScreen },
});


export default class Root extends Component {
  render() {
    return (
      <App />
    )
  }
}
