import axios from "axios"
import { useQuery } from "react-query"
import { IReservation, IReservationsResponse } from "../serviceTypes"

export const fetchReservations = () => {
    return axios.get<IReservationsResponse>('/reservations')
}

export const useFetReservationsQuery = (
    onSuccess?: (data?: IReservation[]) => void,
    onError?: (err: unknown) => void
) => {
    return useQuery('fetch-reservations', fetchReservations, {
        // cacheTime: 3 * 60 * 1000,
        // staleTime: 30 * 1000,
        // refetchOnMount: 'always',
        // refetchOnWindowFocus: false
        refetchInterval: 30 * 1000,
        refetchIntervalInBackground: false,
        select: (data) => data.data.reservations,
        onSuccess,
        onError
    })
}