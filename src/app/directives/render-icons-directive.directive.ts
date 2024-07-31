import { Directive, HostBinding, Input, HostListener, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appRenderIcons]',
  standalone: true
})
export class RenderIconsDirective implements OnInit,OnChanges{
  @HostBinding('class') class:string = 'fa-solid fa-sort'
  @Input() SortedColName!:string;
  @Input() Direction!:'desc' | 'asc'; 
  @Input() CurrentColumnName!:string
  
  @HostListener('click') clicked(){
      this.RenderArrow()
  }
  ngOnInit(){
    this.RenderArrow()
  }
  ngOnChanges(changes:SimpleChanges){
   this.RenderArrow()
  }
  RenderArrow(){
      if(this.SortedColName == this.CurrentColumnName){
        this.Direction == 'asc' ? this.class = 'fa-solid fa-sort-down' : this.class = 'fa-solid fa-sort-up'
    }
    else if(this.SortedColName != this.CurrentColumnName){
      this.class = 'fa-solid fa-sort'

    }
  }   
  
  
 

}
