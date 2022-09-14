import { Card, colors, Typography } from "@mui/material";
import React from "react";
import { SortItem } from "../SortItem";

interface SortWrapperProps { }

export const SortWrapper: React.FC<SortWrapperProps> = () => {

    return (
        <Card sx={{ py: 3, mb: 2, backgroundColor: colors.grey[200] }}>
            <Typography
                sx={{ fontWeight: 'bold', m: 3 }}
                component='span'
                variant="body1"
                color="text.primary"
            >
                SortBy
            </Typography>
            <SortItem label="Guest" type="customer" />
            <SortItem label="Quantity" type="quantity" />
        </Card>
    )
}