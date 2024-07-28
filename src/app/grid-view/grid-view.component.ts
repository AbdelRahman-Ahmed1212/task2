import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { Options } from '../../interfaces/Options';
import { PaginatorComponent } from './paginator/paginator.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ControlsComponent } from './Controls/controls/controls.component';
import { GridService } from '../Services/grid.service';
import {serverSort,AlphapiticalSort,NumiricSort}from '../../utils'
import { RequestDTO, sortDirection } from '../../interfaces/RequestDTO';
import { ResponseDTO } from '../../interfaces/ResponseDto';
import { Filter } from '../../interfaces/Filter';
import { ValidateSearch } from '../directives/validate-search.directive';
import { json } from 'stream/consumers';
@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [HeaderComponent,BodyComponent,PaginatorComponent,CommonModule,FormsModule,TranslateModule,ControlsComponent,ValidateSearch],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.css'
})
export class GridViewComponent implements OnInit   {
 
  @Input() options:Options|any;
  @Input () data:any;
  @Input() mode! : 'client' | 'server'
  @Input() url = ''
  @Input() filters!:Filter[]
  uniqueField!:string
  requestDto!:RequestDTO
  page:{}[] = []
  pageNumber = 0;
  pageSize!:number; 
  NofPages:number = 0
  itemsCount:number = 0 
  Selected:Set<any>;
  sorted!:{colName:string ; direction:sortDirection}
  SelectedCount: number = 0;
  Loading = true;
  SearchObj:any = {}
  AllSelected!:boolean
  constructor(private translate:TranslateService,private gridService:GridService){
        this.Selected = new Set<any>()
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
        this.DisplayPage(0)
      }
  }  

  Search(){

     this.DisplayPage(0)

  }


DisplayPage(pg:number){
    this.Selected.clear()
    this.AllSelected = false
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

        }
      )
    }
    return;
  }

  this.page = this.data

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
              this.Selected.add(element[this.uniqueField])
         });
         this.AllSelected = true
       }else{
         this.Selected.clear()
         this.AllSelected = false
       }


}
/*
 please note that this selection algorithm can select all data not yet retreived from server 
 not only the current page and this works very fine similar to frontend approach
*/
ItemSelected(obj:{uniqueFieldValue:any,checked:boolean}){


  // if(this.selectionObj.AllSelected == true && obj.checked == false){
  //   this.selectionObj.AllSelectedDirty = true
  // }
  //  if(obj.checked){
  //    this.selectionObj.Selected.add(obj.id)
  //    this.selectionObj.DeSelected.delete(obj.id)
  //  }else{
  //   this.selectionObj.Selected.delete(obj.id)
  //   this.selectionObj.DeSelected.add(obj.id)
   
  //  }
  //   if(this.selectionObj.Selected.size == this.itemsCount ||
  //       (this.selectionObj.AllSelectedDirty && this.selectionObj.DeSelected.size == 0)
  //   ){
  //     this.selectionObj = {
  //       ...this.selectionObj,
  //       AllSelected:true,
  //       AllSelectedDirty:false
  //     }
  //   }else{
  //     this.selectionObj = {
  //       ...this.selectionObj,
  //       AllSelected:false,
  //     }
  //   } 
      obj.checked ? this.Selected.add(obj.uniqueFieldValue) : this.Selected.delete(obj.uniqueFieldValue)
      if(this.Selected.size == this.page.length)
          this.AllSelected = true
      else
          this.AllSelected = false
 
  
}

commitAction(data:any){
}


}
