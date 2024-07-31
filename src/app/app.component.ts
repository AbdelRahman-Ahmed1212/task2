import { Component, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridViewComponent } from './grid-view/grid-view.component';
import gridOptions from '../gridOptions'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Filter } from '../interfaces/Filter';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,GridViewComponent,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  SearchObj:any = {};
  filters:Filter[] = []
  TempSearchObj:any = {}
  @ViewChild('grid') grid:any


  initTempSearchObj(){
   gridOptions.headers.forEach(
      (obj:any)=>{
        if(obj.searchable){
          if(obj.dataType == 'enum'){
            this.TempSearchObj[obj.name] =  +(Object.keys(obj.enum)[0])
         
          }else{
            this.TempSearchObj[obj.name] = '' 
          }
        }
      
      }
    )
  }


  ngOnInit(){
    this.initTempSearchObj()
  }
  Search(){
    this.SearchObj = {...this.TempSearchObj}
     console.log(this.SearchObj , this.TempSearchObj)
    this.grid.DisplayPage(0)
  }

    data:any =[
      {
        id:1,
        name:'ahmed',
        age:30,
        Active:true
      },
      {
        id:2,
        name:'ali',
        age:35,
        Active:true
      },
      {
        id:3,
        name:'abdullah',
        age:50,
        Active:true
      },
      {
        id:4,
        name:'mohammed',
        age:3,
        Active:false
      },
      {
        id:5,
        name:'adel',
        age:26,
        Active:false
      },
      {
        id:6,
        name:'alaa',
        age:39,
        Active:false
      }
      ,
      {
        id:7,
        name:'hamed',
        age:10,
        Active:true
      },
      
     
    ]
    GridViewOptions  = gridOptions;

        
}
