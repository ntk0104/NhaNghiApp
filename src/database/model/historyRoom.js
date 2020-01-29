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
      },
      'thongke': {
        roomName: 'Thống kê',
        totalIncome: 0,
        totalIncomeFromDG: {
          lanh: 0,
          quat: 0
        },
        totalIncomeFromCD: {
          lanh: 0,
          quat: 0
        },
        totalIncomeFromQD: 0,
        totalIncomeFromWater: 0,
        totalIncomeFromSoftDrink: 0,
        totalIncomeFromInstantNoodle: 0,
        totalIncomeFromBeer: 0,
        totalIncomeFromRoomCost: 0,
        totalLostMoney: 0
      }
    }
    const dayBegin = selectedDay + ' 00:00:00'
    const generatedTimestampBegin = moment(dayBegin).valueOf();
    const dayEnd = selectedDay + ' 23:59:59'
    const generatedTimestampEnd = moment(dayEnd).valueOf();
    const filterQuery = "timeIn > " + generatedTimestampBegin + " and timeIn < " + generatedTimestampEnd + " and status = 'in'"
    let totalIncome = 0
    let totalIncomeFromDGQuat = 0
    let totalIncomeFromDGLanh = 0
    let totalIncomeFromCDLanh = 0
    let totalIncomeFromCDQuat = 0
    let totalIncomeFromQD = 0
    let totalIncomeFromWater = 0
    let totalIncomeFromSoftDrink = 0
    let totalIncomeFromInstantNoodle = 0
    let totalIncomeFromBeer = 0
    let totalIncomeFromRoomCost = 0
    let totalLostMoney = 0
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
        totalIncome += sectionOutInfo.total
        if (section.tag != 'QD') {
          if(section.tag === 'DG'){
            if(section.sectionRoom == 'quat'){
              totalIncomeFromDGQuat += sectionOutInfo.total
            } else if(section.sectionRoom == 'lanh'){
              totalIncomeFromDGLanh += sectionOutInfo.total
            }
          } else if (section.tag === 'CD'){
            if(section.sectionRoom == 'quat'){
              totalIncomeFromCDQuat += sectionOutInfo.total
            } else if(section.sectionRoom == 'lanh'){
              totalIncomeFromCDLanh += sectionOutInfo.total
            }
          }
          returnedData[section.roomID].hourSection.push(tmpHourSection)
        } else {
          totalIncomeFromQD += sectionOutInfo.total
          returnedData[section.roomID].overnight.push(tmpHourSection)
        }
        //get ChargedItem based on sectionId
        const getChargedItemsBySectionIDQuery = "sectionID = " + section.sectionID
        let items = realm.objects('ChargedItem').filtered(getChargedItemsBySectionIDQuery)
        for(let item of items){
          if(item.payStatus === 'lost'){
            totalLostMoney += item.total
          } else if(item.payStatus === 'paid'){
            if(item.itemKey === 'water'){
              totalIncomeFromWater += item.total
            } else if(item.itemKey === 'beer'){
              totalIncomeFromBeer += item.total
            } else if(item.itemKey === 'instantNoodle'){
              totalIncomeFromInstantNoodle += item.total
            } else if(item.itemKey === 'softdrink'){
              totalIncomeFromSoftDrink += item.total
            } else if(item.itemKey === 'roomcost'){
              totalIncomeFromRoomCost += item.total
            }
          }
        }
      }
      returnedData['thongke'].totalIncome = totalIncome
      returnedData['thongke'].totalIncomeFromDG.quat = totalIncomeFromDGQuat
      returnedData['thongke'].totalIncomeFromDG.lanh = totalIncomeFromDGLanh
      returnedData['thongke'].totalIncomeFromCD.quat = totalIncomeFromCDQuat
      returnedData['thongke'].totalIncomeFromCD.lanh = totalIncomeFromCDLanh
      returnedData['thongke'].totalIncomeFromQD = totalIncomeFromQD
      returnedData['thongke'].totalIncomeFromWater = totalIncomeFromWater
      returnedData['thongke'].totalIncomeFromSoftDrink = totalIncomeFromSoftDrink
      returnedData['thongke'].totalIncomeFromBeer = totalIncomeFromBeer
      returnedData['thongke'].totalIncomeFromInstantNoodle = totalIncomeFromInstantNoodle
      returnedData['thongke'].totalIncomeFromRoomCost = totalIncomeFromRoomCost
      returnedData['thongke'].totalLostMoney = totalLostMoney
      resolve(returnedData)
    } catch (error) {
      reject(error);
    }
  });
}

export const deleteHistoryRoom = (addedTime) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = "addedTime = " + addedTime
      let historyItem = realm.objects('HistoryRoom').filtered(query)
      realm.write(() => {
        realm.delete(historyItem)
      })
      resolve(historyItem)
    } catch (error) {
      console.log("TCL: deletehistoryItem -> error", error)
      reject(error);
    }
  });
}
