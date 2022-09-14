export interface IReservationsResponse {
    reservations: IReservation[]
}

export interface IReservation {
    id: number,
    businessDate: string,
    status: string,
    shift: string,
    start: string,
    end: string,
    quantity: number,
    customer: {
        firstName: string,
        lastName: string
    },
    area: string,
    guestNotes: string
}