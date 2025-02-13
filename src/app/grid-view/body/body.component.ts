import { Component, Input, Output,EventEmitter, OnChanges, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { Options } from '../../../interfaces/Options';
import { Action } from '../../../interfaces/Action';
@Component({
  selector: '[app-body]',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {
      @Input() data:any
      @Input() options!:Options
      @Input() PageNumber:number = 1;
      @Output() ActionEmitter = new EventEmitter<any>()
      @Output() SelectionCounterEvent = new EventEmitter<string>()
      @Output() ItemSelected = new EventEmitter<{uniqueFieldValue:any,checked:boolean}>()
      @Input() selectionObj!:{AllSelected:boolean,Selected:Set<number>,DeSelected:Set<number>,AllSelectedDirty:boolean}
      @Output() TriggerToggle = new EventEmitter<{uniqueFieldValue:any , status:boolean}>()
      @Input() selectedObjects:any
    // this function is to used to return 0 to prevent returnZeroToPreventSort from sorting our array objects
      returnZeroToPreventSort(){
        return 0;
      }
      commitAction(ActionName:string,dataId:number){
    
      }
   

      ToggleCheckBox(event:any,val:any){  
        
        this.ItemSelected.emit({uniqueFieldValue:val,checked:(event.target as HTMLInputElement).checked})
      }
      
      isSelected(uniqueFieldValue:any){
           return  this.selectedObjects && this.selectedObjects[uniqueFieldValue] != undefined

      }
      toggleChanged(event:any,val:any){
        this.TriggerToggle.emit({uniqueFieldValue:val,status:(event.target as HTMLInputElement).checked})
      }
      getString(input:any)
      {
        return String(input);
      }
}
