import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridViewComponent } from './grid-view/grid-view.component';
import { Options } from '../interfaces/Options';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,GridViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
        GridViewOptions:Options = {
          hiddenColumns :[],
          pagination:false,
          search:false, 
          selection:false,
          data:[
            {
              id:1,
              name:'ahmed',
              age:30,
            },
            {
              id:2,
              name:'ali',
              age:35,
            },
            {
              id:3,
              name:'abdullah',
              age:50,
            },
            {
              id:4,
              name:'mohammed',
              age:3,
            },
            {
              id:5,
              name:'adel',
              age:26,
            },
            {
              id:6,
              name:'alaa',
              age:39,
            }
            ,
            {
              id:7,
              name:'hamed',
              age:10,
            }
          ],
          headers:[
            {name:'id',sortable:true},
            {name:'name',sortable:false},
            {name:'age',sortable:true}
          ]
        }  


        
}
