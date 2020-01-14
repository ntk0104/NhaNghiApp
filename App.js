import React, { Component } from 'react'
import RootNavigation from './src/config/config.route'
import { Provider } from 'react-redux'
import { store } from './src/redux/store/index'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    )
  }
}