import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation"

import Home from '../screens/Home/index'
import DetailRoom from '../screens/DetailRoom/index'
import StatisticDay from '../screens/StatisticDay'
import ChangeCashHistory from '../screens/ChangeCashHistory/index'
import LiveCamera from '../screens/LiveCamera/index'
import ViewImage from '../screens/ViewImage/index'

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
    LiveCamera: {
      screen: LiveCamera
    },
    ViewImage: {
      screen: ViewImage
    }
  },
  {
    initialRouteName: "Home",
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);