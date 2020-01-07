import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from '../styles'
import _ from 'lodash'
import HistoryItem from '../../../components/HistoryItem/index'

export default class HistoryList extends Component {

  shouldComponentUpdate(nextprops) {
    if (!_.isEqual(nextprops.roomsData, this.props.roomsData)) {
      return true
    }
    return false
  }


  render() {
    console.log('%c%s', 'color: #f2ceb6', 'Rendering HistoryList');
    const { roomsData, historyData } = this.props
    return (
      <View style={{ width: '100%', flex: 1 }}>
        <FlatList
          data={this.state.history}
          scrollEnabled
          bounces={true}
          keyExtractor={item => item.itemID}
          renderItem={({ item, index }) => <HistoryItem roomNumber={item.roomNumber} time={item.time} tagName={item.tagName} note={item.note} total={item.total} status={item.status} />}
        />
      </View>
    )
  }
}
