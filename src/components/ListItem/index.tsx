import { Box, Card, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectReservationById } from "../../redux/slices/reservationSlice";

interface ListItemProps {
    id: number
}

export const ListItem: React.FC<ListItemProps> = ({ id }) => {

    const item = useAppSelector(state => selectReservationById(state, id))
    return (
        <Card sx={{ m: 1, p: 2 }} variant="outlined">
            <Box>
                <Typography sx={{fontWeight: 'bold'}} component='span' variant="body1" color="text.primary">Identifier:</Typography>
                <Typography sx={{ml: 1}} component='span' variant="body2" color="text.secondary">{item.id}</Typography>
            </Box>
            <Box>
                <Typography sx={{fontWeight: 'bold'}} component='span' variant="body1" color="text.primary">Status:</Typography>
                <Typography sx={{ml: 1}} component='span' variant="body2" color="text.secondary">{item.status}</Typography>
            </Box>
            <Box>
                <Typography sx={{fontWeight: 'bold'}} component='span' variant="body1" color="text.primary">Shift:</Typography>
                <Typography sx={{ml: 1}} component='span' variant="body2" color="text.secondary">{item.shift}</Typography>
            </Box>
            <Box>
                <Typography sx={{fontWeight: 'bold'}} component='span' variant="body1" color="text.primary">Area:</Typography>
                <Typography sx={{ml: 1}} component='span' variant="body2" color="text.secondary">{item.area}</Typography>
            </Box>
            <Box>
                <Typography sx={{fontWeight: 'bold'}} component='span' variant="body1" color="text.primary">Guest Name:</Typography>
                <Typography sx={{ml: 1}} component='span' variant="body2" color="text.secondary">{`${item.customer.lastName} ${item.customer.firstName}`}</Typography>
            </Box>
            <Box>
                <Typography sx={{fontWeight: 'bold'}} component='span' variant="body1" color="text.primary">Guest Number:</Typography>
                <Typography sx={{ml: 1}} component='span' variant="body2" color="text.secondary">{item.quantity}</Typography>
            </Box>
            <Box>
                <Typography sx={{fontWeight: 'bold'}} component='span' variant="body1" color="text.primary">Start Date:</Typography>
                <Typography sx={{ml: 1}} component='span' variant="body2" color="text.secondary">{dayjs(item.start).format('YYYY-MM-DD')}</Typography>
            </Box>
            <Box>
                <Typography sx={{fontWeight: 'bold'}} component='span' variant="body1" color="text.primary">End Date:</Typography>
                <Typography sx={{ml: 1}} component='span' variant="body2" color="text.secondary">{dayjs(item.end).format('YYYY-MM-DD')}</Typography>
            </Box>
            <Box>
                <Typography sx={{fontWeight: 'bold'}} component='span' variant="body1" color="text.primary">Guest Notes:</Typography>
                <Typography sx={{ml: 1}} component='span' variant="body2" color="text.secondary">{item.guestNotes || '------'}</Typography>
            </Box>
        </Card>
    )
}