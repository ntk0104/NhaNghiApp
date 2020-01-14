import { createSelector } from 'reselect'

export const select = state => state.home

export const makeGetRoomsData = () => createSelector(select, state => state.roomsData)