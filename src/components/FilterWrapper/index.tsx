import { Card, colors } from "@mui/material";
import React from "react";
import { DateFilter } from "../DateFilterItem";
import { FilterItem } from "../DropdownFilterItem";
import { TextTypeFilterItem } from "../TextTypeFilterItem";

interface FilterWrapperProps {}

export const FilterWrapper: React.FC<FilterWrapperProps> = () => {

    return (
        <Card sx={{px: 2, my: 2, backgroundColor: colors.grey[200]}}>
            <FilterItem label="Status" valueHolderKey="status" type="statuses"/>
            <FilterItem label="Shifts" valueHolderKey="shift" type="shifts"/>
            <FilterItem label="Areas" valueHolderKey="area" type="areas"/>
            <DateFilter/>
            <TextTypeFilterItem/>
        </Card>
    )
}