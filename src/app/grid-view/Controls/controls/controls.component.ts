import { Component, Input } from '@angular/core';
import { Action } from '../../../../interfaces/Action';
import { CommonModule } from '@angular/common';
import { Options } from '../../../../interfaces/Options';

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
      @Input() Selected!:Set<any>
      @Input() options!:Options

  IsActiveControl(action:Action):boolean{
    debugger
      let filteredBasedOnSelection = this.Data.filter((obj:any)=>{
        return this.Selected.has(obj[this.options.uniqueField])
      })  
      if(filteredBasedOnSelection.length == 0) return false;    
      return filteredBasedOnSelection.every(function(obj:any){return action.Rule(obj)})
  }  
}
