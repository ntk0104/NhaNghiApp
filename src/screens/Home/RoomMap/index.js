import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from '../styles'
import _ from 'lodash'
import RoomItem from '../../../components/RoomItem/index'

export default class RoomMap extends Component {

  shouldComponentUpdate(nextprops){
    if(!_.isEqual(nextprops.roomsData, this.props.roomsData)){
      return true
    }
    return false
  }


  render() {
    console.log('%c%s', 'color: #f2ceb6', 'Rendering RoomMap');
    const { roomsData } = this.props
    return (
      <View style={styles.roomMapContainer}>
        <View style={styles.roomsLaneContainer}>
          <RoomItem
            id={roomsData[18].id}
            roomName={roomsData[18].roomName}
            roomStatus={roomsData[18].currentStatus}
            timeIn={roomsData[18].timeIn}
            //chargedItems={roomsData[18].chargedItems}
            note={roomsData[18].note}
            tag={roomsData[18].tag}
            fan_hour_price={roomsData[18].fan_hour_price}
            air_hour_price={roomsData[18].air_hour_price}
            overnight_price={roomsData[18].overnight_price}
            limitSection={roomsData[18].limitSection}
            limitMidnight={roomsData[18].limitMidnight}
            type={roomsData[18].type}
            onGetRoom={this.props.showGetRoomModal}
          />
          <RoomItem
            id={roomsData[9].id}
            roomName={roomsData[9].roomName}
            roomStatus={roomsData[9].currentStatus}
            timeIn={roomsData[9].timeIn}
            //chargedItems={roomsData[9].chargedItems}
            note={roomsData[9].note}
            tag={roomsData[9].tag}
            fan_hour_price={roomsData[9].fan_hour_price}
            air_hour_price={roomsData[9].air_hour_price}
            overnight_price={roomsData[9].overnight_price}
            limitSection={roomsData[9].limitSection}
            limitMidnight={roomsData[9].limitMidnight}
            type={roomsData[9].type}
            onGetRoom={this.props.showGetRoomModal}
          />
          <RoomItem
            id={roomsData[10].id}
            roomName={roomsData[10].roomName}
            roomStatus={roomsData[10].currentStatus}
            timeIn={roomsData[10].timeIn}
            //chargedItems={roomsData[10].chargedItems}
            note={roomsData[10].note}
            tag={roomsData[10].tag}
            fan_hour_price={roomsData[10].fan_hour_price}
            air_hour_price={roomsData[10].air_hour_price}
            overnight_price={roomsData[10].overnight_price}
            limitSection={roomsData[10].limitSection}
            limitMidnight={roomsData[10].limitMidnight}
            type={roomsData[10].type}
            onGetRoom={this.props.showGetRoomModal}
          />
          <RoomItem
            id={roomsData[11].id}
            roomName={roomsData[11].roomName}
            roomStatus={roomsData[11].currentStatus}
            timeIn={roomsData[11].timeIn}
            //chargedItems={roomsData[11].chargedItems}
            note={roomsData[11].note}
            tag={roomsData[11].tag}
            fan_hour_price={roomsData[11].fan_hour_price}
            air_hour_price={roomsData[11].air_hour_price}
            overnight_price={roomsData[11].overnight_price}
            limitSection={roomsData[11].limitSection}
            limitMidnight={roomsData[11].limitMidnight}
            type={roomsData[11].type}
            onGetRoom={this.props.showGetRoomModal}
          />
          <RoomItem
            id={roomsData[12].id}
            roomName={roomsData[12].roomName}
            roomStatus={roomsData[12].currentStatus}
            timeIn={roomsData[12].timeIn}
            //chargedItems={roomsData[12].chargedItems}
            note={roomsData[12].note}
            tag={roomsData[12].tag}
            fan_hour_price={roomsData[12].fan_hour_price}
            air_hour_price={roomsData[12].air_hour_price}
            overnight_price={roomsData[12].overnight_price}
            limitSection={roomsData[12].limitSection}
            limitMidnight={roomsData[12].limitMidnight}
            type={roomsData[12].type}
            onGetRoom={this.props.showGetRoomModal}
          />
          <RoomItem
            id={roomsData[13].id}
            roomName={roomsData[13].roomName}
            roomStatus={roomsData[13].currentStatus}
            timeIn={roomsData[13].timeIn}
            //chargedItems={roomsData[13].chargedItems}
            note={roomsData[13].note}
            tag={roomsData[13].tag}
            fan_hour_price={roomsData[13].fan_hour_price}
            air_hour_price={roomsData[13].air_hour_price}
            overnight_price={roomsData[13].overnight_price}
            limitSection={roomsData[13].limitSection}
            limitMidnight={roomsData[13].limitMidnight}
            type={roomsData[13].type}
            onGetRoom={this.props.showGetRoomModal}
          />
          <RoomItem
            id={roomsData[14].id}
            roomName={roomsData[14].roomName}
            roomStatus={roomsData[14].currentStatus}
            timeIn={roomsData[14].timeIn}
            //chargedItems={roomsData[14].chargedItems}
            note={roomsData[14].note}
            tag={roomsData[14].tag}
            fan_hour_price={roomsData[14].fan_hour_price}
            air_hour_price={roomsData[14].air_hour_price}
            overnight_price={roomsData[14].overnight_price}
            limitSection={roomsData[14].limitSection}
            limitMidnight={roomsData[14].limitMidnight}
            type={roomsData[14].type}
            onGetRoom={this.props.showGetRoomModal}
          />
          <RoomItem
            id={roomsData[15].id}
            roomName={roomsData[15].roomName}
            roomStatus={roomsData[15].currentStatus}
            timeIn={roomsData[15].timeIn}
            //chargedItems={roomsData[15].chargedItems}
            note={roomsData[15].note}
            tag={roomsData[15].tag}
            fan_hour_price={roomsData[15].fan_hour_price}
            air_hour_price={roomsData[15].air_hour_price}
            overnight_price={roomsData[15].overnight_price}
            limitSection={roomsData[15].limitSection}
            limitMidnight={roomsData[15].limitMidnight}
            type={roomsData[15].type}
            onGetRoom={this.props.showGetRoomModal}
          />
          <RoomItem
            id={roomsData[16].id}
            roomName={roomsData[16].roomName}
            roomStatus={roomsData[16].currentStatus}
            timeIn={roomsData[16].timeIn}
            //chargedItems={roomsData[16].chargedItems}
            note={roomsData[16].note}
            tag={roomsData[16].tag}
            fan_hour_price={roomsData[16].fan_hour_price}
            air_hour_price={roomsData[16].air_hour_price}
            overnight_price={roomsData[16].overnight_price}
            limitSection={roomsData[16].limitSection}
            limitMidnight={roomsData[16].limitMidnight}
            type={roomsData[16].type}
            onGetRoom={this.props.showGetRoomModal}
          />
        </View>
        <View style={[styles.roomsLaneContainer, { marginTop: 10 }]}>
          <RoomItem
            id={roomsData[17].id}
            roomName={roomsData[17].roomName}
            roomStatus={roomsData[17].currentStatus}
            timeIn={roomsData[17].timeIn}
            //chargedItems={roomsData[17].chargedItems}
            note={roomsData[17].note}
            tag={roomsData[17].tag}
            fan_hour_price={roomsData[17].fan_hour_price}
            air_hour_price={roomsData[17].air_hour_price}
            overnight_price={roomsData[17].overnight_price}
            limitSection={roomsData[17].limitSection}
            limitMidnight={roomsData[17].limitMidnight}
            type={roomsData[17].type}
            onGetRoom={this.props.showGetRoomModal}
          />
          <RoomItem
            id={roomsData[8].id}
            roomName={roomsData[8].roomName}
            roomStatus={roomsData[8].currentStatus}
            timeIn={roomsData[8].timeIn}
            //chargedItems={roomsData[8].chargedItems}
            note={roomsData[8].note}
            tag={roomsData[8].tag}
            fan_hour_price={roomsData[8].fan_hour_price}
            air_hour_price={roomsData[8].air_hour_price}
            overnight_price={roomsData[8].overnight_price}
            limitSection={roomsData[8].limitSection}
            limitMidnight={roomsData[8].limitMidnight}
            type={roomsData[8].type}
            onGetRoom={this.props.showGetRoomModal}
          />
          <RoomItem
            id={roomsData[7].id}
            roomName={roomsData[7].roomName}
            roomStatus={roomsData[7].currentStatus}
            timeIn={roomsData[7].timeIn}
            //chargedItems={roomsData[7].chargedItems}
            note={roomsData[7].note}
            tag={roomsData[7].tag}
            fan_hour_price={roomsData[7].fan_hour_price}
            air_hour_price={roomsData[7].air_hour_price}
            overnight_price={roomsData[7].overnight_price}
            limitSection={roomsData[7].limitSection}
            limitMidnight={roomsData[7].limitMidnight}
            type={roomsData[7].type}
            onGetRoom={this.props.showGetRoomModal}
          />
          <RoomItem
            id={roomsData[6].id}
            roomName={roomsData[6].roomName}
            roomStatus={roomsData[6].currentStatus}
            timeIn={roomsData[6].timeIn}
            //chargedItems={roomsData[6].chargedItems}
            note={roomsData[6].note}
            tag={roomsData[6].tag}
            fan_hour_price={roomsData[6].fan_hour_price}
            air_hour_price={roomsData[6].air_hour_price}
            overnight_price={roomsData[6].overnight_price}
            limitSection={roomsData[6].limitSection}
            limitMidnight={roomsData[6].limitMidnight}
            type={roomsData[6].type}
            onGetRoom={this.props.showGetRoomModal}
          />
          <RoomItem
            id={roomsData[5].id}
            roomName={roomsData[5].roomName}
            roomStatus={roomsData[5].currentStatus}
            timeIn={roomsData[5].timeIn}
            //chargedItems={roomsData[5].chargedItems}
            note={roomsData[5].note}
            tag={roomsData[5].tag}
            fan_hour_price={roomsData[5].fan_hour_price}
            air_hour_price={roomsData[5].air_hour_price}
            overnight_price={roomsData[5].overnight_price}
            limitSection={roomsData[5].limitSection}
            limitMidnight={roomsData[5].limitMidnight}
            type={roomsData[5].type}
            onGetRoom={this.props.showGetRoomModal}
          />
          <RoomItem
            id={roomsData[4].id}
            roomName={roomsData[4].roomName}
            roomStatus={roomsData[4].currentStatus}
            timeIn={roomsData[4].timeIn}
            //chargedItems={roomsData[4].chargedItems}
            note={roomsData[4].note}
            tag={roomsData[4].tag}
            fan_hour_price={roomsData[4].fan_hour_price}
            air_hour_price={roomsData[4].air_hour_price}
            overnight_price={roomsData[4].overnight_price}
            limitSection={roomsData[4].limitSection}
            limitMidnight={roomsData[4].limitMidnight}
            type={roomsData[4].type}
            onGetRoom={this.props.showGetRoomModal}
          />
          <RoomItem
            id={roomsData[3].id}
            roomName={roomsData[3].roomName}
            roomStatus={roomsData[3].currentStatus}
            timeIn={roomsData[3].timeIn}
            //chargedItems={roomsData[3].chargedItems}
            note={roomsData[3].note}
            tag={roomsData[3].tag}
            fan_hour_price={roomsData[3].fan_hour_price}
            air_hour_price={roomsData[3].air_hour_price}
            overnight_price={roomsData[3].overnight_price}
            limitSection={roomsData[3].limitSection}
            limitMidnight={roomsData[3].limitMidnight}
            type={roomsData[3].type}
            onGetRoom={this.props.showGetRoomModal}
          />
          <RoomItem
            id={roomsData[2].id}
            roomName={roomsData[2].roomName}
            roomStatus={roomsData[2].currentStatus}
            timeIn={roomsData[2].timeIn}
            //chargedItems={roomsData[2].chargedItems}
            note={roomsData[2].note}
            tag={roomsData[2].tag}
            fan_hour_price={roomsData[2].fan_hour_price}
            air_hour_price={roomsData[2].air_hour_price}
            overnight_price={roomsData[2].overnight_price}
            limitSection={roomsData[2].limitSection}
            limitMidnight={roomsData[2].limitMidnight}
            type={roomsData[2].type}
            onGetRoom={this.props.showGetRoomModal}
          />
        </View>
      </View>
    )
  }
}
