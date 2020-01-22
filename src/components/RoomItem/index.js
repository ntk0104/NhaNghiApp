import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'
import _ from 'lodash'
import moment from 'moment'

export default class RoomItem extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  clickRoom = () => {
    const { id, roomName, timeIn, roomStatus, duration, tag, sectionRoom, overnight_price, type } = this.props
    if (roomStatus == 'available') {
      // get room
      this.props.onGetRoom(id, roomName)
    } else {
      // see room detail
      this.props.showRoomDetail({ id })
    }
  }

  render() {
    //console.log('%c%s', 'color: #00a3cc', "rendering room " + this.props.id);
    const { id, roomName, roomStatus, tag, overnight_price, type, duration, advancedPay } = this.props
    const durationLong = duration && duration.split('-')
    const durationTxt = duration && durationLong.join('\n')
    return (
      <TouchableOpacity style={[styles.roomContainer, { backgroundColor: roomStatus == 'available' ? 'white' : '#F1948A' }]} onPress={this.clickRoom}>
        <View style={styles.roomNumberWrapper}>
          <Text style={styles.roomNumberTxt}>{roomName}</Text>
          {
            type == '2beds' &&
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
              <Icon type='FontAwesome' name='bed' style={styles.iconStyle} />
              <Icon type='FontAwesome' name='bed' style={styles.iconStyle} />
            </View>
          }
          {
            type == '1bed' &&
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
              <Icon type='FontAwesome' name='bed' style={styles.iconStyle} />
            </View>
          }
          {
            type == 'special' &&
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
              <Icon type='FontAwesome' name='bed' style={styles.iconStyle} />
              <Icon type='AntDesign' name='heart' style={styles.iconHeartStyle} />
            </View>
          }
          <Text style={styles.overnightTxt}>Giá:{overnight_price}</Text>
        </View>
        {
          tag != '' ?
            <View style={{ flex: 4, width: '100%' }}>
              <View style={styles.part}>
                {
                  tag == 'DG' &&
                  <View style={[styles.tagWrapper, { backgroundColor: '#7D3C98' }]}>
                    <Text style={styles.tagTxt}>{tag}</Text>
                    {
                      advancedPay > 0 &&
                      <Text style={styles.advancedPaidTxt}>TT</Text>
                    }
                  </View>
                }
                {
                  tag == 'CD' &&
                  <View style={[styles.tagWrapper, { backgroundColor: '#28B463' }]}>
                    <Text style={styles.tagTxt}>{tag}</Text>
                    {
                      advancedPay > 0 &&
                      <Text style={styles.advancedPaidTxt}>TT</Text>
                    }
                  </View>
                }
                {
                  tag == 'QD' &&
                  <View style={[styles.tagWrapper, { backgroundColor: '#3498DB' }]}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.advancedPaidTxt}>{tag}</Text>
                      <Icon type='MaterialCommunityIcons' name='power-sleep' style={styles.iconStyle} />
                    </View>
                    {
                      advancedPay > 0 &&
                      <Text style={styles.tagTxt}>TT</Text>
                    }
                  </View>
                }
              </View>
              <View style={styles.part}>
                <Text style={styles.durationTxt}>{durationTxt}</Text>
              </View>
            </View>
            :
            <View style={{ flex: 4, width: '100%' }} />
        }
      </TouchableOpacity>
    )
  }
}
