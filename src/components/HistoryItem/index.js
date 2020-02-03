import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import moment from 'moment'
import _ from 'lodash'

export default class HistoryItem extends Component {

  shouldComponentUpdate(nextprops) {
    if (!_.isEqual(nextprops.item, this.props.item)) {
      return true
    }
    return false
  }

  navigateToDetail = () => {
    const { roomName, total, sectionID, timeIn, timeOut, tag, addedTime } = this.props.item
    if (timeOut != 0 && timeIn != 0) {
      this.props.navigation.navigate('HistoryRoom', { sectionID: sectionID })
    } else {
      const payload = { id: roomName }
      this.props.navigation.navigate('DetailRoom', { payload })
    }
  }

  render() {
    const { roomName, total, sectionID, timeIn, timeOut, tag, addedTime } = this.props.item
    //console.log("TCL: HistoryItem -> render -> render ", roomName)
    return (
      <TouchableOpacity style={[styles.container, { backgroundColor: addedTime == timeIn ? '#52BE80' : '#CB4335' }]} onPress={this.navigateToDetail}>
        <View style={{ flex: 1 }}>
          <View style={styles.roomNumber}>
            <Text style={styles.roomNumberTxt}>{roomName}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.timeWrapper}>
            {
              addedTime == timeIn ?
                <Text style={styles.timeNumberTxt}>Vào</Text>
                :
                <Text style={styles.timeNumberTxt}>Ra</Text>
            }
            {
              addedTime == timeIn ?
                <Text style={styles.timeNumberTxt}>{moment(timeIn).format('HH:mm')}</Text>
                :
                <Text style={styles.timeNumberTxt}>{moment(timeOut).format('HH:mm')}</Text>
            }
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={[styles.tagWrapper, { borderWidth: 2, borderColor: 'white', backgroundColor: tag == 'DG' ? '#7D3C98' : (tag == 'CD' ? '#28B463' : '#3498DB') }]}>
            <Text style={styles.roomNumberTxt}>{tag}</Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {
            addedTime == timeIn ?
              <Text style={styles.timeNumberTxt}>0 K</Text>
              :
              <Text style={styles.timeNumberTxt}>{total} K</Text>
          }
        </View>
      </TouchableOpacity>
    )
  }
}
