import React from "react";
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { dateFilterUpdated, selectFilterDate } from "../../redux/slices/reservationSlice";

interface FilterItemProps {
}

export const DateFilter: React.FC<FilterItemProps> = () => {

    const currentValue = useAppSelector(state => selectFilterDate(state))
    const dispatch = useAppDispatch();

    const handleChange = (newValue: any) => {
        dispatch(dateFilterUpdated(newValue?.toISOString() ?? ''))
    }

    return (
        <DatePicker
            label="Desired Date"
            value={currentValue}
            onChange={handleChange}
            renderInput={({error, ...rest}: any) => <TextField error={false} sx={{mt: 2}} fullWidth {...rest} />}
        />
    )
}