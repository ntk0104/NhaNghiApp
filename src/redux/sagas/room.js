import { GET_ROOM_INFO_REQUEST, UPDATE_ROOM_INFO_REQUEST, ADD_CHARGED_ITEM_REQUEST, CANCEL_CURRENT_ROOM_REQUEST } from '../types'
import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { getRoomInfoSuccess, getRoomInfoFailure, updateRoomInfoSuccess, updateRoomInfoFailure, addChargedItemSuccess, addChargedItemFailure, cancelCurrentRoomSuccess, cancelCurrentRoomFailure } from '../actions'
import realm from '../../database/configRealm'
import moment from 'moment'
import { generateLivingDuration } from '../../utils/Helpers'
import { updateRoom, addChargedItem } from '../../database/index'
import { getChargedItemsBySectionID } from '../../database/model/chargedItem'
import { cancelRoom } from '../../database/model/room'

const getRoomInfoAPI = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = "id = '" + id + "'"
      let roomInfo = realm.objects('Room').filtered(query)
      let roomData = {
        id: roomInfo[0].id,
        roomName: roomInfo[0].roomName,
        currentStatus: roomInfo[0].currentStatus,
        timeIn: roomInfo[0].timeIn,
        duration: generateLivingDuration(roomInfo[0].timeIn, moment().valueOf()),
        chargedItems: await getChargedItemsBySectionID({ sectionId: roomInfo[0].timeIn }),
        note: roomInfo[0].note,
        tag: roomInfo[0].tag,
        sectionRoom: roomInfo[0].sectionRoom,
        overnight_price: roomInfo[0].overnight_price,
        cmnd: roomInfo[0].cmnd,
        advancedPay: roomInfo[0].advancedPay
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

const addChargedItemAPI = (payload) => {
  return new Promise((resolve, reject) => {
    addChargedItem(payload)
      .then(() => {
        resolve()
      })
      .catch((err) => {
        console.log("TCL: addChargedItemAPI -> err", err)
        reject(err)
      })
  })
}

const cancelCurrentRoomAPI = (payload) => {
  return new Promise((resolve, reject) => {
    cancelRoom(payload)
      .then(() => {
        resolve()
      })
      .catch((err) => {
        console.log("TCL: cancelCurrentRoomAPI -> err", err)
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

export function* addChargedItemRequest(obj) {
  try {
    const chargedItem = yield call(addChargedItemAPI, obj.payload);
    yield put(addChargedItemSuccess(chargedItem));
  } catch (err) {
    yield put(addChargedItemFailure(err));
  }
}

export function* cancelCurrentRoomRequest(obj) {
  try {
    const cancelledRoom = yield call(cancelCurrentRoomAPI, obj.payload);
    yield put(cancelCurrentRoomSuccess(cancelledRoom));
  } catch (err) {
    yield put(cancelCurrentRoomFailure(err));
  }
}

/**
 * Catch action request
 */
function* watchRoom() {
  yield takeLatest(GET_ROOM_INFO_REQUEST, getRoomInfoRequest);
  yield takeLatest(UPDATE_ROOM_INFO_REQUEST, updateRoomInfoRequest);
  yield takeLatest(ADD_CHARGED_ITEM_REQUEST, addChargedItemRequest);
  yield takeLatest(CANCEL_CURRENT_ROOM_REQUEST, cancelCurrentRoomRequest);
}

export default function* rootChild() {
  yield fork(watchRoom);
}