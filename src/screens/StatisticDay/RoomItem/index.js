import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'
import _ from 'lodash'
import moment from 'moment'
import SectionHourItem from './SectionHourItem'
import { formatVND } from '../../../utils/Helpers'

export default class StatisticDay extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedDay: moment().format('DD/MM/YYYY')
    }
  }

  componentDidMount() {

  }

  shouldComponentUpdate(nextprops) {
    if (!_.isEqual(this.props.data, nextprops.data)) {
      return true
    }
    return false
  }

  selectDateFrom = (date) => {
    this.setState({
      selectedDay: date
    })
  }

  getLastName = (name) => {
    let nameComponents = name.split(' ')
    return nameComponents[nameComponents.length - 1]
  }

  navigateToDetail = (roomID, sectionID, timeOut, timeIn) => {
    if (timeOut != 0 && timeIn != 0) {
      this.props.navigation.navigate('HistoryRoom', { sectionID: sectionID })
    } else {
      const payload = { id: roomID }
      this.props.navigation.navigate('DetailRoom', { payload })
    }
  }

  render() {
    const { roomName, hourSection, overnight } = this.props.data
    return (
      <View style={styles.container}>
        <View style={styles.roomHeaderTitle}>
          {
            this.props.roomID != 'thongke' ?
              <Text style={styles.normalTxt}>Phòng: {roomName}</Text>
              :
              <Text style={styles.normalTxt}>{roomName}</Text>
          }
        </View>
        <View style={styles.hoursSectionContainer}>
          {
            this.props.roomID != 'thongke' ?
              (
                hourSection && hourSection.length > 0 ?
                  <FlatList
                    data={hourSection}
                    keyExtractor={(item) => item.sectionID}
                    renderItem={({ item }) => <SectionHourItem key={item.sectionID} sectionID={item.sectionID} roomID={item.roomID} timeIn={item.timeIn} timeOut={item.timeOut} roomType={item.roomType} total={item.total} navigation={this.props.navigation} />}
                    numColumns={2}
                    scrollEnabled
                    nestedScrollEnabled
                  />
                  :
                  null
              )
              :
              <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 10, justifyContent: 'space-around' }}>
                <Text style={styles.smallTxt}>Tổng thu nhập hôm nay: {formatVND(this.props.data.totalIncome)}</Text>
                <Text style={styles.smallTxt}>Trong đó:</Text>
                <Text style={styles.smallTxt}>Thu nhập từ DG: {
                  formatVND(this.props.data.totalIncomeFromDG.lanh + this.props.data.totalIncomeFromDG.quat)
                }
                  <Text style={{ color: 'red' }}> ({Math.round((this.props.data.totalIncomeFromDG.lanh + this.props.data.totalIncomeFromDG.quat) * 100 / this.props.data.totalIncome)}%)</Text> {"\n"}
                  (lạnh: {formatVND(this.props.data.totalIncomeFromDG.lanh)} - quạt: {formatVND(this.props.data.totalIncomeFromDG.quat)})
                </Text>
                <Text style={styles.smallTxt}>Thu nhập từ CD: {
                  formatVND(this.props.data.totalIncomeFromCD.lanh + this.props.data.totalIncomeFromCD.quat)
                }
                  <Text style={{ color: 'red' }}> ({Math.round((this.props.data.totalIncomeFromCD.lanh + this.props.data.totalIncomeFromCD.quat) * 100 / this.props.data.totalIncome)}%)</Text> {"\n"}
                  (lạnh: {formatVND(this.props.data.totalIncomeFromCD.lanh)} - quạt: {formatVND(this.props.data.totalIncomeFromCD.quat)})
                </Text>
                <Text style={styles.smallTxt}>Thu nhập từ QD: {
                  formatVND(this.props.data.totalIncomeFromQD)
                }
                  <Text style={{ color: 'red' }}> ({Math.round((this.props.data.totalIncomeFromQD) * 100 / this.props.data.totalIncome)}%)</Text>
                </Text>
                <Text style={styles.smallTxt}>________CHI TIẾT:_________</Text>
                <Text style={styles.smallTxt}>Nước suối: {
                  formatVND(this.props.data.totalIncomeFromWater)
                } ({
                    Math.round((this.props.data.totalIncomeFromWater) * 100 / this.props.data.totalIncome)}%)
                </Text>
                <Text style={styles.smallTxt}>Nước ngọt: {
                  formatVND(this.props.data.totalIncomeFromSoftDrink)
                } ({
                    Math.round((this.props.data.totalIncomeFromSoftDrink) * 100 / this.props.data.totalIncome)}%)
                </Text>
                {
                  this.props.data.totalIncomeFromInstantNoodle > 0 &&
                  <Text style={styles.smallTxt}>Mỳ gói: {
                    formatVND(this.props.data.totalIncomeFromInstantNoodle)
                  } ({
                      Math.round((this.props.data.totalIncomeFromInstantNoodle) * 100 / this.props.data.totalIncome)}%)
                  </Text>
                }
                <Text style={styles.smallTxt}>Bia: {
                  formatVND(this.props.data.totalIncomeFromBeer)
                } ({
                    Math.round((this.props.data.totalIncomeFromBeer) * 100 / this.props.data.totalIncome)}%)
                  </Text>
                <Text style={styles.smallTxt}>Tiền phòng: {
                  formatVND(this.props.data.totalIncomeFromRoomCost)
                } ({
                    Math.round((this.props.data.totalIncomeFromRoomCost) * 100 / this.props.data.totalIncome)}%)
                </Text>
                {
                  this.props.data.totalLostMoney > 0 &&
                  <Text style={styles.smallTxt}>Số tiền bị mất: {
                    formatVND(this.props.data.totalLostMoney)
                  }
                  </Text>
                }
              </View>
          }
        </View>
        <View>
          {
            overnight && overnight.map((item) =>
              <TouchableOpacity style={styles.overnightContainer} onPress={() => this.navigateToDetail(item.roomID, item.sectionID, item.timeOut, item.timeIn)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.normalTxt}>{moment(item.timeIn).format('HH:mm')}</Text>
                  <Icon type="AntDesign" name='arrowright' style={styles.iconArrow} />
                  {
                    item.timeOut != 0 ?
                    <Text style={styles.normalTxt}>{moment(item.timeOut).format('HH:mm')}</Text>
                    :
                    <Text style={styles.normalTxt}>Còn ở</Text>
                  }
                </View>
                {
                  item.guessName != null &&
                  <Text style={styles.normalTxt}>{this.getLastName(item.guessName)}</Text>
                }
                <Text style={styles.normalTxt}>{item.total}</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </View>
    )
  }
}
