import { createStackNavigator, createAppContainer } from "react-navigation"

import Home from '../screens/Home/index'
import DetailRoom from '../screens/DetailRoom/index'
import StatisticDay from '../screens/StatisticDay'
import ChangeCashHistory from '../screens/ChangeCashHistory/index'
import ViewImage from '../screens/ViewImage/index'
import HistoryRoom from '../screens/HistoryRoom'
import Modal from '../screens/Modal'

const App = createStackNavigator(
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
    headerMode: 'none',
    transparentCard: true, // make the background of the screen is transparent if it is not defined background color: (by default it will have backgroundColor = 'white')
  }
);

const MainNavigation = createStackNavigator(
  {
    Modal: {
      screen: Modal
    },
    App: {
      screen: App
    }
  },
  {
    initialRouteName: "App",
    headerMode: 'none',
    mode: 'modal' // slide from the bottom to the top like as the animation of modal
  }
)

export default createAppContainer(MainNavigation);