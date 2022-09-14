import { IReservationState } from "../redux/slices/reservationSlice";
import { AvailableFilterValues, ISort } from "../redux/slices/storeTypes";
import { WritableDraft } from "immer/dist/internal";
import dayjs from "dayjs";

export const updateFilterUtil = (state: WritableDraft<IReservationState>) => {
    const populatedFilters = (Object.keys(state.filters) as AvailableFilterValues[]).filter(key => state.filters[key])
    const filteredIds: number[] = []
    for (const itemKey of state.ids) {
        let shouldAdd = true;
        for (const key of populatedFilters) {
            if (state.items[itemKey][key] !== state.filters[key]) {
                shouldAdd = false;
                break;
            }
        }
        if (state.date && !dayjs(state.items[itemKey].start).isSame(dayjs(state.date), 'date')) {
            continue
        }
        if (state.textQuery) {
            if (`${state.items[itemKey].customer.lastName} ${state.items[itemKey].customer.firstName}`.indexOf(state.textQuery) < 0) {
                continue
            }
        }
        if (shouldAdd) {
            filteredIds.push(itemKey)
        }
    }
    state.visibleIds = filteredIds
}

export const updateSortUtil = (state: WritableDraft<IReservationState>, payload: ISort | undefined) => {
    if (payload) {
        state.visibleIds = state.visibleIds.sort((a, b) => {
            if (payload?.order === "asc") {
                return state.items[a][payload.field] > state.items[b][payload.field] ? 1 : -1
            } else {
                return state.items[a][payload!.field] > state.items[b][payload!.field] ? -1 : 1
            }
        })
    }
}