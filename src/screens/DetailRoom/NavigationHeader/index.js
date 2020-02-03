import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from '../styles'
import { Icon } from 'native-base'

export default class NavigationHeader extends PureComponent {
  render() {
    return (
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.btnBack} onPress={() => this.props.goBack()}>
          <Icon type='AntDesign' name='arrowleft' style={styles.iconBack} />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleTxt}>Chi tiết phòng {this.props.roomName}</Text>
        </View>
        <TouchableOpacity style={styles.btnDeleteRoom} onPress={this.props.deleteRoom}>
          <Text style={styles.deleteRoomTxt}>Hủy Phòng</Text>
          <Icon type='AntDesign' name='delete' style={styles.iconBack} />
        </TouchableOpacity>
      </View>
    )
  }
}
