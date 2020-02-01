import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import moment from 'moment'
import { Icon } from 'native-base'

export default class SectionHourItem extends PureComponent {

  navigateToDetail = (roomID, sectionID, timeOut, timeIn) => {
    if (timeOut != 0 && timeIn != 0) {
      this.props.navigation.navigate('HistoryRoom', { sectionID: sectionID })
    } else {
      const payload = { id: roomID }
      this.props.navigation.navigate('DetailRoom', { payload })
    }
  }

  render() {
    const { timeIn, timeOut, roomType, total, sectionID, roomID } = this.props
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.navigateToDetail(roomID, sectionID, timeOut, timeIn)}>
        <Text style={styles.normalTxt}>{moment(timeIn).format('HH:mm')}</Text>
        <Text style={styles.normalTxt}>{roomType == 'quat' ? 'Q' : 'L'}</Text>
        <Icon type="AntDesign" name='arrowright' style={styles.iconArrow} />
        {
          timeOut != 0 ?
          <Text style={styles.normalTxt}>{moment(timeOut).format('HH:mm')} </Text>
          : 
          <Text style={styles.normalTxt}>Còn ở</Text>
        }
        <Text style={[styles.normalTxt, { color: 'red' }]}>{total}</Text>
      </TouchableOpacity>
    )
  }
}
