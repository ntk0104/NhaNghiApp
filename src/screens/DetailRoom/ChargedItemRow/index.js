import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity, ViewBase } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'
import _ from 'lodash'

export default class ChargedItemRow extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    const { title, totalPrice, quantity, duration } = this.props
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.rowHeader}>
          <Text style={styles.textTitle}>{title}:</Text>
        </View>
        {
          title == 'Tiền phòng' ?
            <View style={styles.bodyHeader}>
              <Text style={styles.durationTxt}>{duration}</Text>
            </View>
            :
            title != 'Chi Phí Khác' ?
              <View style={styles.bodyHeader}>
                <TouchableOpacity style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.decreaseQuantity()}>
                  <Icon type='Entypo' name='circle-with-minus' style={styles.btnDecrease} />
                </TouchableOpacity>
                <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.textQuantity}>{quantity}</Text>
                </View>
                <TouchableOpacity style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.increaseQuantity()} >
                  <Icon type='Entypo' name='circle-with-plus' style={styles.btnIncrease} />
                </TouchableOpacity>
              </View>
              :
              <View style={styles.bodyHeader}>
                <TouchableOpacity style={{ flex: 3, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.props.decreaseQuantity()}>
                  <Icon type='Entypo' name='circle-with-minus' style={styles.btnDecreaseBig} />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.increaseQuantity()} >
                  <Icon type='Entypo' name='circle-with-plus' style={styles.btnIncreaseBig} />
                </TouchableOpacity>
              </View>
        }
        <View style={styles.totalHeader}>
          <Text style={totalPrice > 0 ? styles.totalMoneyAmount : styles.textTitle}>{totalPrice} K</Text>
        </View>
      </View>
    )
  }
}
