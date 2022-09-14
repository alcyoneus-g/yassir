import { TextField } from "@mui/material";
import React, { useRef } from "react";
import _ from "lodash";
import { textQueryUpdate } from "../../redux/slices/reservationSlice";
import { useAppDispatch } from "../../redux/hooks";
interface TextTypeFilterItemProps {
}

export const TextTypeFilterItem: React.FC<TextTypeFilterItemProps> = () => {

    const dispatch = useAppDispatch();
    const debounceRef = useRef({ latest: undefined })
    const handleChange = (event: any) => {
        const val = event.target.value
        if (!!debounceRef.current.latest) {
            //@ts-ignore
            debounceRef.current.latest.cancel()
        }
        const querySearch = _.debounce(() => {
            dispatch(textQueryUpdate(val))
        }, 1000)
        //@ts-ignore
        debounceRef.current.latest = querySearch
        querySearch()
    }
    return (
        <TextField
            sx={{ my: 2 }}
            onChange={handleChange}
            fullWidth
            label="Type to filter by guest"
            variant="outlined"
        />
    )
}