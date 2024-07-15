import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Options } from '../../../interfaces/Options';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    @Output() TriggerSort = new EventEmitter<string>();
    @Input() data:Array<{}> = [];
    @Input() headers:{name:string,sortable:boolean} []= []
    @Input() options:Options|any
    
  ColumnClicked(ColumnName:string){
    
    this.TriggerSort.emit(ColumnName)
  }

}
