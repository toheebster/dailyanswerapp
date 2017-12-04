import { Navigation } from 'react-native-navigation';
import DailyAnswerScreen from './dailyAnswer';

export function registerScreens() {
  Navigation.registerComponent('DailyAnswer', () => DailyAnswerScreen);
}
