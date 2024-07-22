export interface RequestDTO{
    sortColumnName: string,
    sortDirection: sortDirection,
    currentPage: number,
    pageSize: number,
    searchWord: string,

}
export enum sortDirection{
    desc = 0,
    asc = 1
}