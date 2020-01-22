import { ADD_HISTORY_ITEM_REQUEST, GET_HISTORY_LIST_REQUEST, GET_STATISTIC_OF_DAY_REQUEST, UPDATE_HISTORY_ROOM_REQUEST  } from '../types'
import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { addHistoryItemSuccess, addHistoryItemFailure, getHistoryListSuccess, getHistoryListFailure, getStatisticOfDaySuccess, getStatisticOfDayFailure, updateHistoryRoomSuccess, updateHistoryRoomFailure } from '../actions'
import { addHistory, getHistory, getStatisticOfDay, updateHistoryItem } from '../../database/model/historyRoom'

const addHistoryItemAPI = (payload) => {
  return new Promise((resolve, reject) => {
    addHistory(payload)
      .then(rs => {
        resolve(rs)
      }).catch(err => {
        console.log("TCL: addHistoryItemAPI -> err", err)
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
        console.log("TCL: addHistoryItemAPI -> err", err)
        reject(err)
      })
  })
}

const getStatisticOfDayRequestAPI = async ({selectedDay}) => {
  return new Promise((resolve, reject) => {
    getStatisticOfDay(selectedDay)
      .then((statistic) => {
        resolve(statistic)
      })
      .catch((err) => {
      console.log("TCL: updateChargedItemRequestAPI -> err", err)
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
      console.log("TCL: updateHistoryRoomRequestAPI -> err", err)
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
    console.log("TCL: function*addHistoryRoomRequest -> err", err)
    yield put(addHistoryItemFailure(err));
  }
}

export function* getHistoryRoomRequest(obj) {
  try {
    const historyList = yield call(getHistoryListAPI, obj.payload);
    yield put(getHistoryListSuccess(historyList));
  } catch (err) {
    console.log("TCL: function*getHistoryRoomRequest -> err", err)
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

/**
 * Catch action request
 */
function* watchHistory() {
  yield takeLatest(ADD_HISTORY_ITEM_REQUEST, addHistoryRoomRequest);
  yield takeLatest(GET_HISTORY_LIST_REQUEST, getHistoryRoomRequest);
  yield takeLatest(GET_STATISTIC_OF_DAY_REQUEST, getStatisticOfDayRequest);
  yield takeLatest(UPDATE_HISTORY_ROOM_REQUEST, updateHistoryRoomRequest);
}

export default function* rootChild() {
  yield fork(watchHistory);
}