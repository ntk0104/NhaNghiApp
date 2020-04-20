import { ADD_HISTORY_ITEM_REQUEST, GET_HISTORY_LIST_REQUEST, GET_STATISTIC_OF_DAY_REQUEST, UPDATE_HISTORY_ROOM_REQUEST, DELETE_HISTORY_ROOM_ITEM_REQUEST, SEE_HISTORY_ROOM_DETAIL_REQUEST } from '../types'
import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { addHistoryItemSuccess, addHistoryItemFailure, getHistoryListSuccess, getHistoryListFailure, getStatisticOfDaySuccess, getStatisticOfDayFailure, updateHistoryRoomSuccess, updateHistoryRoomFailure, deleteHistoryRoomSuccess, deleteHistoryRoomFailure, seeHistoryRoomSuccess, seeHistoryRoomFailure } from '../actions'
import { addHistory, getHistory, getStatisticOfDay, updateHistoryItem, deleteHistoryRoom, getHistoryRoomDetail } from '../../database/model/historyRoom'

const addHistoryItemAPI = (payload) => {
  return new Promise((resolve, reject) => {
    addHistory(payload)
      .then(rs => {
        resolve(rs)
      }).catch(err => {
        reject(err)
      })
  })
}

const getHistoryListAPI = (payload) => {
  return new Promise((resolve, reject) => {
    getHistory()
      .then(rs => {
        resolve(rs)
      }).catch(err => {
        reject(err)
      })
  })
}

const getStatisticOfDayRequestAPI = async ({ selectedDay }) => {
  return new Promise((resolve, reject) => {
    getStatisticOfDay(selectedDay)
      .then((statistic) => {
        resolve(statistic)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const updateHistoryRoomRequestAPI = (payload) => {
  return new Promise((resolve, reject) => {
    updateHistoryItem(payload)
      .then((rs) => {
        resolve(rs)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const deleteHistoryRoomRequestAPI = ({ addedTime }) => {
  return new Promise((resolve, reject) => {
    deleteHistoryRoom(addedTime)
      .then((rs) => {
        resolve(rs)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getHistoryRoomDetailRequestAPI = (payload) => {
  return new Promise((resolve, reject) => {
    getHistoryRoomDetail(payload)
      .then((rs) => {
        resolve(rs)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * Dispatch action success or failure
 * @param {*} obj params
 */
export function* addHistoryRoomRequest(obj) {
  try {
    const addedItem = yield call(addHistoryItemAPI, obj.payload);
    yield put(addHistoryItemSuccess(addedItem));
  } catch (err) {
    yield put(addHistoryItemFailure(err));
  }
}

export function* getHistoryRoomRequest(obj) {
  try {
    const historyList = yield call(getHistoryListAPI, obj.payload);
    yield put(getHistoryListSuccess(historyList));
  } catch (err) {
    yield put(getHistoryListFailure(err));
  }
}

export function* getStatisticOfDayRequest(obj) {
  try {
    const statistic = yield call(getStatisticOfDayRequestAPI, obj.payload);
    yield put(getStatisticOfDaySuccess(statistic));
  } catch (err) {
    yield put(getStatisticOfDayFailure(err));
  }
}

export function* updateHistoryRoomRequest(obj) {
  try {
    const updatedHistory = yield call(updateHistoryRoomRequestAPI, obj.payload);
    yield put(updateHistoryRoomSuccess(updatedHistory));
  } catch (err) {
    yield put(updateHistoryRoomFailure(err));
  }
}

export function* deleteHistoryRoomItemRequest(obj) {
  try {
    const deletedHistory = yield call(deleteHistoryRoomRequestAPI, obj.payload);
    yield put(deleteHistoryRoomSuccess(deletedHistory));
  } catch (err) {
    yield put(deleteHistoryRoomFailure(err));
  }
}

export function* seeHistoryRoomDetailRequest(obj) {
  try {
    const selectedSection = yield call(getHistoryRoomDetailRequestAPI, obj.payload);
    yield put(seeHistoryRoomSuccess(selectedSection));
  } catch (err) {
    yield put(seeHistoryRoomFailure(err));
  }
}

/**
 * Catch action request
 */
function* watchHistory() {
  yield takeLatest(ADD_HISTORY_ITEM_REQUEST, addHistoryRoomRequest);
  yield takeLatest(GET_HISTORY_LIST_REQUEST, getHistoryRoomRequest);
  yield takeLatest(GET_STATISTIC_OF_DAY_REQUEST, getStatisticOfDayRequest);
  yield takeLatest(UPDATE_HISTORY_ROOM_REQUEST, updateHistoryRoomRequest);
  yield takeLatest(DELETE_HISTORY_ROOM_ITEM_REQUEST, deleteHistoryRoomItemRequest);
  yield takeLatest(SEE_HISTORY_ROOM_DETAIL_REQUEST, seeHistoryRoomDetailRequest);
}

export default function* rootChild() {
  yield fork(watchHistory);
}