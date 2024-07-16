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
          pagination:true,
          search:false, 
          selection:false,
          data:[
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
            }
          ],
          headers:[
            {name:'id',sortable:true,},
            {name:'name',sortable:true},
            {name:'age',sortable:true,},
            {name:'Active',sortable:false,}
          ],

          StartPage:2,
          PageSize:3,
          Actions:[
          {
              Name:'Delete',
              Rule:(obj:any)=>{
                  return obj['Active'] == false
              }
          },
          {
            Name:'Edit',
            Rule:(obj:any)=>{
                return obj['Active'] == true
            }
        },
        ],
        DefaultSortedColumn:{
            colName:'age',
            direction:'desc'
        },
        translation:true,
        language:'are'

        }  


        
}
