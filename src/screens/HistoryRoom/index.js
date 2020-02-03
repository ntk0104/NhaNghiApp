/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ImageBackground, Image, TextInput } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'native-base'
import styles from './styles'
import { } from '../../redux/actions/index'
import { connect } from 'react-redux';
import { makeGetHistoryRoomDetail } from '../../redux/selectors/index'
import { seeHistoryRoomRequest } from '../../redux/actions'
import { createStructuredSelector } from 'reselect';
import moment from 'moment'
import { generateLivingDuration } from '../../utils/Helpers'

class HistoryRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sectionID: null
    }
  }

  componentDidMount() {
    const sectionID = this.props.navigation.getParam('sectionID')
    this.setState({ sectionID })
    this.props.seeHistoryRoomRequestHandler({ sectionID })
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

  viewImage = (url) => {
    this.props.navigation.navigate('ViewImage', {
      urlImg: url
    })
  }

  render() {
    const listImgs = this.props.historyRoomDetail && this.props.historyRoomDetail.cmnd.length > 0 && this.props.historyRoomDetail.cmnd.split(';')
    const noteList = this.props.historyRoomDetail && this.props.historyRoomDetail.note.split(',')
    const generatedNote = noteList && noteList.join('\n')
    const formatedTotalPayment = this.props.historyRoomDetail && this.formatVND(this.props.historyRoomDetail.total)
    return (
      <View style={styles.container}>
        {
          this.props.historyRoomDetail &&
          <View style={styles.navigationBar}>
            <TouchableOpacity style={styles.btnBack} onPress={() => this.props.navigation.goBack()}>
              <Icon type='AntDesign' name='arrowleft' style={styles.iconBack} />
            </TouchableOpacity>
            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleTxt}>Chi tiết phòng {this.props.historyRoomDetail.roomName} vào lúc {moment(this.props.historyRoomDetail.timeIn).format(' HH:mm (DD/MM/YYYY)')}</Text>
            </View>
          </View>
        }
        {
          this.props.historyRoomDetail &&
          <View style={styles.bodyContainer}>
            <View style={styles.leftBodyContainer}>
              <View style={styles.rowInfoContainer}>
                <View style={styles.titleWrapper}>
                  <Text style={styles.titleTxt}>Giờ Vào:</Text>
                </View>
                <View style={[styles.InfoRowWrapper]}>
                  <Text style={styles.titleTxt}>{moment(this.props.historyRoomDetail.timeIn).format('HH:mm (DD/MM/YYYY)')}</Text>
                </View>
              </View>
              <View style={styles.rowInfoContainer}>
                <View style={styles.titleWrapper}>
                  <Text style={styles.titleTxt}>Giờ Ra:</Text>
                </View>
                <View style={[styles.InfoRowWrapper]}>
                  <Text style={styles.titleTxt}>{moment(this.props.historyRoomDetail.timeOut).format('HH:mm (DD/MM/YYYY)')}</Text>
                </View>
              </View>
              <View style={styles.rowInfoContainer}>
                <View style={styles.titleWrapper}>
                  <Text style={styles.titleTxt}>Thời gian ở:</Text>
                </View>
                <View style={styles.InfoRowWrapper}>
                  <Text style={styles.titleTxt}>{generateLivingDuration(this.props.historyRoomDetail.timeIn, this.props.historyRoomDetail.timeOut)}</Text>
                </View>
              </View>
              <View style={styles.rowInfoContainer}>
                <View style={styles.titleWrapper}>
                  <Text style={styles.titleTxt}>Loại:</Text>
                </View>
                <View style={styles.InfoRowWrapper}>
                  <Text style={styles.titleTxt}>{this.props.historyRoomDetail.tag} - {this.props.historyRoomDetail.sectionRoomType == 'quat' ? 'Phòng Quạt' : 'Phòng Lạnh'}</Text>
                </View>
              </View>
              {
                listImgs.length > 0 &&
                <View style={[styles.rowInfoContainer, { flex: 3 }]}>
                  <View style={styles.titleWrapper}>
                    <Text style={styles.titleTxt}>CMND:</Text>
                  </View>
                  <View style={styles.InfoCMNDWrapper}>
                    {listImgs.map(item => (
                      <TouchableOpacity onPress={() => this.viewImage(item)}>
                        <Image source={{ uri: item }} style={styles.imgCMND} />
                      </TouchableOpacity>
                    ))
                    }
                  </View>
                </View>
              }
            </View>
            <View style={styles.bodyRightContainer}>
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={[styles.titleTxt, { alignSelf: 'flex-start', marginLeft: 20 }]}>Note:</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 3, paddingVertical: 5 }}>
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
                  nestedScrollEnabled
                  // setFocusableInTouchMode={false}
                  focusable={false}
                  focusableInTouchMode={false}
                // editable={false}
                />
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'center', flex: 6 }}>
                <Text style={[styles.titleTxt, { alignSelf: 'flex-start', marginLeft: 20 }]}>Chi tiết chi phí:</Text>
                {
                  this.props.historyRoomDetail.chargedItems.softdrink.quantity > 0 &&
                  <Text style={[styles.titleTxt, { alignSelf: 'flex-start', marginLeft: 20 }]}>Nước ngọt: {this.props.historyRoomDetail.chargedItems.softdrink.quantity}</Text>
                }
                {
                  this.props.historyRoomDetail.chargedItems.beer.quantity > 0 &&
                  <Text style={[styles.titleTxt, { alignSelf: 'flex-start', marginLeft: 20 }]}>Bia: {this.props.historyRoomDetail.chargedItems.beer.quantity}</Text>
                }
                {
                  this.props.historyRoomDetail.chargedItems.instantNoodle.quantity > 0 &&
                  <Text style={[styles.titleTxt, { alignSelf: 'flex-start', marginLeft: 20 }]}>Mỳ gói: {this.props.historyRoomDetail.chargedItems.instantNoodle.quantity}</Text>
                }
                {
                  this.props.historyRoomDetail.chargedItems.water.quantity > 0 &&
                  <Text style={[styles.titleTxt, { alignSelf: 'flex-start', marginLeft: 20 }]}>Nước suối: {this.props.historyRoomDetail.chargedItems.water.quantity}</Text>
                }
                {
                  this.props.historyRoomDetail.chargedItems.anotherCost.quantity > 0 &&
                  <Text style={[styles.titleTxt, { alignSelf: 'flex-start', marginLeft: 20 }]}>Chi phí khác: {this.props.historyRoomDetail.chargedItems.anotherCost.total}</Text>
                }
                <Text style={[styles.titleTxt, { alignSelf: 'flex-start', marginLeft: 20 }]}>Tiền phòng: {this.formatVND(this.props.historyRoomDetail.chargedItems.roomcost.total)}</Text>
                <Text style={[styles.titleTxt, { alignSelf: 'flex-start', marginLeft: 20 }]}>TỔNG CỘNG: {this.formatVND(this.props.historyRoomDetail.total)}</Text>
              </View>
            </View>
          </View>
        }
      </View>
    )
  }
};

const mapStateToProps = createStructuredSelector({
  historyRoomDetail: makeGetHistoryRoomDetail()
})

const mapDispatchToProps = dispatch => ({
  seeHistoryRoomRequestHandler: (payload) => dispatch(seeHistoryRoomRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryRoom)

