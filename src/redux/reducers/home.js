import produce from 'immer';
import {
  GET_ROOMS_DATA_REQUEST,
  GET_ROOMS_DATA_SUCCESS,
  GET_ROOMS_DATA_FAILURE,
  GET_ROOM_INFO_REQUEST,
  GET_ROOM_INFO_SUCCESS,
  GET_ROOM_INFO_FAILURE,
  UPDATE_ROOM_INFO_REQUEST,
  UPDATE_ROOM_INFO_SUCCESS,
  UPDATE_ROOM_INFO_FAILURE,
  ADD_CHARGED_ITEM_REQUEST,
  ADD_CHARGED_ITEM_SUCCESS,
  ADD_CHARGED_ITEM_FAILURE,
  UPDATE_CHARGED_ITEM_REQUEST,
  UPDATE_CHARGED_ITEM_SUCCESS,
  UPDATE_CHARGED_ITEM_FAILURE,
  GET_CASH_BOX_REQUEST,
  GET_CASH_BOX_SUCCESS,
  GET_CASH_BOX_FAILURE,
  UPDATE_CASH_BOX_REQUEST,
  UPDATE_CASH_BOX_SUCCESS,
  UPDATE_CASH_BOX_FAILURE,
  ADD_HISTORY_ITEM_REQUEST,
  ADD_HISTORY_ITEM_SUCCESS,
  ADD_HISTORY_ITEM_FAILURE,
  GET_HISTORY_LIST_REQUEST,
  GET_HISTORY_LIST_SUCCESS,
  GET_HISTORY_LIST_FAILURE
} from '../types/index';


const initialState = {
  roomsData: null, // list roomDatas to show in roomMap
  currentRoom: null, // currentRoom info
  currentMoneyInBox: 0, //current money in cash box
  historyList: [], // list of history in/out show in the right side of Home screen

  error: null
};

const mainReducer = produce((draft = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case GET_ROOMS_DATA_REQUEST:
    case GET_ROOM_INFO_REQUEST:
    case UPDATE_ROOM_INFO_REQUEST:
    case ADD_CHARGED_ITEM_REQUEST:
    case UPDATE_CHARGED_ITEM_REQUEST:
    case GET_CASH_BOX_REQUEST:
    case UPDATE_CASH_BOX_REQUEST:
    case ADD_HISTORY_ITEM_REQUEST:
    case GET_HISTORY_LIST_REQUEST:
      return draft

    // ===================ROOMS_DATA
    case GET_ROOMS_DATA_SUCCESS:
      return { ...draft, roomsData: payload }

    // ===================ROOM_INFO
    case GET_ROOM_INFO_SUCCESS:
      return { ...draft, currentRoom: payload }

    // ===================UPDATE ROOM_INFO
    case UPDATE_ROOM_INFO_SUCCESS:
      return draft;

    // ===================ADD CHARGED_ITEM
    case ADD_CHARGED_ITEM_SUCCESS:
      return draft;

    // ===================ADD CHARGED_ITEM
    case ADD_CHARGED_ITEM_REQUEST:
      return draft;

    // ===================UPDATE CHARGED_ITEM
    case UPDATE_CHARGED_ITEM_SUCCESS:
      return draft;

    // ===================GET CASH BOX
    case GET_CASH_BOX_SUCCESS:
      return { ...draft, currentMoneyInBox: payload };

    // ===================UPDATE CASH BOX
    case UPDATE_CASH_BOX_SUCCESS:
      return { ...draft, currentMoneyInBox: payload };

    // ===================ADD HISTORY ITEM 
    case ADD_HISTORY_ITEM_SUCCESS:
      return draft

    // ===================GET HISTORY LIST 
    case GET_HISTORY_LIST_SUCCESS:
      return { ...draft, historyList: payload };

    case GET_ROOMS_DATA_FAILURE:
    case GET_ROOM_INFO_FAILURE:
    case UPDATE_ROOM_INFO_FAILURE:
    case ADD_CHARGED_ITEM_FAILURE:
    case UPDATE_CHARGED_ITEM_FAILURE:
    case GET_CASH_BOX_FAILURE:
    case UPDATE_CASH_BOX_FAILURE:
    case ADD_HISTORY_ITEM_FAILURE:
    case GET_HISTORY_LIST_FAILURE:
      return { ...draft, error: payload }

    default:
      return draft;
  }
});

export default mainReducer;
