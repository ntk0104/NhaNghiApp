import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import MenuBar from '../../components/MenuBar/index'

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MenuBar />
        <View style={styles.contentContainer}>
          <View style={styles.leftSideContent}>

          </View>
          <View style={styles.rightSideContent}>

          </View>
        </View>
      </View>
    )
  }
}
