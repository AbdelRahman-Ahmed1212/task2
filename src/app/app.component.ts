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
          sortables : [],
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
              name:'kamal',
              age:40,
            }
          ],
          headers:[
            'id',
            'name',
            'age'
          ]
        }  


        
}
