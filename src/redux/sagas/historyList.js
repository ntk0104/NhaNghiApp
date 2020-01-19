import { ADD_HISTORY_ITEM_REQUEST } from '../types'
import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { addHistoryItemSuccess, addHistoryItemFailure } from '../actions'
import { addHistory } from '../../database/model/historyRoom'

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

/**
 * Catch action request
 */
function* watchHistory() {
  yield takeLatest(ADD_HISTORY_ITEM_REQUEST, addHistoryRoomRequest);
}

export default function* rootChild() {
  yield fork(watchHistory);
}