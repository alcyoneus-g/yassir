import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IReservation } from "../../services/serviceTypes";
import { updateFilterUtil, updateSortUtil } from "../../utils/sliceUtils";
import { RootState } from "../store";
import { AvailableFilters, AvailableFilterValues, DropdownFilterUpdatePayload, ISort } from "./storeTypes";

export interface IReservationState {
  ids: number[];
  visibleIds: number[];
  items: { [prop: number]: IReservation };
  shifts: string[];
  areas: string[];
  statuses: string[];
  filters: {
    shift: string,
    area: string,
    status: string,
  },
  sort?: ISort,
  date: string,
  textQuery: string,
  hasNewItems: boolean,
  isInitialized: boolean,
}

const initialState: IReservationState = {
  ids: [],
  visibleIds: [],
  items: {},
  shifts: [],
  areas: [],
  statuses: [],
  filters: {
    shift: '',
    area: '',
    status: '',
  },
  sort: undefined,
  date: '',
  textQuery: '',
  hasNewItems: false,
  isInitialized: false,
};

export const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    reservationUpdated(state, action: PayloadAction<IReservation[]>) {

      const tempIds: number[] = [];
      const tempItems: { [prop: number]: IReservation } = {};
      const tempShifts = new Set<string>(state.shifts);
      const tempAreas = new Set<string>(state.areas);
      const tempStatuses = new Set<string>(state.statuses);

      let newItems: IReservation[] = []
      if (state.ids.length > 0) {

        const index = action.payload.findIndex(item => state.ids.includes(item.id))
        if (index > 0) {
          newItems = action.payload.slice(0, index)
        } else {
          newItems = []
        }
      } else {
        newItems = action.payload
      }

      for (const item of newItems) {
        tempIds.push(item.id)
        tempShifts.add(item.shift)
        tempAreas.add(item.area)
        tempStatuses.add(item.status)
        tempItems[item.id] = item
      }

      state.ids.splice(0, 0, ...tempIds)
      state.items = { ...tempItems, ...state.items }
      state.areas = Array.from(tempAreas).sort((a, b) => a > b ? 1 : -1)
      state.statuses = Array.from(tempStatuses).sort((a, b) => a > b ? 1 : -1)
      state.shifts = Array.from(tempShifts).sort((a, b) => a > b ? 1 : -1)
      if (!state.isInitialized) {
        state.visibleIds = tempIds
        state.isInitialized = true
      } else if (newItems.length > 0) {
        state.hasNewItems = true
      }
    },
    textQueryUpdate(state, action: PayloadAction<string>) {
      state.textQuery = action.payload
      state.hasNewItems = false
      updateFilterUtil(state)
    },
    dateFilterUpdated(state, action: PayloadAction<string>) {
      state.date = action.payload
      state.hasNewItems = false
      updateFilterUtil(state)
    },
    dropdownFilterUpdated(state, action: PayloadAction<DropdownFilterUpdatePayload>) {
      state.filters[action.payload.key] = action.payload.value
      state.hasNewItems = false
      updateFilterUtil(state)
    },
    showNewItems(state) {
      state.hasNewItems = false
      updateFilterUtil(state)
    },
    orderChanged(state, action: PayloadAction<ISort | undefined>) {
      state.sort = action.payload
      updateSortUtil(state, action.payload)
    }
  }
})

export const {
  reservationUpdated,
  textQueryUpdate,
  dateFilterUpdated,
  dropdownFilterUpdated,
  showNewItems,
  orderChanged
} = reservationSlice.actions

export default reservationSlice.reducer

export const getReservations = (state: RootState) =>
  state.reservations.visibleIds

export const selectReservationById = (state: RootState, reservationId: number) =>
  state.reservations.items[reservationId]

export const selectFilterOptions = (state: RootState, filterType: AvailableFilters) =>
  state.reservations[filterType]

export const selectFilterValue = (state: RootState, filterValue: AvailableFilterValues) =>
  state.reservations.filters[filterValue]

export const selectFilterDate = (state: RootState) =>
  state.reservations.date

export const selectHasNewItems = (state: RootState) =>
  state.reservations.hasNewItems

export const selectCurrentSort = (state: RootState) =>
  state.reservations.sort