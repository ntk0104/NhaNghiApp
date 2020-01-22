import realm from '../configRealm';
import moment from 'moment'

export const checkRoomExisted = (id) => {
  try {
    let rooms = realm.objects('Room')
    const filterQuery = "id = '" + id + "'"
    let roomExisted = rooms.filtered(filterQuery)
    if (roomExisted.length > 0) {
      // room existed
      return true
    }
    return false
  } catch (error) {
    console.log(error)
    return false
  }
}

export const addRoom = ({ id, roomName, currentStatus, timeIn, note, tag, sectionRoom, overnight_price, type, cmnd }) => {
  //console.log('%c%s', 'color: #f2ceb6', "added Room " + id);
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        let newRoom = realm.create("Room", {
          id: id || moment().valueOf(),
          roomName,
          currentStatus,
          timeIn,
          note,
          tag,
          sectionRoom,
          overnight_price,
          type,
          cmnd
        });
        resolve()
      })
    } catch (error) {
      reject(error);
    }
  });
}

export const updateRoom = ({ id, currentStatus, timeIn, note, tag, sectionRoom, cmnd, advancedPay }) => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        let updatedRoom = realm.create("Room", {
          id,
          currentStatus,
          timeIn,
          note,
          tag,
          sectionRoom,
          cmnd,
          advancedPay
        }, 'modified');
        resolve()
      })
    } catch (error) {
      reject(error);
    }
  });
}

export const getRoomInfo = (id) => {
  return new Promise((resolve, reject) => {
    try {
      let rooms = realm.objects('Room')
      const filterQuery = "id = '" + id + "'"
      let selectedRooms = rooms.filtered(filterQuery)
      resolve(selectedRooms[0])
    } catch (error) {
      reject(error);
    }
  });
}

export const getAllRoomsInfo = (i) => {
  return new Promise((resolve, reject) => {
    try {
      let rooms = realm.objects('Room')
      let roomsData = {}
      for (let room of rooms) {
        const roomData = {
          id: room.id,
          roomName: room.roomName,
          currentStatus: room.currentStatus,
          timeIn: room.timeIn,
          note: room.note,
          tag: room.tag,
          sectionRoom: room.sectionRoom,
          overnight_price: room.overnight_price,
          type: room.type,
          advancedPay: tooth.advancedPay
        }
        roomsData[room.id] = roomData
      }
      resolve(roomsData)
    } catch (error) {
      reject(error);
    }
  });
}

// hủy phòng book do nhầm lẫn
export const cancelRoom = ({ timeIn, roomID }) => {
  return new Promise((resolve, reject) => {
    try {
      let queryDeleteHistory = "addedTime = " + timeIn
      let history = realm.objects('HistoryRoom').filtered(queryDeleteHistory)
      let queryDeleteChargedItem = `id = '${timeIn}_beer' or id = '${timeIn}_roomcost' or id = '${timeIn}_anotherCost' or id = '${timeIn}_instantNoodle' or id = '${timeIn}_softdrink' or id = '${timeIn}_water'`
      let chargedItems = realm.objects('ChargedItem').filtered(queryDeleteChargedItem)
      realm.write(() => {
        realm.delete(history)
        realm.delete(chargedItems)
        let updatedRoom = realm.create("Room", {
          id: roomID,
          currentStatus: 'available',
          tag: '',
          timeIn: 0,
          sectionRoom: '',
          cmnd: null,
          advancedPay: 0
        }, 'modified');
        resolve()
      })
    } catch (error) {
      reject(error);
    }
  });
}