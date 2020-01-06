import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'
import { checkRoomExisted, addRoom, updateRoom, getRoomInfo } from '../../database/index'

export default class RoomItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      roomStatus: '',
      lastTimeIn: null,
      currentTag: '',
      currentNote: '',
      cmnd: null
    }
  }

  componentDidMount() {
    const isRoomExisted = checkRoomExisted(this.props.id)
    if (!isRoomExisted) {
      let newRoom = {
        id: this.props.id,
        roomName: this.props.roomNumber,
        currentStatus: 'available',
        timeIn: 0,
        chargedItems: [],
        note: '',
        tag: 'DG',
        fan_hour_price: 60,
        air_hour_price: 100,
        overnight_price: this.props.overnight_price,
        limitSection: 3.2,
        limitMidnight: 15,
        type: this.props.type,
        cmnd: null
      }
      addRoom(newRoom)
    }
    this.getRoomInformation(this.props.id)
  }

  getRoomInformation = (id) => {
    getRoomInfo(id)
      .then(rs => {
        this.setState({
          roomStatus: rs.currentStatus,
          lastTimeIn: rs.timeIn,
          currentTag: rs.tag,
          currentNote: rs.note,
          cmnd: rs.cmnd
        })
      })
      .catch(err => {
        console.log('%c%s', 'color: #f2ceb6', err);
      })
  }

  clickRoom = () => {
    const { roomStatus } = this.state
    if (roomStatus == 'available'){
      // get room
      this.props.onGetRoom(this.props.id ,this.props.roomNumber)
    } else {
      // see room detail
    }
  }

  render() {

    console.log('%c%s', 'color: #00a3cc', "rendering room " + this.props.id);
    const { roomStatus, lastTimeIn, currentTag, currentNote, cmnd } = this.state
    return (
      <TouchableOpacity style={[styles.roomContainer, {backgroundColor: roomStatus == 'available' ? 'white' : 'red' }]} onPress={this.clickRoom}>
        <View style={styles.roomNumberWrapper}>
          <Text style={styles.roomNumberTxt}>{this.props.roomNumber}</Text>
          {
            this.props.type == '2beds' &&
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
              <Icon type='FontAwesome' name='bed' style={{ color: 'white', fontSize: 15 }} />
              <Icon type='FontAwesome' name='bed' style={{ color: 'white', fontSize: 15 }} />
            </View>
          }
          {
            this.props.type == '1bed' &&
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
              <Icon type='FontAwesome' name='bed' style={{ color: 'white', fontSize: 15 }} />
            </View>
          }
          {
            this.props.type == 'special' &&
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
              <Icon type='FontAwesome' name='bed' style={{ color: 'white', fontSize: 15 }} />
              <Icon type='AntDesign' name='heart' style={{ color: 'red', fontSize: 15 }} />
            </View>
          }
        </View>
        <View style={{ flex: 4, width: '100%' }}>
          <Text>{lastTimeIn}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
