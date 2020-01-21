import React, { Component } from 'react'
import _ from 'lodash'
import HistoryItem from '../../../components/HistoryItem/index'
import { connect } from 'react-redux';
import { makeGetHistoryRoom } from '../../../redux/selectors/index'
import { createStructuredSelector } from 'reselect';
import { View, FlatList } from 'react-native'

class HistoryList extends Component {

  shouldComponentUpdate(nextprops) {
    if (!_.isEqual(nextprops.historyRoom, this.props.historyRoom)) {
      return true
    }
    return false
  }


  render() {
    //console.log('%c%s', 'color: #f2ceb6', 'Rendering HistoryList');
    return (
      <View style={{ width: '100%', flex: 1 }}>
        <FlatList
          data={this.props.historyRoom}
          scrollEnabled
          bounces={true}
          keyExtractor={item => item.addedTime + ''}
          renderItem={({ item, index }) => <HistoryItem item={item} />}
        />
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  historyRoom: makeGetHistoryRoom()
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryList)
