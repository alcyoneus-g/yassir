import axios from "axios"
import { IReservationsResponse } from "./serviceTypes"

export const fetchReservations = () => {
    return axios.get<IReservationsResponse>('/reservations')
}