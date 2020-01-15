import {
  GET_ROOMS_DATA_REQUEST,
  GET_ROOMS_DATA_SUCCESS,
  GET_ROOMS_DATA_FAILURE,
  GET_ROOM_INFO_REQUEST,
  GET_ROOM_INFO_SUCCESS,
  GET_ROOM_INFO_FAILURE,
  UPDATE_ROOM_INFO_REQUEST,
  UPDATE_ROOM_INFO_SUCCESS,
  UPDATE_ROOM_INFO_FAILURE
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


