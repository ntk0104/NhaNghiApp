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

  // shouldComponentUpdate(nextprops) {
  //   if (!_.isEqual(nextprops.roomsData, this.props.roomsData)) {
  //     return true
  //   }
  //   return false
  // }

  constructor(props) {
    super(props)
    this.state = {
      roomsData: null
    }
  }

  UNSAFE_componentWillReceiveProps(nextprops) {
    const { roomsData } = this.props
    if (!_.isEqual(roomsData, nextprops.roomsData)) {
      this.setState({ roomsData: nextprops.roomsData })
    }
  }


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
            duration={roomsData && roomsData[18].duration}
            tag={roomsData && roomsData[18].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[18].type}
          />
          <RoomItem
            id={roomsData && roomsData[9].id}
            roomName={roomsData && roomsData[9].roomName}
            roomStatus={roomsData && roomsData[9].currentStatus}
            duration={roomsData && roomsData[9].duration}
            tag={roomsData && roomsData[9].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[9].type}
          />
          <RoomItem
            id={roomsData && roomsData[10].id}
            roomName={roomsData && roomsData[10].roomName}
            roomStatus={roomsData && roomsData[10].currentStatus}
            duration={roomsData && roomsData[10].duration}
            tag={roomsData && roomsData[10].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[10].type}
          />
          <RoomItem
            id={roomsData && roomsData[11].id}
            roomName={roomsData && roomsData[11].roomName}
            roomStatus={roomsData && roomsData[11].currentStatus}
            duration={roomsData && roomsData[11].duration}
            tag={roomsData && roomsData[11].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[11].type}
          />
          <RoomItem
            id={roomsData && roomsData[12].id}
            roomName={roomsData && roomsData[12].roomName}
            roomStatus={roomsData && roomsData[12].currentStatus}
            duration={roomsData && roomsData[12].duration}
            tag={roomsData && roomsData[12].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[12].type}
          />
          <RoomItem
            id={roomsData && roomsData[13].id}
            roomName={roomsData && roomsData[13].roomName}
            roomStatus={roomsData && roomsData[13].currentStatus}
            duration={roomsData && roomsData[13].duration}
            tag={roomsData && roomsData[13].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[13].type}
          />
          <RoomItem
            id={roomsData && roomsData[14].id}
            roomName={roomsData && roomsData[14].roomName}
            roomStatus={roomsData && roomsData[14].currentStatus}
            duration={roomsData && roomsData[14].duration}
            tag={roomsData && roomsData[14].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[14].type}
          />
          <RoomItem
            id={roomsData && roomsData[15].id}
            roomName={roomsData && roomsData[15].roomName}
            roomStatus={roomsData && roomsData[15].currentStatus}
            duration={roomsData && roomsData[15].duration}
            tag={roomsData && roomsData[15].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[15].type}
          />
          <RoomItem
            id={roomsData && roomsData[16].id}
            roomName={roomsData && roomsData[16].roomName}
            roomStatus={roomsData && roomsData[16].currentStatus}
            duration={roomsData && roomsData[16].duration}
            tag={roomsData && roomsData[16].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[16].type}
          />
        </View>
        <View style={[styles.roomsLaneContainer, { marginTop: 10 }]}>
          <RoomItem
            id={roomsData && roomsData[17].id}
            roomName={roomsData && roomsData[17].roomName}
            roomStatus={roomsData && roomsData[17].currentStatus}
            duration={roomsData && roomsData[17].duration}
            tag={roomsData && roomsData[17].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[17].type}
          />
          <RoomItem
            id={roomsData && roomsData[8].id}
            roomName={roomsData && roomsData[8].roomName}
            roomStatus={roomsData && roomsData[8].currentStatus}
            duration={roomsData && roomsData[8].duration}
            tag={roomsData && roomsData[8].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[8].type}
          />
          <RoomItem
            id={roomsData && roomsData[7].id}
            roomName={roomsData && roomsData[7].roomName}
            roomStatus={roomsData && roomsData[7].currentStatus}
            duration={roomsData && roomsData[7].duration}
            tag={roomsData && roomsData[7].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[7].type}
          />
          <RoomItem
            id={roomsData && roomsData[6].id}
            roomName={roomsData && roomsData[6].roomName}
            roomStatus={roomsData && roomsData[6].currentStatus}
            duration={roomsData && roomsData[6].duration}
            tag={roomsData && roomsData[6].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[6].type}
          />
          <RoomItem
            id={roomsData && roomsData[5].id}
            roomName={roomsData && roomsData[5].roomName}
            roomStatus={roomsData && roomsData[5].currentStatus}
            duration={roomsData && roomsData[5].duration}
            tag={roomsData && roomsData[5].tag}
            limitMidnight={roomsData && roomsData[5].limitMidnight}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[5].type}
          />
          <RoomItem
            id={roomsData && roomsData[4].id}
            roomName={roomsData && roomsData[4].roomName}
            roomStatus={roomsData && roomsData[4].currentStatus}
            duration={roomsData && roomsData[4].duration}
            tag={roomsData && roomsData[4].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[4].type}
          />
          <RoomItem
            id={roomsData && roomsData[3].id}
            roomName={roomsData && roomsData[3].roomName}
            roomStatus={roomsData && roomsData[3].currentStatus}
            duration={roomsData && roomsData[3].duration}
            tag={roomsData && roomsData[3].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[3].type}
          />
          <RoomItem
            id={roomsData && roomsData[2].id}
            roomName={roomsData && roomsData[2].roomName}
            roomStatus={roomsData && roomsData[2].currentStatus}
            duration={roomsData && roomsData[2].duration}
            tag={roomsData && roomsData[2].tag}
            onGetRoom={this.props.showGetRoomModal}
            showRoomDetail={this.props.showRoomDetail}
            type={roomsData && roomsData[2].type}
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
