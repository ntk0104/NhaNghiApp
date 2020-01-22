import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import styles from './styles'
import moment from 'moment'
import { formatVND } from '../../../utils/Helpers'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { deleteHistoryWithdrawDepositRequest, getCashBoxRequest } from '../../../redux/actions/index'

class ChangeCashItem extends PureComponent {

  deleteItem = () => {
    this.props.deleteHistoryWithdrawDepositRequestHandler({ transactionID: this.props.item.addedTime })
    this.props.updateHistory()
    this.props.getCurrentMoneyInBoxHandler()
  }

  render() {
    const { addedTime, type, title, total } = this.props.item
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.addTimeWrapper}>
            <Text style={styles.normalTxt}>{moment(addedTime).format('DD/MM/YYYY HH:mm')}</Text>
          </View>
          <View style={styles.typeWrapper}>
            {
              type == 'withdraw' ?
                <View style={[styles.typeView, { backgroundColor: 'red' }]}>
                  <Text style={styles.typeTxt}>RÚT</Text>
                </View>
                :
                <View style={[styles.typeView, { backgroundColor: 'green' }]}>
                  <Text style={styles.typeTxt}>THÊM</Text>
                </View>
            }
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.titleTxt}>{title}</Text>
          </View>
          <View style={styles.totalWrapper}>
            <Text style={[styles.titleTxt, { color: type == 'withdraw' ? 'red' : 'green' }]}>{formatVND(total)}</Text>
          </View>
          <View style={styles.totalWrapper}>
            <TouchableOpacity style={styles.btnBack} onPress={this.deleteItem}>
              <Icon type='FontAwesome' name='trash-o' style={styles.iconBack} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = dispatch => ({
  deleteHistoryWithdrawDepositRequestHandler: (payload) => dispatch(deleteHistoryWithdrawDepositRequest(payload)),
  getCurrentMoneyInBoxHandler: () => dispatch(getCashBoxRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeCashItem)