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
  UPDATE_CHARGED_ITEM_FAILURE
} from '../types/index';


const initialState = {
  roomsData: null, // list roomDatas to show in roomMap
  currentRoom: null, // currentRoom info

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

    case GET_ROOMS_DATA_FAILURE:
    case GET_ROOM_INFO_FAILURE:
    case UPDATE_ROOM_INFO_FAILURE:
    case ADD_CHARGED_ITEM_FAILURE:
    case UPDATE_CHARGED_ITEM_FAILURE:
      return { ...draft, error: payload }

    default:
      return draft;
  }
});

export default mainReducer;
