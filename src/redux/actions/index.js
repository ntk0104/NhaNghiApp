import {
  GET_ROOMS_DATA_REQUEST,
  GET_ROOMS_DATA_SUCCESS,
  GET_ROOMS_DATA_FAILURE
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


