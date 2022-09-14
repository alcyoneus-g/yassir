import { Paper, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectHasNewItems, showNewItems } from "../../redux/slices/reservationSlice";

interface NewDataBannerProps {
}

export const NewDataBanner: React.FC<NewDataBannerProps> = () => {

    const hasNewItems = useAppSelector(selectHasNewItems)
    const dispatch = useAppDispatch();
    const handleClick = () => {
        dispatch(showNewItems())
    }

    return (
        <Paper sx={{
            m: 2,
            p: 2,
            cursor: 'pointer',
            backgroundColor: '#f00',
            display: hasNewItems ? 'block' : 'none'
        }}
            elevation={3}
            onClick={handleClick}
        >
            <Typography
                sx={{ fontWeight: 'bold' }}
                variant="body1"
                color="#fff">
                New Data is available, tap to see them...
            </Typography>
        </Paper >
    )
}