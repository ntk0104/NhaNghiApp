import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation"

import Home from '../screens/Home/index'
import DetailRoom from '../screens/DetailRoom/index'


const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    DetailRoom: {
      screen: DetailRoom
    },
  },
  {
    initialRouteName: "Home",
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);