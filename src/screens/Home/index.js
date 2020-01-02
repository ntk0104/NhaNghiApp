import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import styles from './styles'
import MenuBar from '../../components/MenuBar/index'
import RoomItem from '../../components/RoomItem/index'
import HistoryItem from '../../components/HistoryItem/index'

export default class Home extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          roomNumber: 16,
          itemID: 123,
          timeIn: '15h30',
          tagName: 'DG'
        },
        {
          roomNumber: 16,
          itemID: 1223,
          timeIn: '15h30',
          tagName: 'CD'
        },
        {
          roomNumber: 16,
          itemID: 1233,
          timeIn: '15h30',
          tagName: 'QD'
        },
        {
          roomNumber: 16,
          itemID: 1243,
          timeIn: '15h30',
          tagName: 'DG'
        },
        {
          roomNumber: 16,
          itemID: 1253,
          timeIn: '15h30',
          tagName: 'QD'
        },
        {
          roomNumber: 16,
          itemID: 1263,
          timeIn: '15h30',
          tagName: 'DG'
        },
        {
          roomNumber: 16,
          itemID: 1273,
          timeIn: '15h30',
          tagName: 'CD'
        }
      ]
    }
  }

  render() {
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
                <RoomItem width='11%' height='100%' roomNumber={18} type='1bed' />
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
            <Text style={styles.withdrawTxt}>Danh sách vào</Text>
            <View>
              <FlatList
                data={this.state.history}
                keyExtractor={item => item.itemID}
                renderItem={({item, index}) => <HistoryItem />}
              />
            </View>
          </View>

        </View>
      </View>
    )
  }
}
