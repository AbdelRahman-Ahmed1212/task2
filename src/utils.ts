import { sortDirection,RequestDTO } from './interfaces/RequestDTO';
import { GridService } from './app/Services/grid.service';
import { Options } from './interfaces/Options';
import { ResponseDTO } from './interfaces/ResponseDto';

export function   NumiricSort(thisArg:any,colName:string , sorted:{colName:string ; direction:sortDirection},data:any , DisplayCallback:(pageNumber:number)=>void){
    if(sorted.colName != colName || 
      (sorted.colName == colName && sorted.direction == sortDirection.desc)){
      data.sort(
        (a:any,b:any)=>b[colName] - a[colName]
      )
      sorted.colName = colName
      sorted.direction = sortDirection.asc
      DisplayCallback.call(thisArg,0)
      return;
    }
     data.sort(
       
        (a:any,b:any)=>a[colName] - b[colName]
      ) 
      sorted.direction = sortDirection.desc
      DisplayCallback.call(thisArg,0)


}
/*



*/
export function   AlphapiticalSort(thisArg:any,colName:string,sorted:{colName:string ; direction:sortDirection},data:any,DisplayCallback:(pageNumber:number)=>void){
    if(sorted.colName != colName || 
      (sorted.colName == colName && sorted.direction == sortDirection.desc)){
      data.sort(
        (a:any,b:any)=>b[colName].localeCompare(a[colName])
      )
      sorted.colName = colName
      sorted.direction = sortDirection.asc
      DisplayCallback.call(thisArg,0)
      return;
    }
 
     data.sort(
       
        (a:any,b:any)=>a[colName].localeCompare(b[colName])
      ) 
      sorted.direction = sortDirection.desc
      DisplayCallback.call(thisArg,0)
    }

  /*
  
  
  */
  export function serverSort(thisArg:any,colName:string,sorted:{colName:string ; direction:sortDirection},
    page:any,DisplayCallback:(pageNumber:number)=>void ,service:GridService,options:Options,
    pageNumber:number,url:string,NofPages:number){
        // check whick direction we will sort the to be sorted column
        if((colName == sorted.colName && sorted.direction == sortDirection.desc) || colName!=sorted.colName){
            sorted.direction = sortDirection.asc
            sorted.colName = colName
        }else{
            sorted.direction = sortDirection.desc

        }
 
        DisplayCallback.call(thisArg,0)

    }

  