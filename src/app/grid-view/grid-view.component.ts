import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { Options } from '../../interfaces/Options';
import { PaginatorComponent } from './paginator/paginator.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [HeaderComponent,BodyComponent,PaginatorComponent,CommonModule,FormsModule,TranslateModule],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.css'
})
export class GridViewComponent implements OnInit , OnChanges{
 
  @Input() options:Options|any;
  page:{}[] = []
  pageNumber = 0;
  
  pageSize!:number; 
  NofPages:number = 0
  sorted:{[colName:string]:boolean}= {}
  ItemToEdit:any;
  EditMode = false
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
  if(this.options.pagination){
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
  this.pageSize = this.options.PageSize;
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
DisplayEdit(rowNumber:number){
      this.ItemToEdit = this.options.data[rowNumber - 1]
      this.EditMode = true


}
SaveEditedItem(){
  // if there is a backend we will call the post method from our service here here
  const res =  Object.values(this.ItemToEdit).every(
      (item:any)=>item !='' || item !=null
  )
  console.log(res)
  console.log( Object.values(this.ItemToEdit))
  if(!res){
    alert('make sure all fields are filled')
    return;
  }
  this.EditMode = false
   this.options.data = this.options.data.map(
     (item:any)=>{
       if(item.id == this.ItemToEdit.id){
          return this.ItemToEdit
       }
       return item
     }
    
   )
}
cancel(){
  if(confirm("are you sure to exit Edit mode?")){
    this.EditMode = false
  }
  console.log(this.ItemToEdit)

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
commitAction(data:any){
  console.log(data)
}

}
