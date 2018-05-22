import { MainScreen } from './MainScreen'
import { Login } from "./screens/Login";
import { NavigationRouteConfigMap } from 'react-navigation';
import AddEditEntry from "./screens/AddEditEntry";
import HomeScreen from './screens/Home';
import KindnessPage from './screens/KindnessPage';
import MyDiary from "./screens/MyDiary";

const Routes: NavigationRouteConfigMap = {
  // tslint:disable:object-literal-sort-keys
  Home: { screen: HomeScreen },


  Main: { screen: MainScreen },
  Login: { screen: Login },
  AddEditEntry: { screen: AddEditEntry },
  KindnessPage: { screen: KindnessPage },
  MyDiary: { screen: MyDiary }
}

export default Routes;