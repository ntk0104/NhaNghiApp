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
  UPDATE_CASH_BOX_FAILURE
} from '../types/index';

// ==================================================== LOGIN

// ==================================================== ROOMS_DATA

export const getRoomsDataRequest = payload => ({
  type: GET_ROOMS_DATA_REQUEST,
  payload
});

export const getRoomsDataSuccess = payload => ({
  type: GET_ROOMS_DATA_SUCCESS,
  payload
});

export const getRoomsDataFailure = errors => ({
  type: GET_ROOMS_DATA_FAILURE,
  errors
});

// ==================================================== ROOM INFO

export const getRoomInfoRequest = payload => ({
  type: GET_ROOM_INFO_REQUEST,
  payload
});

export const getRoomInfoSuccess = payload => ({
  type: GET_ROOM_INFO_SUCCESS,
  payload
});

export const getRoomInfoFailure = errors => ({
  type: GET_ROOM_INFO_FAILURE,
  errors
});

// ==================================================== UPDATE ROOM INFO

export const updateRoomInfoRequest = payload => ({
  type: UPDATE_ROOM_INFO_REQUEST,
  payload
});

export const updateRoomInfoSuccess = payload => ({
  type: UPDATE_ROOM_INFO_SUCCESS,
  payload
});

export const updateRoomInfoFailure = errors => ({
  type: UPDATE_ROOM_INFO_FAILURE,
  errors
});

// ==================================================== ADD CHARGED ITEM

export const addChargedItemRequest = payload => ({
  type: ADD_CHARGED_ITEM_REQUEST,
  payload
});

export const addChargedItemSuccess = payload => ({
  type: ADD_CHARGED_ITEM_SUCCESS,
  payload
});

export const addChargedItemFailure = errors => ({
  type: ADD_CHARGED_ITEM_FAILURE,
  errors
});

// ==================================================== UPDATE CHARGED ITEM

export const updateChargedItemRequest = payload => ({
  type: UPDATE_CHARGED_ITEM_REQUEST,
  payload
});

export const updateChargedItemSuccess = payload => ({
  type: UPDATE_CHARGED_ITEM_SUCCESS,
  payload
});

export const updateChargedItemFailure = errors => ({
  type: UPDATE_CHARGED_ITEM_FAILURE,
  errors
});

// ==================================================== GET CASH BOX INFO

export const getCashBoxRequest = payload => ({
  type: GET_CASH_BOX_REQUEST,
  payload
});

export const getCashBoxSuccess = payload => ({
  type: GET_CASH_BOX_SUCCESS,
  payload
});

export const getCashBoxFailure = errors => ({
  type: GET_CASH_BOX_FAILURE,
  errors
});

// ==================================================== UPDATE CASH BOX INFO

export const updateCashBoxRequest = payload => ({
  type:  UPDATE_CASH_BOX_REQUEST,
  payload
});

export const udpateCashBoxSuccess = payload => ({
  type:  UPDATE_CASH_BOX_SUCCESS,
  payload
});

export const updateCashBoxFailure = errors => ({
  type:  UPDATE_CASH_BOX_FAILURE,
  errors
});



