import realm from '../configRealm';

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
          id,
          roomName,
          currentStatus,
          timeIn,
          sectionID: timeIn,
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

export const updateRoom = ({ id, currentStatus, sectionID, timeIn, note, tag, sectionRoom, cmnd, advancedPay }) => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        let updatedRoom = realm.create("Room", {
          id,
          currentStatus,
          sectionID,
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
          sectionID: room.sectionID,
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
export const cancelRoom = ({ sectionID, roomID }) => {
  return new Promise((resolve, reject) => {
    try {
      let queryDeleteHistory = "sectionID = " + sectionID
      let history = realm.objects('HistoryRoom').filtered(queryDeleteHistory)
      let queryDeleteChargedItem = `id = '${sectionID}_beer' or id = '${sectionID}_roomcost' or id = '${sectionID}_anotherCost' or id = '${sectionID}_instantNoodle' or id = '${sectionID}_softdrink' or id = '${sectionID}_water'`
      let chargedItems = realm.objects('ChargedItem').filtered(queryDeleteChargedItem)
      realm.write(() => {
        realm.delete(history)
        realm.delete(chargedItems)
        // reset current Room in Room Table after delete history item and chargedItems
        let updatedRoom = realm.create("Room", {
          id: roomID,
          currentStatus: 'available',
          tag: '',
          timeIn: 0,
          sectionID: 0,
          sectionRoom: '',
          note: '',
          cmnd: '',
          advancedPay: 0
        }, 'modified');
        resolve()
      })
    } catch (error) {
      reject(error);
    }
  });
}