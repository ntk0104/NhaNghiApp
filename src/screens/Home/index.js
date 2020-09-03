import { Icon } from 'native-base'
import React, { PureComponent } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import MenuBar from '../../components/MenuBar/index'
import { addRoom } from '../../database/index'
import { addChargedItemRequest, addHistoryItemRequest, getCashBoxRequest, getHistoryListRequest, getRoomsDataRequest, updateCashBoxRequest, updateRoomInfoRequest } from '../../redux/actions/index'
import { appConfig, constants, Storage } from '../../utils'
import CashBox from './CashBox'
import HistoryList from './HistoryList'
import RoomMap from './RoomMap'
import styles from './styles'
import realm from '../../database/configRealm'


class Home extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      changeCashBoxVisible: false,
      changeCashBoxModalHeader: '',
      modalCashBoxTitle: 'Ghi chú khoản thêm',
      changeMoneyTxt: '',
      changeMoneyValue: 0,
      changeMoneyType: 'deposit',
    }
  }

  componentDidMount() {
    // console.log('%c%s', 'color: #22b6', Realm.defaultPath);
    this.checkFirstInitApp()
  }

  componentWillUnmount(){
    realm.close()
  }

  checkFirstInitApp = async () => {
    const isSecond = await Storage.shared().getStorage(constants.SecondStart);
    if (isSecond == true) {
      // is not first init
      this.props.getRoomsDataRequestHandler()
      this.props.getCurrentMoneyInBoxHandler()
      this.props.getHistoryListRequestHandler()
    } else {
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

  goToStatisticDay = () => {
    this.props.navigation.navigate('StatisticDay')
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
    const { changeMoneyValue, changeMoneyType, changeMoneyTxt } = this.state
    this.props.updateCashBoxRequestHandler({
      type: changeMoneyType,
      title: changeMoneyTxt,
      total: parseInt(changeMoneyValue)
    })
    this.closeChangeMoneyBoxModal()
    this.props.getCurrentMoneyInBoxHandler()
  }

  openGetRoomScreen = (roomId, roomNumber) => {
    this.props.navigation.navigate('Modal', {
      modalType: 'getRoom',
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

  render() {
    const { changeCashBoxVisible, changeCashBoxModalHeader, modalCashBoxTitle, changeMoneyTxt, changeMoneyValue, changeMoneyType } = this.state
    return (
      <View style={styles.container}>
        <MenuBar goToStatisticDay={this.goToStatisticDay} />
        <View style={styles.contentContainer}>
          <View style={styles.leftSideContent}>
            <RoomMap openGetRoomScreen={this.openGetRoomScreen} showRoomDetail={this.showRoomDetail} />
            <CashBox showWithdrawModal={this.showWithdrawModal} showDepositModal={this.showDepositModal} goToDetail={() => this.props.navigation.navigate('ChangeCashHistory')} />
          </View>
          <View style={styles.rightSideContent}>
            <Text style={styles.historyTitleTxt}>Danh sách vào / ra</Text>
            <HistoryList navigation={this.props.navigation} />
          </View>
        </View>
        <Modal isVisible={changeCashBoxVisible} style={styles.modalContainer} >
          <View style={styles.modalWrapper}>
            <View style={[styles.modalHeaderWrapper, { backgroundColor: this.state.changeMoneyType == 'withdraw' ? '#F5B041' : '#2A6C97' }]}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.modalHeaderTxt}>{changeCashBoxModalHeader}</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.btnCloseModal} onPress={this.closeChangeMoneyBoxModal}>
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
              <TouchableOpacity activeOpacity={0.5} style={[styles.btnInput, { backgroundColor: changeMoneyType === 'deposit' ? '#28B463' : '#E74C3C' }]} onPress={this.submitChangeCashInBox}>
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