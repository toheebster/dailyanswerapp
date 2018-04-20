import { Navigation } from 'react-native-navigation';
import DailyAnswerScreen from './dailyAnswer';
import WelcomeModal from './welcome'

export function registerScreens() {
  Navigation.registerComponent('DailyAnswer', () => DailyAnswerScreen);
  Navigation.registerComponent('WelcomeModal', () => WelcomeModal);
}
