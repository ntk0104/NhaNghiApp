import { GET_ROOM_INFO_REQUEST, UPDATE_ROOM_INFO_REQUEST } from '../types'
import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { getRoomInfoSuccess, getRoomInfoFailure, updateRoomInfoSuccess, updateRoomInfoFailure } from '../actions'
import realm from '../../database/configRealm'
import moment from 'moment'
import { generateLivingDuration } from '../../utils/Helpers'
import { updateRoom } from '../../database/index'

const getRoomInfoAPI = async ({ id }) => {
  return new Promise((resolve, reject) => {
    try {
      const query = "id = '" + id + "'"
      let roomInfo = realm.objects('Room').filtered(query)
      let roomData = {
        id: roomInfo[0].id,
        roomName: roomInfo[0].roomName,
        currentStatus: roomInfo[0].currentStatus,
        timeIn: roomInfo[0].timeIn,
        // duration: Helpers.generateLivingDuration(roomInfo[0].timeIn, moment().valueOf()),
        duration: generateLivingDuration(roomInfo[0].timeIn, moment().valueOf()),
        chargedItems: [],
        note: roomInfo[0].note,
        tag: roomInfo[0].tag,
        sectionRoom: roomInfo[0].sectionRoom,
        overnight_price: roomInfo[0].overnight_price,
        cmnd: roomInfo[0].cmnd
      }
      resolve(roomData)
    } catch (error) {
      console.log("TCL: getRoomInfoAPI -> error", error)
      reject(error);
    }
  })
}

const updateRoomInfoAPI = (payload) => {
  return new Promise((resolve, reject) => {
    updateRoom(payload)
      .then(() => {
        resolve()
      })
      .catch((err) => {
        console.log("TCL: updateRoomInfoAPI -> err", err)
        reject(err)
      })
  })
}

/**
 * Dispatch action success or failure
 * @param {*} obj params
 */
export function* getRoomInfoRequest(obj) {
  try {
    const roomInfo = yield call(getRoomInfoAPI, obj.payload);
    yield put(getRoomInfoSuccess(roomInfo));
  } catch (err) {
    yield put(getRoomInfoFailure(err));
  }
}

export function* updateRoomInfoRequest(obj) {
  try {
    const updatedroomInfo = yield call(updateRoomInfoAPI, obj.payload);
    yield put(updateRoomInfoSuccess(updatedroomInfo));
  } catch (err) {
    yield put(updateRoomInfoFailure(err));
  }
}

/**
 * Catch action request
 */
function* watchRoom() {
  yield takeLatest(GET_ROOM_INFO_REQUEST, getRoomInfoRequest);
  yield takeLatest(UPDATE_ROOM_INFO_REQUEST, updateRoomInfoRequest);
}

export default function* rootChild() {
  yield fork(watchRoom);
}