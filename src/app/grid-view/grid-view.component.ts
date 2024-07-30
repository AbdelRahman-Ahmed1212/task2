import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { Options } from '../../interfaces/Options';
import { PaginatorComponent } from './paginator/paginator.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ControlsComponent } from './Controls/controls/controls.component';
import { GridService } from '../Services/grid.service';
import {serverSort,AlphapiticalSort,NumiricSort}from '../utils'
import { RequestDTO, sortDirection } from '../../interfaces/RequestDTO';
import { ResponseDTO } from '../../interfaces/ResponseDto';
import { Filter } from '../../interfaces/Filter';
@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [HeaderComponent,BodyComponent,PaginatorComponent,CommonModule,FormsModule,TranslateModule,ControlsComponent],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.scss'
})
export class GridViewComponent implements OnInit   {
 
  @Input() options:Options|any;
  @Input () data:any;
  @Input() mode! : 'client' | 'server'
  @Input() url = ''
  @Input() filters!:Filter[]
  @Output() UserActionEmitter = new EventEmitter()
  uniqueField!:string
  requestDto!:RequestDTO
  page:{}[] = []
  pageNumber = 0;
  pageSize!:number; 
  NofPages:number = 0
  itemsCount:number = 0 
  selectedObjects:any
  sorted!:{colName:string ; direction:sortDirection}
  SelectedCount: number = 0;
  Loading = true;
  @Input() SearchObj:any = {}
  AllSelected!:boolean
  constructor(private translate:TranslateService,private gridService:GridService){
    this.selectedObjects = {}
  }

  Sort(obj:{mode:string,colName:string}){
      if(this.mode == 'server'){
        serverSort(this,obj.colName,this.sorted,this.page,
          this.DisplayPage,this.gridService,
          this.options,this.pageNumber,this.url,this.NofPages)
      }
      else if(obj.mode == 'alpha'){
        AlphapiticalSort(this,obj.colName,this.sorted,this.data,this.DisplayPage)
      }else{
        NumiricSort(this,obj.colName,this.sorted,this.data,this.DisplayPage)

      }

  }

  ngOnChanges(changes: SimpleChanges){
      if(this.sorted != undefined){
        this.DisplayPage(1)
      }
  }  

  Search(){

     this.DisplayPage(0)

  }
  /// looking for a better way to achieve this because it has bad berformance
  AllPageSelected(){
    
    let selectedObjectsCount = Object.values(this.selectedObjects).length;
    
    if(selectedObjectsCount == 0) return false
   return this.page.every((obj:any)=>{
        return this.selectedObjects[ obj[this.uniqueField]] != undefined 
    })
     
  }
DisplayPage(pg:number){
  if(this.options.pagination.paging){
    this.pageNumber = pg;
    const startIndex = pg * this.pageSize;
    if(this.mode == 'client'){
      const EndIndex = startIndex + this.pageSize
      this.page = this.data.slice(startIndex,EndIndex)
      this.NofPages = Math.ceil(this.data.length / this.pageSize)
      return

    }else{
      const requestObj:RequestDTO = {
        currentPage :pg,
        pageSize:this.options.pagination.pageSize,
        sortColumnName:this.sorted.colName,
        sortDirection:this.sorted.direction,
        searchObj:JSON.stringify(this.SearchObj)
    }
      this.gridService.GetObjects(requestObj,this.url).subscribe(
        (res:ResponseDTO)=>{
          this.page = res.data
          this.pageNumber = res.page
          this.NofPages = res.totalNumberOfPages
          this.itemsCount = res.itemsCount
          this.AllSelected = this.AllPageSelected()

        }
      )
    }

    return;
  }

  this.page = this.data
  // this.AllSelected = this.AllPageSelected()

}

ngOnInit(): void {
  this.sorted = {
    colName:this.options.DefaultSortedColumn.colName,
    direction:sortDirection.asc
  }
  //initializing the search object
  this.options.headers.forEach(
    (obj:any)=>{
          this.SearchObj[obj.name] = ''    
    }
  )

  ///
  this.uniqueField = this.options.uniqueField
  this.translate.addLangs(this.options.Translation.languages)
  this.translate.use(this.options.Translation.language) 
  this.pageSize = this.options.pagination.pageSize;
  // if(this.options.selection){
  //   this.data = this.data.map((element:any)=> Object.assign({selected:false},element))

  // }

    this.DisplayPage(this.pageNumber)
    const SortedColumn =this.options.DefaultSortedColumn 
    
    if(SortedColumn){
        if(SortedColumn.direction == 'asc'){
          this.sorted.direction = sortDirection.asc;
          this.sorted.colName =SortedColumn.colName
        }
        if(this.mode == 'client'){
          SortedColumn.dataType == 'number'?NumiricSort(this,SortedColumn.colName,this.sorted,this.data,this.DisplayPage) 
          : AlphapiticalSort(this,SortedColumn.colName,this.sorted,this.data,this.DisplayPage)
        }
  

    }
}

commitDelete(rowNumber:number){
  this.data = this.data.filter(
         (item:any)=>item.id != rowNumber 
        )
        this.DisplayPage(this.pageNumber)
        this.NofPages = Math.ceil(this.data.length / this.pageSize)


}
/// helper function to convert property name from type unknow to string to index the object
getString(input:any)
{
  return String(input);
}
SelectAll(data:boolean){
       if(data){
         this.page.forEach((element:any) => {
              if(this.selectedObjects!= undefined)
              this.selectedObjects[element[this.uniqueField]] = {row:this.page.find((item:any)=>item[this.uniqueField] == element[this.uniqueField]) , pageNumber:this.pageNumber}
          
         });
         this.AllSelected = true
       }else{
         this.AllSelected = false
         this.page.forEach(
           (element:any)=>{
             if(this.selectedObjects != undefined && this.selectedObjects[element[this.uniqueField]].pageNumber == this.pageNumber
            ){
               delete this.selectedObjects[element[this.uniqueField]]
             }
           }
         )
       }


}
/*
 please note that this selection algorithm can select all data not yet retreived from server 
 not only the current page and this works very fine similar to frontend approach
*/
ItemSelected(obj:{uniqueFieldValue:number|string,checked:boolean}){


      if(obj.checked && this.selectedObjects != undefined){
        this.selectedObjects[obj.uniqueFieldValue] = {row:this.page.find((item:any)=>item[this.uniqueField] == obj.uniqueFieldValue) , pageNumber:this.pageNumber}
      }else{
        if(this.selectedObjects != undefined)
        delete this.selectedObjects[obj.uniqueFieldValue]

      }
      
      this.AllSelected = this.AllPageSelected()  
}

commitAction(data:any){
}
EmitActionToUser(name:string){
  this.UserActionEmitter.emit({name:name,selected:this.selectedObjects})
}


}
