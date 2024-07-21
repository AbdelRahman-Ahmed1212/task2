import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { Options } from '../../interfaces/Options';
import { PaginatorComponent } from './paginator/paginator.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ControlsComponent } from './Controls/controls/controls.component';

@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [HeaderComponent,BodyComponent,PaginatorComponent,CommonModule,FormsModule,TranslateModule,ControlsComponent],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.css'
})
export class GridViewComponent implements OnInit , OnChanges{
 
  @Input() options:Options|any;
  @Input () data:any;
  @Input() mode! : 'client' | 'server'
  @Input() url = ''
  page:{}[] = []
  pageNumber = 0;
  isAllSelected!:boolean
  pageSize!:number; 
  NofPages:number = 0
  sorted:{[colName:string]:boolean}= {}
  SelectedCount: number = 0;
  constructor(private translate:TranslateService){

  }
  AlphapiticalSort(colName:string){
    if(!this.sorted[colName]){
      this.data.sort(
        (a:any,b:any)=>b[colName].localeCompare(a[colName])
      )
      this.sorted[colName] = true
      this.DisplayPage(0)
      return;
    }
     this.data.sort(
       
        (a:any,b:any)=>a[colName].localeCompare(b[colName])
      ) 
      this.sorted[colName] = false
      this.DisplayPage(0)
      console.log('hello from alphpitical sort')
  }
  NumiricSort(colName:string){
    if(!this.sorted[colName]){
      this.data.sort(
        (a:any,b:any)=>b[colName] - a[colName]
      )
      this.sorted[colName] = true
      this.DisplayPage(0)
      return;
    }
     this.data.sort(
       
        (a:any,b:any)=>a[colName] - b[colName]
      ) 
      this.sorted[colName] = false
      this.DisplayPage(0)


}

DisplayPage(pg:number){
  if(this.options.pagination.paging){
    this.pageNumber = pg;
    const startIndex = pg * this.pageSize;
    const EndIndex = startIndex + this.pageSize
    this.page = this.data.slice(startIndex,EndIndex)
    return
  }

   this.page = this.data;

}
ngOnInit(): void {
  this.translate.addLangs(this.options.Translation.languages)
  this.translate.use(this.options.Translation.language) 
  this.pageSize = this.options.pagination.pageSize;
  this.NofPages = Math.ceil(this.data.length / this.pageSize)
  if(this.options.selection){
    this.data = this.data.map((element:any)=> Object.assign({selected:false},element))

  }

    this.DisplayPage(this.pageNumber)
    const SortedColumn =this.options.DefaultSortedColumn 
    
    if(SortedColumn){
        if(SortedColumn.direction == 'asc'){
          this.sorted[SortedColumn.colName] = true;
        }
        SortedColumn.dataType == 'number'?this.NumiricSort(SortedColumn.colName) : this.AlphapiticalSort(SortedColumn.colName)

    }
}
ngOnChanges():void{
  this.DisplayPage(this.pageNumber)



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
deleteSelected(){
  if(confirm("do you really want to delete selected rows")){
    this.data = this.data.filter(
      (a:any)=> !a.selected
    ) 
    this.DisplayPage(this.pageNumber)
    this.NofPages = Math.ceil(this.data.length / this.pageSize)

  }
}


commitAction(data:any){
  console.log(data)
}
toggleAllBoxs(SelectAllCheckBox:any){
      const status = (SelectAllCheckBox as HTMLInputElement).checked
      this.data.forEach((element:any) => {
          element.selected = status
      });
      this.SelectedCount = this.data.length 
}
ChangeCheckBoxStatus(status:string){
    if(status == 'checked'){
      this.SelectedCount ++;
    }else{
      this.SelectedCount --;
    }
    if(this.SelectedCount == this.data.length){
      this.isAllSelected = true
    }else{
      this.isAllSelected = false
    }
    console.log(this.SelectedCount)
}

}
