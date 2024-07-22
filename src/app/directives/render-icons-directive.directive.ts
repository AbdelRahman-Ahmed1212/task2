import { Directive, HostBinding, Input, HostListener } from '@angular/core';
import { sortDirection } from '../../interfaces/RequestDTO';

@Directive({
  selector: '[appRenderIcons]',
  standalone: true
})
export class RenderIconsDirective {
  @HostBinding('class') class:string = 'fa-solid fa-sort'
  @Input() SortDirection!:{colName:string ; direction:sortDirection}; 
  @Input() CurrentColumnName!:string
  @HostListener('click') UpdateIcon(){
    if(this.SortDirection.colName == this.CurrentColumnName && this.SortDirection.direction == sortDirection.desc){
      this.class = 'fa-solid fa-sort-up'
    }
    else if(this.SortDirection.colName == this.CurrentColumnName && this.SortDirection.direction == sortDirection.asc){
      this.class = 'fa-solid fa-sort-down'
    }else{
      this.class='fa-solid fa-sort'
    }
  }
  
 

}
