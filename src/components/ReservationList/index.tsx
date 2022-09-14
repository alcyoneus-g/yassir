import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { getReservations } from "../../redux/slices/reservationSlice";
import { ListItem } from "../ListItem";
import { NewDataBanner } from "../NewDataBanner";

interface ReservationListProps { }

export const ReservationList: React.FC<ReservationListProps> = () => {

    const reservations = useAppSelector(getReservations)
    return (
        <>
            <NewDataBanner />
            {
                reservations.map(res => <ListItem key={res} id={res} />)
            }
        </>
    )
}