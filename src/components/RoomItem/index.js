import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'

export default class RoomItem extends Component {
  render() {
    return (
      <TouchableOpacity style={{ width: this.props.width, height: this.props.height, alignItems: 'center', justifyContent: 'center', borderWidth: 1}}>
        <View style={styles.roomNumberWrapper}>
          <Text style={styles.roomNumberTxt}>{this.props.roomNumber}</Text>
          {
            this.props.type == '2beds' &&
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%'}}>
              <Icon type='FontAwesome' name='bed' style={{color: 'white', fontSize: 15}} />
              <Icon type='FontAwesome' name='bed' style={{color: 'white', fontSize: 15}} />
            </View>
          }
          {
            this.props.type == '1bed' &&
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%'}}>
              <Icon type='FontAwesome' name='bed' style={{color: 'white', fontSize: 15}} />
            </View>
          }
          {
            this.props.type == 'special' &&
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%'}}>
              <Icon type='FontAwesome' name='bed' style={{color: 'white', fontSize: 15}} />
              <Icon type='AntDesign' name='heart' style={{color: 'red', fontSize: 15}} />
            </View>
          }
        </View>
        <View style={{flex: 4, backgroundColor: 'pink'}}>
        </View>
      </TouchableOpacity>
    )
  }
}
