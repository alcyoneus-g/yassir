import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { dropdownFilterUpdated, selectFilterOptions, selectFilterValue } from "../../redux/slices/reservationSlice";
import { AvailableFilters, AvailableFilterValues } from "../../redux/slices/storeTypes";

interface FilterItemProps {
    type: AvailableFilters;
    valueHolderKey: AvailableFilterValues;
    label: string;
}

export const FilterItem: React.FC<FilterItemProps> = ({ type, valueHolderKey, label }) => {

    const filterOptions = useAppSelector(state => selectFilterOptions(state, type))
    const currentValue = useAppSelector(state => selectFilterValue(state, valueHolderKey))
    const dispatch = useAppDispatch();

    const handleChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
        dispatch(dropdownFilterUpdated({ key: valueHolderKey, value: event.target.value }))
    }

    return (
        <FormControl fullWidth sx={{mt: 2}}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                value={currentValue}
                label="Age"
                onChange={handleChange}
            >
                <MenuItem value={""}>None</MenuItem>
                {filterOptions.map(el => <MenuItem key={el} value={el}>{el}</MenuItem>)}</Select>
        </FormControl>
    )
}