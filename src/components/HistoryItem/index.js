import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'
import moment from 'moment'

export default class HistoryItem extends PureComponent {
  render() {
    const { roomNumber, itemID, time, status, tagName, note, total } = this.props
    return (
      <View style={[styles.container, {backgroundColor: status == 'in' ? '#52BE80' : '#CB4335'}]}>
        <View style={{ flex: 1 }}>
          <View style={styles.roomNumber}>
            <Text style={styles.roomNumberTxt}>{roomNumber}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.timeWrapper}>
            <Text style={styles.timeNumberTxt}>Vào</Text>
            <Text style={styles.timeNumberTxt}>{time}</Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.tagWrapper}>
            <Text style={[styles.roomNumberTxt, { color: 'red' }]}>{tagName}</Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.timeNumberTxt}>{note}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.timeNumberTxt}>{total} K</Text>
        </View>
      </View>
    )
  }
}
