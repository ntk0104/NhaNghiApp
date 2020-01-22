import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation"

import Home from '../screens/Home/index'
import DetailRoom from '../screens/DetailRoom/index'
import StatisticDay from '../screens/StatisticDay'
import ChangeCashHistory from '../screens/ChangeCashHistory/index'


const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    DetailRoom: {
      screen: DetailRoom
    },
    StatisticDay: {
      screen: StatisticDay
    },
    ChangeCashHistory: {
      screen: ChangeCashHistory
    },
  },
  {
    initialRouteName: "Home",
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);