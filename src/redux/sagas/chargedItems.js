import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { updateChargedItem } from '../../database/model/chargedItem';
import { updateChargedItemFailure, updateChargedItemSuccess } from '../actions';
import { UPDATE_CHARGED_ITEM_REQUEST } from '../types';

const updateChargedItemRequestAPI = async (payload) => {
  return new Promise((resolve, reject) => {
    updateChargedItem(payload)
      .then(() => {
        resolve()
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
  yield takeEvery(UPDATE_CHARGED_ITEM_REQUEST, updateChargedItemRequest);
}

export default function* rootChild() {
  yield fork(watchChargedItems);
}