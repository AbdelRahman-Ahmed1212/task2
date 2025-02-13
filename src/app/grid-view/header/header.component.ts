import { Component, Input, Output, EventEmitter, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Options } from '../../../interfaces/Options';
import { TranslateModule } from '@ngx-translate/core';
import {RenderIconsDirective} from '../../directives/render-icons-directive.directive'
import { FormsModule } from '@angular/forms';
import { ControlsComponent } from '../Controls/controls/controls.component';
@Component({
  selector: '[app-header]',
  standalone: true,
  imports: [CommonModule,TranslateModule,RenderIconsDirective,FormsModule,ControlsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    @Output() TriggerSort = new EventEmitter<{mode:string,colName:string}>();
    @Output() TriggerSelectAll = new EventEmitter<boolean>()
    @Output() EmitAction = new EventEmitter<string>()
    @Input() data:Array<{}> = [];
    @Input() headers:{name:string,sortable:boolean,dataType:string} []= []
    @Input() options:Options|any
    @Input() SortDirections!:{colName:string ; direction:'desc' | 'asc'}
    @Input() mode!:string
    @Input() AllSelected!:boolean
    @Input() selectedObjects:any
    
    dropDownVisible:boolean = true
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
  SelectAll(event:any){
    this.TriggerSelectAll.emit((event.target as HTMLInputElement).checked)    
  }
  toggleDropDown(){
      this.dropDownVisible = !this.dropDownVisible
  }
  emitActionToGird(name:string){
      this.EmitAction.emit(name)
  }
  

}
