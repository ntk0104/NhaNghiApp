import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from '../styles'
import _ from 'lodash'
import RoomItem from '../../../components/RoomItem/index'
import { makeGetRoomsData } from '../../../redux/selectors/index'
import { getRoomsDataRequest } from '../../../redux/actions/index'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

class RoomMap extends Component {


  constructor(props) {
    super(props)
    this.state = {
      roomsData: null
    }
  }

  shouldComponentUpdate(nextprops) {
    if (!_.isEqual(nextprops.roomsData, this.props.roomsData)) {
      return true
    }
    return false
  }

  UNSAFE_componentWillReceiveProps(nextprops) {
    const { roomsData } = this.props
    if (!_.isEqual(roomsData, nextprops.roomsData)) {
      this.setState({ roomsData: nextprops.roomsData })
    }
  }

  componentDidMount(){
    this.timer = setInterval(() => {this.props.getRoomsDataRequestHandler()}, 60000)
  }

  // componentWillUnmount(){
  //   this.timer.remove()
  // }

  render() {
    console.log('%c%s', 'color: #f2ceb6', 'Rendering RoomMap');
    const { roomsData } = this.state
    return (
      <View style={styles.roomMapContainer}>
        <View style={styles.roomsLaneContainer}>
          <RoomItem
            id={roomsData && roomsData[18].id}
            roomName={roomsData && roomsData[18].roomName}
            roomStatus={roomsData && roomsData[18].currentStatus}
            timeIn={roomsData && roomsData[18].timeIn}
            duration={roomsData && roomsData[18].duration}
            tag={roomsData && roomsData[18].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[18].type}
            overnight_price={roomsData && roomsData[18].overnight_price}
            advancedPay={roomsData && roomsData[18].advancedPay}
          />
          <RoomItem
            id={roomsData && roomsData[9].id}
            roomName={roomsData && roomsData[9].roomName}
            roomStatus={roomsData && roomsData[9].currentStatus}
            timeIn={roomsData && roomsData[9].timeIn}
            duration={roomsData && roomsData[9].duration}
            tag={roomsData && roomsData[9].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[9].type}
            overnight_price={roomsData && roomsData[9].overnight_price}
            advancedPay={roomsData && roomsData[9].advancedPay}
          />
          <RoomItem
            id={roomsData && roomsData[10].id}
            roomName={roomsData && roomsData[10].roomName}
            roomStatus={roomsData && roomsData[10].currentStatus}
            timeIn={roomsData && roomsData[10].timeIn}
            duration={roomsData && roomsData[10].duration}
            tag={roomsData && roomsData[10].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[10].type}
            overnight_price={roomsData && roomsData[10].overnight_price}
            advancedPay={roomsData && roomsData[10].advancedPay}
          />
          <RoomItem
            id={roomsData && roomsData[11].id}
            roomName={roomsData && roomsData[11].roomName}
            roomStatus={roomsData && roomsData[11].currentStatus}
            timeIn={roomsData && roomsData[11].timeIn}
            duration={roomsData && roomsData[11].duration}
            tag={roomsData && roomsData[11].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[11].type}
            overnight_price={roomsData && roomsData[11].overnight_price}
            advancedPay={roomsData && roomsData[11].advancedPay}
          />
          <RoomItem
            id={roomsData && roomsData[12].id}
            roomName={roomsData && roomsData[12].roomName}
            roomStatus={roomsData && roomsData[12].currentStatus}
            timeIn={roomsData && roomsData[12].timeIn}
            duration={roomsData && roomsData[12].duration}
            tag={roomsData && roomsData[12].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[12].type}
            overnight_price={roomsData && roomsData[12].overnight_price}
            advancedPay={roomsData && roomsData[12].advancedPay}
          />
          <RoomItem
            id={roomsData && roomsData[13].id}
            roomName={roomsData && roomsData[13].roomName}
            roomStatus={roomsData && roomsData[13].currentStatus}
            timeIn={roomsData && roomsData[13].timeIn}
            duration={roomsData && roomsData[13].duration}
            tag={roomsData && roomsData[13].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[13].type}
            overnight_price={roomsData && roomsData[13].overnight_price}
            advancedPay={roomsData && roomsData[13].advancedPay}
          />
          <RoomItem
            id={roomsData && roomsData[14].id}
            roomName={roomsData && roomsData[14].roomName}
            roomStatus={roomsData && roomsData[14].currentStatus}
            timeIn={roomsData && roomsData[14].timeIn}
            duration={roomsData && roomsData[14].duration}
            tag={roomsData && roomsData[14].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[14].type}
            overnight_price={roomsData && roomsData[14].overnight_price}
            advancedPay={roomsData && roomsData[14].advancedPay}
          />
          <RoomItem
            id={roomsData && roomsData[15].id}
            roomName={roomsData && roomsData[15].roomName}
            roomStatus={roomsData && roomsData[15].currentStatus}
            timeIn={roomsData && roomsData[15].timeIn}
            duration={roomsData && roomsData[15].duration}
            tag={roomsData && roomsData[15].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[15].type}
            overnight_price={roomsData && roomsData[15].overnight_price}
            advancedPay={roomsData && roomsData[15].advancedPay}
          />
          <RoomItem
            id={roomsData && roomsData[16].id}
            roomName={roomsData && roomsData[16].roomName}
            roomStatus={roomsData && roomsData[16].currentStatus}
            timeIn={roomsData && roomsData[16].timeIn}
            duration={roomsData && roomsData[16].duration}
            tag={roomsData && roomsData[16].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[16].type}
            overnight_price={roomsData && roomsData[16].overnight_price}
            advancedPay={roomsData && roomsData[16].advancedPay}
          />
        </View>
        <View style={[styles.roomsLaneContainer, { marginTop: 10 }]}>
          <RoomItem
            id={roomsData && roomsData[17].id}
            roomName={roomsData && roomsData[17].roomName}
            roomStatus={roomsData && roomsData[17].currentStatus}
            timeIn={roomsData && roomsData[17].timeIn}
            duration={roomsData && roomsData[17].duration}
            tag={roomsData && roomsData[17].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[17].type}
            overnight_price={roomsData && roomsData[17].overnight_price}
            advancedPay={roomsData && roomsData[17].advancedPay}
          />
          <RoomItem
            id={roomsData && roomsData[8].id}
            roomName={roomsData && roomsData[8].roomName}
            roomStatus={roomsData && roomsData[8].currentStatus}
            timeIn={roomsData && roomsData[8].timeIn}
            duration={roomsData && roomsData[8].duration}
            tag={roomsData && roomsData[8].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[8].type}
            overnight_price={roomsData && roomsData[8].overnight_price}
            advancedPay={roomsData && roomsData[8].advancedPay}
          />
          <RoomItem
            id={roomsData && roomsData[7].id}
            roomName={roomsData && roomsData[7].roomName}
            roomStatus={roomsData && roomsData[7].currentStatus}
            timeIn={roomsData && roomsData[7].timeIn}
            duration={roomsData && roomsData[7].duration}
            tag={roomsData && roomsData[7].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[7].type}
            overnight_price={roomsData && roomsData[7].overnight_price}
            advancedPay={roomsData && roomsData[7].advancedPay}
          />
          <RoomItem
            id={roomsData && roomsData[6].id}
            roomName={roomsData && roomsData[6].roomName}
            roomStatus={roomsData && roomsData[6].currentStatus}
            timeIn={roomsData && roomsData[6].timeIn}
            duration={roomsData && roomsData[6].duration}
            tag={roomsData && roomsData[6].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[6].type}
            overnight_price={roomsData && roomsData[6].overnight_price}
            advancedPay={roomsData && roomsData[6].advancedPay}
          />
          <RoomItem
            id={roomsData && roomsData[5].id}
            roomName={roomsData && roomsData[5].roomName}
            roomStatus={roomsData && roomsData[5].currentStatus}
            timeIn={roomsData && roomsData[5].timeIn}
            duration={roomsData && roomsData[5].duration}
            tag={roomsData && roomsData[5].tag}
            limitMidnight={roomsData && roomsData[5].limitMidnight}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[5].type}
            overnight_price={roomsData && roomsData[5].overnight_price}
            advancedPay={roomsData && roomsData[5].advancedPay}
          />
          <RoomItem
            id={roomsData && roomsData[4].id}
            roomName={roomsData && roomsData[4].roomName}
            roomStatus={roomsData && roomsData[4].currentStatus}
            timeIn={roomsData && roomsData[4].timeIn}
            duration={roomsData && roomsData[4].duration}
            tag={roomsData && roomsData[4].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[4].type}
            overnight_price={roomsData && roomsData[4].overnight_price}
            advancedPay={roomsData && roomsData[4].advancedPay}
          />
          <RoomItem
            id={roomsData && roomsData[3].id}
            roomName={roomsData && roomsData[3].roomName}
            roomStatus={roomsData && roomsData[3].currentStatus}
            timeIn={roomsData && roomsData[3].timeIn}
            duration={roomsData && roomsData[3].duration}
            tag={roomsData && roomsData[3].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[3].type}
            overnight_price={roomsData && roomsData[3].overnight_price}
            advancedPay={roomsData && roomsData[3].advancedPay}
          />
          <RoomItem
            id={roomsData && roomsData[2].id}
            roomName={roomsData && roomsData[2].roomName}
            roomStatus={roomsData && roomsData[2].currentStatus}
            timeIn={roomsData && roomsData[2].timeIn}
            duration={roomsData && roomsData[2].duration}
            tag={roomsData && roomsData[2].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[2].type}
            overnight_price={roomsData && roomsData[2].overnight_price}
            advancedPay={roomsData && roomsData[2].advancedPay}
          />
        </View>
      </View>
    )
  }
}


const mapStateToProps = createStructuredSelector({
  roomsData: makeGetRoomsData()
})

const mapDispatchToProps = dispatch => ({
  getRoomsDataRequestHandler: () => dispatch(getRoomsDataRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomMap)
