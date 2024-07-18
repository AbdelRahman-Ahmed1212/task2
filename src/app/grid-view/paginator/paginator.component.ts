import { Component,Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @Input() NumberOfPages:number = 0;
  @Output() PageNavigate = new EventEmitter<number>();
  CurrentPage:number = 0
  EmitPageNumber(pg:number){
    this.CurrentPage = pg
    this.PageNavigate.emit(pg)
  }


}
