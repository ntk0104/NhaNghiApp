import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'
import _ from 'lodash'

export default class RoomItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  shouldComponentUpdate(nextprops){
    if(!_.isEqual(this.props, nextprops)){
      return true
    }
    return false
  }

  componentDidMount() {
    
  }

  clickRoom = () => {
    const { id, roomName, roomStatus, timeIn, chargedItems, note, tag, fan_hour_price, air_hour_price, overnight_price, limitSection, limitMidnight, type } = this.props
    if (roomStatus == 'available'){
      // get room
      this.props.onGetRoom(id ,roomName)
    } else {
      // see room detail
    }
  }

  render() {
    console.log('%c%s', 'color: #00a3cc', "rendering room " + this.props.id);
    const { id, roomName, roomStatus, timeIn, chargedItems, note, tag, fan_hour_price, air_hour_price, overnight_price, limitSection, limitMidnight, type } = this.props
    return (
      <TouchableOpacity style={[styles.roomContainer, {backgroundColor: roomStatus == 'available' ? 'white' : 'red' }]} onPress={this.clickRoom}>
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
          <Text style={[styles.roomNumberTxt, {fontSize: 13}]}>Giá:{overnight_price}</Text>
        </View>
        <View style={{ flex: 4, width: '100%' }}>
          <Text>{tag}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
