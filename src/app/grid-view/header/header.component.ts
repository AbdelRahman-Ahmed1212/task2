import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Options } from '../../../interfaces/Options';

import { TranslateModule } from '@ngx-translate/core';
import {RenderIconsDirective} from '../../directives/render-icons-directive.directive'
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,TranslateModule,RenderIconsDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    @Output() TriggerAlphapiticalSort = new EventEmitter<string>();
    @Output() TriggerNumiricSort = new EventEmitter<string>();
    @Input() data:Array<{}> = [];
    @Input() headers:{name:string,sortable:boolean,dataType:string} []= []
    @Input() options:Options|any
    @Input() SortDirections!:{[colName:string]:boolean}

  ColumnClicked(ColumnName:string){
    const ColumnDataType = this.headers.find((a:any)=>a.name ==  ColumnName);
    if(ColumnDataType == undefined)
      return
    if(ColumnDataType.dataType == 'string')
      this.TriggerAlphapiticalSort.emit(ColumnName)
    else
      this.TriggerNumiricSort.emit(ColumnName)
    
  }

}
