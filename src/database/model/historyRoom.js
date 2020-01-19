import realm from '../configRealm';
import moment from 'moment'

export const addHistory = ({ roomID, roomName, status, total, sectionID, timeIn, note, tag, sectionRoom, cmnd}) => {
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
