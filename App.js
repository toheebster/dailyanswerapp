import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DailyAnswerScreen from './src/dailyAnswer';
import { StackNavigator } from 'react-navigation';

export default class App extends React.Component {
  static navigationOptions = {
    title: "The Daily Answer"
  }
  render() {
    return (
      <DailyAnswerScreen>
      </DailyAnswerScreen>
    )
  }
}

const DailyAnswerApp = StackNavigator({
  Home: {screen: App}
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
