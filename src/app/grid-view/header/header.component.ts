import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


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
    
  ColumnClicked(ColumnName:string){
    
    this.TriggerSort.emit(ColumnName)
  }

}
