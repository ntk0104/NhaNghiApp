import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ViewBase } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'
import _ from 'lodash'

export default class ChargedItemRow extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    const { title, totalPrice, quantity } = this.props
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.rowHeader}>
          <Text style={styles.textTitle}>{title}:</Text>
        </View>
        <View style={styles.bodyHeader}>
          <TouchableOpacity style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
            <Icon type='Entypo' name='circle-with-minus' style={{ color: 'red', fontSize: 35 }} />
          </TouchableOpacity>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.textQuantity}>{quantity}</Text>
          </View>
          <TouchableOpacity style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
            <Icon type='Entypo' name='circle-with-plus' style={{ color: 'green', fontSize: 35 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.totalHeader}>
          <Text style={styles.textTitle}>{totalPrice}</Text>
        </View>
      </View>
    )
  }
}
