import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Options } from '../../../interfaces/Options';

import { TranslateModule } from '@ngx-translate/core';
import {RenderIconsDirective} from '../../directives/render-icons-directive.directive'
import { sortDirection } from '../../../interfaces/RequestDTO';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,TranslateModule,RenderIconsDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    @Output() TriggerSort = new EventEmitter<{mode:string,colName:string}>();
 
    @Input() data:Array<{}> = [];
    @Input() headers:{name:string,sortable:boolean,dataType:string} []= []
    @Input() options:Options|any
    @Input() SortDirections!:{colName:string ; direction:sortDirection}
    @Input() mode!:string

  ColumnClicked(ColumnName:string){
    const ColumnDataType = this.headers.find((a:any)=>a.name ==  ColumnName);
    if(ColumnDataType == undefined)
      return
    if(this.mode == 'server'){
        this.TriggerSort.emit({mode:'server',colName:ColumnName})
    }
    if(ColumnDataType.dataType == 'string')
      this.TriggerSort.emit({mode:'alpha',colName:ColumnName})
    else
      this.TriggerSort.emit({mode:'number',colName:ColumnName})
    
  }

}
