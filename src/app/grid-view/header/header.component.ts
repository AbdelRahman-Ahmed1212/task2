import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Options } from '../../../interfaces/Options';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faSortDesc } from '@fortawesome/free-solid-svg-icons';
import { faSortAsc } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    @Output() TriggerSort = new EventEmitter<string>();
    @Input() data:Array<{}> = [];
    @Input() headers:{name:string,sortable:boolean} []= []
    @Input() options:Options|any
    @Input() SortDirections!:{[colName:string]:boolean}
    fasort = faSort
    faasc = faSortDesc;
    fadesc = faSortAsc;
  ColumnClicked(ColumnName:string){
    this.TriggerSort.emit(ColumnName)
  }

}
