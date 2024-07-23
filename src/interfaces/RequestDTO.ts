import { Filter } from './Filter';

export interface RequestDTO{
    sortColumnName: string,
    sortDirection: sortDirection,
    currentPage: number,
    pageSize: number,
    filters:Filter[]

}
export enum sortDirection{
    desc = 0,
    asc = 1
}