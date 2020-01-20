import realm from '../configRealm';
import moment from 'moment'

export const addHistory = ({ roomID, roomName, status, total, sectionID, timeIn, note, tag, sectionRoom, cmnd }) => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        let newRoom = realm.create("HistoryRoom", {
          addedTime: moment().valueOf(),
          roomID,
          roomName,
          status,
          total,
          sectionID,
          timeIn,
          note,
          tag,
          sectionRoom,
          cmnd
        });
        resolve(newRoom)
      })
    } catch (error) {
      reject(error);
    }
  });
}

export const getHistory = () => {
  return new Promise((resolve, reject) => {
    try {
      let historyList = realm.objects('HistoryRoom').sorted('addedTime', true)
      let returnedHistory = []
      for (let item of historyList) {
        const itemData = {
          addedTime: item.addedTime,
          roomID: item.roomID,
          roomName: item.roomName,
          status: item.status,
          total: item.total,
          sectionID: item.sectionID,
          timeIn: item.timeIn,
          note: item.note,
          tag: item.tag,
          sectionRoom: item.sectionRoom,
          cmnd: item.cmnd
        }
        returnedHistory.push(itemData)
      }
      resolve(returnedHistory)
    } catch (error) {
      console.log("TCL: getHistory -> error", error)
      reject(error);
    }
  });
}
