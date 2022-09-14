import { rest } from 'msw'
import { IReservation } from '../services/serviceTypes'
import data from './data'
let calls = 0
const addedItems: IReservation[] = []

export const handlers = [
    rest.get('/reservations', (req, res, ctx) => {
        console.log('total calls', calls);
        calls += 1;
        if (calls % 10 === 0 && calls > 1) {
            const newReservation: IReservation = {
                id: 100 + calls,
                businessDate: "06.08.2018",
                status: "CHECKED OUT",
                shift: "BREAKFAST",
                start: "2018-08-06T08:00:00Z",
                end: "2018-08-06T09:00:00Z",
                quantity: 1,
                customer: {
                    firstName: "Yuri",
                    lastName: "Burchell"
                },
                area: "BAR",
                guestNotes: "Likes the blue cheese burguer"
            }
            addedItems.splice(0, 0, newReservation)
        }
        const dataToSend = {
            reservations: [...addedItems, ...data.reservations]
        }
        return res(
            ctx.status(200),
            ctx.json(dataToSend),
        )
    }),
]