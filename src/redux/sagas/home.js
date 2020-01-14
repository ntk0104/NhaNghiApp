import { GET_ROOMS_DATA_REQUEST } from '../types'
import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { getRoomsDataSuccess, getRoomsDataFailure } from '../actions'
import realm from '../../database/configRealm'
import moment from 'moment'
import { Helpers } from '../../utils/index'


const generateLivingDuration = (timestampIn, timestampOut) => {
  const durationObj = Helpers.calculateLivingTime(timestampIn, timestampOut)
  const { nights, hours, minutes } = durationObj
  let durationString = ''
  if (nights > 0) {
    durationString += nights + ' đêm '
  }
  if (hours > 0) {
    durationString += hours + ' giờ '
  }
  if (minutes > 0) {
    durationString += minutes + ' phút'
  }
  return durationString
}

const getRoomsDataAPI = () => {
  return new Promise((resolve, reject) => {
    try {
      let rooms = realm.objects('Room')
      let roomsData = {}
      for (let room of rooms) {
        const roomData = {
          id: room.id,
          roomName: room.roomName,
          currentStatus: room.currentStatus,
          duration: generateLivingDuration(room.timeIn, moment().valueOf()),
          tag: room.tag,
          type: room.type
        }
        roomsData[room.id] = roomData
      }
      resolve(roomsData)
    } catch (error) {
      reject(error);
    }
  })
}

/**
 * Dispatch action success or failure
 * @param {*} obj params
 */
export function* getRoomsDataRequest() {
  try {
    const roomsData = yield call(getRoomsDataAPI);
    yield put(getRoomsDataSuccess(roomsData));
  } catch (err) {
    yield put(getRoomsDataFailure(err));
  }
}

/**
 * Catch action request
 */
function* watchCategory() {
  yield takeLatest(GET_ROOMS_DATA_REQUEST, getRoomsDataRequest);
}

export default function* rootChild() {
  yield fork(watchCategory);
}