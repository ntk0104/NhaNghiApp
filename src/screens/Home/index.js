import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native'
import styles from './styles'
import MenuBar from '../../components/MenuBar/index'
import HistoryItem from '../../components/HistoryItem/index'
import Modal from 'react-native-modal'
import { Icon, CheckBox } from 'native-base'
import Realm from 'realm'
import { updateRoom, addRoom, getAllRoomsInfo } from '../../database/index'
import moment from 'moment'
import { Storage, constants, appConfig } from '../../utils'
import RoomMap from './RoomMap'
import HistoryList from './HistoryList'
import { camera, pickerImage } from '../../components/ImagePicker/index'
import ImagePicker from 'react-native-image-picker'
import { getRoomsDataRequest, updateRoomInfoRequest, addChargedItemRequest } from '../../redux/actions/index'
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

class Home extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      // history: [
      //   {
      //     roomNumber: 16,
      //     itemID: 123,
      //     time: '15h30',
      //     tagName: 'DG',
      //     status: 'in',
      //     note: 'note',
      //     total: 100
      //   },
      //   {
      //     roomNumber: 15,
      //     itemID: 123,
      //     time: '15h31',
      //     tagName: 'DG',
      //     status: 'out',
      //     note: 'note',
      //     total: 100
      //   },
      //   {
      //     roomNumber: 16,
      //     itemID: 1223,
      //     time: '15h30',
      //     tagName: 'CD',
      //     status: 'in',
      //     note: 'note',
      //     total: 100
      //   },
      //   {
      //     roomNumber: 16,
      //     itemID: 1233,
      //     time: '15h30',
      //     tagName: 'QD',
      //     status: 'out',
      //     note: 'note',
      //     total: 100
      //   },
      //   {
      //     roomNumber: 16,
      //     itemID: 1243,
      //     time: '15h30',
      //     tagName: 'DG',
      //     status: 'in',
      //     note: 'note',
      //     total: 100
      //   },
      //   {
      //     roomNumber: 16,
      //     itemID: 1253,
      //     time: '15h30',
      //     tagName: 'QD',
      //     status: 'out',
      //     note: 'note',
      //     total: 100
      //   },
      //   {
      //     roomNumber: 16,
      //     itemID: 1263,
      //     time: '15h30',
      //     tagName: 'DG',
      //     status: 'in',
      //     note: 'note',
      //     total: 100
      //   },
      //   {
      //     roomNumber: 16,
      //     itemID: 1273,
      //     time: '15h30',
      //     tagName: 'CD',
      //     status: 'in',
      //     note: 'note',
      //     total: 100
      //   }
      // ],

      modalGetRoomVisible: false,
      selectedSectionType: 'CD',
      selectedRoomType: 'quat',
      gettingRoomName: null,
      currentNote: '',
      gettingRoomID: null,

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

    this.closeGetRoomModal()
    setTimeout(() => this.props.getRoomsDataRequestHandler(), 300)
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
    const { modalGetRoomVisible, selectedSectionType, gettingRoomName, selectedRoomType, roomsData } = this.state
    return (
      <View style={styles.container}>
        <MenuBar />
        <View style={styles.contentContainer}>
          <View style={styles.leftSideContent}>
            <View style={styles.labelWrapper}>
              <Text style={styles.lableTxt}>Sơ đồ phòng</Text>
            </View>
            <RoomMap showGetRoomModal={this.showGetRoomModal} showRoomDetail={this.showRoomDetail} />
            <View style={styles.totalContainer}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Tiền trong tủ: 3.570.000</Text>
              <TouchableOpacity style={styles.btnWithDraw}>
                <Text style={styles.withdrawTxt}>Rút tiền</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnWithDraw, { backgroundColor: '#3C8F36' }]}>
                <Text style={styles.withdrawTxt}>Thêm tiền</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rightSideContent}>
            <Text style={[styles.withdrawTxt, { fontSize: 25 }]}>Danh sách vào / ra</Text>
            {/* <HistoryList data /> */}
          </View>
        </View>

        <Modal isVisible={modalGetRoomVisible} avoidKeyboard={true} style={{ justifyContent: 'center', alignItems: 'center' }} onBackdropPress={this.closeGetRoomModal}>
          <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={styles.modalContent}>
              <View style={styles.modalTopBar}>
                <View style={styles.modalHeaderTxtWrapper}>
                  <Text style={[styles.headerTxt, { marginRight: 20 }]}>Nhận Phòng</Text>
                  <View style={styles.roomNumber}>
                    <Text style={styles.roomNumberTxt}>{gettingRoomName}</Text>
                  </View>
                </View>
                <TouchableOpacity activeOpacity={0.7} style={styles.btnCloseModal} onPress={this.closeGetRoomModal}>
                  <Icon type="AntDesign" name="close" size={30} style={{ color: 'white' }} />
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
                          <Text style={[styles.titleTxt, { marginLeft: 20 }]}>DG</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.7} style={[styles.optionWrapper]} onPress={() => this.selectSectionType('CD')}>
                        <View style={styles.optionBtnWrapper}>
                          <CheckBox checked={selectedSectionType == 'CD'} color="green" onPress={() => this.selectSectionType('CD')} />
                          <Text style={[styles.titleTxt, { marginLeft: 20 }]}>CD</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.7} style={[styles.optionWrapper]} onPress={() => this.selectSectionType('QD')}>
                        <View style={styles.optionBtnWrapper}>
                          <CheckBox checked={selectedSectionType == 'QD'} color="green" onPress={() => this.selectSectionType('QD')} />
                          <Text style={[styles.titleTxt, { marginLeft: 20 }]}>Qua đêm</Text>
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
                          <Icon type="Entypo" name="camera" size={30} style={{ color: 'black' }} />
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
          </ScrollView>
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
  addChargedItemRequestHandler: payload => dispatch(addChargedItemRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)