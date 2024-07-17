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
  page:{}[] = []
  pageNumber = 0;
  isAllSelected!:boolean
  pageSize!:number; 
  NofPages:number = 0
  sorted:{[colName:string]:boolean}= {}
  SelectedCount: number = 0;
  constructor(private translate:TranslateService){

  }
  sort(colName:string){

    if(!this.sorted[colName]){
      this.options.data.sort(
        (a:any,b:any)=>b[colName] - a[colName]
      )
      this.sorted[colName] = true
      this.DisplayPage(this.NofPages-1)
      return;
    }

     this.options.data.sort(
       
        (a:any,b:any)=>a[colName] - b[colName]
      ) 
      this.sorted[colName] = false
      this.DisplayPage(0)


}

DisplayPage(pg:number){
  if(this.options.paging){
    this.pageNumber = pg;
    const startIndex = pg * this.pageSize;
    const EndIndex = startIndex + this.pageSize
    this.page = this.options.data.slice(startIndex,EndIndex)
    return
  }

   this.page = this.options.data;

}
ngOnInit(): void {
  this.translate.addLangs(this.options.languages)
  this.translate.use(this.options.language) 
  this.pageSize = this.options.pagination.pageSize;
  this.NofPages = Math.ceil(this.options.data.length / this.pageSize)
  if(this.options.selection){
    this.options.data = this.options.data.map((element:any)=> Object.assign({selected:false},element))

  }

    this.DisplayPage(this.pageNumber)
    const SortedColumn =this.options.DefaultSortedColumn 
    
    if(SortedColumn){
        if(SortedColumn.direction == 'desc'){
          this.sort(SortedColumn.colName)
        }else{
          this.sorted[SortedColumn.colName] = true;
          this.sort(SortedColumn.colName)

        }
    }
}
ngOnChanges():void{
  this.DisplayPage(this.pageNumber)



}
commitDelete(rowNumber:number){
  this.options.data = this.options.data.filter(
         (item:any)=>item.id != rowNumber 
        )
        this.DisplayPage(this.pageNumber)
        this.NofPages = Math.ceil(this.options.data.length / this.pageSize)


}
/// helper function to convert property name from type unknow to string to index the object
getString(input:any)
{

  return String(input);
}
deleteSelected(){
  if(confirm("do you really want to delete selected rows")){
    this.options.data = this.options.data.filter(
      (a:any)=> !a.selected
    ) 
    this.DisplayPage(this.pageNumber)
    this.NofPages = Math.ceil(this.options.data.length / this.pageSize)

  }
}

SelectionCounter(value:boolean){
  if(value == true){
    this.SelectedCount +=1
    return
  }
  this.SelectedCount -=1

  if(this.SelectedCount == this.options.data){
    this.isAllSelected = true
    return
  }
  this.isAllSelected = false

}
commitAction(data:any){
  console.log(data)
}
toggleAllBoxs(){
      this.options.data.forEach((element:any) => {
          element.selected = !element.selected
      });
}

}
