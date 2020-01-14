import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'
import _ from 'lodash'
import moment from 'moment'

export default class RoomItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      livingTimeString: null
    }
  }

  componentDidMount() {
    this.exportLivingTimeToString(moment().valueOf(), this.props.timeIn)
  }

  componentDidUpdate() {
    if (this.props.tag != '') {
      setInterval(() => this.exportLivingTimeToString(moment().valueOf(), this.props.timeIn), 60000)
    }
  }

  calculateLivingTime = (newTime, oldTime) => {
    let diffTimestamp = newTime - oldTime
    const diffDays = Math.floor(moment.duration(diffTimestamp).asDays())
    if (diffDays > 0) {
      diffTimestamp = diffTimestamp - diffDays * 24 * 60 * 60 * 1000
    }
    const diffHours = Math.floor(moment.duration(diffTimestamp).asHours())
    if (diffHours > 0) {
      diffTimestamp = diffTimestamp - diffHours * 60 * 60 * 1000
    }
    const diffMinutes = Math.floor(moment.duration(diffTimestamp).asMinutes())
    const durationObj = {
      days: diffDays,
      hours: diffHours,
      minutes: diffMinutes
    }
    return durationObj
  }

  exportLivingTimeToString = (newTime, oldTime) => {
    let livingTimeObj = this.calculateLivingTime(newTime, oldTime)
    const { days, hours, minutes } = livingTimeObj
    let livingTime = ''
    if (days > 0) {
      livingTime += days + ' ngày '
    }
    if (hours > 0) {
      livingTime += hours + ' giờ '
    }
    livingTime += minutes + ' phút'
    this.setState({ livingTimeString: livingTime })
  }

  clickRoom = () => {
    const { id, roomName, roomStatus, timeIn, chargedItems, note, tag, sectionRoom, fan_hour_price, air_hour_price, overnight_price, limitSection, limitMidnight, type } = this.props
    if (roomStatus == 'available') {
      // get room
      this.props.onGetRoom(id, roomName)
    } else {
      // see room detail
      this.props.showRoomDetail({ id, roomName, timeIn, chargedItems, note, tag, sectionRoom, fan_hour_price, air_hour_price, overnight_price, limitSection, limitMidnight, type })
    }
  }

  render() {
    console.log('%c%s', 'color: #00a3cc', "rendering room " + this.props.id);
    const { id, roomName, roomStatus, timeIn, chargedItems, note, tag, fan_hour_price, air_hour_price, overnight_price, limitSection, limitMidnight, type } = this.props
    const { livingTimeString } = this.state
    return (
      <TouchableOpacity style={[styles.roomContainer, { backgroundColor: roomStatus == 'available' ? 'white' : '#F1948A' }]} onPress={this.clickRoom}>
        <View style={styles.roomNumberWrapper}>
          <Text style={styles.roomNumberTxt}>{roomName}</Text>
          {
            type == '2beds' &&
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
              <Icon type='FontAwesome' name='bed' style={{ color: 'white', fontSize: 15 }} />
              <Icon type='FontAwesome' name='bed' style={{ color: 'white', fontSize: 15 }} />
            </View>
          }
          {
            type == '1bed' &&
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
              <Icon type='FontAwesome' name='bed' style={{ color: 'white', fontSize: 15 }} />
            </View>
          }
          {
            type == 'special' &&
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
              <Icon type='FontAwesome' name='bed' style={{ color: 'white', fontSize: 15 }} />
              <Icon type='AntDesign' name='heart' style={{ color: 'red', fontSize: 15 }} />
            </View>
          }
          <Text style={[styles.roomNumberTxt, { fontSize: 13 }]}>Giá:{overnight_price}</Text>
        </View>
        {
          tag != '' ?
            <View style={{ flex: 4, width: '100%' }}>
              <View style={styles.part}>
                {
                  tag == 'DG' &&
                  <View style={[styles.tagWrapper, { backgroundColor: '#7D3C98' }]}>
                    <Text style={styles.tagTxt}>{tag}</Text>
                  </View>
                }
                {
                  tag == 'CD' &&
                  <View style={[styles.tagWrapper, { backgroundColor: '#28B463' }]}>
                    <Text style={styles.tagTxt}>{tag}</Text>
                  </View>
                }
                {
                  tag == 'QD' &&
                  <View style={[styles.tagWrapper, { backgroundColor: '#3498DB', flexDirection: 'row' }]}>
                    <Text style={styles.tagTxt}>{tag}</Text>
                    <Icon type='MaterialCommunityIcons' name='power-sleep' style={{ color: 'white', fontSize: 15 }} />
                  </View>
                }
              </View>
              <View style={styles.part}>
                <Text style={styles.tagTxt}>{livingTimeString}</Text>
              </View>
            </View>
            :
            <View style={{ flex: 4, width: '100%' }} />
        }

      </TouchableOpacity>
    )
  }
}
