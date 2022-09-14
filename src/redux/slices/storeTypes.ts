export type AvailableFilters = 'shifts' | 'areas' | 'statuses'
export type AvailableFilterValues = 'shift' | 'area' | 'status'
export type DropdownFilterUpdatePayload = {
    key: AvailableFilterValues,
    value: string
}
export type SortFields = 'customer' | 'quantity'
export type ISort = {
    field: SortFields,
    order: 'asc' | 'desc'
}