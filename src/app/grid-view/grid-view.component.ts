import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { Options } from '../../interfaces/Options';
import { PaginatorComponent } from './paginator/paginator.component';

@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [HeaderComponent,BodyComponent,PaginatorComponent],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.css'
})
export class GridViewComponent implements OnInit , OnChanges{
 
  @Input() options:Options|any;
  page:{}[] = []
  pageNumber = 0;
  pageSize = 3;
  sorted:{[colName:string]:boolean}= {}
 // NofPages = Number(this.options.data.length)
  sort(colName:string){
    if(!this.sorted[colName]){
      this.options.data.sort(
        (a:any,b:any)=>b[colName] - a[colName]
      )
      this.sorted[colName] = true
      return;
    }

     this.options.data.sort(
        (a:any,b:any)=>a[colName] - b[colName]
      ) 
      this.sorted[colName] = false
      this.DisplayPage(this.pageNumber)

}

DisplayPage(pg:number){
    this.pageNumber = pg;
    const startIndex = pg * this.pageSize;
    const EndIndex = startIndex + this.pageSize
    this.page = this.options.data.slice(startIndex,EndIndex)

}
ngOnInit(): void {

    this.DisplayPage(this.pageNumber)
}
ngOnChanges():void{
  this.DisplayPage(this.pageNumber)
}

}
