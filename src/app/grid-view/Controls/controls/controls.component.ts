import { Component, Input } from '@angular/core';
import { Action } from '../../../../interfaces/Action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {
      @Input() Data:any
      @Input() Actions!:Action[]

  IsActiveControl(action:Action):boolean{
      let filteredBasedOnSelection = this.Data.filter((obj:any)=>obj.selected == true)  
      if(filteredBasedOnSelection.length == 0) return false;    
      return filteredBasedOnSelection.every(function(obj:any){return action.Rule(obj) && obj.selected})
  }  
}
