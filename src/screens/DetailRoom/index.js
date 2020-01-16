import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import { Icon } from 'native-base'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import CheckBoxButton from '../../components/CheckBoxButton/index'
import ChargedItemRow from './ChargedItemRow'
import moment from 'moment'
import { makeGetRoomInfo } from '../../redux/selectors/index'
import { getRoomInfoRequest, updateRoomInfoRequest, updateChargedItemRequest, getRoomsDataRequest } from '../../redux/actions/index'
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

      anotherCostModalVisible: true
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
    this.setState({ additionalPrice: additionalPriceValue, sectionPrice: sectionPriceValue }, () => {
      if (tag == 'QD') {
        let calculatedRoomCost = calculateRoomCostOvernight(roomInfo.timeIn, moment().valueOf(), roomInfo.overnight_price, this.state.additionalPrice, this.state.sectionPrice)
        this.setState({ calculatedRoomCost })
      } else {
        let calculatedRoomCost = calculateRoomCostPerHour(roomInfo.timeIn, moment().valueOf(), roomInfo.overnight_price, this.state.sectionPrice, this.state.additionalPrice)
        this.setState({ calculatedRoomCost })
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
    this.setState({
      tag: tagID
    }, () => this.calculateRoomCost())
    //update room
    this.props.updateRoomInfoRequestHandler({
      id: this.props.roomInfo.id,
      tag: tagID
    })
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
    this.props.getRoomInfoRequestHandler({ id: this.props.roomInfo.id })
  }

  payAdvanced = (totalPayment) => {
    this.props.updateChargedItemRequestHandler({
      id: this.props.roomInfo.timeIn + '_anotherCost',
      addedTime: moment().valueOf(),
      quantity: 1,
      total: -totalPayment
    })
    const addedNote = moment().format('DD/MM/YY HH:mm') + ' Trả tiền trước ' + totalPayment + '.000'
    this.props.updateRoomInfoRequestHandler({
      id: this.props.roomInfo.id,
      note: this.state.note + ',' + addedNote
    })
    this.props.navigation.goBack()
  }

  render() {
    const { tag, sectionRoom, calculatedRoomCost, waterQuantity, beerQuantity, softdrinkQuantity, instantNoodleQuantity, additionalCost, anotherCostModalVisible, note } = this.state
    const totalPayment = calculatedRoomCost + waterQuantity * appConfig.unitWaterPrice + beerQuantity * appConfig.unitBeerPrice + softdrinkQuantity * appConfig.unitSoftDrinkPrice + instantNoodleQuantity * appConfig.unitInstantNoodle + additionalCost
    const noteList = note.split(',')
    const generatedNote = noteList.join('\n')
    return (
      <View style={styles.container}>
        {
          this.props.roomInfo &&
          <View style={styles.navigationBar}>
            <TouchableOpacity style={styles.btnBack} onPress={() => this.props.navigation.goBack()}>
              <Icon type='AntDesign' name='arrowleft' style={{ color: 'white' }} />
            </TouchableOpacity>
            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleTxt}>Chi tiết phòng {this.props.roomInfo.roomName}</Text>
            </View>
          </View>
        }
        {
          this.props.roomInfo &&
          // <KeyboardAwareScrollView
          //   keyboardShouldPersistTaps="handled"
          //   // extraScrollHeight={200}
          //   extraHeight={1000}
          //   enableAutomaticScroll={true}
          //   scrollEnabled={true}
          //   style={{ flex: 1 }}
          // >
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
                    <Image source={{ uri: 'https://lambangdaihocaz.com/wp-content/uploads/2019/06/nhan-lam-cmnd-gia.jpg' }} style={{ width: 80, height: 60, resizeMode: 'contain' }} />
                    <Image source={{ uri: 'https://lambangdaihocaz.com/wp-content/uploads/2019/06/nhan-lam-cmnd-gia.jpg' }} style={{ width: 80, height: 60, resizeMode: 'contain', marginLeft: 20 }} />
                  </View>
                </View>
              </View>
              <View style={styles.bottomLeftBodyContainer}>
                <Text style={[styles.titleTxt, { alignSelf: 'flex-start', marginLeft: 20 }]}>Ghi chú:</Text>
                <TextInput
                  style={{ height: 100, width: '90%', borderWidth: 1, backgroundColor: 'white', fontSize: 15, fontWeight: '600', padding: 5 }}
                  placeholder="Nhập ghi chú"
                  keyboardType="default"
                  blurOnSubmit={true}
                  value={generatedNote}
                  autoCapitalize='none'
                  autoCompleteType='off'
                  autoCorrect={Platform.OS != 'ios'}
                  autoFocus={false}
                  multiline
                  editable={false}
                />
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
                  title={'Mỳ gói'}
                  totalPrice={instantNoodleQuantity * appConfig.unitInstantNoodle}
                  quantity={instantNoodleQuantity}
                  decreaseQuantity={() => this.decreaseQuantity('instantNoodle', instantNoodleQuantity)}
                  increaseQuantity={() => this.increaseQuantity('instantNoodle', instantNoodleQuantity)}
                />
                <ChargedItemRow
                  title={'Chi Phí Khác'}
                  totalPrice={additionalCost}
                  quantity={additionalCost}
                />
                <View style={styles.totalWrapper}>
                  <View style={styles.totalHeaderWrapper}>
                    <Text style={styles.totalTxt}>Tổng:</Text>
                  </View>
                  <View style={styles.totalTxtWrapper}>
                    <Text style={styles.totalTxt}>{totalPayment}.000</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          // </KeyboardAwareScrollView>
        }
        <View style={styles.bottomBar}>
          <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#E74C3C' }]}>
            <Text style={styles.headerTitleTxt}>Đổi phòng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAction, { backgroundColor: totalPayment > 0 ? '#F1C40F' : 'gray' }]} onPress={() => this.payAdvanced(totalPayment)} disabled={totalPayment == 0}>
            <Text style={styles.headerTitleTxt}>Trả tiền trước</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#65BE35' }]}>
            {
              totalPayment > 0 ?
                <Text style={styles.headerTitleTxt}>Trả phòng & Thanh Toán</Text>
                :
                <Text style={styles.headerTitleTxt}>Trả phòng</Text>
            }
          </TouchableOpacity>
        </View>
        {/* <Modal isVisible={anotherCostModalVisible}>
          <View style>

          </View>
        </Modal> */}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailRoom)