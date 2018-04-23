import { Navigation } from 'react-native-navigation';
import DailyAnswerScreen from './dailyAnswer';
import WelcomeScreen from './welcome'

export function registerScreens() {
  Navigation.registerComponent('DailyAnswer', () => DailyAnswerScreen);
  Navigation.registerComponent('WelcomeScreen', () => WelcomeScreen);
}
