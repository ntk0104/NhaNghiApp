import { GET_CASH_BOX_REQUEST, UPDATE_CASH_BOX_REQUEST, GET_HISTORY_WITHDRAW_DEPOSIT_REQUEST, DELETE_HISTORY_WITHDRAW_DEPOSIT_REQUEST } from '../types'
import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { getCashBoxSuccess, getCashBoxFailure, udpateCashBoxSuccess, updateCashBoxFailure, getHistoryWithdrawDepositSuccess, getHistoryWithdrawDepositFailure, deleteHistoryWithdrawDepositSuccess, deleteHistoryWithdrawDepositFailure } from '../actions'
import realm from '../../database/configRealm'
import moment from 'moment'
import { getCurrentMoneyInBox, addTransaction, getHistoryWithdrawAndDeposit, deleteTransaction } from '../../database/model/transactionCash'

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

const getHistoryWithdrawAndDepositAPI = ({ startTime }) => {
  return new Promise(async (resolve, reject) => {
    getHistoryWithdrawAndDeposit(startTime)
      .then((transactions) => {
        resolve(transactions)
      })
      .catch(err => {
        console.log("TCL: getHistoryWithdrawAndDepositAPI -> err", err)
        reject(err)
      })
  })
}

const deleteHistoryWithdrawAndDepositAPI = ({ transactionID }) => {
  return new Promise(async (resolve, reject) => {
    deleteTransaction(transactionID)
      .then((rs) => {
        resolve(rs)
      })
      .catch(err => {
        console.log("TCL: deleteHistoryWithdrawAndDepositAPI -> err", err)
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

export function* getHistoryWithdrawAndDepositRequest(obj) {
  try {
    const transactions = yield call(getHistoryWithdrawAndDepositAPI, obj.payload);
    yield put(getHistoryWithdrawDepositSuccess(transactions));
  } catch (err) {
    yield put(getHistoryWithdrawDepositFailure(err));
  }
}

export function* deleteHistoryWithdrawAndDepositRequest(obj) {
  try {
    const deletedTransaction = yield call(deleteHistoryWithdrawAndDepositAPI, obj.payload);
    yield put(deleteHistoryWithdrawDepositSuccess(deletedTransaction));
  } catch (err) {
    yield put(deleteHistoryWithdrawDepositFailure(err));
  }
}

/**
 * Catch action request
 */
function* watchCashInBox() {
  yield takeLatest(GET_CASH_BOX_REQUEST, getCashInBoxRequest);
  yield takeLatest(UPDATE_CASH_BOX_REQUEST, updateCashInBoxRequest);
  yield takeLatest(GET_HISTORY_WITHDRAW_DEPOSIT_REQUEST, getHistoryWithdrawAndDepositRequest);
  yield takeLatest(DELETE_HISTORY_WITHDRAW_DEPOSIT_REQUEST, deleteHistoryWithdrawAndDepositRequest);
}

export default function* rootChild() {
  yield fork(watchCashInBox);
}