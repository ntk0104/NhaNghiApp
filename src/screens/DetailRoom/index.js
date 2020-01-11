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
      selectedSectionType: null
    }
  }

  componentDidMount() {
    const payload = this.props.navigation.getParam('payload')
    const { id, roomName, timeIn, note, tag, fan_hour_price, air_hour_price, overnight_price, limitSection, limitMidnight, type } = payload
    console.log(JSON.stringify(payload, null, 2))
    this.setState({ 
      payload : payload,
      tag: payload.tag,
      selectedSectionType: payload.sectionRoom
    })
  }

  calculateLivingTime = (newTime, oldTime) => {
    console.log('%c%s', 'color: #00e600', oldTime);
    console.log('%c%s', 'color: #f2ceb6', newTime);

    let diffTimestamp = newTime - oldTime
    let livingTime = ''
    const diffDays = Math.floor(moment.duration(diffTimestamp).asDays())
    if (diffDays > 0) {
      diffTimestamp = diffTimestamp - diffDays * 24 * 60 * 60 * 1000
      livingTime += diffDays + ' ngày '
    }
    const diffHours = Math.floor(moment.duration(diffTimestamp).asHours())
    if (diffHours > 0) {
      diffTimestamp = diffTimestamp - diffHours * 60 * 60 * 1000
      livingTime += diffHours + ' giờ '
    }
    const diffMinutes = Math.floor(moment.duration(diffTimestamp).asMinutes())
    livingTime += diffMinutes + ' phút'
    return livingTime
  }

  render() {
    const { payload, tag, selectedSectionType } = this.state
    const livingTime = payload && this.calculateLivingTime(moment().valueOf(), payload.timeIn)
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
                      <Text style={styles.titleTxt}>{livingTime}</Text>
                    </View>
                  </View>
                  <View style={styles.rowInfoContainer}>
                    <View style={styles.titleWrapper}>
                      <Text style={styles.titleTxt}>Loại:</Text>
                    </View>
                    <View style={[styles.InfoRowWrapper, { flexDirection: 'row' }]}>
                      <View style={styles.optionSectionType}>
                        <CheckBoxButton
                          width={100}
                          height='80%'
                          selectedBackground={'#EC7063'}
                          unSelectedBackground={'#FDFEFE'}
                          checked={tag == 'DG'}
                          title={'DG'}
                        />
                      </View>
                      <View style={styles.optionSectionType}>
                        <CheckBoxButton
                          width={100}
                          height='80%'
                          selectedBackground={'#EC7063'}
                          unSelectedBackground={'#FDFEFE'}
                          checked={tag == 'CD'}
                          title={'CD'}
                        />
                      </View>
                      <View style={styles.optionSectionType}>
                        <CheckBoxButton
                          width={100}
                          height='80%'
                          selectedBackground={'#EC7063'}
                          unSelectedBackground={'#FDFEFE'}
                          checked={tag == 'QD'}
                          title={'Qua đêm'}
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
                          width={100}
                          height='80%'
                          selectedBackground={'#EC7063'}
                          unSelectedBackground={'#FDFEFE'}
                          checked={selectedSectionType == 'quat'}
                          title={'Quạt'}
                        />
                      </View>
                      <View style={styles.optionSectionType}>
                        <CheckBoxButton
                          width={100}
                          height='80%'
                          selectedBackground={'#EC7063'}
                          unSelectedBackground={'#FDFEFE'}
                          checked={selectedSectionType == 'lanh'}
                          title={'Lạnh'}
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
                    quantity={2}
                  />
                  <ChargedItemRow
                    title={'Nước suối'}
                    totalPrice={'1000K'}
                    quantity={2}
                  />
                  <ChargedItemRow
                    title={'Bia'}
                    totalPrice={'1000K'}
                    quantity={2}
                  />
                  <ChargedItemRow
                    title={'Nước ngọt'}
                    totalPrice={'1000K'}
                    quantity={2}
                  />
                  <ChargedItemRow
                    title={'Mỳ gói'}
                    totalPrice={'1000K'}
                    quantity={2}
                  />
                  <ChargedItemRow
                    title={'Phụ thu'}
                    totalPrice={'1000K'}
                    quantity={2}
                  />
                  <View style={styles.totalWrapper}>
                    <View style={styles.totalHeaderWrapper}>
                      <Text style={styles.totalTxt}>Tổng:</Text>
                    </View>
                    <View style={styles.totalTxtWrapper}>
                      <Text style={styles.totalTxt}>1.091 K</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} style={styles.PayBtnWrapper}>
                      <View style={styles.payBtn}>
                        <Text style={[styles.totalTxt, { fontSize: 20, textTransform: 'uppercase' }]}>Trả tiền</Text>
                      </View>
                    </TouchableOpacity>
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
            <Text style={styles.headerTitleTxt}>Sang sổ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#65BE35' }]}>
            <Text style={styles.headerTitleTxt}>Trả phòng</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}        