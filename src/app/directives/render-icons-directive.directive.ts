import { Directive, HostBinding, Input, HostListener } from '@angular/core';
import { CLOSING } from '../../../node_modules/@types/ws';

@Directive({
  selector: '[appRenderIcons]',
  standalone: true
})
export class RenderIconsDirective {
  @HostBinding('class') class:string = 'fa-solid fa-sort'
  @Input() SortDirection!:any; 
  @HostListener('click') UpdateIcon(){
    if(this.SortDirection == true){
      this.class = 'fa-solid fa-sort-up'
    }
    else if(this.SortDirection == false){
      this.class = 'fa-solid fa-sort-down'
    }else{
      this.class='fa-solid fa-sort'
    }
    console.log('hi')
  }
  
 

}
