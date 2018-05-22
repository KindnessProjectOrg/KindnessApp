import { StackNavigator } from 'react-navigation'
import Routes from "./Routes";
import { Initialize } from './lib/Api';

Initialize();

export default StackNavigator(Routes);