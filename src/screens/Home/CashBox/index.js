import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from '../styles'
import { Icon } from 'native-base'
import _ from 'lodash'
import { makeGetCurrentMoneyInBox } from '../../../redux/selectors/index'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

class CashBox extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }

  formatVND = (anotherCostValue) => {
    try {
      let intMoney = parseInt(anotherCostValue) * 1000
      intMoney = intMoney.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
      return intMoney
    } catch (error) {
      console.log("TCL: formatVND -> error", error)
    }
  }

  render() {
    const currentMoneyInBox = this.props.currentMoneyInBox || 0
    return (
      <View style={styles.totalContainer}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Tiền trong tủ: {this.formatVND(currentMoneyInBox)}</Text>
        <TouchableOpacity style={styles.btnWithDraw} onPress={() => this.props.showWithdrawModal()}>
          <Text style={styles.withdrawTxt}>Rút tiền</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnWithDraw, { backgroundColor: '#3C8F36' }]} onPress={() => this.props.showDepositModal()}>
          <Text style={styles.withdrawTxt}>Thêm tiền</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const mapStateToProps = createStructuredSelector({
  currentMoneyInBox: makeGetCurrentMoneyInBox()
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CashBox)
