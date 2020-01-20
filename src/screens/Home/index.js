import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import styles from './styles'
import MenuBar from '../../components/MenuBar/index'
import Modal from 'react-native-modal'
import { Icon, CheckBox } from 'native-base'
import Realm from 'realm'
import { addRoom } from '../../database/index'
import moment from 'moment'
import { Storage, constants, appConfig } from '../../utils'
import RoomMap from './RoomMap'
import CashBox from './CashBox'
import HistoryList from './HistoryList'
import { camera, pickerImage } from '../../components/ImagePicker/index'
import { getRoomsDataRequest, updateRoomInfoRequest, addChargedItemRequest, getCashBoxRequest, updateCashBoxRequest, addHistoryItemRequest, getHistoryListRequest } from '../../redux/actions/index'
import { connect } from 'react-redux';
import { makeGetHistoryRoom } from '../../redux/selectors/index'

import { createStructuredSelector } from 'reselect';

class Home extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      modalGetRoomVisible: false,
      selectedSectionType: 'CD',
      selectedRoomType: 'quat',
      gettingRoomName: null,
      currentNote: '',
      gettingRoomID: null,

      changeCashBoxVisible: false,
      changeCashBoxModalHeader: '',
      modalCashBoxTitle: 'Ghi chú khoản thêm',
      changeMoneyTxt: '',
      changeMoneyValue: 0,
      changeMoneyType: 'deposit',
    }
  }

  componentDidMount() {
    console.log('%c%s', 'color: #22b6', Realm.defaultPath);
    this.checkFirstInitApp()
  }

  showCamera = () => {
    camera((source, data) => {
      this.setState({
        imageUrl: source,
        imageData: "data:image/jpeg;base64," + data
      })
    });
  }

  checkFirstInitApp = async () => {
    const isSecond = await Storage.shared().getStorage(constants.SecondStart);
    if (isSecond == true) {
      // is not first init
      console.log('%c%s', 'color: #f2ceb6', 'Is not first start');
      this.props.getRoomsDataRequestHandler()
      this.props.getCurrentMoneyInBoxHandler()
      this.props.getHistoryListRequestHandler()
    } else {
      console.log('%c%s', 'color: #f2ceb6', 'Is first start');
      // first init
      await Storage.shared().setStorage(constants.SecondStart, true)
      const listRooms = appConfig.listRooms
      let addRoomQueues = []
      listRooms.forEach(room => {
        addRoomQueues.push(addRoom(room))
      });
      Promise.all(addRoomQueues)
        .then(rs => {
          this.props.getRoomsDataRequestHandler()
        })
        .catch(err => console.log(err))
    }
  }

  closeChangeMoneyBoxModal = () => {
    this.setState({
      changeCashBoxVisible: false,
      changeCashBoxModalHeader: 'Thêm tiền vào tủ',
      modalCashBoxTitle: 'Ghi chú khoản thêm',
      changeMoneyTxt: '',
      changeMoneyValue: 0
    })
  }

  showDepositModal = () => {
    this.setState({
      changeCashBoxVisible: true,
      changeCashBoxModalHeader: 'Thêm tiền vào tủ',
      modalCashBoxTitle: 'Ghi chú khoản thêm',
      changeMoneyTxt: '',
      changeMoneyValue: 0,
      changeMoneyType: 'deposit'
    })
  }

  showWithdrawModal = () => {
    this.setState({
      changeCashBoxVisible: true,
      changeCashBoxModalHeader: 'Rút tiền khỏi tủ',
      modalCashBoxTitle: 'Ghi chú khoản lấy ra',
      changeMoneyTxt: '',
      changeMoneyValue: 0,
      changeMoneyType: 'withdraw'
    })
  }

  submitChangeCashInBox = () => {
    const {changeMoneyValue, changeMoneyType, changeMoneyTxt} = this.state
    this.props.updateCashBoxRequestHandler({
      type: changeMoneyType,
      title: changeMoneyTxt,
      total: parseInt(changeMoneyValue)
    })
    this.closeChangeMoneyBoxModal()
    this.props.getCurrentMoneyInBoxHandler()
  }

  closeGetRoomModal = () => {
    this.setState({
      modalGetRoomVisible: false,
      selectedSectionType: 'CD',
      selectedRoomType: 'quat',
      gettingRoomName: null,
      currentNote: '',
      gettingRoomID: null,
    })
  }

  showGetRoomModal = (roomId, roomNumber) => {
    this.setState({
      modalGetRoomVisible: true,
      gettingRoomName: roomNumber,
      gettingRoomID: roomId
    })
  }

  showRoomDetail = (payload) => {
    this.props.navigation.navigate('DetailRoom', { payload })
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


  onSubmitGetRoom = () => {
    const updatedInfo = {
      id: this.state.gettingRoomID,
      currentStatus: 'busy',
      timeIn: moment().valueOf(),
      chargedItems: [],
      note: this.state.currentNote.length > 0 ? this.state.currentNote + ',' : '',
      tag: this.state.selectedSectionType,
      sectionRoom: this.state.selectedRoomType,
      cmnd: null
    }

    this.props.updateRoomInfoRequestHandler(updatedInfo)

    const roomCostItem = {
      addedTime: updatedInfo.timeIn,
      sectionID: updatedInfo.timeIn,
      itemKey: 'roomcost',
      roomID: this.state.gettingRoomID,
      quantity: 1,
      unitPrice: 0,
      total: 0,
      payStatus: 'pending'
    }
    const waterCostItem = {
      addedTime: updatedInfo.timeIn,
      sectionID: updatedInfo.timeIn,
      itemKey: 'water',
      roomID: this.state.gettingRoomID,
      quantity: 0,
      unitPrice: appConfig.unitWaterPrice,
      total: 0,
      payStatus: 'pending'
    }
    const softdrinkCostItem = {
      addedTime: updatedInfo.timeIn,
      sectionID: updatedInfo.timeIn,
      itemKey: 'softdrink',
      roomID: this.state.gettingRoomID,
      quantity: 0,
      unitPrice: appConfig.unitSoftDrinkPrice,
      total: 0,
      payStatus: 'pending'
    }
    const beerCostItem = {
      addedTime: updatedInfo.timeIn,
      sectionID: updatedInfo.timeIn,
      itemKey: 'beer',
      roomID: this.state.gettingRoomID,
      quantity: 0,
      unitPrice: appConfig.unitBeerPrice,
      total: 0,
      payStatus: 'pending'
    }
    const instantNoodleCostItem = {
      addedTime: updatedInfo.timeIn,
      sectionID: updatedInfo.timeIn,
      itemKey: 'instantNoodle',
      roomID: this.state.gettingRoomID,
      quantity: 0,
      unitPrice: appConfig.unitInstantNoodle,
      total: 0,
      payStatus: 'pending'
    }
    const anotherCostCostItem = {
      addedTime: updatedInfo.timeIn,
      sectionID: updatedInfo.timeIn,
      itemKey: 'anotherCost',
      roomID: this.state.gettingRoomID,
      quantity: 0,
      unitPrice: 0,
      total: 0,
      payStatus: 'pending'
    }

    this.props.addChargedItemRequestHandler(roomCostItem)
    this.props.addChargedItemRequestHandler(waterCostItem)
    this.props.addChargedItemRequestHandler(beerCostItem)
    this.props.addChargedItemRequestHandler(softdrinkCostItem)
    this.props.addChargedItemRequestHandler(instantNoodleCostItem)
    this.props.addChargedItemRequestHandler(anotherCostCostItem)

    this.props.addHistoryItemRequestHandler({
      roomID: this.state.gettingRoomID,
      roomName: this.state.gettingRoomName,
      status: 'in',
      total: 0,
      sectionID: updatedInfo.timeIn,
      timeIn: updatedInfo.timeIn,
      note: this.state.currentNote.length > 0 ? this.state.currentNote + ',' : '',
      tag: this.state.selectedSectionType,
      sectionRoom: this.state.selectedRoomType,
      cmnd: null
    })

    this.closeGetRoomModal()
    setTimeout(() => {
      this.props.getRoomsDataRequestHandler()
      this.props.getHistoryListRequestHandler()
    }, 300)
  }

  selectSectionType = (sectionType) => {
    this.setState({
      selectedSectionType: sectionType
    })
  }

  selectRoomType = (roomType) => {
    this.setState({
      selectedRoomType: roomType
    })
  }

  render() {
    console.log('%c%s', 'color: #aa00ff', 'Rendering Home');
    const { modalGetRoomVisible, selectedSectionType, gettingRoomName, selectedRoomType, changeCashBoxVisible, changeCashBoxModalHeader, modalCashBoxTitle, changeMoneyTxt, changeMoneyValue, changeMoneyType } = this.state
    return (
      <View style={styles.container}>
        <MenuBar />
        <View style={styles.contentContainer}>
          <View style={styles.leftSideContent}>
            <RoomMap showGetRoomModal={this.showGetRoomModal} showRoomDetail={this.showRoomDetail} />
            <CashBox showWithdrawModal={this.showWithdrawModal} showDepositModal={this.showDepositModal} />
          </View>
          <View style={styles.rightSideContent}>
            <Text style={styles.historyTitleTxt}>Danh sách vào / ra</Text>
            <HistoryList />
          </View>
        </View>

        <Modal isVisible={modalGetRoomVisible} avoidKeyboard={true} onBackdropPress={this.closeGetRoomModal}>
          {/* <ScrollView keyboardShouldPersistTaps='handled'> */}
            <View style={styles.modalContent}>
              <View style={styles.modalTopBar}>
                <View style={styles.modalHeaderTxtWrapper}>
                  <Text style={[styles.headerTxt, { marginRight: 20 }]}>Nhận Phòng</Text>
                  <View style={styles.roomNumber}>
                    <Text style={styles.roomNumberTxt}>{gettingRoomName}</Text>
                  </View>
                </View>
                <TouchableOpacity activeOpacity={0.7} style={styles.btnCloseModal} onPress={this.closeGetRoomModal}>
                  <Icon type="AntDesign" name="close" style={styles.iconClose} />
                </TouchableOpacity>
              </View>
              <View style={styles.modalBody}>
                <View style={styles.leftBodyContainer}>
                  <View style={styles.typeContainer}>
                    <Text style={styles.titleTxt}>Loại:</Text>
                    <View style={styles.typeOptionsWrapper}>
                      <TouchableOpacity activeOpacity={0.7} style={[styles.optionWrapper]} onPress={() => this.selectSectionType('DG')}>
                        <View style={styles.optionBtnWrapper}>
                          <CheckBox checked={selectedSectionType == 'DG'} color="green" onPress={() => this.selectSectionType('DG')} />
                          <Text style={[styles.titleTxt, { marginLeft: 10 }]}>DG</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.7} style={[styles.optionWrapper]} onPress={() => this.selectSectionType('CD')}>
                        <View style={styles.optionBtnWrapper}>
                          <CheckBox checked={selectedSectionType == 'CD'} color="green" onPress={() => this.selectSectionType('CD')} />
                          <Text style={[styles.titleTxt, { marginLeft: 10 }]}>CD</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.7} style={[styles.optionWrapper]} onPress={() => this.selectSectionType('QD')}>
                        <View style={styles.optionBtnWrapper}>
                          <CheckBox checked={selectedSectionType == 'QD'} color="green" onPress={() => this.selectSectionType('QD')} />
                          <Text style={[styles.titleTxt, { marginLeft: 10 }]}>Qua đêm</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.typeContainer}>
                    <Text style={styles.titleTxt}>Phòng:</Text>
                    <View style={styles.typeOptionsWrapper}>
                      <TouchableOpacity activeOpacity={0.7} style={[styles.optionWrapper]} onPress={() => this.selectRoomType('quat')}>
                        <View style={styles.optionBtnWrapper}>
                          <CheckBox checked={selectedRoomType == 'quat'} color="green" onPress={() => this.selectRoomType('quat')} />
                          <Text style={[styles.titleTxt, { marginLeft: 20 }]}>Quạt</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.7} style={[styles.optionWrapper]} onPress={() => this.selectRoomType('lanh')}>
                        <View style={styles.optionBtnWrapper}>
                          <CheckBox checked={selectedRoomType == 'lanh'} color="green" onPress={() => this.selectRoomType('lanh')} />
                          <Text style={[styles.titleTxt, { marginLeft: 20 }]}>Lạnh</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.typeContainer}>
                    <Text style={styles.titleTxt}>Chứng minh nhân dân:</Text>
                    <View style={styles.typeOptionsWrapper}>
                      <TouchableOpacity activeOpacity={0.7} style={[styles.optionWrapper]} onPress={this.showCamera}>
                        <View style={styles.optionBtnWrapper}>
                          <Icon type="Entypo" name="camera" style={[styles.iconClose, { color: 'black' }]} />
                          <Text style={[styles.titleTxt, { marginLeft: 20 }]}>Chụp hình</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={styles.rightBodyContainer}>
                  <Text style={styles.titleTxt}>Ghi chú:</Text>
                  <TextInput
                    style={{ height: 100, width: '90%', borderWidth: 1, backgroundColor: 'white' }}
                    placeholder="Nhập ghi chú"
                    onChangeText={(text) => this.setState({ currentNote: text })}
                    multiline
                    keyboardType="default"
                    blurOnSubmit={true}
                    returnKeyType="done"
                  />
                </View>
              </View>
              <View style={styles.modalFooter}>
                <TouchableOpacity activeOpacity={0.7} style={[styles.btnOK, { backgroundColor: '#E74C3C' }]} onPress={this.closeGetRoomModal}>
                  <Text style={styles.headerTxt}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.btnOK} onPress={this.onSubmitGetRoom}>
                  <Text style={styles.headerTxt}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          {/* </ScrollView> */}
        </Modal>

        <Modal isVisible={changeCashBoxVisible} style={styles.modalContainer} onBackdropPress={this.closeChangeMoneyBoxModal}>
          <View style={styles.modalWrapper}>
            <View style={[styles.modalHeaderWrapper, { backgroundColor: this.state.changeMoneyType == 'withdraw' ? '#F5B041' : '#2A6C97' }]}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.modalHeaderTxt}>{changeCashBoxModalHeader}</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.btnCloseModal} onPress={this.closeGetRoomModal} onPress={this.closeChangeMoneyBoxModal}>
                <Icon type="AntDesign" name="close" style={styles.iconClose} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBodyWrapper}>
              <View style={styles.modalBodyRow}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.modalTitleRowTxt}>{modalCashBoxTitle}:</Text>
                </View>
                <View style={{ flex: 2.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                  <TextInput
                    style={styles.txtInput}
                    placeholder="Tên khoản thêm"
                    returnKeyType="next"
                    keyboardType="default"
                    blurOnSubmit={true}
                    autoCapitalize='none'
                    autoCompleteType='off'
                    autoCorrect={Platform.OS != 'ios'}
                    autoFocus={true}
                    onChangeText={(text) => this.setState({ changeMoneyTxt: text })}
                  />
                </View>
              </View>
              <View style={styles.modalBodyRow}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.modalTitleRowTxt}>Số tiền thu:</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                  <TextInput
                    style={styles.txtInput}
                    placeholder="Số tiền thu"
                    keyboardType='numeric'
                    blurOnSubmit={true}
                    autoCapitalize='none'
                    autoCompleteType='off'
                    autoCorrect={Platform.OS != 'ios'}
                    onChangeText={(text) => this.setState({ changeMoneyValue: text })}
                  />
                </View>
                <View style={{ flex: 1.5, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                  <Text style={styles.modalTitleRowTxt}>x 1.000 = </Text>
                  <Text style={[styles.modalTitleRowTxt]}>{this.formatVND(changeMoneyValue)}</Text>
                </View>
              </View>
            </View>
            <View style={styles.modalFooterWrapper}>
              <TouchableOpacity activeOpacity={0.7} style={[styles.btnInput, {backgroundColor: changeMoneyType === 'deposit' ? '#28B463' : '#E74C3C'}]} onPress={this.closeGetRoomModal} onPress={this.submitChangeCashInBox}>
                {
                  changeMoneyType === 'deposit' ?
                    <Text style={styles.modalHeaderTxt}>Bỏ {this.formatVND(changeMoneyValue)} vào tủ</Text>
                    :
                    <Text style={styles.modalHeaderTxt}>Rút {this.formatVND(changeMoneyValue)} khỏi tủ</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = dispatch => ({
  getRoomsDataRequestHandler: () => dispatch(getRoomsDataRequest()),
  updateRoomInfoRequestHandler: payload => dispatch(updateRoomInfoRequest(payload)),
  addChargedItemRequestHandler: payload => dispatch(addChargedItemRequest(payload)),
  getCurrentMoneyInBoxHandler: () => dispatch(getCashBoxRequest()),
  updateCashBoxRequestHandler: payload => dispatch(updateCashBoxRequest(payload)),
  addHistoryItemRequestHandler: payload => dispatch(addHistoryItemRequest(payload)),
  getHistoryListRequestHandler: () => dispatch(getHistoryListRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)