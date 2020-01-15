import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers/index';
import rootSaga from '../sagas/index';

// init the middlewares
let middlewares = [];
const sagaMiddleware = createSagaMiddleware();

// add the saga middleware
// middlewares.push(sagaMiddleware);

// log store actions if dev and iOS
if (__DEV__) {
  middlewares = [...middlewares, logger, sagaMiddleware];
} else {
  middlewares = [...middlewares, sagaMiddleware];
}

// apply the middleware
const middleware = applyMiddleware(...middlewares);

export const store = createStore(rootReducer, middleware);
sagaMiddleware.run(rootSaga);