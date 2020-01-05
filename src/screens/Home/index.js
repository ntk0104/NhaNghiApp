import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native'
import styles from './styles'
import MenuBar from '../../components/MenuBar/index'
import RoomItem from '../../components/RoomItem/index'
import HistoryItem from '../../components/HistoryItem/index'
import Modal from 'react-native-modal'
import { Icon, CheckBox } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

export default class Home extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          roomNumber: 16,
          itemID: 123,
          time: '15h30',
          tagName: 'DG',
          status: 'in',
          note: 'note',
          total: 100
        },
        {
          roomNumber: 15,
          itemID: 123,
          time: '15h31',
          tagName: 'DG',
          status: 'out',
          note: 'note',
          total: 100
        },
        {
          roomNumber: 16,
          itemID: 1223,
          time: '15h30',
          tagName: 'CD',
          status: 'in',
          note: 'note',
          total: 100
        },
        {
          roomNumber: 16,
          itemID: 1233,
          time: '15h30',
          tagName: 'QD',
          status: 'out',
          note: 'note',
          total: 100
        },
        {
          roomNumber: 16,
          itemID: 1243,
          time: '15h30',
          tagName: 'DG',
          status: 'in',
          note: 'note',
          total: 100
        },
        {
          roomNumber: 16,
          itemID: 1253,
          time: '15h30',
          tagName: 'QD',
          status: 'out',
          note: 'note',
          total: 100
        },
        {
          roomNumber: 16,
          itemID: 1263,
          time: '15h30',
          tagName: 'DG',
          status: 'in',
          note: 'note',
          total: 100
        },
        {
          roomNumber: 16,
          itemID: 1273,
          time: '15h30',
          tagName: 'CD',
          status: 'in',
          note: 'note',
          total: 100
        }
      ],
      modalGetRoomVisible: false,
    }
  }

  closeGetRoomModal = () => {
    this.setState({
      modalGetRoomVisible: false
    })
  }

  onClickRoom = (roomNumber) => {
    this.setState({
      modalGetRoomVisible: true
    })
  }

  render() {
    const { modalGetRoomVisible } = this.state
    return (
      <View style={styles.container}>
        <MenuBar />
        <View style={styles.contentContainer}>
          <View style={styles.leftSideContent}>
            <View style={styles.labelWrapper}>
              <Text style={styles.lableTxt}>Sơ đồ phòng</Text>
            </View>
            <View style={styles.roomMapContainer}>
              <View style={styles.roomsLaneContainer}>
                <RoomItem width='11%' height='100%' roomNumber={18} type='1bed' onClickRoom={this.onClickRoom} />
                <RoomItem width='11%' height='100%' roomNumber={9} type='1bed' />
                <RoomItem width='11%' height='100%' roomNumber={10} type='1bed' />
                <RoomItem width='11%' height='100%' roomNumber={11} type='1bed' />
                <RoomItem width='11%' height='100%' roomNumber={12} type='1bed' />
                <RoomItem width='11%' height='100%' roomNumber={13} type='1bed' />
                <RoomItem width='11%' height='100%' roomNumber={14} type='special' />
                <RoomItem width='11%' height='100%' roomNumber={15} type='special' />
                <RoomItem width='11%' height='100%' roomNumber={16} type='2beds' />
              </View>
              <View style={[styles.roomsLaneContainer, { marginTop: 10 }]}>
                <RoomItem width='11%' height='100%' roomNumber={17} type='1bed' />
                <RoomItem width='11%' height='100%' roomNumber={8} type='special' />
                <RoomItem width='11%' height='100%' roomNumber={7} type='1bed' />
                <RoomItem width='11%' height='100%' roomNumber={6} type='special' />
                <RoomItem width='11%' height='100%' roomNumber={5} type='2beds' />
                <RoomItem width='11%' height='100%' roomNumber={4} type='1bed' />
                <RoomItem width='11%' height='100%' roomNumber={3} type='special' />
                <RoomItem width='11%' height='100%' roomNumber={2} type='special' />
              </View>
            </View>
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
            <View style={{ width: '100%', flex: 1 }}>
              <FlatList
                data={this.state.history}
                scrollEnabled
                bounces={true}
                keyExtractor={item => item.itemID}
                renderItem={({ item, index }) => <HistoryItem roomNumber={item.roomNumber} time={item.time} tagName={item.tagName} note={item.note} total={item.total} status={item.status} />}
              />
            </View>
          </View>
        </View>

        <Modal isVisible={modalGetRoomVisible} avoidKeyboard={true} style={{ justifyContent: 'center', alignItems: 'center' }} onBackdropPress={this.closeGetRoomModal}>
          <ScrollView>
            <View style={styles.modalContent}>
              <View style={styles.modalTopBar}>
                <View style={styles.modalHeaderTxtWrapper}>
                  <Text style={styles.headerTxt}>Nhận Phòng</Text>
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
                      <TouchableOpacity activeOpacity={0.7} style={[styles.optionWrapper]}>
                        <View style={styles.optionBtnWrapper}>
                          <CheckBox checked={true} color="green" />
                          <Text style={[styles.titleTxt, { marginLeft: 20 }]}>DG</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.7} style={[styles.optionWrapper]}>
                        <View style={styles.optionBtnWrapper}>
                          <CheckBox checked={false} color="green" />
                          <Text style={[styles.titleTxt, { marginLeft: 20 }]}>CP</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.7} style={[styles.optionWrapper]}>
                        <View style={styles.optionBtnWrapper}>
                          <CheckBox checked={false} color="green" />
                          <Text style={[styles.titleTxt, { marginLeft: 20 }]}>Qua đêm</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[styles.typeContainer, { backgroundColor: 'green' }]}>
                    <Text style={styles.titleTxt}>Phòng:</Text>
                    <View style={styles.typeOptionsWrapper}>
                      <TouchableOpacity activeOpacity={0.7} style={[styles.optionWrapper]}>
                        <View style={styles.optionBtnWrapper}>
                          <CheckBox checked={true} color="green" />
                          <Text style={[styles.titleTxt, { marginLeft: 20 }]}>Quạt</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.7} style={[styles.optionWrapper]}>
                        <View style={styles.optionBtnWrapper}>
                          <CheckBox checked={false} color="green" />
                          <Text style={[styles.titleTxt, { marginLeft: 20 }]}>Lạnh</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[styles.typeContainer, { backgroundColor: 'red' }]}>
                    <Text style={styles.titleTxt}>Chứng minh nhân dân:</Text>
                    <View style={styles.typeOptionsWrapper}>
                      <TouchableOpacity activeOpacity={0.7} style={[styles.optionWrapper]}>
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
                    onChangeText={(text) => this.setState({ text })}
                    multiline
                    returnKeyLabel={'OK'}
                    returnKeyType='done'
                  />
                </View>
              </View>
              <View style={styles.modalFooter}>
                <TouchableOpacity activeOpacity={0.7} style={[styles.btnOK, { backgroundColor: '#E74C3C' }]} onPress={this.closeGetRoomModal}>
                  <Text style={styles.headerTxt}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.btnOK}>
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
