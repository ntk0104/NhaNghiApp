import { ADD_HISTORY_ITEM_REQUEST, GET_HISTORY_LIST_REQUEST } from '../types'
import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { addHistoryItemSuccess, addHistoryItemFailure, getHistoryListSuccess, getHistoryListFailure } from '../actions'
import { addHistory, getHistory } from '../../database/model/historyRoom'

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

/**
 * Catch action request
 */
function* watchHistory() {
  yield takeLatest(ADD_HISTORY_ITEM_REQUEST, addHistoryRoomRequest);
  yield takeLatest(GET_HISTORY_LIST_REQUEST, getHistoryRoomRequest);
}

export default function* rootChild() {
  yield fork(watchHistory);
}