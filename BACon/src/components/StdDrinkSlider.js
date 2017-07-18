import React, { Component } from 'react';
import { Text, View, Slider } from 'react-native';

import StdDrinkSliderStyles from './styles/StdDrinkSliderStyles';

class StdDrinkSlider extends React.Component {
  render() {
    const { updateSliderValue, projectedBac, sliderMessage } = this.props;
    return (
      <View style={StdDrinkSliderStyles.container}>
        <Slider
          value={1}
          maximumValue={2.5}
          minimumValue={0.5}
          step={0.1}
          onValueChange={(val) => updateSliderValue((val).toFixed(1))}
          />
        <View style={StdDrinkSliderStyles.projectedBac}>
          <Text>
            Projected BAC: {projectedBac}
          </Text>
          <Text>
            {sliderMessage}
          </Text>
        </View>
      </View>

    )
  }
}

export default StdDrinkSlider;
