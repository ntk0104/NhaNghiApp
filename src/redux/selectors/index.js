import { createSelector } from 'reselect'

export const select = state => state.home

export const makeGetRoomsData = () => createSelector(select, state => state.roomsData)
export const makeGetRoomInfo = () => createSelector(select, state => state.currentRoom)
export const makeGetCurrentMoneyInBox = () => createSelector(select, state => state.currentMoneyInBox)