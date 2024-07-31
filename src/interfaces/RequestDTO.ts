import { Filter } from './Filter';

export interface RequestDTO{
    sortBy: string,
    sortDirection: 'desc' | 'asc',
    pageIndex: number,
    pageSize: number,
    search:any

}