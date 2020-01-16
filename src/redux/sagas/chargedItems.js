import { UPDATE_CHARGED_ITEM_REQUEST } from '../types'
import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { updateChargedItemSuccess, updateChargedItemFailure } from '../actions'
import realm from '../../database/configRealm'
import moment from 'moment'
import { updateChargedItem } from '../../database/model/chargedItem'

const updateChargedItemRequestAPI = async (payload) => {
  return new Promise((resolve, reject) => {
    updateChargedItem(payload)
      .then(() => {
        resolve()
      })
      .catch((err) => {
      console.log("TCL: updateChargedItemRequestAPI -> err", err)
        reject(err)
      })
  })
}

/**
 * Dispatch action success or failure
 * @param {*} obj params
 */
export function* updateChargedItemRequest(obj) {
  try {
    const updatedItem = yield call(updateChargedItemRequestAPI, obj.payload);
    yield put(updateChargedItemSuccess(updatedItem));
  } catch (err) {
    yield put(updateChargedItemFailure(err));
  }
}

/**
 * Catch action request
 */
function* watchChargedItems() {
  yield takeLatest(UPDATE_CHARGED_ITEM_REQUEST, updateChargedItemRequest);
}

export default function* rootChild() {
  yield fork(watchChargedItems);
}