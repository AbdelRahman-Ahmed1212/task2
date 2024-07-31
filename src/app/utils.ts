import { RequestDTO } from '../interfaces/RequestDTO';
import { GridService } from './Services/grid.service';
import { Options } from '../interfaces/Options';

export function   NumiricSort(thisArg:any,colName:string , sorted:{colName:string ; direction:string},data:any , DisplayCallback:(pageNumber:number)=>void){
    if(sorted.colName != colName || 
      (sorted.colName == colName && sorted.direction == 'desc')){
      data.sort(
        (a:any,b:any)=>b[colName] - a[colName]
      )
      sorted.colName = colName
      sorted.direction = 'asc'
      DisplayCallback.call(thisArg,0)
      return;
    }
     data.sort(
       
        (a:any,b:any)=>a[colName] - b[colName]
      ) 
      sorted.direction = 'desc'
      DisplayCallback.call(thisArg,0)


}
/*



*/
export function   AlphapiticalSort(thisArg:any,colName:string,sorted:{colName:string ; direction:string},data:any,DisplayCallback:(pageNumber:number)=>void){
    if(sorted.colName != colName || 
      (sorted.colName == colName && sorted.direction == 'desc')){
      data.sort(
        (a:any,b:any)=>b[colName].localeCompare(a[colName])
      )
      sorted.colName = colName
      sorted.direction = 'asc'
      DisplayCallback.call(thisArg,0)
      return;
    }
 
     data.sort(
       
        (a:any,b:any)=>a[colName].localeCompare(b[colName])
      ) 
      sorted.direction = 'desc'
      DisplayCallback.call(thisArg,0)
    }

  /*
  
  
  */
  export function serverSort(thisArg:any,colName:string,sorted:{colName:string ; direction:string},
    page:any,DisplayCallback:(pageNumber:number)=>void ,service:GridService,options:Options,
    pageNumber:number,url:string,NofPages:number){
        // check whick direction we will sort the to be sorted column
        if((colName == sorted.colName && sorted.direction == 'desc') || colName!=sorted.colName){
            sorted.direction = 'asc'
            sorted.colName = colName
        }else{
            sorted.direction = 'desc'

        }
 
        DisplayCallback.call(thisArg,0)

    }

  