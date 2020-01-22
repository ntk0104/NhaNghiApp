import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import { Icon } from 'native-base'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import CheckBoxButton from '../../components/CheckBoxButton/index'
import ChargedItemRow from './ChargedItemRow'
import moment from 'moment'
import { makeGetRoomInfo } from '../../redux/selectors/index'
import { getRoomInfoRequest, updateRoomInfoRequest, updateChargedItemRequest, getRoomsDataRequest, getCashBoxRequest, addHistoryItemRequest, getHistoryListRequest, updateHistoryRoomRequest, cancelCurrentRoomRequest } from '../../redux/actions/index'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { appConfig } from '../../utils'
import { calculateRoomCostPerHour, calculateRoomCostOvernight } from '../../utils/Helpers'
import _ from 'lodash'
import Modal from 'react-native-modal'

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

      alertReturnRoomModal: false
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
  }

  componentWillUnmount() {
    this.props.getRoomsDataRequestHandler()
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
        this.setState({ waterQuantity: currentValue })
        this.props.updateChargedItemRequestHandler({
          id: roomInfo.timeIn + '_water',
          addedTime: moment().valueOf(),
          quantity: currentValue,
          total: currentValue * appConfig.unitWaterPrice
        })
        addedNote = moment().format('DD/MM/YY HH:mm') + ' Giảm số lượng Nước Suối thành ' + currentValue
      } else if (itemID == 'beer') {
        this.setState({ beerQuantity: currentValue })
        this.props.updateChargedItemRequestHandler({
          id: roomInfo.timeIn + '_beer',
          addedTime: moment().valueOf(),
          quantity: currentValue,
          total: currentValue * appConfig.unitBeerPrice
        })
        addedNote = moment().format('DD/MM/YY HH:mm') + ' Giảm số lượng Bia thành ' + currentValue
      } else if (itemID == 'softdrink') {
        this.setState({ softdrinkQuantity: currentValue })
        this.props.updateChargedItemRequestHandler({
          id: roomInfo.timeIn + '_softdrink',
          addedTime: moment().valueOf(),
          quantity: currentValue,
          total: currentValue * appConfig.unitSoftDrinkPrice
        })
        addedNote = moment().format('DD/MM/YY HH:mm') + ' Giảm số lượng Nước Ngọt thành ' + currentValue
      } else if (itemID == 'instantNoodle') {
        this.setState({ instantNoodleQuantity: currentValue })
        this.props.updateChargedItemRequestHandler({
          id: roomInfo.timeIn + '_instantNoodle',
          addedTime: moment().valueOf(),
          quantity: currentValue,
          total: currentValue * appConfig.unitInstantNoodle
        })
        addedNote = moment().format('DD/MM/YY HH:mm') + ' Giảm số lượng Mì gói thành ' + currentValue
      }
      this.props.updateRoomInfoRequestHandler({
        id: this.props.roomInfo.id,
        note: this.state.note + ',' + addedNote
      })
      this.props.getRoomInfoRequestHandler({ id: this.props.roomInfo.id })
    }
  }

  increaseQuantity = (itemID, currentValue) => {
    const { roomInfo } = this.props
    currentValue += 1
    let addedNote = ''
    if (itemID == 'water') {
      this.setState({ waterQuantity: currentValue })
      this.props.updateChargedItemRequestHandler({
        id: roomInfo.timeIn + '_water',
        addedTime: moment().valueOf(),
        quantity: currentValue,
        total: currentValue * appConfig.unitWaterPrice
      })
      addedNote = moment().format('DD/MM/YY HH:mm') + ' Tăng số lượng Nước suối thành ' + currentValue
    } else if (itemID == 'beer') {
      this.setState({ beerQuantity: currentValue })
      this.props.updateChargedItemRequestHandler({
        id: roomInfo.timeIn + '_beer',
        addedTime: moment().valueOf(),
        quantity: currentValue,
        total: currentValue * appConfig.unitBeerPrice
      })
      addedNote = moment().format('DD/MM/YY HH:mm') + ' Tăng số lượng Bia thành ' + currentValue
    } else if (itemID == 'softdrink') {
      this.setState({ softdrinkQuantity: currentValue })
      this.props.updateChargedItemRequestHandler({
        id: roomInfo.timeIn + '_softdrink',
        addedTime: moment().valueOf(),
        quantity: currentValue,
        total: currentValue * appConfig.unitSoftDrinkPrice
      })
      addedNote = moment().format('DD/MM/YY HH:mm') + ' Tăng số lượng Nước ngọt thành ' + currentValue
    } else if (itemID == 'instantNoodle') {
      this.setState({ instantNoodleQuantity: currentValue })
      this.props.updateChargedItemRequestHandler({
        id: roomInfo.timeIn + '_instantNoodle',
        addedTime: moment().valueOf(),
        quantity: currentValue,
        total: currentValue * appConfig.unitInstantNoodle
      })
      addedNote = moment().format('DD/MM/YY HH:mm') + ' Tăng số lượng Mì gói thành ' + currentValue
    }
    this.props.updateRoomInfoRequestHandler({
      id: this.props.roomInfo.id,
      note: this.state.note + ',' + addedNote
    })
    this.props.getRoomInfoRequestHandler({ id: this.props.roomInfo.id })
  }

  editTag = (tagID) => {
    const { sectionRoom } = this.state
    const { roomInfo } = this.props
    if (tagID == 'DG') {
      this.setState({
        tag: tagID,
        sectionRoom: 'quat'
      })
    } else if (tagID == 'CD') {
      this.setState({
        tag: tagID,
        sectionRoom: 'lanh'
      })
    } else {
      this.setState({
        tag: tagID,
        sectionRoom: 'lanh'
      })
    }
    //update room
    this.props.updateRoomInfoRequestHandler({
      id: roomInfo.id,
      tag: tagID
    })
    setTimeout(() => {
      this.calculateRoomCost()
      this.props.updateHistoryRoomRequestHandler({
        addedTime: roomInfo.timeIn,
        tag: tagID,
        sectionRoom: sectionRoom
      })
    }, 300)
    setTimeout(() => {
      this.props.getHistoryListRequestHandler()
    }, 500)


  }

  editSectionRoomType = (sectionID) => {
    this.setState({
      sectionRoom: sectionID
    }, () => this.calculateRoomCost())
    //update room
    let addedNote = ''
    if (sectionID == 'quat') {
      addedNote = moment().format('DD/MM/YY HH:mm') + ' Thay đổi thành phòng Quạt'
    } else {
      addedNote = moment().format('DD/MM/YY HH:mm') + ' Thay đổi thành phòng Lạnh'
    }
    this.props.updateRoomInfoRequestHandler({
      id: this.props.roomInfo.id,
      sectionRoom: sectionID,
      note: this.state.note + ',' + addedNote
    })
    this.props.updateHistoryRoomRequestHandler({
      addedTime: this.state.roomInfo.timeIn,
      sectionRoom: sectionID
    })
    this.props.getRoomInfoRequestHandler({ id: this.props.roomInfo.id })
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
        id: roomInfo.timeIn + '_anotherCost',
        addedTime: moment().valueOf(),
        total: parseInt(this.state.additionalCost) + parseInt(this.state.anotherCostValue)
      })
      addedNote = moment().format('DD/MM/YY HH:mm') + ' CỘNG thêm vào chi phí khác (' + this.state.anotherCostNoteText + ') thêm: ' + this.state.anotherCostValue + ' K'
    } else {
      this.props.updateChargedItemRequestHandler({
        id: roomInfo.timeIn + '_anotherCost',
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
    const { calculatedRoomCost, waterQuantity, beerQuantity, softdrinkQuantity, instantNoodleQuantity, additionalCost, sectionRoom, tag } = this.state
    this.props.updateRoomInfoRequestHandler({
      id: roomInfo.id,
      currentStatus: 'available',
      tag: '',
      timeIn: 0,
      sectionRoom: '',
      cmnd: null,
      advancedPay: 0
    })

    this.props.updateChargedItemRequestHandler({
      id: roomInfo.timeIn + '_water',
      payStatus: 'paid'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.timeIn + '_beer',
      payStatus: 'paid'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.timeIn + '_softdrink',
      payStatus: 'paid'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.timeIn + '_instantNoodle',
      payStatus: 'paid'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.timeIn + '_anotherCost',
      payStatus: 'paid'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.timeIn + '_roomcost',
      total: calculatedRoomCost,
      payStatus: 'paid'
    })

    this.setState({ alertReturnRoomModal: false }, () => {
      this.props.navigation.goBack()
      this.props.getCurrentMoneyInBoxHandler()
      this.props.addHistoryItemRequestHandler({
        roomID: roomInfo.id,
        roomName: roomInfo.roomName,
        status: 'out',
        total: calculatedRoomCost + waterQuantity * appConfig.unitWaterPrice + beerQuantity * appConfig.unitBeerPrice + softdrinkQuantity * appConfig.unitSoftDrinkPrice + instantNoodleQuantity * appConfig.unitInstantNoodle + additionalCost,
        sectionID: roomInfo.timeIn,
        timeIn: roomInfo.timeIn,
        note: roomInfo.note,
        tag: tag,
        sectionRoom: sectionRoom,
        cmnd: null
      })
      setTimeout(() => this.props.getHistoryListRequestHandler(), 300)

    })

  }

  lostRoom = () => {
    const { roomInfo } = this.props
    const { calculatedRoomCost, waterQuantity, beerQuantity, softdrinkQuantity, instantNoodleQuantity, additionalCost, sectionRoom, tag } = this.state
    this.props.updateRoomInfoRequestHandler({
      id: roomInfo.id,
      currentStatus: 'available',
      tag: '',
      timeIn: 0,
      sectionRoom: '',
      cmnd: null,
      advancedPay: 0
    })

    this.props.updateChargedItemRequestHandler({
      id: roomInfo.timeIn + '_water',
      payStatus: 'lost'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.timeIn + '_beer',
      payStatus: 'lost'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.timeIn + '_softdrink',
      payStatus: 'lost'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.timeIn + '_instantNoodle',
      payStatus: 'lost'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.timeIn + '_anotherCost',
      payStatus: 'lost'
    })
    this.props.updateChargedItemRequestHandler({
      id: roomInfo.timeIn + '_roomcost',
      total: calculatedRoomCost - roomInfo.advancedPay,
      payStatus: 'lost'
    })

    this.setState({ alertReturnRoomModal: false }, () => {
      this.props.navigation.goBack()
      this.props.addHistoryItemRequestHandler({
        roomID: roomInfo.id,
        roomName: roomInfo.roomName,
        status: 'out',
        total: roomInfo.advancedPay,
        sectionID: roomInfo.timeIn,
        timeIn: roomInfo.timeIn,
        note: roomInfo.note,
        tag: tag,
        sectionRoom: sectionRoom,
        cmnd: null
      })
      setTimeout(() => this.props.getHistoryListRequestHandler(), 300)
    })
  }

  deleteRoom = () => {
    const { roomInfo } = this.props
    this.props.cancelCurrentRoomRequestHandler({
      timeIn: roomInfo.timeIn,
      roomID: roomInfo.id,
    })
    setTimeout(() => {
      this.props.getHistoryListRequestHandler()
      this.props.navigation.goBack()
    }, 300)

  }

  render() {
    const { tag, sectionRoom, calculatedRoomCost, waterQuantity, beerQuantity, softdrinkQuantity, instantNoodleQuantity, additionalCost, anotherCostModalVisible, note, modalAnotherCostHeader, modalNoteTitle, anotherCostValue, alertReturnRoomModal } = this.state
    const totalPayment = this.props.roomInfo && calculatedRoomCost + waterQuantity * appConfig.unitWaterPrice + beerQuantity * appConfig.unitBeerPrice + softdrinkQuantity * appConfig.unitSoftDrinkPrice + instantNoodleQuantity * appConfig.unitInstantNoodle + additionalCost - this.props.roomInfo.advancedPay
    const noteList = note.split(',')
    const generatedNote = noteList.join('\n')
    const formatedVND = this.formatVND(anotherCostValue)
    const formatedTotalPayment = this.formatVND(totalPayment)
    return (
      <View style={styles.container}>
        {
          this.props.roomInfo &&
          <View style={styles.navigationBar}>
            <TouchableOpacity style={styles.btnBack} onPress={() => this.props.navigation.goBack()}>
              <Icon type='AntDesign' name='arrowleft' style={styles.iconBack} />
            </TouchableOpacity>
            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleTxt}>Chi tiết phòng {this.props.roomInfo.roomName}</Text>
            </View>
            <TouchableOpacity style={styles.btnDeleteRoom} onPress={this.deleteRoom}>
              <Text style={styles.deleteRoomTxt}>Hủy Phòng</Text>
              <Icon type='AntDesign' name='delete' style={styles.iconBack} />
            </TouchableOpacity>
          </View>
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
                  <View style={styles.InfoRowWrapper}>
                    <Text style={styles.titleTxt}>{moment(this.props.roomInfo.timeIn).format('HH:mm (DD/MM/YYYY)')}</Text>
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
                    <Image source={{ uri: 'https://lambangdaihocaz.com/wp-content/uploads/2019/06/nhan-lam-cmnd-gia.jpg' }} style={styles.imgCMND} />
                    <Image source={{ uri: 'https://lambangdaihocaz.com/wp-content/uploads/2019/06/nhan-lam-cmnd-gia.jpg' }} style={[styles.imgCMND, { marginLeft: 20 }]} />
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
        <View style={styles.bottomBar}>
          <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#E74C3C' }]}>
            <Text style={styles.headerTitleTxt}>Đổi phòng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAction, { backgroundColor: totalPayment > 0 ? '#F1C40F' : 'gray' }]} onPress={() => this.payAdvanced(totalPayment)} disabled={totalPayment == 0}>
            <Text style={styles.headerTitleTxt}>Trả tiền trước</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#65BE35' }]} onPress={() => this.setState({ alertReturnRoomModal: true })}>
            {
              totalPayment > 0 ?
                <Text style={styles.headerTitleTxt}>Trả phòng&Thanh Toán</Text>
                :
                <Text style={styles.headerTitleTxt}>Trả phòng</Text>
            }
          </TouchableOpacity>
        </View>
        <Modal isVisible={anotherCostModalVisible} style={styles.modalContainer} onBackdropPress={this.closeEditAnotherCostModal}>
          <View style={styles.modalWrapper}>
            <View style={[styles.modalHeaderWrapper, { backgroundColor: this.state.currentAddedType == 'minus' ? '#F5B041' : '#2A6C97' }]}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.modalHeaderTxt}>{modalAnotherCostHeader}</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.btnCloseModal} onPress={this.closeGetRoomModal} onPress={this.closeAnotherCostModal}>
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
              <TouchableOpacity activeOpacity={0.7} style={styles.btnInput} onPress={this.closeGetRoomModal} onPress={this.submitAnotherCost}>
                <Text style={styles.modalHeaderTxt}>Nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {
          this.props.roomInfo &&
          <Modal isVisible={alertReturnRoomModal} style={styles.modalReturnContainer} onBackdropPress={() => this.setState({ alertReturnRoomModal: false })}>
            <View style={styles.modalReturnRoomWrapper}>
              <View style={[styles.modalHeaderWrapper, { backgroundColor: this.state.currentAddedType == 'minus' ? '#F5B041' : '#2A6C97' }]}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.modalHeaderTxt}>Xác nhận trả phòng {this.props.roomInfo.roomName}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} style={styles.btnCloseModal} onPress={this.closeGetRoomModal} onPress={() => this.setState({ alertReturnRoomModal: false })}>
                  <Icon type="AntDesign" name="close" size={30} style={{ color: 'white' }} />
                </TouchableOpacity>
              </View>
              <View style={[styles.modalBodyWrapper, { padding: 10, justifyContent: 'space-around' }]}>
                <Text style={styles.titleTxt}>Số tiền khách cần thanh toán là: {formatedTotalPayment}</Text>
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
                <TouchableOpacity activeOpacity={0.7} style={[styles.btnInput, { backgroundColor: 'red' }]} onPress={this.closeGetRoomModal} onPress={this.lostRoom}>
                  <Text style={styles.modalHeaderTxt}>KHÁCH TRỐN</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.btnInput} onPress={this.closeGetRoomModal} onPress={this.returnRoom}>
                  <Text style={styles.modalHeaderTxt}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        }
      </View>
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
  addHistoryItemRequestHandler: payload => dispatch(addHistoryItemRequest(payload)),
  getHistoryListRequestHandler: () => dispatch(getHistoryListRequest()),
  updateHistoryRoomRequestHandler: (payload) => dispatch(updateHistoryRoomRequest(payload)),
  cancelCurrentRoomRequestHandler: (payload) => dispatch(cancelCurrentRoomRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailRoom)