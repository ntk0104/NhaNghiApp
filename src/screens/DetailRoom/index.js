import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import { Icon, CheckBox, Container } from 'native-base'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import CheckBoxButton from '../../components/CheckBoxButton/index'
import ChargedItemRow from './ChargedItemRow'
import moment from 'moment'

export default class DetailRoom extends Component {

  constructor(props) {
    super(props)
    this.state = {
      payload: null,
      tag: null,
      selectedSectionType: null,
      price: 0,
      overnight_price: null,
      roomCost: 0,
      waterQuantity: 0,
      beerQuantity: 0,
      softdrinkQuantity: 0,
      instantNoodleQuantity: 0,
      additionalCost: 0,
      livingTimeString: null,
    }
  }

  componentDidMount() {
    const payload = this.props.navigation.getParam('payload')
    console.log(JSON.stringify(payload, null, 2))
    this.setState({
      payload: payload,
      tag: payload.tag,
      selectedSectionType: payload.sectionRoom,
      price: payload.sectionRoom == 'quat' ? payload.fan_hour_price : payload.air_hour_price,
      overnight_price: payload.overnight_price
    }, () => {
      this.exportLivingTimeToString(moment().valueOf(), this.state.payload.timeIn, this.state.tag)
      if (this.state.tag == 'QD') {
        let roomCostOvernight = this.calculateRoomCostOvernight(this.state.payload.timeIn)
        this.setState({
          roomCost: roomCostOvernight
        })
      } else {
        let roomCostPerHour = this.calculateRoomCostPerHour(this.state.selectedSectionType, payload.timeIn)
        this.setState({
          roomCost: roomCostPerHour
        })
      }
    })
  }

  calculateLivingTime = (newTime, oldTime) => {
    let diffTimestamp = newTime - oldTime
    const diffDays = Math.floor(moment.duration(diffTimestamp).asDays())
    if (diffDays > 0) {
      diffTimestamp = diffTimestamp - diffDays * 24 * 60 * 60 * 1000
    }
    const diffHours = Math.floor(moment.duration(diffTimestamp).asHours())
    if (diffHours > 0) {
      diffTimestamp = diffTimestamp - diffHours * 60 * 60 * 1000
    }
    const diffMinutes = Math.floor(moment.duration(diffTimestamp).asMinutes())
    const durationObj = {
      days: diffDays,
      hours: diffHours,
      minutes: diffMinutes
    }
    console.log(JSON.stringify(durationObj, null, 2));
    return durationObj
  }

  exportLivingTimeToString = (newTime, oldTime, type) => {
    let livingTimeObj = this.calculateLivingTime(newTime, oldTime)
    const { days, hours, minutes } = livingTimeObj
    let livingTime = ''
    if (days > 0) {
      livingTime += days + ' ngày '
    }
    if (hours > 0) {
      livingTime += hours + ' giờ '
    }
    livingTime += minutes + ' phút'
    this.setState({ livingTimeString: livingTime })
  }

  calculateRoomCostPerHour = (timeIn, type) => {
    const { overnight_price, payload, price } = this.state
    let livingTimeObj = this.calculateLivingTime(moment().valueOf(), timeIn)
    const { days, hours, minutes } = livingTimeObj
    const livingTimeToSecs = hours * 3600 + minutes * 60
    const limitSectionToSecs = payload.limitSection * 3600
    const limit6hrs15minsToSecs = 6 * 3600 + 15 * 60
    let additionalHourPrice = Math.floor(price / 3) - (Math.floor(price / 3) % 10)
    console.log("TCL: calculateRoomCostPerHour -> additionalHourPrice", additionalHourPrice)
    let bufferSectionMinutes = (payload.limitSection - Math.floor(payload.limitSection)) * 60
    console.log("TCL: calculateRoomCostPerHour -> bufferSectionMinutes", bufferSectionMinutes)
    if (livingTimeToSecs > limitSectionToSecs) {
      if (livingTimeToSecs > limit6hrs15minsToSecs) {
        return overnight_price
      } else {
        if (minutes > bufferSectionMinutes) {
          return (hours - Math.floor(payload.limitSection) + 1) * additionalHourPrice + price
        }
        return (hours - Math.floor(payload.limitSection)) * additionalHourPrice + price
      }
    } else {
      if (type == 'additionalOverNight') {
        let additionalHour = hours
        if (minutes > bufferSectionMinutes) {
          additionalHour += 1
        }
        return additionalHour * additionalHourPrice
      }
      return price
    }
  }

  calculateNumsNight = (timeIn) => {
    const dateValue = moment(timeIn).date()
    const monthValue = moment(timeIn).month()
    const yearValue = moment(timeIn).year()
    const timeInMoment = moment([yearValue, monthValue, dateValue])
    const currentTimeMoment = moment([moment().year(), moment().month(), moment().date()])
    const numsNights = currentTimeMoment.diff(timeInMoment, 'days')
    return numsNights
  }

  calculateRoomCostOvernight = (timeIn) => {
    console.log('%c⧭', 'color: #00bf00', 'calculateRoomCostOvernight');
    const { payload, overnight_price, price } = this.state
    let numsNight = this.calculateNumsNight(timeIn)
    console.log('%c⧭', 'color: #917399', 'So dem o: ' + numsNight);
    if (numsNight == 0) {
      // without charge additional hour
      return overnight_price
    } else {
      const currentDate = moment(moment().valueOf()).format('YYYY-MM-DD')
      let bufferSectionMinutes = (payload.limitSection - Math.floor(payload.limitSection)) * 60
      const generatedTimeThreshold = currentDate + ' 12:' + bufferSectionMinutes + ':00'
      const generatedTimestampThreshold = moment(generatedTimeThreshold).valueOf()
      let additionalHourPrice = Math.floor(price / 3) - (Math.floor(price / 3) % 10)
      if (moment().valueOf() > generatedTimestampThreshold) {
        let additionalHourCost = this.calculateRoomCostPerHour(moment(currentDate + ' 12:00:00').valueOf(), 'additionalOverNight')
        console.log("TCL: DetailRoom -> calculateRoomCostOvernight -> additionalHourCost", additionalHourCost)
        this.setState({ livingTime: numsNight + ' đêm ' + Math.floor(additionalHourCost / additionalHourPrice) + ' giờ' })
        return numsNight * overnight_price + additionalHourCost
      }
      this.setState({ livingTime: numsNight + ' đêm' })
      return numsNight * overnight_price
    }

  }

  decreaseQuantity = (itemID, currentValue) => {
    if (currentValue > 0) {
      currentValue -= 1
      if (itemID == 'water') {
        this.setState({ waterQuantity: currentValue })
      } else if (itemID == 'beer') {
        this.setState({ beerQuantity: currentValue })
      } else if (itemID == 'softdrink') {
        this.setState({ softdrinkQuantity: currentValue })
      } else if (itemID == 'instantNoodle') {
        this.setState({ instantNoodleQuantity: currentValue })
      }
    }
  }

  increaseQuantity = (itemID, currentValue) => {
    currentValue += 1
    if (itemID == 'water') {
      this.setState({ waterQuantity: currentValue })
    } else if (itemID == 'beer') {
      this.setState({ beerQuantity: currentValue })
    } else if (itemID == 'softdrink') {
      this.setState({ softdrinkQuantity: currentValue })
    } else if (itemID == 'instantNoodle') {
      this.setState({ instantNoodleQuantity: currentValue })
    }
  }

  render() {
    const { payload, tag, selectedSectionType, roomCost, waterQuantity, beerQuantity, softdrinkQuantity, instantNoodleQuantity, additionalCost, livingTimeString } = this.state
    // const livingTime = payload && this.exportLivingTimeToString(moment().valueOf(), payload.timeIn, tag)
    return (
      <View style={styles.container}>
        {
          payload &&
          <View style={styles.navigationBar}>
            <TouchableOpacity style={styles.btnBack} onPress={() => this.props.navigation.goBack()}>
              <Icon type='AntDesign' name='arrowleft' style={{ color: 'white' }} />
            </TouchableOpacity>
            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleTxt}>Chi tiết phòng {payload.roomName}</Text>
            </View>
          </View>
        }
        {
          payload &&
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            // extraScrollHeight={200}
            extraHeight={1000}
            enableAutomaticScroll={true}
            scrollEnabled={true}
            style={{ flex: 1 }}
          >
            <View style={styles.bodyContainer}>
              <View style={styles.leftBodyContainer}>
                <View style={styles.topLeftBodyContainer}>
                  <View style={styles.rowInfoContainer}>
                    <View style={styles.titleWrapper}>
                      <Text style={styles.titleTxt}>Giờ Vào:</Text>
                    </View>
                    <View style={styles.InfoRowWrapper}>
                      <Text style={styles.titleTxt}>{moment(payload.timeIn).format('HH:mm (DD/MM/YYYY)')}</Text>
                    </View>
                  </View>
                  <View style={styles.rowInfoContainer}>
                    <View style={styles.titleWrapper}>
                      <Text style={styles.titleTxt}>Thời gian ở:</Text>
                    </View>
                    <View style={styles.InfoRowWrapper}>
                      <Text style={styles.titleTxt}>{livingTimeString}</Text>
                    </View>
                  </View>
                  <View style={styles.rowInfoContainer}>
                    <View style={styles.titleWrapper}>
                      <Text style={styles.titleTxt}>Loại:</Text>
                    </View>
                    <View style={[styles.InfoRowWrapper, { flexDirection: 'row' }]}>
                      <View style={styles.optionSectionType}>
                        <CheckBoxButton
                          width={'90%'}
                          height='80%'
                          selectedBackground={'#EC7063'}
                          unSelectedBackground={'#FDFEFE'}
                          checked={tag == 'DG'}
                          title={'DG'}
                          selectOption={() => this.setState({ tag: 'DG' })}
                        />
                      </View>
                      <View style={styles.optionSectionType}>
                        <CheckBoxButton
                          width={'90%'}
                          height='80%'
                          selectedBackground={'#EC7063'}
                          unSelectedBackground={'#FDFEFE'}
                          checked={tag == 'CD'}
                          title={'CD'}
                          selectOption={() => this.setState({ tag: 'CD' })}
                        />
                      </View>
                      <View style={styles.optionSectionType}>
                        <CheckBoxButton
                          width={'90%'}
                          height='80%'
                          selectedBackground={'#EC7063'}
                          unSelectedBackground={'#FDFEFE'}
                          checked={tag == 'QD'}
                          title={'Qua đêm'}
                          selectOption={() => this.setState({ tag: 'QD' })}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.rowInfoContainer}>
                    <View style={styles.titleWrapper}>
                      <Text style={styles.titleTxt}>Phòng:</Text>
                    </View>
                    <View style={[styles.InfoRowWrapper, { flexDirection: 'row' }]}>
                      <View style={styles.optionSectionType}>
                        <CheckBoxButton
                          width={'90%'}
                          height='80%'
                          selectedBackground={'#EC7063'}
                          unSelectedBackground={'#FDFEFE'}
                          checked={selectedSectionType == 'quat'}
                          title={'Quạt'}
                          selectOption={() => this.setState({ selectedSectionType: 'quat' })}
                        />
                      </View>
                      <View style={styles.optionSectionType}>
                        <CheckBoxButton
                          width={'90%'}
                          height='80%'
                          selectedBackground={'#EC7063'}
                          unSelectedBackground={'#FDFEFE'}
                          checked={selectedSectionType == 'lanh'}
                          title={'Lạnh'}
                          selectOption={() => this.setState({ selectedSectionType: 'lanh' })}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.rowInfoContainer}>
                    <View style={styles.titleWrapper}>
                      <Text style={styles.titleTxt}>CMND:</Text>
                    </View>
                    <View style={styles.InfoCMNDWrapper}>
                      <Image source={{ uri: 'https://lambangdaihocaz.com/wp-content/uploads/2019/06/nhan-lam-cmnd-gia.jpg' }} style={{ width: 80, height: 60, resizeMode: 'contain' }} />
                      <Image source={{ uri: 'https://lambangdaihocaz.com/wp-content/uploads/2019/06/nhan-lam-cmnd-gia.jpg' }} style={{ width: 80, height: 60, resizeMode: 'contain', marginLeft: 20 }} />
                    </View>
                  </View>
                </View>
                <View style={styles.bottomLeftBodyContainer}>
                  <Text style={[styles.titleTxt, { alignSelf: 'flex-start', marginLeft: 20 }]}>Ghi chú:</Text>
                  <TextInput
                    style={{ height: 100, width: '90%', borderWidth: 1, backgroundColor: 'white' }}
                    placeholder="Nhập ghi chú"
                    // onChangeText={(text) => this.setState({ currentNote: text })}
                    keyboardType="default"
                    blurOnSubmit={true}

                    autoCapitalize='none'
                    autoCompleteType='off'
                    autoCorrect={Platform.OS != 'ios'}
                    autoFocus={false}
                  // defaultValue=""
                  // multiline={Platform.OS != 'ios'}
                  />
                </View>
              </View>

              <View style={styles.rightBodyContainer}>
                <Text style={styles.titleTxt}>Dịch vụ sử dụng</Text>
                <View style={styles.menuWrapper}>
                  <ChargedItemRow
                    title={'Tiền phòng'}
                    totalPrice={'1000K'}
                    quantity={roomCost}
                  />
                  <ChargedItemRow
                    title={'Nước suối'}
                    totalPrice={'1000K'}
                    quantity={waterQuantity}
                    decreaseQuantity={() => this.decreaseQuantity('water', waterQuantity)}
                    increaseQuantity={() => this.increaseQuantity('water', waterQuantity)}
                  />
                  <ChargedItemRow
                    title={'Bia'}
                    totalPrice={'1000K'}
                    quantity={beerQuantity}
                    decreaseQuantity={() => this.decreaseQuantity('beer', beerQuantity)}
                    increaseQuantity={() => this.increaseQuantity('beer', beerQuantity)}
                  />
                  <ChargedItemRow
                    title={'Nước ngọt'}
                    totalPrice={'1000K'}
                    quantity={softdrinkQuantity}
                    decreaseQuantity={() => this.decreaseQuantity('softdrink', softdrinkQuantity)}
                    increaseQuantity={() => this.increaseQuantity('softdrink', softdrinkQuantity)}
                  />
                  <ChargedItemRow
                    title={'Mỳ gói'}
                    totalPrice={'1000K'}
                    quantity={instantNoodleQuantity}
                    decreaseQuantity={() => this.decreaseQuantity('instantNoodle', instantNoodleQuantity)}
                    increaseQuantity={() => this.increaseQuantity('instantNoodle', instantNoodleQuantity)}
                  />
                  <ChargedItemRow
                    title={'Chi Phí Khác'}
                    totalPrice={'1000K'}
                    quantity={additionalCost}
                  />
                  <View style={styles.totalWrapper}>
                    <View style={styles.totalHeaderWrapper}>
                      <Text style={styles.totalTxt}>Tổng:</Text>
                    </View>
                    <View style={styles.totalTxtWrapper}>
                      <Text style={styles.totalTxt}>1.091 K</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        }
        <View style={styles.bottomBar}>
          <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#E74C3C' }]}>
            <Text style={styles.headerTitleTxt}>Đổi phòng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#F1C40F' }]}>
            <Text style={styles.headerTitleTxt}>Trả tiền trước</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#65BE35' }]}>
            <Text style={styles.headerTitleTxt}>Trả phòng & Thanh Toán</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}        