import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'
import _ from 'lodash'
import DatePicker from 'react-native-datepicker';
import moment from 'moment'
import RoomItem from './RoomItem'
import { makeGetStatisticDay } from '../../redux/selectors/index'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getStatisticOfDayRequest } from '../../redux/actions/index'

class StatisticDay extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedDay: moment().format('DD/MM/YYYY'),
    }
  }

  componentDidMount() {
    this.props.getStatisticOfDayRequestHandler({ selectedDay: moment(this.state.selectedDay, 'DD/MM/YYYY').format('YYYY/MM/DD') })
  }

  selectDateFrom = (date) => {
    this.setState({
      selectedDay: date
    })
  }

  getStatisticOfDay = () => {
    // alert(moment(this.state.selectedDay, 'DD/MM/YYYY').format('YYYY/MM/DD'))
    let payload = {
      selectedDay: moment(this.state.selectedDay, 'DD/MM/YYYY').format('YYYY/MM/DD'),
    }
    this.props.getStatisticOfDayRequestHandler(payload)
  }

  render() {
    const { selectedDay, data } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.btnBack} onPress={() => this.props.navigation.goBack()}>
            <Icon type='AntDesign' name='arrowleft' style={styles.iconBack} />
          </TouchableOpacity>
          <Text style={styles.titleTopBarTxt}>Thống kê theo ngày</Text>
        </View>
        <View style={styles.dateSelectionRow}>
          <Text style={styles.normalTxt}>Chọn ngày: </Text>
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
                height: 15,
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
          <TouchableOpacity style={styles.btnOK} onPress={this.getStatisticOfDay}>
            <Text style={[styles.normalTxt, { color: 'white' }]}>OK</Text>
          </TouchableOpacity>
        </View>
        {
          this.props.statisticOfDay
            ?
            <ScrollView style={styles.roomsWrapper}>
              <View style={styles.rowRoomsContainer}>
                <RoomItem roomID={'18'} data={this.props.statisticOfDay['18']} />
                <RoomItem roomID={'17'} data={this.props.statisticOfDay['17']} />
                <RoomItem roomID={'16'} data={this.props.statisticOfDay['16']} />
              </View>
              <View style={styles.rowRoomsContainer}>
                <RoomItem roomID={'15'} data={this.props.statisticOfDay['15']} />
                <RoomItem roomID={'14'} data={this.props.statisticOfDay['14']} />
                <RoomItem roomID={'13'} data={this.props.statisticOfDay['13']} />
              </View>
              <View style={styles.rowRoomsContainer}>
                <RoomItem roomID={'12'} data={this.props.statisticOfDay['12']} />
                <RoomItem roomID={'11'} data={this.props.statisticOfDay['11']} />
                <RoomItem roomID={'10'} data={this.props.statisticOfDay['10']} />
              </View>
              <View style={styles.rowRoomsContainer}>
                <RoomItem roomID={'9'} data={this.props.statisticOfDay['9']} />
                <RoomItem roomID={'8'} data={this.props.statisticOfDay['8']} />
                <RoomItem roomID={'7'} data={this.props.statisticOfDay['7']} />
              </View>
              <View style={styles.rowRoomsContainer}>
                <RoomItem roomID={'6'} data={this.props.statisticOfDay['6']} />
                <RoomItem roomID={'5'} data={this.props.statisticOfDay['5']} />
                <RoomItem roomID={'4'} data={this.props.statisticOfDay['4']} />
              </View>
              <View style={styles.rowRoomsContainer}>
                <RoomItem roomID={'3'} data={this.props.statisticOfDay['3']} />
                <RoomItem roomID={'2'} data={this.props.statisticOfDay['2']} />
                <RoomItem roomID={'thongke'} data={this.props.statisticOfDay['thongke']} />
              </View>
            </ScrollView>
            :
            <View style={styles.roomsWrapper}>
              <Text style={styles.normalTxt}>CHƯA CÓ DỮ LIỆU ĐỂ HIỂN THỊ</Text>
            </View>
        }
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  statisticOfDay: makeGetStatisticDay()
})

const mapDispatchToProps = dispatch => ({
  getStatisticOfDayRequestHandler: payload => dispatch(getStatisticOfDayRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(StatisticDay)
