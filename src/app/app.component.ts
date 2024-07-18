import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridViewComponent } from './grid-view/grid-view.component';
import gridOptions from '../gridOptions'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,GridViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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
