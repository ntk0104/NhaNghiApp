import { createStackNavigator, createAppContainer } from "react-navigation"

import Home from '../screens/Home/index'
import DetailRoom from '../screens/DetailRoom/index'
import StatisticDay from '../screens/StatisticDay'
import ChangeCashHistory from '../screens/ChangeCashHistory/index'
import ViewImage from '../screens/ViewImage/index'
import HistoryRoom from '../screens/HistoryRoom'

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
    ViewImage: {
      screen: ViewImage
    },
    HistoryRoom: {
      screen: HistoryRoom
    }
  },
  {
    initialRouteName: "Home",
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);