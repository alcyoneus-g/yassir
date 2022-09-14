import { Box } from "@mui/material";
import React from "react"
import { FilterWrapper } from "../components/FilterWrapper";
import { ReservationList } from "../components/ReservationList";
import { SortWrapper } from "../components/SortWrapper";
import { useAppDispatch } from "../redux/hooks";
import { reservationUpdated } from "../redux/slices/reservationSlice"
import { useFetReservationsQuery } from "../services/hooks/useFetReservationsQuery"

export interface ReservationProps { }

export const Reservation: React.FC<ReservationProps> = () => {

    const dispatch = useAppDispatch();

    useFetReservationsQuery((list) => {
        if (!!list) {
            dispatch(reservationUpdated(list))
        }
    })
    return (
        <Box sx={{mx: 2}}>
            <FilterWrapper />
            <SortWrapper />
            <ReservationList />
        </Box>
    )
}