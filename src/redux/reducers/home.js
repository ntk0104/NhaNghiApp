import produce from 'immer';
import {
  GET_ROOMS_DATA_REQUEST,
  GET_ROOMS_DATA_SUCCESS,
  GET_ROOMS_DATA_FAILURE,
} from '../types/index';


const initialState = {
  roomsData: null, // list roomDatas to show in roomMap

  errorRoomsData: null,
};

const mainReducer = produce((draft = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case GET_ROOMS_DATA_REQUEST:
      return draft

    // ===================ROOMS_DATA
    case GET_ROOMS_DATA_SUCCESS:
      return {...draft, roomsData: payload}

    case GET_ROOMS_DATA_FAILURE:
      return {...draft, errorRoomsData: payload}

    default:
      return draft;
  }
});

export default mainReducer;
