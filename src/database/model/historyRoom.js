import realm from '../configRealm';
import moment from 'moment'

export const addHistory = ({ roomID, roomName, status, total, sectionID, timeIn, note, tag, sectionRoom, cmnd }) => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        let newRoom = realm.create("HistoryRoom", {
          addedTime: status == 'in' ? timeIn : moment().valueOf(),
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

export const updateHistoryItem = ({ addedTime, roomID, roomName, status, total, sectionID, timeIn, note, tag, sectionRoom, cmnd }) => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        let updatedHistory = realm.create("HistoryRoom", {
          addedTime,
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
        }, 'modified');
        resolve()
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


export const getInfoOutOfSection = (sectionID) => {
  return new Promise((resolve, reject) => {
    try {
      let filteredQuery = 'sectionID = ' + sectionID + " and status = 'out'"
      let section = realm.objects('HistoryRoom').filtered(filteredQuery)
      let returnedData = {
        timeOut : section[0] ? section[0].addedTime : null,
        total: section[0] ? section[0].total : 0,
      }
      resolve(returnedData)
    } catch (error) {
      reject(error);
    }
  });
}

//selectedDay : YYYY/MM/DD
export const getStatisticOfDay = (selectedDay) => {
  return new Promise(async (resolve, reject) => {
    let returnedData = {
      '18': {
        roomName: '18',
        hourSection: [],
        overnight: []
      },
      '17': {
        roomName: '17',
        hourSection: [],
        overnight: []
      },
      '16': {
        roomName: '16',
        hourSection: [],
        overnight: []
      },
      '15': {
        roomName: '15',
        hourSection: [],
        overnight: []
      },
      '14': {
        roomName: '14',
        hourSection: [],
        overnight: []
      },
      '13': {
        roomName: '13',
        hourSection: [],
        overnight: []
      },
      '12': {
        roomName: '12',
        hourSection: [],
        overnight: []
      },
      '11': {
        roomName: '11',
        hourSection: [],
        overnight: []
      },
      '10': {
        roomName: '10',
        hourSection: [],
        overnight: []
      },
      '9': {
        roomName: '9',
        hourSection: [],
        overnight: []
      },
      '8': {
        roomName: '8',
        hourSection: [],
        overnight: []
      },
      '7': {
        roomName: '7',
        hourSection: [],
        overnight: []
      },
      '6': {
        roomName: '6',
        hourSection: [],
        overnight: []
      },
      '5': {
        roomName: '5',
        hourSection: [],
        overnight: []
      },
      '4': {
        roomName: '4',
        hourSection: [],
        overnight: []
      },
      '3': {
        roomName: '3',
        hourSection: [],
        overnight: []
      },
      '2': {
        roomName: '2',
        hourSection: [],
        overnight: []
      }
    }
    const dayBegin = selectedDay + ' 00:00:00'
    const generatedTimestampBegin = moment(dayBegin).valueOf();
    const dayEnd = selectedDay + ' 23:59:59'
    const generatedTimestampEnd = moment(dayEnd).valueOf();
    const filterQuery = "timeIn > " + generatedTimestampBegin + " and timeIn < " + generatedTimestampEnd + " and status = 'in'"
    try {
      let sections = realm.objects('HistoryRoom').filtered(filterQuery)
      for (let section of sections) {
        const sectionOutInfo = await getInfoOutOfSection(section.timeIn)
        let tmpHourSection = {
          timeIn: section.timeIn,
          timeOut: sectionOutInfo.timeOut,
          roomType: section.sectionRoom,
          total: sectionOutInfo.total
        }
        if (section.tag != 'QD') {
          returnedData[section.roomID].hourSection.push(tmpHourSection)
        } else {
          returnedData[section.roomID].overnight.push(tmpHourSection)
        }
      }
      resolve(returnedData)
    } catch (error) {
      reject(error);
    }
  });
}
