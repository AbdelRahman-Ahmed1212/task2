import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Action } from '../../../../interfaces/Action';
import { CommonModule } from '@angular/common';


@Component({
  selector: '[app-controls]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {
      @Input() Data:any
      @Input() Actions!:Action[]
      @Input() selectedObjects:any
      @Output() ActionEmitter = new EventEmitter<string>()

  IsActiveControl(action:Action):boolean{
      const selectedObjects = Object.values(this.selectedObjects)
      if(selectedObjects.length == 0)
        return false
      return selectedObjects.every((data:any)=>action.Rule(data.row))
  } 
  EmitAction(name:string){
    this.ActionEmitter.emit(name)
  } 
}
