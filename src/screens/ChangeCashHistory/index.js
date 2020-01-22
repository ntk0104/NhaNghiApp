import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'
import _ from 'lodash'
import { makeGetHistoryWithdrawAndDeposit } from '../../redux/selectors/index'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DatePicker from 'react-native-datepicker';
import moment from 'moment'
import ChangeCashItem from './ChangeCashItem'
import { getHistoryWithdrawDepositRequest } from '../../redux/actions/index'

class ChangeCashHistory extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedDay: moment().format('DD/MM/YYYY')
    }
  }

  shouldComponentUpdate(nextprops) {
    if(this.props.navigation.isFocused() && (!_.isEqual(this.props.historyData, nextprops.historyData))){
      return true
    } else {
      return false
    }
  }

  componentDidMount() {
    this.getHistory()
  }

  selectDateFrom = (date) => {
    this.setState({
      selectedDay: date
    })
  }

  getHistory = () => {
    const { selectedDay } = this.state
    let convertedString = moment(selectedDay, 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00:00'
    let startTime = { startTime: moment(convertedString).valueOf()}
    this.props.getHistoryWithdrawDepositRequestHandler(startTime)
  }

  render() {
    const { selectedDay } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.btnBack} onPress={() => this.props.navigation.goBack()}>
            <Icon type='AntDesign' name='arrowleft' style={styles.iconBack} />
          </TouchableOpacity>
          <Text style={styles.titleTopBarTxt}>Lịch sử thêm tiền và rút tiền</Text>
        </View>
        {
          this.props.historyData &&
          <View style={styles.dateSelectionRow}>
            <Text style={styles.normalTxt}>Xem từ ngày: </Text>
            <DatePicker
              style={styles.startDatePicker}
              iconSource={require('../../assets/images/calendar.png')}
              date={selectedDay}
              mode='date'
              placeholder='Chọn ngày'
              format='DD/MM/YYYY'
              confirmBtnText='Chọn'
              cancelBtnText='Hủy'
              customStyles={{
                dateIcon: {
                  width: 14,
                  height: 20,
                  position: 'absolute',
                  right: 7,
                  top: 12
                },
                dateInput: {
                  height: 50,
                  backgroundColor: 'white',
                  borderColor: 'gray',
                  marginLeft: 0,
                  paddingLeft: 8,
                  alignItems: 'flex-start'
                }
              }}
              onDateChange={date => this.selectDateFrom(date)}
            />
            <TouchableOpacity style={styles.btnOK} onPress={this.getHistory}>
              <Text style={[styles.normalTxt, { color: 'white' }]}>OK</Text>
            </TouchableOpacity>
          </View>
        }
        {
          this.props.historyData &&
          <View style={styles.flatlist}>
            <FlatList
              data={this.props.historyData}
              scrollEnabled
              bounces={true}
              keyExtractor={item => item.addedTime + ''}
              renderItem={({ item, index }) => <ChangeCashItem item={item} navigation={this.props.navigation} updateHistory={this.getHistory} />}
            />
          </View>
        }
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  historyData: makeGetHistoryWithdrawAndDeposit()
})

const mapDispatchToProps = dispatch => ({
  getHistoryWithdrawDepositRequestHandler: payload => dispatch(getHistoryWithdrawDepositRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeCashHistory)

