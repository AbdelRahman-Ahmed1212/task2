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
  @Output() TriggerSort = new EventEmitter<number>();
    @Input() data:Array<{}> = [];
    @Input() headers:string[]= []
    
  ColumnClicked(CIndex:number){
    this.TriggerSort.emit(CIndex)
  }

}
