import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'
import moment from 'moment'

export default class HistoryItem extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    )
  }
}
