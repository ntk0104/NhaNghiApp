import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, TextInput, Platform, Alert } from 'react-native'
import { Icon } from 'native-base'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import CheckBoxButton from '../../components/CheckBoxButton/index'
import ChargedItemRow from './ChargedItemRow'
import moment from 'moment'
import { makeGetRoomInfo } from '../../redux/selectors/index'
import { getRoomInfoRequest, updateRoomInfoRequest, updateChargedItemRequest, getRoomsDataRequest, getCashBoxRequest, addHistoryItemRequest, getHistoryListRequest, updateHistoryRoomRequest, cancelCurrentRoomRequest, deleteHistoryRoomRequest } from '../../redux/actions/index'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { appConfig } from '../../utils'
import { calculateRoomCostPerHour, calculateRoomCostOvernight } from '../../utils/Helpers'
import DatePicker from 'react-native-datepicker';
import RoomMap from '../Home/RoomMap/index'
import _ from 'lodash'
import Modal from 'react-native-modal'
import ActionSheet from 'react-native-action-sheet'
import NavigationHeader from './NavigationHeader'

const optionArray = [
  'Xóa hình',
  'Hủy'
]
var Sound = require('react-native-sound');
var whoosh = null

class DetailRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tag: null,
      sectionRoom: null,
      note: '',

      sectionPrice: 0,
      additionalPrice: 0,
      calculatedRoomCost: 0,

      roomCost: 0,
      waterQuantity: 0,
      waterCost: 0,
      beerQuantity: 0,
      beerCost: 0,
      softdrinkQuantity: 0,
      softdrinkCost: 0,
      instantNoodleQuantity: 0,
      instantNoodleCost: 0,
      additionalCost: 0,

      anotherCostModalVisible: false,
      modalAnotherCostHeader: 'Cộng thêm chi phí khác',
      modalNoteTitle: 'Ghi chú khoản thêm',
      anotherCostNoteText: '',
      anotherCostValue: 0,
      currentAddedType: 'add',

      alertReturnRoomModal: false,
      swapRoomModal: false,
      newChangedRoomID: undefined
    }
  }

  UNSAFE_componentWillReceiveProps(nextprops) {
    const { roomInfo } = nextprops
    const { chargedItems } = roomInfo
    this.setState({
      tag: roomInfo.tag,
      sectionRoom: roomInfo.sectionRoom,
      note: roomInfo.note,
      waterQuantity: chargedItems.water ? chargedItems.water.quantity : 0,
      waterCost: chargedItems.water ? chargedItems.water.total : 0,
      beerQuantity: chargedItems.beer ? chargedItems.beer.quantity : 0,
      beerCost: chargedItems.beer ? chargedItems.beer.total : 0,
      softdrinkQuantity: chargedItems.softdrink ? chargedItems.softdrink.quantity : 0,
      softdrinkCost: chargedItems.softdrink ? chargedItems.softdrink.total : 0,
      instantNoodleQuantity: chargedItems.instantNoodle ? chargedItems.instantNoodle.quantity : 0,
      instantNoodleCost: chargedItems.instantNoodle ? chargedItems.instantNoodle.total : 0,
      additionalCost: chargedItems.anotherCost ? chargedItems.anotherCost.total : 0,
      roomCost: chargedItems.roomcost ? chargedItems.roomcost.total : 0,
    }, () => this.calculateRoomCost())
  }

  componentDidMount() {
    const payload = this.props.navigation.getParam('payload')
    const { id } = payload
    this.props.getRoomInfoRequestHandler(payload)
    whoosh = new Sound('alert_return_room.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        // alert('failed to load the sound', error);
        return;
      }
    })
  }

  componentWillUnmount() {
    const { roomInfo } = this.props
    const { chargedItems } = roomInfo

    let newRoomInfoBody = {
      id: roomInfo.id
    }
    let newHistoryRoomBody = {
      sectionID: roomInfo.sectionID
    }
    // if tag changed
    if (this.state.tag != roomInfo.tag) {
      newRoomInfoBody['tag'] = this.state.tag
      newHistoryRoomBody['tag'] = this.state.tag
    }
    // if sectionRoom changed
    if (this.state.sectionRoom != roomInfo.sectionRoom) {
      newRoomInfoBody['sectionRoom'] = this.state.sectionRoom
      newRoomInfoBody['note'] = this.state.note
      newHistoryRoomBody['sectionRoom'] = this.state.sectionRoom
      newHistoryRoomBody['note'] = this.state.note
    }
    //if waterQuantity changed
    if (this.state.waterQuantity != chargedItems.water.quantity) {
      const chargedItemWaterBody = {
        id: roomInfo.sectionID + '_water',
        addedTime: moment().valueOf(),
        quantity: this.state.waterQuantity,
        total: this.state.waterQuantity * appConfig.unitWaterPrice
      }
      newRoomInfoBody['note'] = this.state.note
      newHistoryRoomBody['note'] = this.state.note
      this.props.updateChargedItemRequestHandler(chargedItemWaterBody)
    }
    //if beerQuantity changed
    if (this.state.beerQuantity != chargedItems.beer.quantity) {
      const chargedItemBeerBody = {
        id: roomInfo.sectionID + '_beer',
        addedTime: moment().valueOf(),
        quantity: this.state.beerQuantity,
        total: this.state.beerQuantity * appConfig.unitBeerPrice
      }
      newRoomInfoBody['note'] = this.state.note
      newHistoryRoomBody['note'] = this.state.note
      this.props.updateChargedItemRequestHandler(chargedItemBeerBody)
    }
    //if softdrink Quantity changed
    if (this.state.softdrinkQuantity != chargedItems.softdrink.quantity) {
      const chargedItemSoftdrinkBody = {
        id: roomInfo.sectionID + '_softdrink',
        addedTime: moment().valueOf(),
        quantity: this.state.softdrinkQuantity,
        total: this.state.softdrinkQuantity * appConfig.unitSoftDrinkPrice
      }
      newRoomInfoBody['note'] = this.state.note
      newHistoryRoomBody['note'] = this.state.note
      this.props.updateChargedItemRequestHandler(chargedItemSoftdrinkBody)
    }
    //if instantNoodle Quantity changed
    if (this.state.instantNoodleQuantity != chargedItems.instantNoodle.quantity) {
      const chargedItemInstantNoodleBody = {
        id: roomInfo.sectionID + '_instantNoodle',
        addedTime: moment().valueOf(),
        quantity: this.state.instantNoodleQuantity,
        total: this.state.instantNoodleQuantity * appConfig.unitInstantNoodle
      }
      newRoomInfoBody['note'] = this.state.note
      newHistoryRoomBody['note'] = this.state.note
      this.props.updateChargedItemRequestHandler(chargedItemInstantNoodleBody)
    }

    if (Object.keys(newRoomInfoBody).length > 1) {
      this.props.updateRoomInfoRequestHandler(newRoomInfoBody)
    }
    if (Object.keys(newHistoryRoomBody).length > 1) {
      this.props.updateHistoryRoomRequestHandler(newHistoryRoomBody)
    }
    // if ((Object.keys(newHistoryRoomBody).length > 1) || (Object.keys(newHistoryRoomBody).length > 1)) {
    //   setTimeout(() => {
    //     this.props.getHistoryListRequestHandler()
    //     this.props.getRoomsDataRequestHandler()
    //   }, 200)
    // }
    this.props.getHistoryListRequestHandler()
    this.props.getRoomsDataRequestHandler()
    whoosh.release();
  }

  calculateRoomCost = () => {
    const { sectionRoom, tag } = this.state
    const { roomInfo } = this.props
    const additionalPriceValue = sectionRoom == 'quat' ? appConfig.fanHourAdditionalPrice : appConfig.airHourAdditionalPrice
    const sectionPriceValue = sectionRoom == 'quat' ? appConfig.fanSectionPrice : appConfig.airSectionPrice
    let calculatedRoomCost = 0
    this.setState({ additionalPrice: additionalPriceValue, sectionPrice: sectionPriceValue }, () => {
      if (tag == 'QD') {
        calculatedRoomCost = calculateRoomCostOvernight(roomInfo.timeIn, moment().valueOf(), roomInfo.overnight_price, this.state.additionalPrice, this.state.sectionPrice)
        this.setState({ calculatedRoomCost })
      } else {
        calculatedRoomCost = calculateRoomCostPerHour(roomInfo.timeIn, moment().valueOf(), roomInfo.overnight_price, this.state.sectionPrice, this.state.additionalPrice)
        this.setState({ calculatedRoomCost: calculatedRoomCost })
      }
    });
  }

  decreaseQuantity = (itemID, currentValue) => {
    const { roomInfo } = this.props
    let addedNote = ''
    if (currentValue > 0) {
      currentValue -= 1
      if (itemID == 'water') {
        addedNote = moment().format('DD/MM/YY HH:mm') + ' Giảm số lượng Nước Suối thành ' + currentValue
        this.setState({ waterQuantity: currentValue, note: this.state.note + ',' + addedNote })
      } else if (itemID == 'beer') {
        addedNote = moment().format('DD/MM/YY HH:mm') + ' Giảm số lượng Bia thành ' + currentValue
        this.setState({ beerQuantity: currentValue, note: this.state.note + ',' + addedNote })
      } else if (itemID == 'softdrink') {
        addedNote = moment().format('DD/MM/YY HH:mm') + ' Giảm số lượng Nước Ngọt thành ' + currentValue
        this.setState({ softdrinkQuantity: currentValue, note: this.state.note + ',' + addedNote })
      } else if (itemID == 'instantNoodle') {
        addedNote = moment().format('DD/MM/YY HH:mm') + ' Giảm số lượng Mì gói thành ' + currentValue
        this.setState({ instantNoodleQuantity: currentValue, note: this.state.note + ',' + addedNote })
      }
    }
  }

  increaseQuantity = (itemID, currentValue) => {
    const { roomInfo } = this.props
    currentValue += 1
    let addedNote = ''
    if (itemID == 'water') {
      addedNote = moment().format('DD/MM/YY HH:mm') + ' Tăng số lượng Nước suối thành ' + currentValue
      this.setState({ waterQuantity: currentValue, note: this.state.note + ',' + addedNote })
    } else if (itemID == 'beer') {
      addedNote = moment().format('DD/MM/YY HH:mm') + ' Tăng số lượng Bia thành ' + currentValue
      this.setState({ beerQuantity: currentValue, note: this.state.note + ',' + addedNote })
    } else if (itemID == 'softdrink') {
      addedNote = moment().format('DD/MM/YY HH:mm') + ' Tăng số lượng Nước ngọt thành ' + currentValue
      this.setState({ softdrinkQuantity: currentValue, note: this.state.note + ',' + addedNote })
    } else if (itemID == 'instantNoodle') {
      addedNote = moment().format('DD/MM/YY HH:mm') + ' Tăng số lượng Mì gói thành ' + currentValue
      this.setState({ instantNoodleQuantity: currentValue, note: this.state.note + ',' + addedNote })
    }
  }

  editTag = (tagID) => {
    const { roomInfo } = this.props
    this.setState({ tag: tagID }, () => {
      this.calculateRoomCost()
    })
  }

  editSectionRoomType = (sectionID) => {
    //update room
    let addedNote = ''
    if (sectionID == 'quat') {
      addedNote = moment().format('DD/MM/YY HH:mm') + ' Thay đổi thành phòng Quạt'
    } else {
      addedNote = moment().format('DD/MM/YY HH:mm') + ' Thay đổi thành phòng Lạnh'
    }
    this.setState({
      sectionRoom: sectionID,
      note: this.state.note + ',' + addedNote
    }, () => this.calculateRoomCost())
  }

  payAdvanced = (totalPayment) => {
    const addedNote = moment().format('DD/MM/YY HH:mm') + ' Trả tiền trước ' + totalPayment + '.000'
    this.props.updateRoomInfoRequestHandler({
      id: this.props.roomInfo.id,
      note: this.state.note + ',' + addedNote,
      advancedPay: totalPayment + this.props.roomInfo.advancedPay
    })
    this.props.navigation.goBack()
    this.props.getCurrentMoneyInBoxHandler()
  }

  formatVND = (anotherCostValue) => {
    try {
      let intMoney = parseInt(anotherCostValue) * 1000
      // intMoney = intMoney.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
      intMoney = intMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      return intMoney
    } catch (error) {
      console.log("TCL: formatVND -> error", error)
    }
  }

  closeAnotherCostModal = () => {
    this.setState({
      anotherCostModalVisible: false,
      modalAnotherCostHeader: 'Cộng thêm chi phí khác',
      modalNoteTitle: 'Ghi chú khoản thêm',
      anotherCostNoteText: '',
      anotherCostValue: 0
    })
  }

  addAnotherCost = () => {
    this.setState({
      anotherCostModalVisible: true,
      modalAnotherCostHeader: 'Cộng thêm chi phí khác',
      modalNoteTitle: 'Ghi chú khoản thêm',
      anotherCostNoteText: '',
      anotherCostValue: 0,
      currentAddedType: 'add'
    })
  }

  minusAnotherCost = () => {
    this.setState({
      anotherCostModalVisible: true,
      modalAnotherCostHeader: 'Trừ đi chi phí khác',
      modalNoteTitle: 'Ghi chú khoản trừ',
      anotherCostNoteText: '',
      anotherCostValue: 0,
      currentAddedType: 'minus'
    })
  }

  closeEditAnotherCostModal = () => {
    this.setState({
      anotherCostModalVisible: false,
      modalAnotherCostHeader: 'Cộng thêm chi phí khác',
      modalNoteTitle: 'Ghi chú khoản thêm',
      anotherCostNoteText: '',
      anotherCostValue: 0
    })
  }

  submitAnotherCost = () => {
    const { roomInfo } = this.props
    let addedNote = ''
    if (this.state.currentAddedType == 'add') {
      this.props.updateChargedItemRequestHandler({
        id: roomInfo.sectionID + '_anotherCost',
        addedTime: moment().valueOf(),
        total: parseInt(this.state.additionalCost) + parseInt(this.state.anotherCostValue)
      })
      addedNote = moment().format('DD/MM/YY HH:mm') + ' CỘNG thêm vào chi phí khác (' + this.state.anotherCostNoteText + ') thêm: ' + this.state.anotherCostValue + ' K'
    } else {
      this.props.updateChargedItemRequestHandler({
        id: roomInfo.sectionID + '_anotherCost',
        addedTime: moment().valueOf(),
        total: parseInt(this.state.additionalCost) - parseInt(this.state.anotherCostValue)
      })
      addedNote = moment().format('DD/MM/YY HH:mm') + ' GIẢM chi phí khác (' + this.state.anotherCostNoteText + ') bớt đi: ' + this.state.anotherCostValue + ' K'
    }
    this.props.updateRoomInfoRequestHandler({
      id: this.props.roomInfo.id,
      note: this.state.note + ',' + addedNote
    })
    this.closeAnotherCostModal()
    this.props.getRoomInfoRequestHandler({ id: this.props.roomInfo.id })
  }

  returnRoom = () => {
    const { roomInfo } = this.props
    const { calculatedRoomCost, waterQuantity, beerQuantity, softdrinkQuantity, instantNoodleQuantity, additionalCost } = this.state
    this.props.updateRoomInfoRequestHandler({
      id: roomInfo.id,
      currentStatus: 'available',
      tag: '',
      sectionID: 0,
      timeIn: 0,
      sectionRoom: '',
      cmnd: '',
      advancedPay: 0
    })

    this.props.updateChargedItemRequestHandler({
      id: roomInfo.sectionID + '_water',
      payStatus: 'paid'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.sectionID + '_beer',
      payStatus: 'paid'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.sectionID + '_softdrink',
      payStatus: 'paid'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.sectionID + '_instantNoodle',
      payStatus: 'paid'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.sectionID + '_anotherCost',
      payStatus: 'paid'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.sectionID + '_roomcost',
      total: calculatedRoomCost,
      payStatus: 'paid'
    })

    this.setState({ alertReturnRoomModal: false }, () => {
      this.props.navigation.goBack()
      this.props.getCurrentMoneyInBoxHandler()
      this.props.updateHistoryRoomRequestHandler({
        sectionID: roomInfo.sectionID,
        total: calculatedRoomCost + waterQuantity * appConfig.unitWaterPrice + beerQuantity * appConfig.unitBeerPrice + softdrinkQuantity * appConfig.unitSoftDrinkPrice + instantNoodleQuantity * appConfig.unitInstantNoodle + additionalCost,
        timeOut: moment().valueOf()
      })
    })
  }

  lostRoom = () => {
    const { roomInfo } = this.props
    const { calculatedRoomCost } = this.state
    this.props.updateRoomInfoRequestHandler({
      id: roomInfo.id,
      currentStatus: 'available',
      tag: '',
      sectionID: 0,
      timeIn: 0,
      sectionRoom: '',
      cmnd: '',
      advancedPay: 0
    })

    this.props.updateChargedItemRequestHandler({
      id: roomInfo.sectionID + '_water',
      payStatus: 'lost'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.sectionID + '_beer',
      payStatus: 'lost'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.sectionID + '_softdrink',
      payStatus: 'lost'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.sectionID + '_instantNoodle',
      payStatus: 'lost'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.sectionID + '_anotherCost',
      payStatus: 'lost'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.sectionID + '_roomcost',
      total: calculatedRoomCost - roomInfo.advancedPay,
      payStatus: 'lost'
    })

    this.setState({ alertReturnRoomModal: false }, () => {
      this.props.navigation.goBack()
      this.props.updateHistoryRoomRequestHandler({
        sectionID: roomInfo.sectionID,
        timeOut: moment().valueOf()
      })
      setTimeout(() => this.props.getHistoryListRequestHandler(), 200)
    })
  }

  deleteRoom = () => {
    Alert.alert(
      'CHÚ Ý',
      'Bạn có chắc muốn hủy phòng này không?',
      [
        {
          text: 'Không',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Chắc chắn', onPress: () => {
            const { roomInfo } = this.props
            this.props.cancelCurrentRoomRequestHandler({
              sectionID: roomInfo.sectionID,
              roomID: roomInfo.id,
            })
            setTimeout(() => {
              this.props.getHistoryListRequestHandler()
              this.props.navigation.goBack()
            }, 300)
          }
        }
      ],
      { cancelable: true },
    );
  }

  selectDateFrom = (date) => {
    this.props.updateRoomInfoRequestHandler({
      id: this.props.roomInfo.id,
      timeIn: moment(date, 'DD/MM/YYYY HH:mm:ss').valueOf()
    })
    this.props.getRoomInfoRequestHandler({ id: this.props.roomInfo.id })
    this.props.updateHistoryRoomRequestHandler({
      sectionID: this.props.roomInfo.sectionID,
      timeIn: moment(date, 'DD/MM/YYYY HH:mm:ss').valueOf()
    })
    this.props.getHistoryListRequestHandler()
  }

  swapToNewRoom = (id) => {
    const { roomInfo } = this.props
    const { currentStatus, timeIn, note, tag, advancedPay, sectionRoom, sectionID, cmnd } = roomInfo
    //move data to new room - Room table
    this.props.updateRoomInfoRequestHandler({
      id: id,
      currentStatus,
      sectionID,
      timeIn,
      note,
      tag,
      advancedPay,
      sectionRoom,
      cmnd
    })

    // update history room item with new room id
    this.props.updateHistoryRoomRequestHandler({
      sectionID,
      roomID: id,
      roomName: id,
    })

    // update charged items
    this.props.updateChargedItemRequestHandler({
      id: sectionID + '_softdrink',
      roomID: id
    })
    this.props.updateChargedItemRequestHandler({
      id: sectionID + '_beer',
      roomID: id
    })
    this.props.updateChargedItemRequestHandler({
      id: sectionID + '_instantNoodle',
      roomID: id
    })
    this.props.updateChargedItemRequestHandler({
      id: sectionID + '_water',
      roomID: id
    })
    this.props.updateChargedItemRequestHandler({
      id: sectionID + '_anotherCost',
      roomID: id
    })
    this.props.updateChargedItemRequestHandler({
      id: sectionID + '_roomcost',
      roomID: id
    })

    this.setState({
      swapRoomModal: false
    }, () => {
      // reset current room - Room table
      this.props.updateRoomInfoRequestHandler({
        id: roomInfo.id,
        currentStatus: 'available',
        sectionID: 0,
        timeIn: 0,
        note: '',
        tag: '',
        advancedPay: 0,
        sectionRoom: '',
        cmnd: ''
      })
      this.props.getHistoryListRequestHandler()
      this.props.navigation.goBack()
    })
  }

  showAlertBusyRoom = () => {
    alert('Không thể đổi sang phòng đang có khách, vui lòng chọn phòng khác!')
  }

  showCamera = () => {
    this.props.navigation.navigate('LiveCamera', {
      roomID: this.props.roomInfo.id,
      sectionID: this.props.roomInfo.sectionID,
      cmnd: this.props.roomInfo.cmnd
    })
  }

  viewImage = (url) => {
    this.props.navigation.navigate('ViewImage', {
      urlImg: url
    })
  }

  showActionSheet = (selectedURL, listURLs) => {
    ActionSheet.showActionSheetWithOptions({
      options: optionArray,
      cancelButtonIndex: 1,
      destructiveButtonIndex: 0,
      tintColor: 'blue'
    },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          listURLs.splice(listURLs.indexOf(selectedURL), 1)
          this.props.updateRoomInfoRequestHandler({
            id: this.props.roomInfo.id,
            cmnd: listURLs.join(';')
          })
          this.props.updateHistoryRoomRequestHandler({
            sectionID: this.props.roomInfo.sectionID,
            cmnd: listURLs.join(';')
          })
          this.props.getRoomInfoRequestHandler({ id: this.props.roomInfo.id })
        }
      });
  };

  render() {
    const { tag, sectionRoom, calculatedRoomCost, waterQuantity, beerQuantity, softdrinkQuantity, instantNoodleQuantity, additionalCost, anotherCostModalVisible, note, modalAnotherCostHeader, modalNoteTitle, anotherCostValue, alertReturnRoomModal, swapRoomModal, newChangedRoomID } = this.state
    const totalPayment = this.props.roomInfo && calculatedRoomCost + waterQuantity * appConfig.unitWaterPrice + beerQuantity * appConfig.unitBeerPrice + softdrinkQuantity * appConfig.unitSoftDrinkPrice + instantNoodleQuantity * appConfig.unitInstantNoodle + additionalCost - this.props.roomInfo.advancedPay
    const noteList = note.split(',')
    const generatedNote = noteList.join('\n')
    const formatedVND = this.formatVND(anotherCostValue)
    const formatedTotalPayment = this.formatVND(totalPayment)
    const listImgs = this.props.roomInfo && this.props.roomInfo.cmnd.length > 0 && this.props.roomInfo.cmnd.split(';')
    return (
      <View style={styles.container} >
        {
          this.props.roomInfo &&
          <NavigationHeader goBack={() => this.props.navigation.goBack()} roomName={this.props.roomInfo.roomName} deleteRoom={this.deleteRoom} />
        }
        {
          this.props.roomInfo &&
          <View style={styles.bodyContainer}>
            <View style={styles.leftBodyContainer}>
              <View style={styles.topLeftBodyContainer}>
                <View style={styles.rowInfoContainer}>
                  <View style={styles.titleWrapper}>
                    <Text style={styles.titleTxt}>Giờ Vào:</Text>
                  </View>
                  <View style={[styles.InfoRowWrapper, { flex: 2 }]}>
                    <Text style={styles.titleTxt}>{moment(this.props.roomInfo.timeIn).format('HH:mm (DD/MM/YYYY)')}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <DatePicker
                      style={styles.startDatePicker}
                      iconSource={require('../../assets/images/calendar.png')}
                      mode='datetime'
                      placeholder='Thay đổi'
                      format='DD/MM/YYYY HH:mm:ss'
                      is24Hour={true}
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
                  </View>
                </View>
                <View style={styles.rowInfoContainer}>
                  <View style={styles.titleWrapper}>
                    <Text style={styles.titleTxt}>Thời gian ở:</Text>
                  </View>
                  <View style={styles.InfoRowWrapper}>
                    <Text style={styles.titleTxt}>{this.props.roomInfo.duration}</Text>
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
                        selectOption={() => this.editTag('DG')}
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
                        selectOption={() => this.editTag('CD')}
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
                        selectOption={() => this.editTag('QD')}
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
                        checked={sectionRoom == 'quat'}
                        title={'Quạt'}
                        selectOption={() => this.editSectionRoomType('quat')}
                      />
                    </View>
                    <View style={styles.optionSectionType}>
                      <CheckBoxButton
                        width={'90%'}
                        height='80%'
                        selectedBackground={'#EC7063'}
                        unSelectedBackground={'#FDFEFE'}
                        checked={sectionRoom == 'lanh'}
                        title={'Lạnh'}
                        selectOption={() => this.editSectionRoomType('lanh')}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.rowInfoContainer}>
                  <View style={styles.titleWrapper}>
                    <Text style={styles.titleTxt}>CMND:</Text>
                  </View>
                  <View style={styles.InfoCMNDWrapper}>
                    <TouchableOpacity style={styles.btnCamera} onPress={this.showCamera}>
                      <Icon type="Entypo" name="camera" style={styles.iconCamera} />
                    </TouchableOpacity>
                    {
                      listImgs.length > 0 && listImgs.map(item => (
                        <TouchableOpacity onPress={() => this.viewImage(item)} onLongPress={() => this.showActionSheet(item, listImgs)}>
                          <Image source={{ uri: item }} style={styles.imgCMND} />
                        </TouchableOpacity>
                      ))
                    }
                  </View>
                </View>
              </View>
              <View style={styles.bottomLeftBodyContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  <Text style={[styles.titleTxt, { alignSelf: 'flex-start', marginLeft: 20 }]}>Note:</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 5.5, paddingVertical: 5 }}>
                  <TextInput
                    style={styles.historyNote}
                    placeholder="Nhập ghi chú"
                    keyboardType="default"
                    blurOnSubmit={true}
                    value={generatedNote}
                    autoCapitalize='none'
                    autoCompleteType='off'
                    autoCorrect={Platform.OS != 'ios'}
                    autoFocus={false}
                    multiline
                    scrollEnabled={true}
                    // setFocusableInTouchMode={false}
                    focusable={false}
                    focusableInTouchMode={false}
                  // editable={false}
                  />
                </View>

              </View>
            </View>

            <View style={styles.rightBodyContainer}>
              <Text style={styles.titleTxt}>Dịch vụ sử dụng</Text>
              <View style={styles.menuWrapper}>
                <ChargedItemRow
                  title={'Tiền phòng'}
                  totalPrice={calculatedRoomCost}
                  duration={this.props.roomInfo.duration}
                />
                <ChargedItemRow
                  title={'Nước suối'}
                  totalPrice={waterQuantity * appConfig.unitWaterPrice}
                  quantity={waterQuantity}
                  decreaseQuantity={() => this.decreaseQuantity('water', waterQuantity)}
                  increaseQuantity={() => this.increaseQuantity('water', waterQuantity)}
                />
                <ChargedItemRow
                  title={'Bia'}
                  totalPrice={beerQuantity * appConfig.unitBeerPrice}
                  quantity={beerQuantity}
                  decreaseQuantity={() => this.decreaseQuantity('beer', beerQuantity)}
                  increaseQuantity={() => this.increaseQuantity('beer', beerQuantity)}
                />
                <ChargedItemRow
                  title={'Nước ngọt'}
                  totalPrice={softdrinkQuantity * appConfig.unitSoftDrinkPrice}
                  quantity={softdrinkQuantity}
                  decreaseQuantity={() => this.decreaseQuantity('softdrink', softdrinkQuantity)}
                  increaseQuantity={() => this.increaseQuantity('softdrink', softdrinkQuantity)}
                />
                <ChargedItemRow
                  title={'Mỳ trứng'}
                  totalPrice={instantNoodleQuantity * appConfig.unitInstantNoodle}
                  quantity={instantNoodleQuantity}
                  decreaseQuantity={() => this.decreaseQuantity('instantNoodle', instantNoodleQuantity)}
                  increaseQuantity={() => this.increaseQuantity('instantNoodle', instantNoodleQuantity)}
                />
                <ChargedItemRow
                  title={'Chi Phí Khác'}
                  totalPrice={additionalCost}
                  quantity={additionalCost}
                  decreaseQuantity={() => this.minusAnotherCost()}
                  increaseQuantity={() => this.addAnotherCost()}
                />
                <View style={styles.totalWrapper}>
                  <View style={styles.totalHeaderWrapper}>
                    <Text style={styles.totalTxt}>Tổng:</Text>
                  </View>
                  <View style={styles.totalTxtWrapper}>
                    <Text style={styles.totalTxt}>{formatedTotalPayment}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        }
        < View style={styles.bottomBar} >
          <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#E74C3C' }]} onPress={() => this.setState({ swapRoomModal: true })}>
            <Text style={styles.headerTitleTxt}>Đổi phòng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAction, { backgroundColor: totalPayment > 0 ? '#F1C40F' : 'gray' }]} onPress={() => this.payAdvanced(totalPayment)} disabled={totalPayment == 0}>
            <Text style={styles.headerTitleTxt}>Trả tiền trước</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#65BE35' }]} onPress={() => this.setState({ alertReturnRoomModal: true }, () => { whoosh.play() })}>
            {
              totalPayment > 0 ?
                <Text style={styles.headerTitleTxt}>Trả phòng&Thanh Toán</Text>
                :
                <Text style={styles.headerTitleTxt}>Trả phòng</Text>
            }
          </TouchableOpacity>
        </View >
        <Modal isVisible={anotherCostModalVisible} style={styles.modalContainer}>
          <View style={styles.modalWrapper}>
            <View style={[styles.modalHeaderWrapper, { backgroundColor: this.state.currentAddedType == 'minus' ? '#F5B041' : '#2A6C97' }]}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.modalHeaderTxt}>{modalAnotherCostHeader}</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.btnCloseModal} onPress={() => this.setState({ anotherCostModalVisible: false })} onPress={this.closeAnotherCostModal}>
                <Icon type="AntDesign" name="close" style={styles.iconClose} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBodyWrapper}>
              <View style={styles.modalBodyRow}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.modalTitleRowTxt}>{modalNoteTitle}:</Text>
                </View>
                <View style={{ flex: 2.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                  <TextInput
                    style={styles.txtTextInput}
                    placeholder="Tên khoản thêm"
                    returnKeyType="next"
                    keyboardType="default"
                    blurOnSubmit={true}
                    autoCapitalize='none'
                    autoCompleteType='off'
                    autoCorrect={Platform.OS != 'ios'}
                    autoFocus={true}
                    onChangeText={(text) => this.setState({ anotherCostNoteText: text })}
                  />
                </View>
              </View>
              <View style={styles.modalBodyRow}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.modalTitleRowTxt}>Số tiền thu:</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                  <TextInput
                    style={styles.txtTextInput}
                    placeholder="Số tiền thu"
                    keyboardType='numeric'
                    blurOnSubmit={true}
                    autoCapitalize='none'
                    autoCompleteType='off'
                    autoCorrect={Platform.OS != 'ios'}
                    onChangeText={(text) => this.setState({ anotherCostValue: text })}
                  />
                </View>
                <View style={{ flex: 1.5, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                  <Text style={styles.modalTitleRowTxt}>x 1.000 = </Text>
                  <Text style={styles.modalTitleRowTxt}>{formatedVND}</Text>
                </View>
              </View>
            </View>
            <View style={styles.modalFooterWrapper}>
              <TouchableOpacity activeOpacity={0.7} style={styles.btnInput} onPress={this.submitAnotherCost}>
                <Text style={styles.modalHeaderTxt}>Nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {
          this.props.roomInfo &&
          <Modal isVisible={alertReturnRoomModal} style={styles.modalReturnContainer}>
            <View style={styles.modalReturnRoomWrapper}>
              <View style={[styles.modalHeaderWrapper, { backgroundColor: this.state.currentAddedType == 'minus' ? '#F5B041' : '#2A6C97' }]}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.modalHeaderTxt}>Xác nhận trả phòng {this.props.roomInfo.roomName}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} style={styles.btnCloseModal} onPress={() => this.setState({ alertReturnRoomModal: false })}>
                  <Icon type="AntDesign" name="close" size={30} style={{ color: 'white' }} />
                </TouchableOpacity>
              </View>
              <View style={[styles.modalBodyWrapper, { padding: 10, justifyContent: 'space-around' }]}>
                <Text style={styles.titleTxt}>Số tiền khách cần thanh toán là: <Text style={{ color: 'red', fontWeight: 'bold' }}>{formatedTotalPayment}</Text></Text>
                {
                  totalPayment < 500 &&
                  <Text style={styles.titleTxt}>Khách đưa 500.000 thối lại: <Text style={{ color: 'blue' }}>{this.formatVND(500 - totalPayment)}</Text></Text>
                }
                {
                  totalPayment < 200 &&
                  <Text style={styles.titleTxt}>Khách đưa 200.000 thối lại: <Text style={{ color: 'blue' }}>{this.formatVND(200 - totalPayment)}</Text></Text>
                }
                {
                  totalPayment < 100 &&
                  <Text style={styles.titleTxt}>Khách đưa 100.000 thối lại: <Text style={{ color: 'blue' }}>{this.formatVND(100 - totalPayment)}</Text></Text>
                }
                <Text style={styles.titleTxt}>Nhớ trả <Text style={{ color: 'red' }}>CHỨNG MINH</Text> <Icon type='AntDesign' name='idcard' style={{ color: 'green', fontSize: 40 }} />  và đòi <Text style={{ color: 'red' }}>CHÌA KHÓA</Text> <Icon type='FontAwesome5' name='key' style={{ color: '#B7950B', fontSize: 40 }} /></Text>
              </View>
              <View style={styles.modalFooterWrapper}>
                <TouchableOpacity activeOpacity={0.7} style={[styles.btnInput, { backgroundColor: 'red' }]} onPress={this.lostRoom}>
                  <Text style={styles.modalHeaderTxt}>KHÁCH TRỐN</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.btnInput} onPress={this.returnRoom}>
                  <Text style={styles.modalHeaderTxt}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        }
        <Modal isVisible={swapRoomModal} style={styles.modalReturnContainer}>
          <View style={styles.modalSwapRoomWrapper}>
            <View style={styles.modalHeaderWrapper}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.modalHeaderTxt}>Chọn phòng để đổi</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.btnCloseModal} onPress={() => this.setState({ swapRoomModal: false })}>
                <Icon type="AntDesign" name="close" size={30} style={{ color: 'white' }} />
              </TouchableOpacity>
            </View>
            <View style={[styles.modalSwapRoomWrapper, { padding: 10, justifyContent: 'space-around' }]}>
              <RoomMap showGetRoomModal={this.swapToNewRoom} showRoomDetail={this.showAlertBusyRoom} />
            </View>
          </View>
        </Modal>
      </View >
    )
  }
}

const mapStateToProps = createStructuredSelector({
  roomInfo: makeGetRoomInfo()
})

const mapDispatchToProps = dispatch => ({
  getRoomInfoRequestHandler: payload => dispatch(getRoomInfoRequest(payload)),
  updateChargedItemRequestHandler: payload => dispatch(updateChargedItemRequest(payload)),
  updateRoomInfoRequestHandler: payload => dispatch(updateRoomInfoRequest(payload)),
  getRoomsDataRequestHandler: () => dispatch(getRoomsDataRequest()),
  getCurrentMoneyInBoxHandler: () => dispatch(getCashBoxRequest()),
  getHistoryListRequestHandler: () => dispatch(getHistoryListRequest()),
  updateHistoryRoomRequestHandler: (payload) => dispatch(updateHistoryRoomRequest(payload)),
  cancelCurrentRoomRequestHandler: (payload) => dispatch(cancelCurrentRoomRequest(payload)),
  deleteHistoryRoomRequestHandler: (payload) => dispatch(deleteHistoryRoomRequest(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailRoom)