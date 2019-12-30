import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'

export default class MenuBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftMenu}>
          <Text>02/04/2019</Text>
        </View>
        <TouchableOpacity style={styles.btnSetting}>

        </TouchableOpacity>
      </View>
    )
  }
}
