export interface Options{
    search:boolean    // turn search on or off
    hiddenColumns:number[] // column indexes we need to hide
    data:{}  // data to be displayed
    pagination:boolean // turn pagination on or off
    selection:boolean // turn selection on or of
    headers:{name:string,sortable:boolean} [] // set the names for our columns and set also if a column is sortable or not


}