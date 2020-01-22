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
  GET_HISTORY_LIST_FAILURE,
  GET_STATISTIC_OF_DAY_REQUEST,
  GET_STATISTIC_OF_DAY_SUCCESS,
  GET_STATISTIC_OF_DAY_FAILURE,
  UPDATE_HISTORY_ROOM_REQUEST,
  UPDATE_HISTORY_ROOM_SUCCESS,
  UPDATE_HISTORY_ROOM_FAILURE,
  GET_HISTORY_WITHDRAW_DEPOSIT_REQUEST,
  GET_HISTORY_WITHDRAW_DEPOSIT_SUCCESS,
  GET_HISTORY_WITHDRAW_DEPOSIT_FAILURE
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
  type: UPDATE_CASH_BOX_REQUEST,
  payload
});

export const udpateCashBoxSuccess = payload => ({
  type: UPDATE_CASH_BOX_SUCCESS,
  payload
});

export const updateCashBoxFailure = errors => ({
  type: UPDATE_CASH_BOX_FAILURE,
  errors
});

// ==================================================== UPDATE CASH BOX INFO

export const addHistoryItemRequest = payload => ({
  type: ADD_HISTORY_ITEM_REQUEST,
  payload
});

export const addHistoryItemSuccess = payload => ({
  type: ADD_HISTORY_ITEM_SUCCESS,
  payload
});

export const addHistoryItemFailure = errors => ({
  type: ADD_HISTORY_ITEM_FAILURE,
  errors
});

// ==================================================== UPDATE CASH BOX INFO

export const getHistoryListRequest = payload => ({
  type: GET_HISTORY_LIST_REQUEST,
  payload
});

export const getHistoryListSuccess = payload => ({
  type: GET_HISTORY_LIST_SUCCESS,
  payload
});

export const getHistoryListFailure = errors => ({
  type: GET_HISTORY_LIST_FAILURE,
  errors
});


// ==================================================== GET STATISTIC OF DAY

export const getStatisticOfDayRequest = payload => ({
  type: GET_STATISTIC_OF_DAY_REQUEST,
  payload
});

export const getStatisticOfDaySuccess = payload => ({
  type: GET_STATISTIC_OF_DAY_SUCCESS,
  payload
});

export const getStatisticOfDayFailure = errors => ({
  type: GET_STATISTIC_OF_DAY_FAILURE,
  errors
});

// ==================================================== UPDATE HISTORY ROOM 

export const updateHistoryRoomRequest = payload => ({
  type: UPDATE_HISTORY_ROOM_REQUEST,
  payload
});

export const updateHistoryRoomSuccess = payload => ({
  type: UPDATE_HISTORY_ROOM_SUCCESS,
  payload
});

export const updateHistoryRoomFailure = errors => ({
  type: UPDATE_HISTORY_ROOM_FAILURE,
  errors
});

// ==================================================== GET HISTORY WITHDRAW & DEPOSIT

export const getHistoryWithdrawDepositRequest = payload => ({
  type: GET_HISTORY_WITHDRAW_DEPOSIT_REQUEST,
  payload
});

export const getHistoryWithdrawDepositSuccess = payload => ({
  type: GET_HISTORY_WITHDRAW_DEPOSIT_SUCCESS,
  payload
});

export const getHistoryWithdrawDepositFailure = errors => ({
  type: GET_HISTORY_WITHDRAW_DEPOSIT_FAILURE,
  errors
});

