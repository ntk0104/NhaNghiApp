import { all, fork } from 'redux-saga/effects';

import home from './home';
import room from './room';
import chargedItems from './chargedItems';
import cashInBox from './cashInBox';
import historyList from './historyList'

export default function* rootSaga() {
  yield all([
    fork(home),
    fork(room),
    fork(chargedItems),
    fork(cashInBox),
    fork(historyList)
  ]);
}
