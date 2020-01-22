import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import moment from 'moment'
import { Icon } from 'native-base'

export default class SectionHourItem extends PureComponent {
  render() {
    const { timeIn, timeOut, roomType, total } = this.props
    return (
      <TouchableOpacity style={styles.container}>
        <Text style={styles.normalTxt}>{moment(timeIn).format('HH:mm')}</Text>
        <Text style={styles.normalTxt}>{roomType == 'quat' ? 'Q' : 'L'}</Text>
        <Icon type="AntDesign" name='arrowright' style={styles.iconArrow} />
        {
          timeOut != null ?
          <Text style={styles.normalTxt}>{moment(timeOut).format('HH:mm')} </Text>
          : 
          <Text style={styles.normalTxt}>Còn ở</Text>
        }
        <Text style={[styles.normalTxt, { color: 'red' }]}>{total}</Text>
      </TouchableOpacity>
    )
  }
}
