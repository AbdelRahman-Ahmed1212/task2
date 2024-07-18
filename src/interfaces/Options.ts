import { Action } from './Action';

export interface Options{
    search:boolean    // turn search on or off
    hiddenColumns:number[] // column indexes we need to hide
    pagination:{
        paging:boolean,
        pageSize:number,
        startPage:number,
    } // turn pagination on or off
    selection:boolean // turn selection on or of
    DefaultSortedColumn:{colName:string ,direction:string,dataType:string} // column name to be ascending or descending sorted
    headers:{name:string,sortable:boolean,dataType:string} [] // set the names for our columns and set also if a column is sortable or not
    Actions:Action[],
    searchableColumns:{name:string,periority:number}[],
    Translation:{
        translation:boolean,
        languages:string[]
        language:string,
        TranslationPath:string
    }


}