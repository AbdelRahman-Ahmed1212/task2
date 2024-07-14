export interface Options{
    sortables:number[] // column indexes we need to apply sort
    search:boolean    // turn search on or off
    hiddenColumns:number[] // column indexes we need to hide
    data:{}  // data to be displayed
    pagination:boolean // turn pagination on or off
    selection:boolean // turn selection on or of
    headers:string[]


}