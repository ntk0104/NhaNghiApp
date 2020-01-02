import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'
import moment from 'moment'

export default class MenuBar extends Component {
  render() {
    const currentDate = moment().format("DD/MM/YYYY");
    return (
      <View style={styles.container}>
        <View style={styles.leftMenu}>
          <Text style={styles.dateTxt}>{currentDate}</Text>
        </View>
        <TouchableOpacity style={styles.btnSetting}>
          <Icon type="AntDesign" name="setting" size={30} color="white" />
        </TouchableOpacity>
      </View>
    )
  }
}
