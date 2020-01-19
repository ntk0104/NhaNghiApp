import { GET_CASH_BOX_REQUEST, UPDATE_CASH_BOX_REQUEST } from '../types'
import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { getCashBoxSuccess, getCashBoxFailure, udpateCashBoxSuccess, updateCashBoxFailure } from '../actions'
import realm from '../../database/configRealm'
import moment from 'moment'
import { getCurrentMoneyInBox, addTransaction } from '../../database/model/transactionCash'

const getCashInBoxAPI = () => {
  return new Promise(async (resolve, reject) => {
    getCurrentMoneyInBox()
      .then((totalMoney) => {
        resolve(totalMoney)
      })
      .catch(err => {
        console.log("TCL: getCashInBoxAPI -> err", err)
        reject(err)
      })
  })
}

const updateCashInBoxAPI = (obj) => {
  return new Promise(async (resolve, reject) => {
    addTransaction(obj)
      .then(() => {
        resolve()
      })
      .catch(err => {
      console.log("TCL: updateCashInBoxAPI -> err", err)
        reject(err)
      })
  })
}

/**
 * Dispatch action success or failure
 * @param {*} obj params
 */
export function* getCashInBoxRequest(obj) {
  try {
    const totalMoney = yield call(getCashInBoxAPI, obj.payload);
    yield put(getCashBoxSuccess(totalMoney));
  } catch (err) {
    yield put(getCashBoxFailure(err));
  }
}

export function* updateCashInBoxRequest(obj) {
  try {
    const totalMoney = yield call(updateCashInBoxAPI, obj.payload);
    yield put(udpateCashBoxSuccess(totalMoney));
  } catch (err) {
    yield put(updateCashBoxFailure(err));
  }
}

/**
 * Catch action request
 */
function* watchCashInBox() {
  yield takeLatest(GET_CASH_BOX_REQUEST, getCashInBoxRequest);
  yield takeLatest(UPDATE_CASH_BOX_REQUEST, updateCashInBoxRequest);
}

export default function* rootChild() {
  yield fork(watchCashInBox);
}