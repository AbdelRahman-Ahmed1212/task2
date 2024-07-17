import { Action } from './Action';

export interface Options{
    search:boolean    // turn search on or off
    hiddenColumns:number[] // column indexes we need to hide
    data:{}  // data to be displayed
    pagination:boolean // turn pagination on or off
    selection:boolean // turn selection on or of
    DefaultSortedColumn:{colName:string ,direction:string} // column name to be ascending or descending sorted
    headers:{name:string,sortable:boolean} [] // set the names for our columns and set also if a column is sortable or not
    StartPage:number, // page to start from 
    PageSize:number
    translation:boolean,
    Actions:Action[],
    languages:string[]
    language:string


}