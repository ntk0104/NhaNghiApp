import { GET_ROOMS_DATA_REQUEST } from '../types'
import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { getRoomsDataSuccess, getRoomsDataFailure } from '../actions'
import realm from '../../database/configRealm'
import moment from 'moment'
// import { Helpers } from '../../utils/index'
import { generateLivingDuration } from '../../utils/Helpers'

const getRoomsDataAPI = async () => {
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
          duration: generateLivingDuration(room.timeIn, moment().valueOf()),
          tag: room.tag,
          type: room.type,
          overnight_price: room.overnight_price,
          advancedPay: room.advancedPay
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
function* watchHome() {
  yield takeLatest(GET_ROOMS_DATA_REQUEST, getRoomsDataRequest);
}

export default function* rootChild() {
  yield fork(watchHome);
}