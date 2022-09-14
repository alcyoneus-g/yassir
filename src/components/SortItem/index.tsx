import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { orderChanged, selectCurrentSort } from "../../redux/slices/reservationSlice";
import { SortFields } from "../../redux/slices/storeTypes";

interface SortItemProps {
    type: SortFields;
    label: string;
}

export const SortItem: React.FC<SortItemProps> = ({ type, label }) => {

    const icons = {
        asc: <ArrowUpward />,
        desc: <ArrowDownward />
    }
    const currentSort = useAppSelector(selectCurrentSort)
    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (!currentSort || currentSort.field !== type) {
            dispatch(orderChanged({ field: type, order: "asc" }))
        } else if (currentSort.order === "asc") {
            dispatch(orderChanged({ field: type, order: "desc" }))
        } else if (currentSort.order === "desc") {
            dispatch(orderChanged(undefined))
        }
    }

    return (
        <Button
            sx={{ m: 1 }}
            variant={currentSort?.field === type ? "contained" : "outlined"}
            endIcon={currentSort?.field === type && icons[currentSort.order]}
            onClick={handleClick}
        >
            {label}
        </Button>
    )
}