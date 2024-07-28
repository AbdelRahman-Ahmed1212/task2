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
      @Input() selectedObjects:any
      @Input() options!:Options

  IsActiveControl(action:Action):boolean{
      return Object.values(this.selectedObjects).every((data:any)=>action.Rule(data.row))
  }  
}
